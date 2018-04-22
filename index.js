var Word = require("./word.js");
var inquire = require('inquirer');
var fs = require('fs');

//Set up array of words or phrases
var hangmanWords = ["Buffalo Bills", "New England Patriots", "Miami Dolphins", "New York Jets", "Pittsburgh Steelers", "Baltimore Ravens", "Cincinnati Bengals", "Cleveland Browns", "Kansas City Chiefs", "Oakland Raiders", "Denver Broncos", "Los Angeles Chargers", "Houston Texans", "Jacksonville Jaguars", "Tennessee Titans", "Indianapolis Colts"];

var gameWord = "";
var guessesRemaining = 7;
var guessedLetters = [];

startGame();

function startGame() {
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
                //Generate a new word object
                gameWord = new Word(hangmanWords[Math.floor(Math.random() * 16)]);
                //Return underscores and blanks for each new word character
                console.log("\nYour word is: \n" + gameWord.currGameStr(gameWord) + "\n");
                //Start the guess letter function
                guessLetter();
                return;
            case "Exit":
                console.log("\nHave a great day!");
                return;
        }
    })
}

function guessLetter() {
    process.on('warning', e => console.warn(e.stack));
    inquire.prompt([
        {
            type: "input",
            name: "letterGuess",
            message: "Guess a letter",
        }
    ])
    .then(function(letter){
        if (guessedLetters.indexOf(letter.letterGuess.toUpperCase()) == -1) {
            guessedLetters.push(letter.letterGuess.toUpperCase());
            console.log("\nGuessed Letters: " + guessedLetters);
        }
        else {
            console.log("\nYou already guessed " + letter.letterGuess.toUpperCase() + "! Try something else");
            console.log("\nGuessed Letters: " + guessedLetters);
            guessLetter();
            return;
        }

        //Check gameword to see if it contains the guessed letter
        if (gameWord.word.indexOf(letter.letterGuess.toUpperCase()) == -1) {
            //If not, decrement the # of guesses remaining
            guessesRemaining--;
            //Check to see if they lost
            //If not, display the word
            if (guessesRemaining > 0) {
                console.log("\n" + gameWord.currGameStr(gameWord) + "\n");
                guessLetter();
            }
            //If so, tell them they lost
            else {
                console.log("You Lose!");
                return;
            }
        }
        else {
            new gameWord.checkGuessedLetter(gameWord, letter.letterGuess.toUpperCase());
            //We'll also need to push the guessed letter to an array so that we can let the user know it's a duplicate
            //console.log(letter.letterGuess.toUpperCase());
            console.log("\nYour word is: \n" + gameWord.currGameStr(gameWord) + "\n");
            if (gameWord.currGameStr(gameWord).indexOf("_") == -1) {
                console.log("You win!");
                return;
            }
            else {
                guessLetter();
                return;
            }
        }  
    
    })
}









