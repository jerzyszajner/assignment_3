//========================================
//=== QUIZ QUESTIONS DATA
//========================================
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
//========================================
//=== SELECTING DOM ELEMENTS
//========================================
const startScreen = document.querySelector(".quiz__start-screen");
const startButton = document.querySelector(".quiz__button--start");
const questionScreen = document.querySelector(".quiz__question-screen");
const questionCounter = document.querySelector(".quiz__current-question");
const answerContainer = document.querySelector("#answer-buttons");
const nextButton = document.querySelector(".quiz__button--next");
const questionText = document.querySelector("#question");
const scoreScreen = document.querySelector(".quiz__score-screen");
const reviewButton = document.querySelector(".quiz__button--review");
const restartButton1 = document.querySelector(".quiz__button--restart1");
const finalScore = document.querySelector(".quiz__final-content");
const reviewScreen = document.querySelector(".quiz__review-screen");
const restartButton2 = document.querySelector(".quiz__button--restart2");
const reviewList = document.querySelector(".quiz__review-list");
const alertBox = document.querySelector(".quiz__alert");

//========================================
//=== INITIALIZATION VARIABLES
//========================================
let currentQuestionIndex = 0;
let incorrectAnswersCount = 0;

//========================================
//=== QUIZ LOGIC FUNCTIONS
//========================================
// Alert
const showAlert = (message) => {
  alertBox.textContent = message;
  alertBox.classList.add("visible");
  setTimeout(() => alertBox.classList.remove("visible"), 2000);
};

// Start the quiz
const startQuiz = () => {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  displayQuestion();
};

// Show the review screen with user's incorrect answers
const showReview = () => {
  scoreScreen.classList.add("hidden");
  reviewScreen.classList.remove("hidden");
  generateReview();
};

// Display the current question and answers dynamically
const displayQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Update question counter
  questionCounter.textContent = currentQuestionIndex + 1;

  // Clear previous answers and generate new buttons
  answerContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("quiz__answer");
    answerContainer.appendChild(button);
    button.textContent = answer.text;
    button.addEventListener("click", () => {
      updateAnswerSelection(button, currentQuestion.answers);
    });
  });
};

// Handle the logic for selecting an answer
const updateAnswerSelection = (clickedButton, answers) => {
  // Remove "active" class from all buttons
  answerContainer.querySelectorAll(".quiz__answer").forEach((button) => {
    button.classList.remove("active");
  });

  // Add "active" class to the clicked button
  clickedButton.classList.add("active");

  // Save the selected answer
  answers.forEach((answer) => {
    answer.selected = answer.text === clickedButton.textContent;
  });
};

// Handle the transition to the next question or end the quiz
const handleNextQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion.answers.find((answer) => answer.selected);

  if (!selectedAnswer) {
    // Show alert if no answer is selected
    showAlert("Please select an answer.");
    return;
  }

  // Check if the selected answer is correct
  if (!selectedAnswer.correct) {
    incorrectAnswersCount++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    questionScreen.classList.add("hidden");
    scoreScreen.classList.remove("hidden");
    finalScore.textContent = questions.length - incorrectAnswersCount; // Display the final score
  }
};

// Generate the review of incorrect answers
const generateReview = () => {
  reviewList.textContent = ""; // Clear previous answers

  questions.forEach((question) => {
    // Find the correct answer for the current question
    const correctAnswer = question.answers.find(
      (answer) => answer.correct).text;

    // Find the user's selected answer or default to "No Answer"
    const userAnswer =
      question.answers.find((answer) => answer.selected)?.text || "No Answer";

    // Add review items only if the user's answer is incorrect
    if (userAnswer !== correctAnswer) {
      // Add question to the review section
      const questionItem = document.createElement("li");
      questionItem.classList.add("quiz__review-item", "quiz__review-question");

      const reviewQuestionLabel = document.createElement("span");
      reviewQuestionLabel.classList.add("quiz__review-label");

      const reviewQuestionContent = document.createElement("span");
      reviewQuestionContent.classList.add("quiz__review-content");

      reviewList.append(questionItem);
      questionItem.append(reviewQuestionLabel, reviewQuestionContent);

      reviewQuestionLabel.textContent = `Question`;
      reviewQuestionContent.textContent = `${question.question}`;

      // Add user's incorrect answer to the review section
      const userAnswerItem = document.createElement("li");
      userAnswerItem.classList.add("quiz__review-item", "quiz__user-answer");

      const reviewAnswerLabel = document.createElement("span");
      reviewAnswerLabel.classList.add("quiz__review-label");

      const reviewAnswerContent = document.createElement("span");
      reviewAnswerContent.classList.add(
        "quiz__review-content",
        "quiz__review-content--incorrect"
      );

      reviewList.append(userAnswerItem);
      userAnswerItem.append(reviewAnswerLabel, reviewAnswerContent);

      reviewAnswerLabel.textContent = `Your answer was:`;
      reviewAnswerContent.textContent = `${userAnswer}`;

      // Add the correct answer to the review section
      const correctAnswerItem = document.createElement("li");
      correctAnswerItem.classList.add(
        "quiz__review-item",
        "quiz__correct-answer"
      );

      const correctAnswerLabel = document.createElement("span");
      correctAnswerLabel.classList.add("quiz__review-label");

      const correctAnswerContent = document.createElement("span");
      correctAnswerContent.classList.add(
        "quiz__review-content",
        "quiz__review-content--correct"
      );

      reviewList.append(correctAnswerItem);
      correctAnswerItem.append(correctAnswerLabel, correctAnswerContent);

      correctAnswerLabel.textContent = `Correct answer:`;
      correctAnswerContent.textContent = `${correctAnswer}`;
    }
  });
};

// Reset the quiz to the initial state
const resetQuiz = () => {
  currentQuestionIndex = 0;
  incorrectAnswersCount = 0;

  // Clear selected answers
  questions.forEach((question) => {
    question.answers.forEach((answer) => {
      delete answer.selected;
    });
  });

  scoreScreen.classList.add("hidden");
  reviewScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
};

//========================================
//=== EVENT LISTENERS
//========================================
nextButton.addEventListener("click", handleNextQuestion);
reviewButton.addEventListener("click", showReview);
startButton.addEventListener("click", startQuiz);
restartButton1.addEventListener("click", resetQuiz);
restartButton2.addEventListener("click", resetQuiz);
