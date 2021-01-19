//get elements from HTML doc
let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
let startButton = document.getElementById('start');
let counterEl = document.getElementById('counter');
let questionEL = document.getElementById('question');
let choicesEl = document.getElementById('choices');
let submitScore = document.getElementById('submitScore');
let answerChoices = document.getElementsByClassName('choice');
let answerSelected = document.querySelectorAll(".choice");
let highScoresPage = document.getElementById("Highscores");
let highScoresButton = document.getElementById("highscorebutton");
let playAgainButton = document.getElementById("playAgain");
let highScoreRow = document.querySelector('.highScorestext');


//define questions for the quiz
let questionArray = [{

  question: 'Commonly used data types DO NOT include:',
  answers: ['strings', 'booleans', 'alerts', 'numbers'],
  correctAnswer: 'C',
}, {

  question: 'The condition in an if/else statement is enclosed with ___.',
  answers: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
  correctAnswer: 'C',
}, {

  question: 'Arrays in Javascropt can be used to store ___.',
  answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
  correctAnswer: 'D',
}, {

  question: 'String values must be enclosed within ___ when being assigned to letiables',
  answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
  correctAnswer: 'C',
},

{
  question: 'A very useful tool used during development and debugging for printint content to the debugger is:',
  answers: ['Javascript', 'terminal / bas', 'for loops', 'console log'],
  correctAnswer: 'C',
}];

// create elements for results page that displays after each round
let headerCreate = document.createElement("H1");
let scoreResults = document.createElement("P");
resultsContainer.prepend(scoreResults);
resultsContainer.prepend(headerCreate);
headerCreate.append("Game Over!");



//Define number of last question to stop each round
const lastQuestion = (questionArray.length - 1);

// Set the question number at 0 so the game will start at first in the array
let questionNumber = 0;

// Set the round number at 0 so the game will start at first round
let roundNumber = 0;

// Set the number of correct answers to 0 
let correctCount = 0;

// Set the number of wrong answers to 0 
let wrongCount = 0;

// Set the game to start at 75 seconds
let timeleft = 75;

// track the scores of each round
let highScoresTracker = [];

// track the initials and score submitted on results page to be displayed in high scores
let initialsTracker = [];



// the initial display state of the game
choicesEl.hidden = true;
resultsContainer.hidden = true;
highScoresPage.hidden = true;
playAgainButton.hidden = true;


// the timer and questions start when start button is clicked 
startButton.addEventListener("click", function () {
  quizContainer.hidden = true;
  choicesEl.hidden = false;
  startTimer();
  createQuestions();

});


// the timer function
function startTimer() {


  let quizTimer = setInterval(function () {
    counterEl.innerHTML = "Time: " + timeleft;
    timeleft -= 1;
    
    // end game if time left hits zero
    if (timeleft <= 0) {
      highScoresTracker.push(timeleft);
      showResults();
      // return;
    }
  }, 1000);
  
    // clear interval after each round
  if (roundNumber > 0) { clearInterval(quizTimer); }

}

// create the questions with answers
function createQuestions() {


  let q = questionArray[questionNumber];
  console.log(q);
  questionEL.innerHTML = "<p>" + q.question + "</p>";
  answerChoices[0].innerHTML = q.answers[0];
  answerChoices[1].innerHTML = q.answers[1];
  answerChoices[2].innerHTML = q.answers[2];
  answerChoices[3].innerHTML = q.answers[3];

}


// create the event listeners for the answers and pass id of the answer selected to check if correct
answerSelected.forEach(function(i) {
  i.addEventListener('click', function () {
    let buttonID = i.id;
    checkAnswers(buttonID);
  });
});

// checks the users answer to see if it is wrong or right

function checkAnswers(buttonID) {

  // add to score and alert if answer is correct
  if (buttonID === questionArray[questionNumber].correctAnswer) {
    correctCount++;
    alert("Correct!");


  }
  // add to wrong score, subtract 10 seconds and alert if answer is wrong
  else {
    wrongCount++;
    timeleft = timeleft - 10;
    alert("Wrong answer. You lost 10 seconds!");


  }
  questionNumberCheck();
}



// checks the question number to move to the next question or to results page
function questionNumberCheck() {
  // move to next question if question number is less than last question
  if (questionNumber < lastQuestion) {
    questionNumber++;
    createQuestions();
  }
  // move to results screen and save time left as a score if the question is last question
  else {
    counterEl.hidden = true;
    highScoresTracker.push(timeleft);
    showResults();

  }
}



//show results of the round and add to the round count 
function showResults() {
  choicesEl.hidden = true;
  resultsContainer.hidden = false;
  playAgainButton.hidden = false;
  roundNumber++;
  scoreResults.innerHTMl = "";
  scoreResults.innerHTML = "You got " + correctCount + " correct out of " + questionArray.length + "<br>" + "Your final score is:  " + timeleft;
  console.log(resultsContainer);



}
// if a user clicks the submit score button, add the initials they wrote and the score of that round to initial trackers
submitScore.addEventListener("click", function () {
  initialsTracker.push(document.querySelector(".initials").value + " " + highScoresTracker[(highScoresTracker.length) - 1]);
  console.log(highScoresTracker);
  console.log(initialsTracker);
  alert("submitted!");
});


//if a user clicks the highscore button, display high scores and hide other cards
highScoresButton.addEventListener("click", function () {
  console.log(highScoresTracker);
  highScoresPage.hidden = false;
  playAgainButton.hidden = false;
  choicesEl.hidden = true;
  resultsContainer.hidden = true;
  quizContainer.hidden = true;
  //initialsTracker.forEach(element => highScoreRow.innerHTML = ("<br>" + element));
  highScoreRow.innerHTML = initialsTracker;


}
);


/*if a user clicks the play again button, set timer to 75, set correct and wrong count and question
to 0, and start timer and questions*/

playAgainButton.addEventListener("click", function () {
  timeleft = 75;
  correctCount = 0;
  wrongCount = 0;
  questionNumber = 0;
  quizContainer.hidden = true;
  choicesEl.hidden = false;
  resultsContainer.hidden = true;
  highScoresPage.hidden = true;
  playAgainButton.hidden = true;
  counterEl.hidden = false;

  console.log(timeleft);
  startTimer();
  createQuestions();

});

