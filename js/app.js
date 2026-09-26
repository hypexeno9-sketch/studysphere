/* ============================================================
   STUDYSPHERE - APP.JS
   Class 9 Student Study Platform
   Session: 2026-27

   CONNECTS:
   ------------------------------------------------------------
   1. subjectsData
   2. Chapter navigation
   3. Search
   4. Subject filters
   5. Notes
   6. Hard Questions
   7. Chapter Quiz
   8. One-Shot Videos
   9. PDF section
   10. Quick Challenge
   11. Focus Timer
   12. Dark Mode
   13. Mobile Menu
   14. Motivation
   15. Dashboard
   16. Quiz statistics
   17. LocalStorage
   18. Notifications
   19. Keyboard shortcuts
   20. Responsive interactions
   ============================================================ */


/* ============================================================
   GLOBAL APP STATE
   ============================================================ */

const StudySphereApp = {

    currentSubject: null,

    currentChapter: null,

    currentTab: "notes",

    currentFilter: "all",

    searchTerm: "",

    timer: {
        duration: 25 * 60,
        remaining: 25 * 60,
        interval: null,
        running: false,
        mode: "focus"
    },

    challenge: {
        currentQuestion: null,
        answered: false
    },

    mobileMenuOpen: false,

    initialized: false

};


/* ============================================================
   CONSTANTS
   ============================================================ */

const APP_STORAGE_KEYS = {

    theme: "studysphere_theme",

    timerMode: "studysphere_timer_mode",

    timerDuration: "studysphere_timer_duration",

    lastSubject: "studysphere_last_subject",

    lastChapter: "studysphere_last_chapter"

};


/* ============================================================
   BASIC DOM HELPERS
   ============================================================ */

function $(selector) {

    return document.querySelector(selector);

}


function $all(selector) {

    return Array.from(
        document.querySelectorAll(selector)
    );

}


function getElement(id) {

    return document.getElementById(id);

}


/* ============================================================
   HTML ESCAPE HELPERS
   ============================================================ */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   SAFE HTML
   ------------------------------------------------------------
   Notes are intentionally allowed to contain basic HTML because
   data.js uses headings, paragraphs and lists.
   ============================================================ */

function renderSafeContent(value) {

    if (value === null || value === undefined) {

        return "";

    }

    return String(value);

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    initializeStudySphere();

});


function initializeStudySphere() {

    if (StudySphereApp.initialized) {
        return;
    }

    StudySphereApp.initialized = true;

    console.log("StudySphere App Initializing...");

    loadTheme();

    setupSearch();

    setupKeyboardShortcuts();

    setupNavigationLinks();

    initializeTimer();

    initializeDashboard();

    renderSubjects("all");

    showRandomQuestion();

    newMotivation();

    updateQuizStatistics();

    updateDashboardChapterCount();

    restoreLastChapter();

    console.log("StudySphere App Loaded Successfully.");

}


/* ============================================================
   HOME NAVIGATION
   ============================================================ */

function goHome() {

    closeChapterSection();

    scrollToElement("home");

    updateActiveNavigation("home");

}


/* ============================================================
   SCROLL FUNCTIONS
   ============================================================ */

function scrollToElement(id) {

    const element = getElement(id);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToSubjects() {

    closeChapterSection();

    scrollToElement("subjects");

    updateActiveNavigation("subjects");

}


function scrollToTools() {

    scrollToElement("tools");

    updateActiveNavigation("tools");

}


/* ============================================================
   NAVIGATION LINKS
   ============================================================ */

function setupNavigationLinks() {

    const links = $all(
        '.navbar a[href^="#"], .mobile-menu a[href^="#"]'
    );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = href.substring(1);

            if (!getElement(target)) {
                return;
            }

            event.preventDefault();

            closeMobileMenu();

            scrollToElement(target);

            updateActiveNavigation(target);

        });

    });

}


function updateActiveNavigation(sectionId) {

    $all(".navbar a, .mobile-menu a")
        .forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + sectionId) {

                link.classList.add("active");

            }

        });

}


/* ============================================================
   SUBJECT RENDERING
   ============================================================ */

function renderSubjects(filter = "all", searchTerm = "") {

    const grid = getElement("subjectGrid");

    const noResults = getElement("noResults");

    if (!grid) {
        return;
    }

    StudySphereApp.currentFilter = filter;

    const term = String(searchTerm || "")
        .trim()
        .toLowerCase();

    let subjects = getAllSubjects();

    if (filter !== "all") {

        subjects = subjects.filter(
            subject => subject.id === filter
        );

    }

    let visibleSubjects = [];

    subjects.forEach(function (subject) {

        const matchingChapters = subject.chapters.filter(
            function (chapter) {

                if (!term) {
                    return true;
                }

                return (
                    chapter.title
                        .toLowerCase()
                        .includes(term) ||

                    subject.name
                        .toLowerCase()
                        .includes(term)
                );

            }
        );

        if (matchingChapters.length > 0) {

            visibleSubjects.push({
                subject: subject,
                chapters: matchingChapters
            });

        }

    });


    if (!visibleSubjects.length) {

        grid.innerHTML = "";

        if (noResults) {
            noResults.classList.remove("hidden");
        }

        return;

    }


    if (noResults) {
        noResults.classList.add("hidden");
    }


    grid.innerHTML = visibleSubjects
        .map(function (item) {

            return createSubjectCard(
                item.subject,
                item.chapters,
                term
            );

        })
        .join("");


    updateFilterButtons(filter);

}


/* ============================================================
   SUBJECT CARD
   ============================================================ */

function createSubjectCard(subject, chapters, searchTerm) {

    const chapterCount = chapters.length;

    const totalChapters = subject.chapters.length;

    const chapterNames = chapters
        .slice(0, 4)
        .map(function (chapter) {

            return `
                <span class="subject-chapter-tag">
                    ${escapeHTML(chapter.title)}
                </span>
            `;

        })
        .join("");


    return `
        <article
            class="subject-card"
            data-subject="${escapeHTML(subject.id)}"
            onclick="openSubject('${escapeHTML(subject.id)}')"
        >

            <div class="subject-card-top">

                <div class="subject-icon">
                    ${subject.icon || "📚"}
                </div>

                <span class="subject-arrow">
                    →
                </span>

            </div>

            <div class="subject-card-content">

                <h3>
                    ${escapeHTML(subject.name)}
                </h3>

                <p>
                    ${escapeHTML(subject.description || "")}
                </p>

                <div class="subject-meta">

                    <span>
                        📚 ${totalChapters} Chapters
                    </span>

                    ${
                        searchTerm
                            ? `<span>🔎 ${chapterCount} Match</span>`
                            : `<span>🎯 Class 9</span>`
                    }

                </div>

                <div class="subject-chapters">

                    ${chapterNames}

                </div>

                <button
                    class="subject-open-btn"
                    type="button"
                    onclick="event.stopPropagation(); openSubject('${escapeHTML(subject.id)}')"
                >
                    Explore Subject
                    <span>→</span>
                </button>

            </div>

        </article>
    `;

}


/* ============================================================
   SUBJECT FILTERS
   ============================================================ */

function filterSubjects(filter) {

    StudySphereApp.currentFilter = filter;

    const searchInput = getElement("searchInput");

    const searchTerm = searchInput
        ? searchInput.value
        : "";

    renderSubjects(
        filter,
        searchTerm
    );

    updateFilterButtons(filter);

}


function updateFilterButtons(activeFilter) {

    $all(".subject-filters button")
        .forEach(function (button) {

            button.classList.remove("active");

            const onclick = button.getAttribute("onclick");

            if (
                onclick &&
                onclick.includes("'" + activeFilter + "'")
            ) {

                button.classList.add("active");

            }

        });

}


/* ============================================================
   OPEN SUBJECT
   ============================================================ */

function openSubject(subjectId) {

    const subject = getSubject(subjectId);

    if (!subject) {

        showNotification(
            "Subject not found.",
            "error"
        );

        return;

    }


    StudySphereApp.currentSubject = subject;

    const chapterSection = getElement("chapterSection");

    const subjectSection = getElement("subjects");

    if (chapterSection) {
        chapterSection.classList.remove("hidden");
    }

    if (subjectSection) {
        subjectSection.classList.add("hidden");
    }


    renderChapterHeader(subject);

    renderChapterList(subject);

    scrollToElement("chapterSection");

    localStorage.setItem(
        APP_STORAGE_KEYS.lastSubject,
        subject.id
    );

}


/* ============================================================
   CHAPTER HEADER
   ============================================================ */

function renderChapterHeader(subject) {

    const header = getElement("chapterHeader");

    if (!header) {
        return;
    }

    header.innerHTML = `

        <div class="chapter-header-icon">
            ${subject.icon || "📚"}
        </div>

        <div class="chapter-header-text">

            <span class="section-label">
                ${escapeHTML(subject.name)}
            </span>

            <h2>
                ${escapeHTML(subject.name)}
            </h2>

            <p>
                ${escapeHTML(subject.description || "")}
            </p>

            <div class="chapter-header-stats">

                <span>
                    📚 ${subject.chapters.length} Chapters
                </span>

                <span>
                    🎓 Class 9
                </span>

                <span>
                    📖 Notes + Questions + Quiz
                </span>

            </div>

        </div>

    `;

}


/* ============================================================
   CHAPTER LIST
   ------------------------------------------------------------
   If the existing HTML/JS expects a chapter selector, this
   creates one inside chapterHeader area when necessary.
   ============================================================ */

function renderChapterList(subject) {

    const existingList = getElement("chapterList");

    if (existingList) {

        existingList.innerHTML = subject.chapters
            .map(function (chapter, index) {

                return createChapterButton(
                    subject,
                    chapter,
                    index
                );

            })
            .join("");

        return;

    }


    const chapterSection = getElement("chapterSection");

    if (!chapterSection) {
        return;
    }


    let list = chapterSection.querySelector(
        ".dynamic-chapter-list"
    );


    if (!list) {

        list = document.createElement("div");

        list.className =
            "dynamic-chapter-list chapter-list";

        const tabs = chapterSection.querySelector(
            ".chapter-tabs"
        );

        if (tabs) {
            tabs.before(list);
        } else {
            chapterSection.appendChild(list);
        }

    }


    list.innerHTML = subject.chapters
        .map(function (chapter, index) {

            return createChapterButton(
                subject,
                chapter,
                index
            );

        })
        .join("");

}


/* ============================================================
   CHAPTER BUTTON
   ============================================================ */

function createChapterButton(subject, chapter, index) {

    return `
        <button
            type="button"
            class="chapter-card"
            onclick="openChapter('${escapeHTML(subject.id)}', '${escapeHTML(chapter.id)}')"
        >

            <span class="chapter-number">
                ${index + 1}
            </span>

            <span class="chapter-card-icon">
                ${chapter.icon || "📖"}
            </span>

            <span class="chapter-card-info">

                <strong>
                    ${escapeHTML(chapter.title)}
                </strong>

                <small>
                    ${escapeHTML(chapter.description || "Study material available")}
                </small>

            </span>

            <span class="chapter-card-arrow">
                →
            </span>

        </button>
    `;

}


/* ============================================================
   OPEN CHAPTER
   ============================================================ */

function openChapter(subjectId, chapterId) {

    const subject = getSubject(subjectId);

    if (!subject) {

        showNotification(
            "Subject not found.",
            "error"
        );

        return;

    }


    const chapter = getChapter(
        subjectId,
        chapterId
    );


    if (!chapter) {

        showNotification(
            "Chapter not found.",
            "error"
        );

        return;

    }


    StudySphereApp.currentSubject = subject;

    StudySphereApp.currentChapter = chapter;

    StudySphereApp.currentTab = "notes";


    localStorage.setItem(
        APP_STORAGE_KEYS.lastSubject,
        subjectId
    );


    localStorage.setItem(
        APP_STORAGE_KEYS.lastChapter,
        chapterId
    );


    updateChapterHeader(subject, chapter);

    activateChapterTab("notes");

    renderTabContent("notes");


    const chapterSection =
        getElement("chapterSection");

    if (chapterSection) {
        chapterSection.classList.remove("hidden");
    }


    setTimeout(function () {

        scrollToElement("chapterSection");

    }, 50);


    showNotification(
        `${chapter.title} opened.`,
        "success"
    );

}


/* ============================================================
   UPDATE CHAPTER HEADER
   ============================================================ */

function updateChapterHeader(subject, chapter) {

    const header = getElement("chapterHeader");

    if (!header) {
        return;
    }


    header.innerHTML = `

        <div class="chapter-header-icon">
            ${chapter.icon || subject.icon || "📖"}
        </div>

        <div class="chapter-header-text">

            <span class="section-label">
                ${escapeHTML(subject.name)}
            </span>

            <h2>
                ${escapeHTML(chapter.title)}
            </h2>

            <p>
                ${escapeHTML(chapter.description || "")}
            </p>

            <div class="chapter-header-stats">

                <span>
                    📖 Chapter ${chapter.number || ""}
                </span>

                <span>
                    🎓 Class 9
                </span>

                <span>
                    🧠 Revision Ready
                </span>

            </div>

        </div>

    `;

}


/* ============================================================
   BACK TO SUBJECTS
   ============================================================ */

function backToSubjects() {

    StudySphereApp.currentChapter = null;

    const chapterSection =
        getElement("chapterSection");

    const subjectSection =
        getElement("subjects");


    if (chapterSection) {
        chapterSection.classList.add("hidden");
    }


    if (subjectSection) {
        subjectSection.classList.remove("hidden");
    }


    scrollToSubjects();

}


/* ============================================================
   CLOSE CHAPTER
   ============================================================ */

function closeChapterSection() {

    const chapterSection =
        getElement("chapterSection");

    const subjectSection =
        getElement("subjects");


    if (chapterSection) {
        chapterSection.classList.add("hidden");
    }


    if (subjectSection) {
        subjectSection.classList.remove("hidden");
    }


    StudySphereApp.currentChapter = null;

}


/* ============================================================
   CHAPTER TABS
   ============================================================ */

function switchTab(tabName) {

    if (!StudySphereApp.currentChapter) {

        showNotification(
            "First select a chapter.",
            "warning"
        );

        return;

    }


    const allowedTabs = [
        "notes",
        "questions",
        "quiz",
        "video",
        "pdf"
    ];


    if (!allowedTabs.includes(tabName)) {
        return;
    }


    StudySphereApp.currentTab = tabName;

    activateChapterTab(tabName);

    renderTabContent(tabName);

}


/* ============================================================
   ACTIVATE TAB
   ============================================================ */

function activateChapterTab(tabName) {

    $all(".chapter-tabs button, .chapter-tabs .tab-btn")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    $all(
        `[onclick*="switchTab('${tabName}')"]`
    )
        .forEach(function (button) {

            button.classList.add("active");

        });


    $all(
        `[onclick*='switchTab("${tabName}")']`
    )
        .forEach(function (button) {

            button.classList.add("active");

        });

}


/* ============================================================
   TAB CONTENT CONTROLLER
   ============================================================ */

function renderTabContent(tabName) {

    const content = getElement("tabContent");

    const chapter =
        StudySphereApp.currentChapter;


    if (!content || !chapter) {
        return;
    }


    switch (tabName) {

        case "notes":
            renderNotes(chapter, content);
            break;

        case "questions":
            renderQuestions(chapter, content);
            break;

        case "quiz":
            renderQuizTab(chapter, content);
            break;

        case "video":
            renderVideo(chapter, content);
            break;

        case "pdf":
            renderPDF(chapter, content);
            break;

        default:
            renderNotes(chapter, content);

    }

}


/* ============================================================
   NOTES
   ============================================================ */

function renderNotes(chapter, container) {

    let notes = chapter.notes;


    if (!notes) {

        container.innerHTML = createEmptyState(
            "📝",
            "Notes Coming Soon",
            "Notes for this chapter will be added soon."
        );

        return;

    }


    /* --------------------------------------------------------
       FORMAT 1:
       notes = HTML string
       -------------------------------------------------------- */

    if (typeof notes === "string") {

        container.innerHTML = `
            <div class="notes-content">
                ${renderSafeContent(notes)}
            </div>
        `;

        return;

    }


    /* --------------------------------------------------------
       FORMAT 2:
       notes = array of objects
       -------------------------------------------------------- */

    if (Array.isArray(notes)) {

        container.innerHTML = `

            <div class="notes-content">

                ${notes.map(function (note) {

                    if (typeof note === "string") {

                        return `
                            <div class="note-block">
                                ${renderSafeContent(note)}
                            </div>
                        `;

                    }


                    return `
                        <article class="note-block">

                            ${
                                note.title
                                    ? `
                                        <h3>
                                            ${escapeHTML(note.title)}
                                        </h3>
                                    `
                                    : ""
                            }

                            <div class="note-text">
                                ${
                                    renderSafeContent(
                                        note.content || ""
                                    )
                                }
                            </div>

                        </article>
                    `;

                }).join("")}

            </div>

        `;

        return;

    }


    container.innerHTML = createEmptyState(
        "📝",
        "No Notes Available",
        "Study notes are not available for this chapter yet."
    );

}


/* ============================================================
   QUESTIONS
   ============================================================ */

function renderQuestions(chapter, container) {

    const questions =
        Array.isArray(chapter.questions)
            ? chapter.questions
            : [];


    if (!questions.length) {

        container.innerHTML = createEmptyState(
            "🧠",
            "Questions Coming Soon",
            "Hard and competency-based questions will be added soon."
        );

        return;

    }


    container.innerHTML = `

        <div class="questions-container">

            <div class="questions-intro">

                <span class="section-label">
                    PRACTICE
                </span>

                <h3>
                    Hard & Competency Questions
                </h3>

                <p>
                    Try solving these questions without checking the answer first.
                </p>

            </div>


            <div class="questions-list">

                ${questions.map(function (question, index) {

                    let text = question;

                    if (
                        typeof question === "object" &&
                        question !== null
                    ) {

                        text =
                            question.question ||
                            question.text ||
                            question.q ||
                            "";

                    }


                    return `

                        <article class="hard-question-card">

                            <div class="question-number">
                                Q${index + 1}
                            </div>

                            <div class="question-body">

                                <p>
                                    ${escapeHTML(text)}
                                </p>

                                <button
                                    type="button"
                                    class="question-think-btn"
                                    onclick="markQuestionThought(this)"
                                >
                                    💡 I have tried this
                                </button>

                            </div>

                        </article>

                    `;

                }).join("")}

            </div>

        </div>

    `;

}


/* ============================================================
   MARK QUESTION
   ============================================================ */

function markQuestionThought(button) {

    if (!button) {
        return;
    }


    button.classList.toggle("completed");


    if (button.classList.contains("completed")) {

        button.innerHTML =
            "✅ Attempted";

        showNotification(
            "Nice! Keep solving.",
            "success"
        );

    } else {

        button.innerHTML =
            "💡 I have tried this";

    }

}


/* ============================================================
   QUIZ TAB
   ============================================================ */

function renderQuizTab(chapter, container) {

    const quiz =
        Array.isArray(chapter.quiz)
            ? chapter.quiz
            : [];


    if (!quiz.length) {

        container.innerHTML = createEmptyState(
            "🎯",
            "Quiz Coming Soon",
            "The interactive quiz for this chapter is not available yet."
        );

        return;

    }


    const bestScore =
        typeof getChapterBestScore === "function"
            ? getChapterBestScore(
                StudySphereApp.currentSubject.id,
                chapter.id
            )
            : null;


    container.innerHTML = `

        <div class="quiz-launch-card">

            <div class="quiz-launch-icon">
                🎯
            </div>

            <div class="quiz-launch-content">

                <span class="section-label">
                    INTERACTIVE QUIZ
                </span>

                <h3>
                    ${escapeHTML(chapter.title)} Quiz
                </h3>

                <p>
                    Test your understanding with
                    MCQ-based interactive questions.
                </p>

                <div class="quiz-launch-stats">

                    <span>
                        📝 ${quiz.length} Questions
                    </span>

                    <span>
                        ⏱️ Self Paced
                    </span>

                    ${
                        bestScore !== null
                            ? `
                                <span>
                                    🏆 Best: ${bestScore}%
                                </span>
                              `
                            : ""
                    }

                </div>

                <button
                    type="button"
                    class="primary-btn quiz-start-btn"
                    onclick="launchChapterQuiz()"
                >
                    🚀 Start Chapter Quiz
                </button>

            </div>

        </div>

    `;

}


/* ============================================================
   LAUNCH QUIZ
   ============================================================ */

function launchChapterQuiz() {

    const subject =
        StudySphereApp.currentSubject;

    const chapter =
        StudySphereApp.currentChapter;


    if (!subject || !chapter) {

        showNotification(
            "Please select a chapter first.",
            "warning"
        );

        return;

    }


    if (
        typeof startChapterQuiz !== "function"
    ) {

        showNotification(
            "Quiz engine is not loaded. Check quiz.js.",
            "error"
        );

        console.error(
            "startChapterQuiz() not found."
        );

        return;

    }


    startChapterQuiz(
        subject.id,
        chapter.id
    );

}


/* ============================================================
   VIDEO
   ============================================================ */

function renderVideo(chapter, container) {

    const videoURL =
        chapter.video || "";


    if (!videoURL) {

        container.innerHTML = createEmptyState(
            "🎥",
            "One-Shot Coming Soon",
            "A revision video for this chapter will be added soon."
        );

        return;

    }


    container.innerHTML = `

        <div class="video-card">

            <div class="video-icon">
                ▶️
            </div>

            <div class="video-content">

                <span class="section-label">
                    ONE-SHOT REVISION
                </span>

                <h3>
                    ${escapeHTML(chapter.title)}
                </h3>

                <p>
                    Watch a quick revision video and revise
                    the important concepts of this chapter.
                </p>

                <a
                    href="${escapeHTML(videoURL)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="primary-btn"
                >
                    ▶ Watch One-Shot
                </a>

            </div>

        </div>

    `;

}


/* ============================================================
   PDF
   ============================================================ */

function renderPDF(chapter, container) {

    const pdfURL =
        chapter.pdf || "";


    if (!pdfURL) {

        container.innerHTML = `

            <div class="pdf-card">

                <div class="pdf-icon">
                    📄
                </div>

                <div>

                    <span class="section-label">
                        PDF NOTES
                    </span>

                    <h3>
                        PDF Coming Soon
                    </h3>

                    <p>
                        PDF study material for
                        this chapter will be added here.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="pdf-card">

            <div class="pdf-icon">
                📄
            </div>

            <div class="pdf-content">

                <span class="section-label">
                    PDF NOTES
                </span>

                <h3>
                    ${escapeHTML(chapter.title)}
                </h3>

                <p>
                    Open or download the chapter PDF.
                </p>

                <div class="pdf-actions">

                    <a
                        href="${escapeHTML(pdfURL)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="primary-btn"
                    >
                        📖 Open PDF
                    </a>

                    <a
                        href="${escapeHTML(pdfURL)}"
                        download
                        class="secondary-btn"
                    >
                        ⬇ Download
                    </a>

                </div>

            </div>

        </div>

    `;

}


/* ============================================================
   EMPTY STATE
   ============================================================ */

function createEmptyState(
    icon,
    title,
    message
) {

    return `

        <div class="empty-state">

            <div class="empty-state-icon">
                ${icon}
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


/* ============================================================
   SEARCH
   ============================================================ */

function setupSearch() {

    const input =
        getElement("searchInput");


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            StudySphereApp.searchTerm =
                input.value.trim();


            renderSubjects(
                StudySphereApp.currentFilter,
                StudySphereApp.searchTerm
            );

        }
    );


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                input.value = "";

                StudySphereApp.searchTerm = "";

                renderSubjects(
                    StudySphereApp.currentFilter,
                    ""
                );

                input.blur();

            }

        }
    );

}


/* ============================================================
   CLEAR SEARCH
   ============================================================ */

function clearSearch() {

    const input =
        getElement("searchInput");


    if (input) {
        input.value = "";
    }


    StudySphereApp.searchTerm = "";


    renderSubjects(
        StudySphereApp.currentFilter,
        ""
    );

}


/* ============================================================
   THEME
   ============================================================ */

function toggleTheme() {

    const body =
        document.body;


    const dark =
        body.classList.toggle("dark-mode");


    localStorage.setItem(
        APP_STORAGE_KEYS.theme,
        dark ? "dark" : "light"
    );


    updateThemeButton(dark);

}


function loadTheme() {

    const saved =
        localStorage.getItem(
            APP_STORAGE_KEYS.theme
        );


    if (saved === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        updateThemeButton(true);

    } else {

        updateThemeButton(false);

    }

}


function updateThemeButton(isDark) {

    const button =
        getElement("themeBtn");


    if (!button) {
        return;
    }


    button.innerHTML =
        isDark ? "☀️" : "🌙";


    button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}


/* ============================================================
   MOBILE MENU
   ============================================================ */

function toggleMobileMenu() {

    const menu =
        getElement("mobileMenu");


    if (!menu) {
        return;
    }


    StudySphereApp.mobileMenuOpen =
        !StudySphereApp.mobileMenuOpen;


    if (
        StudySphereApp.mobileMenuOpen
    ) {

        menu.classList.add("show");

        menu.classList.remove("hidden");

    } else {

        menu.classList.remove("show");

    }

}


function closeMobileMenu() {

    const menu =
        getElement("mobileMenu");


    if (!menu) {
        return;
    }


    StudySphereApp.mobileMenuOpen = false;

    menu.classList.remove("show");

}


/* ============================================================
   FOCUS TIMER
   ============================================================ */

function initializeTimer() {

    const savedDuration =
        Number(
            localStorage.getItem(
                APP_STORAGE_KEYS.timerDuration
            )
        );


    if (
        savedDuration &&
        savedDuration > 0
    ) {

        StudySphereApp.timer.duration =
            savedDuration;

        StudySphereApp.timer.remaining =
            savedDuration;

    }


    updateTimerDisplay();

}


function setTimer(minutes) {

    const value =
        Number(minutes);


    if (!value || value <= 0) {
        return;
    }


    pauseTimer();


    const seconds =
        value * 60;


    StudySphereApp.timer.duration =
        seconds;

    StudySphereApp.timer.remaining =
        seconds;


    localStorage.setItem(
        APP_STORAGE_KEYS.timerDuration,
        String(seconds)
    );


    updateTimerDisplay();

}


function startTimer() {

    if (StudySphereApp.timer.running) {
        return;
    }


    StudySphereApp.timer.running = true;


    StudySphereApp.timer.interval =
        setInterval(function () {

            if (
                StudySphereApp.timer.remaining <= 0
            ) {

                timerFinished();

                return;

            }


            StudySphereApp.timer.remaining--;

            updateTimerDisplay();

        }, 1000);


    updateTimerButtons();

    showNotification(
        "Focus timer started. Stay focused!",
        "success"
    );

}


function pauseTimer() {

    if (
        StudySphereApp.timer.interval
    ) {

        clearInterval(
            StudySphereApp.timer.interval
        );

    }


    StudySphereApp.timer.interval =
        null;

    StudySphereApp.timer.running =
        false;


    updateTimerButtons();

}


function resetTimer() {

    pauseTimer();


    StudySphereApp.timer.remaining =
        StudySphereApp.timer.duration;


    updateTimerDisplay();


    showNotification(
        "Timer reset.",
        "success"
    );

}


function timerFinished() {

    pauseTimer();


    StudySphereApp.timer.remaining =
        0;


    updateTimerDisplay();


    showNotification(
        "Focus session completed! 🎉",
        "success"
    );


    newMotivation();

}


function updateTimerDisplay() {

    const display =
        getElement("timerDisplay");


    if (!display) {
        return;
    }


    const totalSeconds =
        Math.max(
            0,
            StudySphereApp.timer.remaining
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    display.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    const timerCard =
        display.closest(".timer-card");


    if (timerCard) {

        timerCard.classList.toggle(
            "timer-running",
            StudySphereApp.timer.running
        );

    }

}


function updateTimerButtons() {

    $all(
        '[onclick="startTimer()"]'
    )
        .forEach(function (button) {

            button.disabled =
                StudySphereApp.timer.running;

        });


    $all(
        '[onclick="pauseTimer()"]'
    )
        .forEach(function (button) {

            button.disabled =
                !StudySphereApp.timer.running;

        });

}


/* ============================================================
   QUICK CHALLENGE
   ============================================================ */

function showRandomQuestion() {

    const question =
        typeof getRandomQuestion === "function"
            ? getRandomQuestion()
            : null;


    const box =
        getElement("challengeBox");


    const questionElement =
        getElement("challengeQuestion");


    if (!questionElement) {
        return;
    }


    if (!question) {

        questionElement.innerHTML =
            "No challenge available.";

        return;

    }


    StudySphereApp.challenge.currentQuestion =
        question;

    StudySphereApp.challenge.answered =
        false;


    const subject =
        escapeHTML(
            question.subject || "Challenge"
        );


    questionElement.innerHTML = `

        <div class="challenge-subject">
            ${subject}
        </div>

        <div class="challenge-text">
            ${escapeHTML(question.question)}
        </div>

    `;


    if (box) {

        let optionsContainer =
            box.querySelector(
                ".challenge-options"
            );


        if (!optionsContainer) {

            optionsContainer =
                document.createElement("div");

            optionsContainer.className =
                "challenge-options";

            questionElement.after(
                optionsContainer
            );

        }


        if (Array.isArray(question.options)) {

            optionsContainer.innerHTML =
                question.options
                    .map(function (option, index) {

                        return `
                            <button
                                type="button"
                                class="challenge-option"
                                onclick="answerChallenge(${index})"
                            >
                                <span>
                                    ${String.fromCharCode(65 + index)}
                                </span>

                                ${escapeHTML(option)}
                            </button>
                        `;

                    })
                    .join("");

        } else {

            optionsContainer.innerHTML = "";

        }

    }


    updateChallengeAnswerButton();

}


/* ============================================================
   ANSWER QUICK CHALLENGE
   ============================================================ */

function answerChallenge(index) {

    const challenge =
        StudySphereApp.challenge;


    const question =
        challenge.currentQuestion;


    if (
        !question ||
        challenge.answered
    ) {
        return;
    }


    if (
        !Array.isArray(question.options)
    ) {
        return;
    }


    const buttons =
        $all(".challenge-option");


    const selected =
        question.options[index];


    const correct =
        normalizeAnswer(
            selected
        ) ===
        normalizeAnswer(
            question.answer
        );


    buttons.forEach(
        function (button, buttonIndex) {

            button.disabled = true;


            const option =
                question.options[buttonIndex];


            if (
                normalizeAnswer(option) ===
                normalizeAnswer(question.answer)
            ) {

                button.classList.add("correct");

            }


            if (
                buttonIndex === index &&
                !correct
            ) {

                button.classList.add("wrong");

            }

        }
    );


    challenge.answered = true;


    showNotification(
        correct
            ? "Correct! 🎉"
            : `Answer: ${question.answer}`,
        correct ? "success" : "error"
    );


    updateChallengeAnswerButton();

}


function normalizeAnswer(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}


/* ============================================================
   CHALLENGE ANSWER BUTTON SUPPORT
   ============================================================ */

function updateChallengeAnswerButton() {

    const box =
        getElement("challengeBox");


    if (!box) {
        return;
    }


    const old =
        box.querySelector(
            ".challenge-next-btn"
        );


    if (old) {
        old.remove();
    }


    if (
        StudySphereApp.challenge.answered
    ) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "challenge-next-btn secondary-btn";

        button.textContent =
            "🔄 New Challenge";

        button.onclick =
            showRandomQuestion;


        box.appendChild(button);

    }

}


/* ============================================================
   MOTIVATION
   ============================================================ */

function newMotivation() {

    const element =
        getElement("dailyQuote");


    if (!element) {
        return;
    }


    const quote =
        typeof getRandomMotivation === "function"
            ? getRandomMotivation()
            : "Keep learning and keep improving.";


    element.textContent =
        `"${quote}"`;

}


/* ============================================================
   DASHBOARD
   ============================================================ */

function initializeDashboard() {

    updateDashboardSubjectCount();

    updateDashboardChapterCount();

    updateDashboardProgress();

}


function updateDashboardSubjectCount() {

    const element =
        getElement("subjectCount");


    if (!element) {
        return;
    }


    const count =
        getAllSubjects().length;


    element.textContent =
        count;

}


function updateDashboardChapterCount() {

    const element =
        getElement("chapterCount");


    if (!element) {
        return;
    }


    const count =
        typeof getTotalChapterCount === "function"
            ? getTotalChapterCount()
            : 0;


    element.textContent =
        count;

}


/* ============================================================
   QUIZ STATISTICS
   ============================================================ */

function updateQuizStatistics() {

    let stats = null;


    if (
        typeof getQuizStatistics === "function"
    ) {

        stats =
            getQuizStatistics();

    }


    if (!stats) {

        stats = {
            attempts: 0,
            averageScore: 0,
            bestScore: 0,
            progress: 0
        };

    }


    setText(
        "quizAttempts",
        stats.attempts ?? 0
    );


    setText(
        "averageScore",
        `${Math.round(stats.averageScore || 0)}%`
    );


    setText(
        "bestScore",
        `${Math.round(stats.bestScore || 0)}%`
    );


    setText(
        "progressText",
        `${Math.round(stats.progress || 0)}%`
    );


    setText(
        "quizScore",
        stats.bestScore
            ? `${Math.round(stats.bestScore)}%`
            : "0%"
    );


    setText(
        "progressPercent",
        `${Math.round(stats.progress || 0)}%`
    );


    const progress =
        getElement("overallProgress");


    if (progress) {

        progress.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    Number(stats.progress || 0)
                )
            )}%`;

    }

}


function updateDashboardProgress() {

    updateQuizStatistics();

}


/* ============================================================
   SET TEXT HELPER
   ============================================================ */

function setText(id, value) {

    const element =
        getElement(id);


    if (!element) {
        return;
    }


    element.textContent =
        value;

}


/* ============================================================
   RESTORE LAST CHAPTER
   ============================================================ */

function restoreLastChapter() {

    const subjectId =
        localStorage.getItem(
            APP_STORAGE_KEYS.lastSubject
        );


    const chapterId =
        localStorage.getItem(
            APP_STORAGE_KEYS.lastChapter
        );


    if (!subjectId || !chapterId) {
        return;
    }


    const subject =
        getSubject(subjectId);


    if (!subject) {
        return;
    }


    const chapter =
        getChapter(
            subjectId,
            chapterId
        );


    if (!chapter) {
        return;
    }


    console.log(
        "Last studied:",
        subject.name,
        chapter.title
    );

}


/* ============================================================
   NOTIFICATION
   ============================================================ */

function showNotification(
    message,
    type = "success"
) {

    const notification =
        getElement("notification");


    const text =
        getElement("notificationText");


    const icon =
        getElement("notificationIcon");


    if (!notification) {

        console.log(
            `[${type}] ${message}`
        );

        return;

    }


    if (text) {
        text.textContent = message;
    }


    if (icon) {

        const icons = {

            success: "✅",

            error: "❌",

            warning: "⚠️",

            info: "ℹ️"

        };


        icon.textContent =
            icons[type] || icons.info;

    }


    notification.classList.remove(
        "hidden"
    );


    notification.classList.remove(
        "show",
        "success",
        "error",
        "warning",
        "info"
    );


    notification.classList.add(
        type
    );


    requestAnimationFrame(
        function () {

            notification.classList.add(
                "show"
            );

        }
    );


    clearTimeout(
        StudySphereApp.notificationTimer
    );


    StudySphereApp.notificationTimer =
        setTimeout(function () {

            notification.classList.remove(
                "show"
            );

            setTimeout(function () {

                notification.classList.add(
                    "hidden"
                );

            }, 250);

        }, 3000);

}


/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        function (event) {

            /* ESC */
            if (event.key === "Escape") {

                closeMobileMenu();

                if (
                    typeof closeQuizModal === "function"
                ) {

                    const modal =
                        getElement("quizModal");

                    if (
                        modal &&
                        !modal.classList.contains("hidden")
                    ) {

                        closeQuizModal();

                    }

                }

            }


            /* "/" focuses search */
            if (
                event.key === "/" &&
                !isTypingElement(event.target)
            ) {

                event.preventDefault();

                const search =
                    getElement("searchInput");

                if (search) {
                    search.focus();
                }

            }

        }
    );

}


function isTypingElement(element) {

    if (!element) {
        return false;
    }


    const tag =
        element.tagName.toLowerCase();


    return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        element.isContentEditable
    );

}


/* ============================================================
   ACTIVE SECTION ON SCROLL
   ============================================================ */

window.addEventListener(
    "scroll",
    function () {

        const sections = [
            "home",
            "subjects",
            "tools",
            "about"
        ];


        let current =
            "home";


        sections.forEach(function (id) {

            const section =
                getElement(id);


            if (!section) {
                return;
            }


            const rect =
                section.getBoundingClientRect();


            if (
                rect.top <= 180 &&
                rect.bottom >= 180
            ) {

                current = id;

            }

        });


        updateActiveNavigation(current);

    }
);


/* ============================================================
   WINDOW RESIZE
   ============================================================ */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 768
        ) {

            closeMobileMenu();

        }

    }
);


/* ============================================================
   QUIZ EVENT SYNC
   ------------------------------------------------------------
   quiz.js can dispatch this event after finishing a quiz.
   ============================================================ */

window.addEventListener(
    "studysphereQuizFinished",
    function () {

        updateQuizStatistics();

    }
);


/* ============================================================
   PUBLIC GLOBAL FUNCTIONS
   ============================================================ */

window.goHome =
    goHome;

window.scrollToSubjects =
    scrollToSubjects;

window.scrollToTools =
    scrollToTools;

window.filterSubjects =
    filterSubjects;

window.openSubject =
    openSubject;

window.openChapter =
    openChapter;

window.backToSubjects =
    backToSubjects;

window.switchTab =
    switchTab;

window.launchChapterQuiz =
    launchChapterQuiz;

window.clearSearch =
    clearSearch;

window.toggleTheme =
    toggleTheme;

window.toggleMobileMenu =
    toggleMobileMenu;

window.closeMobileMenu =
    closeMobileMenu;

window.setTimer =
    setTimer;

window.startTimer =
    startTimer;

window.pauseTimer =
    pauseTimer;

window.resetTimer =
    resetTimer;

window.showRandomQuestion =
    showRandomQuestion;

window.answerChallenge =
    answerChallenge;

window.newMotivation =
    newMotivation;

window.markQuestionThought =
    markQuestionThought;

window.showNotification =
    showNotification;


/* ============================================================
   DEBUG INFORMATION
   ============================================================ */

console.log(
    "%c StudySphere App Loaded ",
    "font-weight:bold;font-size:14px;"
);

console.log(
    "Subjects:",
    typeof getAllSubjects === "function"
        ? getAllSubjects().length
        : "Data unavailable"
);

console.log(
    "Total Chapters:",
    typeof getTotalChapterCount === "function"
        ? getTotalChapterCount()
        : "Data unavailable"
);


/* ============================================================
   END OF APP.JS
   ============================================================ */