var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount = 3;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["a","ab", "abc", "abcd", "abcdef", "abcdefg", "abcdefgh"];

// The init function is called when the page loads 
function init() {

}

// The startGame function is called when the start button is clicked
function startGame() {
console.log("heehehe")
startTimer();

startButton.setAttribute("style", "background: silver");
startButton.textContent = "Running";
startButton.disabled = true;

renderBlanks();
checkLetters('a')


}

// The winGame function is called when the win condition is met
function winGame() {

}

// The loseGame function is called when timer reaches 0
function loseGame() {

}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {


 var timer = setInterval(function() {
 timerCount--;
 timerElement.textContent = timerCount;
 if (timerCount >= 0) {
  console.log(timerCount);
}
// Tests if time has run out
if (timerCount === 0) {
  // Clears interval
  clearInterval(timer);
  alert("You're out of time!");

}
 }, 1000);
}

// Creates blanks on screen
function renderBlanks() {

  chosenWord = words[Math.floor(Math.random() * words.length)];
  console.log(chosenWord);
  //wordBlank.textContent= chosenWord
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;

  for (let index = 0; index < numBlanks; index++) {
    blanksLetters.push("_")
    
  }

  wordBlank.textContent = blanksLetters.join(" ")
  

}

// Updates win count on screen and sets win count to client storage
function setWins() {

}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {

}

// These functions are used by init
function getWins() {
  
}

function getlosses() {

}

function checkWin() {

}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {

  console.log(lettersInChosenWord);

  if(lettersInChosenWord.includes(letter))
  {
    alert("you right")
  }
 
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  console.log(event.key);
});

// Attach event listener to start button to call startGame function on click

init();


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

