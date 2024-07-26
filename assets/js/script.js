var wordBlank = document.querySelector(".word-blanks");
var questionChose = document.querySelector('.questions')
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");
var chosenWord = ""; // word to guess
var numBlanks = 0; // number of blanks in word
var winCounter = 0;// number of wins
var loseCounter = 0;// number of losses
var isWin = false; // flag to determine if user has won, by default set to false
var timer; // timer variable, used to start and stop timer
var timerCount;   // timer count down

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = []; // array to store letters in chosen word
var blanksLetters = []; // array to store blanks for each letter in chosen word

// Array of words the user will guess
var questions=
[
  "What year was pandamic? ", "who was the 45th president of The U.S?",
  "What is the capital of California?","What main language is used to build a website?",
  "What is the biggest state of The U.S"

]
var words = ["2019","biden", "sacramento", "javascript", "alaska"];

// The init function is called when the page loads 
function init() {
getWins();
getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
isWin = false;
console.log("Let start the games")
startButton.setAttribute("style", "background: silver");
startButton.textContent = "Running";
startButton.disabled = true;

renderBlanks();
startTimer();







}



// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
timerCount=10;

timer = setInterval(function() {
 timerCount--;
 timerElement.textContent = timerCount;
 if (timerCount >= 0 )
  {
  if (isWin &&timerCount>0) {
    console.log(isWin)
    winGame();
    clearInterval(timer);
  
    }
 }
// Tests if time has run out
if (timerCount === 0) {
  alert("You're out of time!");
  loseGame();
  clearInterval(timer);
}
 }, 1000);
}


function random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
}



// Creates blanks on screen
function renderBlanks() {
  const randomIndex = (Math.floor(random(0, questions.length)))
  questionChose.textContent=questions[randomIndex]
  chosenWord = words[randomIndex]; // randomly selects a word from the words array
  console.log(chosenWord);
  
  // while (blanksLetters.length > 0) {
  //   blanksLetters.pop();
  // }
  blanksLetters.splice(0, blanksLetters.length); // make sure this array is empty

  lettersInChosenWord = chosenWord.split(""); // splits the chosen word into an array of characters
  numBlanks = lettersInChosenWord.length; // gets the number of characters in the chosen word
  for (let index = 0; index < numBlanks; index++) {
    blanksLetters.push("_")
    
  }
  wordBlank.textContent = blanksLetters.join(" ") // spacing blankLetters
  
}



// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {

  console.log(lettersInChosenWord); 
  console.log(blanksLetters)
  var letterInWord = false; // assuming letter check is wrong so set the flag to
  if(lettersInChosenWord.includes(letter)) // check if the letter is in the chosen word
  {
   letterInWord = true; // set the flag to true
  }



  if(letterInWord) // if the letter is in the word
  {

    var complimentWords=["you nailed it", "good job","keep it up","almost there","keep it focused"]
    var choseCompliment = complimentWords[Math.floor(Math.random() * complimentWords.length)]; // randomly selects a word from the words array
   
    // console.log("letter is in word");
    for( let i = 0; i< numBlanks;i++)
    {
      if(chosenWord[i] === letter)
      {
        blanksLetters[i] = letter;
      }
    }
    console.log(blanksLetters);
    popUpmessage(choseCompliment,1000);


  
  
    wordBlank.textContent = blanksLetters.map( a => a.charAt(0).toUpperCase()).join("  ")
  }
  else if(!letterInWord)
  {

    popUpmessage("Your guess was wrong",1000)
  }


 
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  //console.log(event.key);
  //checkLetters(event.key)
  if(timerCount === 0 || isWin)
  {
    popUpmessage("Please click Start button if you want to re-play",1000)
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
  win.textContent=winCounter;
  localStorage.setItem("setWin-count", winCounter);


}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent=loseCounter;
  localStorage.setItem("setLoss-count", loseCounter);
}


// These functions are used by init
function getWins() {
  win.textContent =localStorage.getItem("setWin-count")
}

function getlosses() {
  lose.textContent =localStorage.getItem("setLoss-count")

}


function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
  

}



// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.innerText = "YOU WON!!!🏆 \nThe answer: "+ chosenWord.toUpperCase();

  winCounter++;
  setWins();
  startButton.removeAttribute("style")
  startButton.disabled = false;
  startButton.textContent = "Start";
 


}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent="You failed";
  loseCounter++;
  setLosses();
  startButton.removeAttribute("style")
  startButton.disabled = false;
  startButton.textContent = "Start";


}




// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click",resetGame)


 function resetGame(){
 
  // localStorage.removeItem("setLoss-count");
  // localStorage.removeItem("setWin-count")

  winCounter=0;
  loseCounter=0;
  setWins();
  setLosses();

}

function popUpmessage(msg,duration)
{
 var el = document.createElement("h1");
 el.setAttribute("style","position:absolute;top:45%;left:26%;background-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}


function generateUniqueRandom(maxNumber) {
    //Generate random number
    let random = (Math.random() * maxNumber).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if(!haveIt.includes(random)) {
        haveIt.push(random);
        return random;
    } else {
        if(haveIt.length < maxNumber) {
          //Recursively generate number
         return  generateUniqueRandom(maxNumber);
        } else {
          console.log('No more numbers available.')
          return false;
        }
    }
}



