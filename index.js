var Word = require("./word.js");
var inquire = require('inquirer');
var fs = require('fs');
var colors = require("colors");

//Set up array of words or phrases
var hangmanWords = ["Buffalo Bills", "New England Patriots", "Miami Dolphins", "New York Jets", "Pittsburgh Steelers", "Baltimore Ravens", "Cincinnati Bengals", "Cleveland Browns", "Kansas City Chiefs", "Oakland Raiders", "Denver Broncos", "Los Angeles Chargers", "Houston Texans", "Jacksonville Jaguars", "Tennessee Titans", "Indianapolis Colts"];

var gameWord = "";
var guessesRemaining = 7;
var guessedLetters = [];
var stillPlaying = true;


//Prompt user to start game
inquire.prompt([
    {
        type: "list",
        name: "menu",
        message: "Hi!  What would you like to do?",
        choices: ["Start Game", "Exit"]
    }
])
.then(function(userRequest) {
    switch (userRequest.menu) {
        case "Start Game":
            startGame();
            break;
        case "Exit":
            console.log("\nHave a great day!");
            break;
    }
})

//Officially start game
function startGame() {
    guessesRemaining = 7;
    guessedLetters = [];
    //Generate a new word object
    gameWord = new Word(hangmanWords[Math.floor(Math.random() * 16)].toUpperCase());
    console.log(gameWord.word);
    //Return underscores and blanks for each new word character
    console.log("\nYour word is: \n" + gameWord.currGameStr(gameWord) + "\n");
    //Start the guess letter function
    guessLetter();
}

//This is the main function that will analyze the user's guess and do several checks
function guessLetter() {
    if (guessesRemaining === 0) {
        console.log("You lose!  Your word was:");
        console.log("\n              " + gameWord.word + "!\n");
        playAgainCheck();
    }
    else {
        inquire.prompt([
            {
                type: "input",
                name: "letterGuess",
                message: "Guess a letter",
            }
        ])
        .then(function(letter){
            checkDuplicates(letter);
            checkIfLetterInWord(letter);
            new gameWord.checkGuessedLetter(gameWord, letter.letterGuess.toUpperCase());
                console.log("\nYour word is: \n" + gameWord.currGameStr(gameWord) + "\n");
            if (gameWord.currGameStr(gameWord).indexOf("_") > -1) {
                //Recursively call the function if there are still letters to guess
                guessLetter();
            }
            else {
                console.log("You win!");
                playAgainCheck();
            }
        })
    }
}

function checkDuplicates(letter) {
    //First condition checks the guessedLetters array for the guessed letter
    //Second condition checks the gameword to see if that letter exists
    //Both conditions must be met to push a letter to the array b/c we don't want duplicates, and we don't want a letter from the gameword to be pushed to the guessed letters array
    if ((guessedLetters.indexOf(letter.letterGuess.toUpperCase()) == -1) && (gameWord.word.toUpperCase().indexOf(letter.letterGuess.toUpperCase()) == -1)) {
        guessedLetters.push(letter.letterGuess.toUpperCase());
    }
    //If the guessed letter already exists in the current game string, give a duplicates message
    else if (gameWord.currGameStr(gameWord).indexOf(letter.letterGuess.toUpperCase()) != -1) {
        console.log("\nYou already guessed " + letter.letterGuess + ". Try again");
    }
}

function checkIfLetterInWord(letter) {
    //Check to see if the guessed letter is in the word
    if ((gameWord.word.toUpperCase().indexOf(letter.letterGuess.toUpperCase()) == -1) && (guessesRemaining > 0)) {
        guessesRemaining--;
        console.log("Wrong!");
    }
    console.log("------------------------------------------------------");
    console.log("\nWrong Guesses: ".red.bold + guessedLetters.join(",").red);
    console.log("\nRemaining Guesses: " + guessesRemaining);
}

function playAgainCheck() {
    inquire.prompt([
        {
            type: "list",
            name: "playAgain",
            message: "Play Again?",
            choices: ["Yes", "No"]
        }
    ])
    .then(function(answer) {
        switch(answer.playAgain) {
            case "Yes": 
                startGame();
                break;
            case "No":
                console.log("\nBoooo.  Have a nice day!");
                break;
        }
    })
}









