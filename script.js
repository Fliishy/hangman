// Hangman Javascript

// define the words for the game in an array
let gameWords = ["direction", "driver", "variety", "president", "moment", "media", "stranger",
         "cancer", "currency", "singer", "passion", "fishing"]

// selects a random word by generating a random number and selecting from the array
// turns the word into an array and generates a second array from the 1st for the hidden word
let wordSelector = Math.floor(Math.random() * gameWords.length);
let guessWord = gameWords[wordSelector].split("");
let hiddenWord = Array.from(guessWord);

// creates the array to store the guessed letters
let guessedLetters = [];

let lives = 10;

let canvas = document.getElementById("hangman");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";

function randWord() {

    // sets the hidden word to be an array of dashes to be replaced with guessed letters
    for (let i = 0; i < guessWord.length; i++) {
        hiddenWord[i] = "_";
    }

    // sets the html to be hidden word but as a word with dashes and spaces - - - - 
    document.getElementById("guess").innerHTML = `${hiddenWord.join(" ")}`;
}

// the button click functionality
function letterGuess(clickedValue) {

    // adds the clicked button to the guessed letters array and displays it
    guessedLetters.push(clickedValue);
    document.getElementById("guessedLetters").innerHTML = `${guessedLetters.join(" ")}`
    
    // if the word includes the clicked button value
    if (guessWord.includes(clickedValue)) {
        
        // runs a loop too check if the button value is in the guess word
        for (i = 0; i < guessWord.length; i++) {
            if (guessWord[i] == clickedValue) {
                // changes the hidden value dash to be the clicked button value
                hiddenWord[i] = clickedValue;
                document.getElementById("guess").innerHTML = `${hiddenWord.join(" ")}`;
            }
        }

        // turns the button pressed to disabled so it cannot be pressed twice
        document.getElementById(`${clickedValue}Btn`).disabled = true;

        if (guessWord.join("") == hiddenWord.join("")) {
            gameWin();
        }
    }

    else {
        // reduces life counter if letter doesnt appear in the guess words
        lives -= 1;
        document.getElementById("lives").innerHTML = `${lives} lives`;

        // disables the clicked button
        document.getElementById(`${clickedValue}Btn`).disabled = true;

        // when letter is incorrect a line is drawn for the hangman
        if (lives == 9) {
            ctx.fillRect(0,190,100,10);
        }

        else if (lives == 8) {
            ctx.fillRect(25,20,10,180);
        }

        else if (lives == 7) {
            ctx.fillRect(25,20,110,10);
        }

        else if (lives == 6) {
            ctx.fillRect(130,20,5,30);
        }

        else if (lives == 5) {
            ctx.lineWidth = 6;
            ctx.arc(132.5, 65, 15, 0, 2 * Math.PI);
            ctx.stroke();
        }

        else if (lives == 4) {
            ctx.fillRect(130,80,5,60);
        }

        else if (lives == 3) {
            ctx.lineWidth = 4;
            ctx.moveTo(132.5,100);
            ctx.lineTo(160,120);
            ctx.stroke();
        }

        else if (lives == 2) {
            ctx.moveTo(132.5,100);
            ctx.lineTo(100,120);
            ctx.stroke();
        }

        else if (lives == 1) {
            ctx.lineWidth = 5;
            ctx.moveTo(132.5,137.5);
            ctx.lineTo(160,170);
            ctx.stroke();
        }

        else if (lives == 0) {
            ctx.moveTo(132.5,137.5);
            ctx.lineTo(100,170);
            ctx.stroke();

            //gameOver function is run when lives reach 0
            gameOver();
        }
    }
}

function gameOver() {
    // changes the life counter to Game Over
    document.getElementById("lives").innerHTML = "Game Over";

    // selects all the buttons within the button class and turns them off
    document.querySelectorAll("button.button").forEach(elem => {
        elem.disabled = true;
      });

    // displays the word that needed to be guessed in red
    document.getElementById("guess").innerHTML = `${guessWord.join(" ")}`;
    document.getElementById("guess").style.color = "red";

    // displays the hidden restart button when the life counter reaches 0
    document.querySelector("#restartButton").style.display = "block";
}

function gameWin() {
    // changes the life counter to Game Over
    document.getElementById("lives").innerHTML = "Game Over";

     // selects all the buttons within the button class and turns them off
     document.querySelectorAll("button.button").forEach(elem => {
        elem.disabled = true;
      });

    // displays the word that was guessed in green
    document.getElementById("guess").innerHTML = `${guessWord.join(" ")}`;
    document.getElementById("guess").style.color = "lime";

    // displays the hidden restart button when the life counter reaches 0
    document.querySelector("#restartButton").style.display = "block";
}

// when restart is pressed the game reloads
function gameRestart() {
    location.reload();
}

// when the page loads the randword function is run and lives are shown
window.onload = () => {
    randWord();
    document.getElementById("lives").innerHTML = `${lives} lives`;
}