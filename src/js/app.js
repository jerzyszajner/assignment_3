const questions = [
  {
    question:
      "Which method allows you to execute a function after a specified time delay?",
    answers: [
      { text: "setTimeout()", correct: true },
      { text: "setInterval()", correct: false },
      { text: "clearTimeout()", correct: false },
      { text: "delayFunction()", correct: false },
    ],
  },
  {
    question: "What does the 'filter()' method do in arrays?",
    answers: [
      {
        text: "Creates a new array with all elements that pass the test implemented by a function",
        correct: true,
      },
      { text: "Sorts an array in ascending order", correct: false },
      {
        text: "Mutates the original array by removing elements",
        correct: false,
      },
      { text: "Joins two arrays into one", correct: false },
    ],
  },
  {
    question:
      "What is the purpose of the 'use strict' directive in JavaScript?",
    answers: [
      { text: "Enforces stricter parsing and error handling", correct: true },
      { text: "Adds debugging capabilities", correct: false },
      { text: "Automatically optimizes the code", correct: false },
      { text: "Enables new JavaScript features", correct: false },
    ],
  },
  {
    question: "Which method adds one or more elements to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "unshift()", correct: false },
      { text: "splice()", correct: false },
    ],
  },
  {
    question: "What will 'console.log(undefined == null)' output?",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "TypeError", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "What is the default scope of a variable declared with 'var'?",
    answers: [
      { text: "Function scope", correct: true },
      { text: "Block scope", correct: false },
      { text: "Global scope only", correct: false },
      { text: "No scope", correct: false },
    ],
  },
  {
    question:
      "Which property of the 'event' object identifies the element that triggered the event?",
    answers: [
      { text: "event.target", correct: true },
      { text: "event.currentTarget", correct: false },
      { text: "event.listener", correct: false },
      { text: "event.sourceElement", correct: false },
    ],
  },
  {
    question:
      "How do you access the second element in an array using destructuring?",
    answers: [
      { text: "const [, second] = array;", correct: true },
      { text: "const [second] = array;", correct: false },
      { text: "const second = array[1];", correct: false },
      { text: "const {1: second} = array;", correct: false },
    ],
  },
  {
    question: "Which function converts a JSON string into a JavaScript object?",
    answers: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "Object.parse()", correct: false },
      { text: "JSON.convert()", correct: false },
    ],
  },
  {
    question: "What will 'console.log(!!0)' output?",
    answers: [
      { text: "false", correct: true },
      { text: "true", correct: false },
      { text: "0", correct: false },
      { text: "undefined", correct: false },
    ],
  },
];

const startScreenSection = document.querySelector(".quiz__start-screen");
const buttonStart = document.querySelector(".quiz__button--start");

const questionScreenSection = document.querySelector(".quiz__question-screen");
const quizCurrentQuestion = document.querySelector(".quiz__current-question");
const answerButtonsContainer = document.querySelector("#answer-buttons");
const buttonQuizNext = document.querySelector(".quiz__button--next");
const questionElement = document.querySelector("#question");

const questionScoreSection = document.querySelector(".quiz__score-screen");
const buttonQuizReview = document.querySelector(".quiz__button--review");
const buttonQuizRestart1 = document.querySelector(".quiz__button--restart1");
const finalScoreElement = document.querySelector(".quiz__final-content");

const quizReviewSection = document.querySelector(".quiz__review-screen");
const buttonQuizRestart2 = document.querySelector(".quiz__button--restart2");
const reviewList = document.querySelector(".quiz__review-list");

let currentQuestionIndex = 0;
let incorrectAnswersCount = 0;

// Start the quiz
const startQuiz = () => {
  buttonStart.addEventListener("click", () => {
    startScreenSection.classList.add("hidden");
    questionScreenSection.classList.remove("hidden");
    setQuestion();
  });
};

// Display the current question and answers
const setQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answerButtonsContainer.innerHTML = ""; // Clear previous answers

  quizCurrentQuestion.textContent = currentQuestionIndex + 1; // Update question counter

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("quiz__answer");
    answerButtonsContainer.appendChild(button);

    button.addEventListener("click", () => {
      handleAnswerClick(button, currentQuestion.answers);
    });
  });
};

// Handle selecting an answer
const handleAnswerClick = (clickedButton, answers) => {
  // Remove "active" class from all buttons
  answerButtonsContainer.querySelectorAll(".quiz__answer").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add "active" class to the clicked button
  clickedButton.classList.add("active");

  // Save the selected answer
  answers.forEach((answer) => {
    answer.selected = answer.text === clickedButton.textContent;
  });
};

// Move to the next question or display the score
const handleNextQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion.answers.find((answer) => {
    return answer.selected;
  });

  if (!selectedAnswer) {
    // Show styled alert if no answer is selected
    const alertBox = document.querySelector(".quiz__alert");
    alertBox.textContent = "Please select an answer.";
    alertBox.classList.add("visible");

    setTimeout(() => {
      alertBox.classList.remove("visible");
    }, 2000);

    return;
  }

  // Check if the selected answer is correct
  if (!selectedAnswer.correct) {
    incorrectAnswersCount++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setQuestion();
  } else {
    questionScreenSection.classList.add("hidden");
    questionScoreSection.classList.remove("hidden");
    finalScoreElement.textContent = questions.length - incorrectAnswersCount; // Display the final score
  }
};

const generateReview = () => {
  const reviewList = document.querySelector(".quiz__review-list");
  reviewList.innerHTML = ""; // Clear previous answers

  questions.forEach((question) => {
    // Find the correct answer for the current question
    const correctAnswer = question.answers.find((answer) => {
      return answer.correct;
    }).text;

    // Find the user's selected answer or default to "No Answer"
    const userAnswer =
      question.answers.find((answer) => {
        return answer.selected;
      })?.text || "No Answer";

    // Add review items only if the user's answer is incorrect
    if (userAnswer !== correctAnswer) {
      // Add question to the review section
      const reviewQuestionItem = document.createElement("li");
      reviewQuestionItem.classList.add(
        "quiz__review-item",
        "quiz__review-question"
      );
      reviewQuestionItem.innerHTML = `
        <span class="quiz__review-label">Question:</span>
        <span class="quiz__review-content">${question.question}</span>
      `;
      reviewList.appendChild(reviewQuestionItem);

      // Add user's incorrect answer to the review section
      const userAnswerItem = document.createElement("li");
      userAnswerItem.classList.add("quiz__review-item", "quiz__user-answer");
      userAnswerItem.innerHTML = `
        <span class="quiz__review-label">Your answer was:</span>
        <span class="quiz__review-content quiz__review-content--incorrect">${userAnswer}</span>
      `;
      reviewList.appendChild(userAnswerItem);

      // Add the correct answer to the review section
      const correctAnswerItem = document.createElement("li");
      correctAnswerItem.classList.add(
        "quiz__review-item",
        "quiz__correct-answer"
      );
      correctAnswerItem.innerHTML = `
        <span class="quiz__review-label">Correct answer:</span>
        <span class="quiz__review-content quiz__review-content--correct">${correctAnswer}</span>
      `;
      reviewList.appendChild(correctAnswerItem);
    }
  });
};

// Reset the quiz
const resetQuiz = () => {
  currentQuestionIndex = 0;
  incorrectAnswersCount = 0;

  // Clear selected answers
  questions.forEach((question) => {
    question.answers.forEach((answer) => {
      delete answer.selected;
    });
  });

  questionScoreSection.classList.add("hidden");
  quizReviewSection.classList.add("hidden");
  startScreenSection.classList.remove("hidden");
};

buttonQuizNext.addEventListener("click", handleNextQuestion);
buttonQuizReview.addEventListener("click", () => {
  questionScoreSection.classList.add("hidden");
  quizReviewSection.classList.remove("hidden");
  generateReview();
});

buttonQuizRestart1.addEventListener("click", resetQuiz);
buttonQuizRestart2.addEventListener("click", resetQuiz);

startQuiz();
