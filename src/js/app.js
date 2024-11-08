// Start screen section
const startScreenSection = document.querySelector(".quiz__start-screen");
const buttonStart = document.querySelector(".quiz__button--start");

// Question screen section
const questionScreenSection = document.querySelector(".quiz__question-screen");
const quizAnswerContainer = document.querySelector(".quiz__answer-container");
const buttonQuizAnswer = document.querySelector(".quiz__answer");
const buttonQuizNext = document.querySelector(".quiz__button--next");

// Score screen section
const questionScoreSection = document.querySelector(".quiz__score-screen");
const buttonQuizReview = document.querySelector(".quiz__button--review");
const buttonQuizRestart1 = document.querySelector(".quiz__button--restart1");

// Review screen section
const quizReviewSection = document.querySelector(".quiz__review-screen");
const buttonQuizRestart2 = document.querySelector(".quiz__button--restart2");

// Start the quiz
buttonStart.addEventListener("click", () => {
    startScreenSection.classList.add("hidden");
    questionScreenSection.classList.remove("hidden");
});


// Collect answer buttons and set up active state toggle logic
const answerButtons = document.querySelectorAll(".quiz__answer");

answerButtons.forEach((answerButton) => {
    // console.log(answerButton);

    answerButton.addEventListener("click", () => {
        // console.log("clicked", answerButton);
        if (answerButton.classList.contains("active")) {
            answerButton.classList.remove("active");
        } else {
            answerButtons.forEach((activeButton) => {
                activeButton.classList.remove("active");
            });
            answerButton.classList.add("active");
        }

    });

});

// Go to the score screen
buttonQuizNext.addEventListener("click", () => {
    questionScreenSection.classList.add("hidden");
    questionScoreSection.classList.remove("hidden");
});

// Go to the review screen
buttonQuizReview.addEventListener("click", () => {
    questionScoreSection.classList.add("hidden");
    quizReviewSection.classList.remove("hidden");
});

// Restart the quiz from the score screen
buttonQuizRestart1.addEventListener("click", () => {
    questionScoreSection.classList.add("hidden");
    startScreenSection.classList.remove("hidden");
});

// Restart the quiz from the review screen
buttonQuizRestart2.addEventListener("click", () => {
    quizReviewSection.classList.add("hidden");
    startScreenSection.classList.remove("hidden");
});