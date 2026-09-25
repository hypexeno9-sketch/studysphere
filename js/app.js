// ========================================
// STUDYSPHERE - INTERACTIVE JAVASCRIPT
// ========================================

let quizIndex = 0;
let quizScore = 0;

const quizQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is 12 × 5?",
        options: ["50", "60", "70", "55"],
        answer: "60"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which organ pumps blood through the body?",
        options: ["Brain", "Lungs", "Heart", "Kidney"],
        answer: "Heart"
    },
    {
        question: "What is the chemical formula of water?",
        options: ["CO2", "H2O", "O2", "NaCl"],
        answer: "H2O"
    }
];


// ========================================
// SUBJECT
// ========================================

function openSubject(subject) {

    showModal(`
        <div class="modal-icon">📚</div>

        <h2>${subject}</h2>

        <p class="modal-text">
            ${subject} learning section is ready.
            Chapters, notes and practice questions
            will be added here.
        </p>

        <button class="modal-btn" onclick="closeModal()">
            Continue Learning
        </button>
    `);
}


// ========================================
// QUIZ
// ========================================

function startQuiz() {

    quizIndex = 0;
    quizScore = 0;

    showQuiz();
}


function showQuiz() {

    const q = quizQuestions[quizIndex];

    const progress =
        ((quizIndex + 1) / quizQuestions.length) * 100;

    let optionsHTML = "";

    q.options.forEach((option, index) => {

        optionsHTML += `
            <button
                class="quiz-option"
                onclick="selectAnswer(${index})"
            >
                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>${option}</span>
            </button>
        `;
    });


    showModal(`

        <div class="quiz-header">

            <span class="quiz-label">
                QUICK QUIZ
            </span>

            <span class="quiz-count">
                ${quizIndex + 1}/${quizQuestions.length}
            </span>

        </div>

        <div class="quiz-progress">
            <div
                class="quiz-progress-bar"
                style="width:${progress}%"
            ></div>
        </div>

        <h2 class="quiz-question">
            ${q.question}
        </h2>

        <div class="quiz-options">
            ${optionsHTML}
        </div>

        <p class="quiz-hint">
            Choose the correct answer
        </p>

    `);
}


function selectAnswer(index) {

    const q = quizQuestions[quizIndex];

    const buttons =
        document.querySelectorAll(".quiz-option");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (q.options[index] === q.answer) {

        quizScore++;

        buttons[index].classList.add("correct");

    } else {

        buttons[index].classList.add("wrong");

        buttons.forEach(button => {

            if (
                button.innerText
                    .replace(/[A-D]\s*/, "")
                    .trim() === q.answer
            ) {
                button.classList.add("correct");
            }

        });
    }


    setTimeout(() => {

        quizIndex++;

        if (quizIndex < quizQuestions.length) {

            showQuiz();

        } else {

            showQuizResult();

        }

    }, 800);
}


function showQuizResult() {

    const percentage =
        Math.round(
            (quizScore / quizQuestions.length) * 100
        );


    let message;

    if (percentage >= 80) {
        message = "Excellent work! 🔥";
    } else if (percentage >= 50) {
        message = "Good job! Keep practicing. 💪";
    } else {
        message = "Keep learning and try again! 📚";
    }


    showModal(`

        <div class="result-icon">
            🏆
        </div>

        <p class="quiz-label">
            QUIZ COMPLETE
        </p>

        <h2>${message}</h2>

        <div class="score-circle">
            ${percentage}%
        </div>

        <p class="score-text">
            You scored
            <strong>${quizScore}</strong>
            out of
            <strong>${quizQuestions.length}</strong>
        </p>

        <div class="result-buttons">

            <button
                class="modal-btn"
                onclick="startQuiz()"
            >
                Try Again
            </button>

            <button
                class="modal-secondary"
                onclick="closeModal()"
            >
                Close
            </button>

        </div>
    `);
}


// ========================================
// MODAL SYSTEM
// ========================================

function showModal(content) {

    closeModal();


    const modal = document.createElement("div");

    modal.id = "studyModal";

    modal.className = "study-modal";

    modal.innerHTML = `

        <div class="modal-backdrop"
             onclick="closeModal()">
        </div>

        <div class="modal-box">

            <button
                class="modal-close"
                onclick="closeModal()"
            >
                ×
            </button>

            ${content}

        </div>
    `;


    document.body.appendChild(modal);

    document.body.style.overflow = "hidden";
}


function closeModal() {

    const modal =
        document.getElementById("studyModal");

    if (modal) {
        modal.remove();
    }

    document.body.style.overflow = "";
}


// ========================================
// TODO
// ========================================

function openTodo() {

    showModal(`

        <div class="modal-icon">✅</div>

        <h2>Study Tasks</h2>

        <p class="modal-text">
            Your personal study task manager.
        </p>

        <input
            id="taskInput"
            class="modal-input"
            type="text"
            placeholder="Enter your study task..."
        >

        <button
            class="modal-btn"
            onclick="addTask()"
        >
            Add Task
        </button>

        <div id="taskList"></div>

    `);
}


function addTask() {

    const input =
        document.getElementById("taskInput");

    const task = input.value.trim();

    if (!task) return;


    const list =
        document.getElementById("taskList");


    const item =
        document.createElement("div");

    item.className = "task-item";

    item.innerHTML = `

        <span>📌 ${task}</span>

        <button onclick="this.parentElement.remove()">
            ✓
        </button>

    `;


    list.appendChild(item);

    input.value = "";
}


// ========================================
// TIMER
// ========================================

let timerInterval;
let timerSeconds = 25 * 60;


function startTimer() {

    showTimer();

}


function showTimer() {

    showModal(`

        <div class="modal-icon">⏱️</div>

        <p class="quiz-label">
            FOCUS SESSION
        </p>

        <div
            id="timerDisplay"
            class="timer-display"
        >
            25:00
        </div>

        <p class="modal-text">
            Stay focused for 25 minutes.
        </p>

        <div class="timer-buttons">

            <button
                class="modal-btn"
                onclick="runTimer()"
            >
                Start
            </button>

            <button
                class="modal-secondary"
                onclick="resetTimer()"
            >
                Reset
            </button>

        </div>

    `);
}


function runTimer() {

    if (timerInterval) return;


    timerInterval = setInterval(() => {

        timerSeconds--;

        updateTimer();


        if (timerSeconds <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Focus session complete!");

            timerSeconds = 25 * 60;

            updateTimer();
        }

    }, 1000);
}


function updateTimer() {

    const display =
        document.getElementById("timerDisplay");

    if (!display) return;


    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;


    display.innerText =
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 25 * 60;

    updateTimer();
}


// ========================================
// DARK MODE
// ========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "studySphereTheme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );
}


window.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            localStorage.getItem(
                "studySphereTheme"
            ) === "dark"
        ) {
            document.body.classList.add("dark");
        }

    }
);