var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = ""; // word to guess
var numBlanks = 0; // number of blanks in word
var winCounter = 0;// number of wins
var loseCounter = 0;// number of losses
var isWin = false; // flag to determine if user has won, by default set to false
var timer; // timer variable, used to start and stop timer
var timerCount = 5;   // timer count down

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = []; // array to store letters in chosen word
var blanksLetters = []; // array to store blanks for each letter in chosen word

// Array of words the user will guess
var words = ["aa","aab", "aabc", "aabcd", "aabcdef", "aabcdefg", "aabcdefgh"];

// The init function is called when the page loads 
function init() {

}

// The startGame function is called when the start button is clicked
function startGame() {
console.log(isWin)

console.log("heehehe")
startTimer();

startButton.setAttribute("style", "background: silver");
startButton.textContent = "Running";
startButton.disabled = true;

renderBlanks();





}



// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {


timer = setInterval(function() {
 timerCount--;
 timerElement.textContent = timerCount;
 if (timerCount >= 0) {
  if (isWin) {
    console.log(isWin)
    clearInterval(timer);
    winGame();
}
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

  chosenWord = words[Math.floor(Math.random() * words.length)]; // randomly selects a word from the words array
  console.log(chosenWord);

  lettersInChosenWord = chosenWord.split(""); // splits the chosen word into an array of characters
  numBlanks = lettersInChosenWord.length; // gets the number of characters in the chosen word
  for (let index = 0; index < numBlanks; index++) {
    blanksLetters.push("_")
    
  }
  wordBlank.textContent = blanksLetters.join(" ")
  
}



// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {

  console.log(lettersInChosenWord); 
  console.log(blanksLetters)
  var letterInWord = false;
  if(lettersInChosenWord.includes(letter)) // check if the letter is in the chosen word
  {
   letterInWord = true; // set the flag to true
  }

  if(letterInWord) // if the letter is in the word
  {

    console.log("letter is in word");
    for( let i = 0; i< numBlanks;i++)
    {
      if(chosenWord[i] === letter)
      {
        blanksLetters[i] = letter;
      }
    }
    console.log(blanksLetters);
    wordBlank.textContent = blanksLetters.join(" ")
  }


 
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  //console.log(event.key);
  //checkLetters(event.key)
  if(timerCount === 0)
  {
    return;
  }
  var letterInPut = event.key.toLowerCase();
  checkLetters(letterInPut);
  checkWin();



});

// Attach event listener to start button to call startGame function on click

init();


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

  if(chosenWord === blanksLetters.join(""))
  {
    isWin = true;
     
  }

}


// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  alert("You won!!");
}

// The loseGame function is called when timer reaches 0
function loseGame() {

}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

