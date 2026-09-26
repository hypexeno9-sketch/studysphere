/* =========================================================
   STUDYSPHERE - INTERACTIVE QUIZ ENGINE
   Version 2.0
========================================================= */

const QUIZ_STORAGE_KEY = "studysphere_quiz_results";

let quizState = {
    subjectId: null,
    chapterId: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedAnswer: null
};


/* =========================================================
   START CHAPTER QUIZ
========================================================= */

function startChapterQuiz(subjectId, chapterId) {

    if (typeof getChapter !== "function") {
        showQuizError("Quiz data system is not loaded.");
        return;
    }

    const chapter = getChapter(subjectId, chapterId);

    if (!chapter) {
        showQuizError("Chapter not found.");
        return;
    }

    if (!Array.isArray(chapter.quiz) || chapter.quiz.length === 0) {
        showQuizError("No quiz questions available for this chapter yet.");
        return;
    }

    quizState.subjectId = subjectId;
    quizState.chapterId = chapterId;
    quizState.questions = shuffleQuizArray(
        chapter.quiz.map(normalizeQuizQuestion)
    );
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.answered = false;
    quizState.selectedAnswer = null;

    openQuizModal();
    renderQuizQuestion();
}


/* =========================================================
   NORMALIZE QUESTION
========================================================= */

function normalizeQuizQuestion(question) {

    let options =
        question.options ||
        question.choices ||
        question.answers ||
        [];

    options = Array.isArray(options)
        ? options.map(item => String(item))
        : [];

    let answer =
        question.answer ??
        question.correctAnswer ??
        question.correct ??
        0;

    let correctIndex = 0;

    if (typeof answer === "number") {
        correctIndex = answer;
    } else {

        const answerText = String(answer).trim().toLowerCase();

        const foundIndex = options.findIndex(
            option => option.trim().toLowerCase() === answerText
        );

        if (foundIndex !== -1) {
            correctIndex = foundIndex;
        } else {

            const letterIndex = ["a", "b", "c", "d"].indexOf(answerText);

            if (letterIndex !== -1) {
                correctIndex = letterIndex;
            }
        }
    }

    return {
        question:
            question.question ||
            question.text ||
            question.q ||
            "Question",

        options: options,

        answer: correctIndex,

        explanation:
            question.explanation ||
            question.solution ||
            question.reason ||
            "Keep practicing to improve your understanding."
    };
}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuizQuestion() {

    const container = document.getElementById("quizModalContent");

    if (!container) return;

    const question =
        quizState.questions[quizState.currentIndex];

    if (!question) {
        finishQuiz();
        return;
    }

    quizState.answered = false;
    quizState.selectedAnswer = null;

    const total = quizState.questions.length;
    const current = quizState.currentIndex + 1;

    const progress =
        Math.round((quizState.currentIndex / total) * 100);

    let optionsHTML = "";

    question.options.forEach((option, index) => {

        optionsHTML += `
            <button
                class="quiz-option"
                type="button"
                data-index="${index}"
                onclick="selectQuizAnswer(${index})">

                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="option-text">
                    ${escapeQuizHTML(option)}
                </span>

            </button>
        `;
    });

    container.innerHTML = `

        <div class="quiz-container">

            <div class="quiz-header">

                <div>
                    <span class="quiz-label">
                        🎯 CHAPTER QUIZ
                    </span>

                    <h2>
                        Question ${current} of ${total}
                    </h2>
                </div>

                <div class="quiz-score">
                    Score:
                    <strong>${quizState.score}</strong>
                </div>

            </div>


            <div class="quiz-progress">

                <div
                    class="quiz-progress-fill"
                    style="width:${progress}%">
                </div>

            </div>


            <div class="quiz-question-card">

                <div class="question-number">
                    QUESTION ${current}
                </div>

                <h3 class="quiz-question">
                    ${escapeQuizHTML(question.question)}
                </h3>

                <div class="quiz-options">
                    ${optionsHTML}
                </div>

                <div
                    id="quizFeedback"
                    class="quiz-feedback hidden">
                </div>

            </div>


            <div class="quiz-controls">

                <button
                    id="nextQuizBtn"
                    class="btn primary quiz-next-btn"
                    onclick="nextQuizQuestion()"
                    disabled>

                    ${current === total
                        ? "Finish Quiz 🏁"
                        : "Next Question →"}

                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   SELECT ANSWER
========================================================= */

function selectQuizAnswer(selectedIndex) {

    if (quizState.answered) return;

    const question =
        quizState.questions[quizState.currentIndex];

    if (!question) return;

    quizState.answered = true;
    quizState.selectedAnswer = selectedIndex;

    const isCorrect =
        selectedIndex === question.answer;

    if (isCorrect) {
        quizState.score++;
    }

    const options =
        document.querySelectorAll(".quiz-option");

    options.forEach((button, index) => {

        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            selectedIndex !== question.answer
        ) {
            button.classList.add("wrong");
        }
    });

    showQuizFeedback(isCorrect, question);

    const nextButton =
        document.getElementById("nextQuizBtn");

    if (nextButton) {
        nextButton.disabled = false;
    }
}


/* =========================================================
   FEEDBACK
========================================================= */

function showQuizFeedback(isCorrect, question) {

    const feedback =
        document.getElementById("quizFeedback");

    if (!feedback) return;

    feedback.classList.remove("hidden");

    if (isCorrect) {

        feedback.className =
            "quiz-feedback correct-feedback";

        feedback.innerHTML = `
            <div class="feedback-title">
                ✅ Correct!
            </div>

            <p>
                ${escapeQuizHTML(question.explanation)}
            </p>
        `;

    } else {

        feedback.className =
            "quiz-feedback wrong-feedback";

        feedback.innerHTML = `
            <div class="feedback-title">
                ❌ Incorrect
            </div>

            <p>
                Correct answer:
                <strong>
                    ${escapeQuizHTML(
                        question.options[question.answer]
                    )}
                </strong>
            </p>

            <p>
                ${escapeQuizHTML(question.explanation)}
            </p>
        `;
    }
}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuizQuestion() {

    if (!quizState.answered) return;

    quizState.currentIndex++;

    if (
        quizState.currentIndex >=
        quizState.questions.length
    ) {

        finishQuiz();
        return;
    }

    renderQuizQuestion();
}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

    const total =
        quizState.questions.length;

    const score =
        quizState.score;

    const percentage =
        total > 0
            ? Math.round((score / total) * 100)
            : 0;

    const result = {

        subjectId: quizState.subjectId,

        chapterId: quizState.chapterId,

        score: score,

        total: total,

        percentage: percentage,

        date: new Date().toISOString()
    };

    saveQuizResult(result);

    renderQuizResult(
        score,
        total,
        percentage
    );

    updateDashboardQuizStats();
}


/* =========================================================
   RESULT SCREEN
========================================================= */

function renderQuizResult(score, total, percentage) {

    const container =
        document.getElementById("quizModalContent");

    if (!container) return;

    let message = getQuizResultMessage(percentage);

    container.innerHTML = `

        <div class="quiz-result">

            <div class="result-icon">
                ${percentage >= 80
                    ? "🏆"
                    : percentage >= 50
                    ? "👏"
                    : "📚"}
            </div>

            <span class="quiz-label">
                QUIZ COMPLETED
            </span>

            <h2>
                ${message}
            </h2>

            <div class="score-circle">

                <strong>
                    ${percentage}%
                </strong>

                <span>
                    Score
                </span>

            </div>

            <div class="score-details">

                <div>
                    <strong>${score}</strong>
                    <span>Correct</span>
                </div>

                <div>
                    <strong>${total - score}</strong>
                    <span>Wrong</span>
                </div>

                <div>
                    <strong>${total}</strong>
                    <span>Total</span>
                </div>

            </div>

            <div class="quiz-result-actions">

                <button
                    class="btn primary"
                    onclick="retryQuiz()">

                    🔄 Retry Quiz

                </button>

                <button
                    class="btn secondary"
                    onclick="closeQuizModal()">

                    ✓ Done

                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   RESULT MESSAGE
========================================================= */

function getQuizResultMessage(percentage) {

    if (percentage === 100) {
        return "Perfect Score! 🎉";
    }

    if (percentage >= 80) {
        return "Excellent Work! 🔥";
    }

    if (percentage >= 60) {
        return "Great Job! 👏";
    }

    if (percentage >= 40) {
        return "Good Try! 💪";
    }

    return "Keep Practicing! 📚";
}


/* =========================================================
   RETRY
========================================================= */

function retryQuiz() {

    if (!quizState.subjectId || !quizState.chapterId) {
        return;
    }

    startChapterQuiz(
        quizState.subjectId,
        quizState.chapterId
    );
}


/* =========================================================
   OPEN MODAL
========================================================= */

function openQuizModal() {

    const modal =
        document.getElementById("quizModal");

    if (!modal) return;

    modal.classList.remove("hidden");

    document.body.classList.add("modal-open");
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeQuizModal() {

    const modal =
        document.getElementById("quizModal");

    if (!modal) return;

    modal.classList.add("hidden");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   SAVE RESULT
========================================================= */

function saveQuizResult(result) {

    let results = [];

    try {

        results =
            JSON.parse(
                localStorage.getItem(
                    QUIZ_STORAGE_KEY
                )
            ) || [];

    } catch (error) {

        results = [];
    }

    results.push(result);

    localStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify(results)
    );
}


/* =========================================================
   GET RESULTS
========================================================= */

function getQuizResults() {

    try {

        return JSON.parse(
            localStorage.getItem(
                QUIZ_STORAGE_KEY
            )
        ) || [];

    } catch (error) {

        return [];
    }
}


/* =========================================================
   QUIZ STATISTICS
========================================================= */

function getQuizStatistics() {

    const results =
        getQuizResults();

    if (results.length === 0) {

        return {
            attempts: 0,
            average: 0,
            best: 0
        };
    }

    const total =
        results.reduce(
            (sum, item) =>
                sum + Number(item.percentage || 0),
            0
        );

    const average =
        Math.round(total / results.length);

    const best =
        Math.max(
            ...results.map(
                item =>
                    Number(item.percentage || 0)
            )
        );

    return {

        attempts: results.length,

        average: average,

        best: best
    };
}


/* =========================================================
   UPDATE DASHBOARD
========================================================= */

function updateDashboardQuizStats() {

    const stats =
        getQuizStatistics();

    const attempts =
        document.getElementById("quizAttempts");

    const average =
        document.getElementById("averageScore");

    const best =
        document.getElementById("bestScore");

    const lastScore =
        document.getElementById("quizScore");

    if (attempts) {
        attempts.textContent =
            stats.attempts;
    }

    if (average) {
        average.textContent =
            stats.average + "%";
    }

    if (best) {
        best.textContent =
            stats.best + "%";
    }

    if (lastScore) {

        const results =
            getQuizResults();

        if (results.length > 0) {

            lastScore.textContent =
                results[results.length - 1]
                    .percentage + "%";
        }
    }

    const progressText =
        document.getElementById("progressText");

    if (progressText) {

        if (stats.attempts === 0) {

            progressText.textContent =
                "No quiz attempted yet.";

        } else {

            progressText.textContent =
                `You have attempted ${stats.attempts} quiz${
                    stats.attempts === 1 ? "" : "zes"
                }. Keep improving!`;
        }
    }
}


/* =========================================================
   RANDOM / QUICK CHALLENGE
========================================================= */

function showRandomQuestion() {

    if (typeof getRandomQuestion !== "function") {

        alert("Question data is not available.");

        return;
    }

    const question =
        getRandomQuestion();

    if (!question) return;

    const box =
        document.getElementById("challengeBox");

    if (!box) return;

    const options =
        question.options ||
        question.choices ||
        [];

    let correctAnswer =
        question.answer ??
        question.correctAnswer ??
        question.correct ??
        0;

    if (typeof correctAnswer !== "number") {

        correctAnswer =
            options.findIndex(
                item =>
                    String(item).toLowerCase() ===
                    String(correctAnswer).toLowerCase()
            );
    }

    let optionsHTML = "";

    options.forEach((option, index) => {

        optionsHTML += `
            <button
                class="challenge-option"
                type="button"
                onclick="selectChallengeAnswer(
                    ${index},
                    ${correctAnswer}
                )">

                <span class="challenge-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${escapeQuizHTML(option)}
                </span>

            </button>
        `;
    });

    box.innerHTML = `

        <div class="challenge-label">
            🧠 QUICK CHALLENGE
        </div>

        <p class="challenge-question">
            ${escapeQuizHTML(
                question.question ||
                question.text ||
                question.q ||
                "Question"
            )}
        </p>

        <div class="challenge-options">

            ${optionsHTML}

        </div>

        <div
            id="challengeFeedback"
            class="challenge-feedback">
        </div>

        <button
            class="btn primary challenge-next"
            onclick="showRandomQuestion()">

            Next Challenge 🔥

        </button>
    `;
}


/* =========================================================
   QUICK CHALLENGE ANSWER
========================================================= */

function selectChallengeAnswer(
    selected,
    correct
) {

    const buttons =
        document.querySelectorAll(
            ".challenge-option"
        );

    buttons.forEach(
        button =>
            button.disabled = true
    );

    if (buttons[correct]) {
        buttons[correct]
            .classList.add("correct");
    }

    if (selected !== correct && buttons[selected]) {

        buttons[selected]
            .classList.add("wrong");
    }

    const feedback =
        document.getElementById(
            "challengeFeedback"
        );

    if (!feedback) return;

    if (selected === correct) {

        feedback.className =
            "challenge-feedback correct";

        feedback.textContent =
            "✅ Correct! Great job.";

    } else {

        feedback.className =
            "challenge-feedback wrong";

        feedback.textContent =
            "❌ Incorrect. Try the next one!";
    }
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleQuizArray(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [copy[i], copy[j]] =
            [copy[j], copy[i]];
    }

    return copy;
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeQuizHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   ERROR
========================================================= */

function showQuizError(message) {

    const container =
        document.getElementById(
            "quizModalContent"
        );

    if (!container) {

        alert(message);

        return;
    }

    openQuizModal();

    container.innerHTML = `

        <div class="quiz-error">

            <div>
                ⚠️
            </div>

            <h3>
                Quiz Unavailable
            </h3>

            <p>
                ${escapeQuizHTML(message)}
            </p>

            <button
                class="btn primary"
                onclick="closeQuizModal()">

                Close

            </button>

        </div>
    `;
}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const modal =
            document.getElementById("quizModal");

        if (
            !modal ||
            modal.classList.contains("hidden")
        ) {
            return;
        }

        if (event.key === "Escape") {

            closeQuizModal();

            return;
        }

        if (
            ["1", "2", "3", "4"]
                .includes(event.key)
        ) {

            const index =
                Number(event.key) - 1;

            selectQuizAnswer(index);
        }

        if (event.key === "Enter") {

            if (quizState.answered) {

                nextQuizQuestion();
            }
        }
    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateDashboardQuizStats();

        console.log(
            "StudySphere Interactive Quiz Loaded ✅"
        );
    }
);