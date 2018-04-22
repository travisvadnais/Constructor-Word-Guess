var Word = require("./word.js");
var inquire = require('inquirer');
var fs = require('fs');

//Set up array of words or phrases
var hangmanWords = ["Buffalo Bills", "New England Patriots", "Miami Dolphins", "New York Jets", "Pittsburgh Steelers", "Baltimore Ravens", "Cincinnati Bengals", "Cleveland Browns", "Kansas City Chiefs", "Oakland Raiders", "Denver Broncos", "Los Angeles Chargers", "Houston Texans", "Jacksonville Jaguars", "Tennessee Titans", "Indianapolis Colts"];

var gameWord = "";
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
    inquire.prompt([
        {
            type: "input",
            name: "letterGuess",
            message: "Guess a letter",
        }
    ])
    .then(function(letter){
        //We need to check to see if the guessed letter exists in the gameLetters array of objects.  We'll need dot notation to get down to the actual letter piece of the object.
        console.log(letter.letterGuess);
        new gameWord.checkGuessedLetter(gameWord, letter.letterGuess.toUpperCase());
        //We'll also need to push the guessed letter to an array so that we can let the user know it's a duplicate
        //console.log(letter.letterGuess.toUpperCase());
        console.log("\nYour word is: \n" + gameWord.currGameStr(gameWord) + "\n");
    })
}









