const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'он',
        choice1: 'he',
        choice2: 'she',
        choice3: 'you',
        choice4: 'we',
        answer: 1,
    },
    {
        question: "ты, вы",
        choice1: "we",
        choice2: "it",
        choice3: "they",
        choice4: "you",
        answer: 4,
    },
    {
        question: "оно, это",
        choice1: "you",
        choice2: "she",
        choice3: "they",
        choice4: "it",
        answer: 4,
    },
    {
        question: "я",
        choice1: "you",
        choice2: "I",
        choice3: "she",
        choice4: "they",
        answer: 2,
    },
    {
        question: "они",
        choice1: "we",
        choice2: "he",
        choice3: "they",
        choice4: "she",
        answer: 3,
    },
    {
        question: "она",
        choice1: "he",
        choice2: "she",
        choice3: "we",
        choice4: "it",
        answer: 2,
    },
    {
        question: "учиться",
        choice1: "take",
        choice2: "open",
        choice3: "study",
        choice4: "sleep",
        answer: 3,
    },
    {
        question: "закрывать",
        choice1: "lose",
        choice2: "close",
        choice3: "open",
        choice4: "go",
        answer: 2,
    },
    {
        question: "открывать",
        choice1: "give",
        choice2: "drink",
        choice3: "help",
        choice4: "open",
        answer: 4,
    },
    {
        question: "работать",
        choice1: "meet",
        choice2: "find",
        choice3: "think",
        choice4: "work",
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


startGame();