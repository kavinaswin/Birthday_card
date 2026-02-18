let currentQuestion = 0;
let score = 0;
const questions = document.querySelectorAll(".question");

/* ⭐ Progress only for 4 quiz questions */
const quizTotal = 4;

/* ⭐ control flow after modal closes */
let afterModalAction = null;

/* ❌ WRONG MESSAGES */
const wrongMessages = [
    "Kill you after this Test 😈",      // Q1
    "Wrong… I am watching you 👀",      // Q2
    "",                                 // Q3 handled separately
    "Memory loss detected 😏"           // Q4
];

/* ✅ CORRECT MESSAGES */
const correctQ1 = ["Correct! So you DO remember our love story ❤️"];
const correctQ2 = ["Correct! That gift still has magic 💖"];
const correctQ4 = ["Yes! That photo still melts my heart ❤️"];

/* 💞 Q3 LOVE MESSAGE */
const futureMessage =
"Trip confirmed… refund not allowed, love guaranteed 💕";

/* ========================= */

function nextQuestion(index) {
    const selected = questions[index].querySelector("input:checked");
    if (!selected) return alert("Please select an answer ❤️");

    score += parseInt(selected.value);

    /* ⭐ QUESTION 3 ALWAYS LOVE MESSAGE */
    if (index === 2) {
        showModal(futureMessage, goNext);
    }

    /* ⭐ CORRECT */
    else if (selected.dataset.correct) {
        if (index === 0) showModal(randomFrom(correctQ1), goNext);
        if (index === 1) showModal(randomFrom(correctQ2), goNext);
        if (index === 3) showModal(randomFrom(correctQ4), goNext);
    }

    /* ⭐ WRONG */
    else {
        showModal(wrongMessages[index], goNext);
    }

    updateProgress(index + 1);
}

/* 🎂 FINAL STEP (Birthday Card) */
function showBirthday() {
    const selected = questions[currentQuestion].querySelector("input:checked");
    if (!selected) return alert("Please select an answer ❤️");

    score += parseInt(selected.value);

    /* ⭐ show modal FIRST for Q4 */
    if (selected.dataset.correct) {
        showModal(randomFrom(correctQ4), revealBirthday);
    } else {
        showModal(wrongMessages[3], revealBirthday);
    }
}

/* ⭐ actually show birthday AFTER modal */
function revealBirthday() {
    document.querySelector(".progress-section").style.display = "none";
    document.getElementById("quizForm").style.display = "none";
    document.getElementById("birthdayCard").style.display = "block";

    document.getElementById("result").innerHTML =
        "Your Love Score: " + score + " 💘";
}

/* ========================= */

function showModal(message, callback = null) {
    document.getElementById("wrongText").innerText = message;
    document.getElementById("wrongModal").style.display = "block";
    afterModalAction = callback;
}

function closeWrong() {
    document.getElementById("wrongModal").style.display = "none";
    if (afterModalAction) {
        afterModalAction();
        afterModalAction = null;
    }
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function goNext() {
    questions[currentQuestion].classList.remove("active");
    currentQuestion++;
    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add("active");
    }
}

/* ⭐ PROGRESS 1 → 4 ONLY */
function updateProgress(done) {
    const percent = (done / quizTotal) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        done + " / " + quizTotal + " Completed";
}
