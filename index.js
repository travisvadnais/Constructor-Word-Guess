var Word = require("./word.js");
var inquire = require('inquirer');
var fs = require('fs');
var colors = require("colors");
var validator = require('validator');

//Set up array of words or phrases
var hangmanWords = ["After the Rain", "Animals", "Another Hole in the Head", "Because of You", "Believe it or Not", "Bottoms Up", "Breathe", "Burn it to the Ground", "Coin for the Ferryman", "Cowboy Hat", "Curb", "D C", "Deep", "Detangler", "Diggin This", "Dirty Laundry", "Do This Anymore", "Dont Ever Let It End", "Edge of a Revolution", "Every Time Were Together", "Everything I Wanna Do", "Falls Back On", "Far Away", "Feed the Machine", "Feelin Way Too Damn Good", "Fight for All the Wrong Reasons", "Figured You Out", "Flat on the Floor", "Fly", "Follow You Home", "For the River", "Get Em Up", "Good Times Gone", "Got Me Runnin Round", "Gotta Be Somebody", "Gotta Get Me Some", "Hangnail", "Hold Out Your Hand", "Holding on to Heaven", "Hollywood", "Home", "How You Remind Me", "I Dont Have", "Id Come for You", "If Everyone Cared", "If Today Was Your Last Day", "In Front of Me", "Just Four", "Just to Get High", "Kiss it Goodbye", "Leader of Men", "Learn the Hard Way", "Left", "Legs", "Little Friend", "Lullaby", "Make Me Believe Again", "Midnight Queen", "Million Miles an Hour", "Miss You", "Money Bought", "Must Be Nice", "Never Again", "Never Gonna Be Alone", "Next Contestant", "Next Go Round", "Not Leavin Yet", "Old Enough", "One Last Run", "Photograph", "Pusher", "Rockstar", "S E X", "Satellite", "Saturday Nights Alright For Fighting", "Savin Me", "Sea Groove", "See You at the Show", "Shakin Hands", "She Keeps Me Up", "Shouldve Listened", "Side of a Bullet", "Silent Majority", "Sister Sin", "Slow Motion", "Someday", "Someone That Youre With", "Something in Your Mouth", "Song on Fire", "The Betrayal Act I", "The Betrayal Act III", "The Hammers Comin Down", "This Afternoon", "This Means War", "Throw Yourself Away", "Too Bad", "Truck", "Trying Not to Love You", "We Will Rock You", "What Are You Waiting For", "When We Stand Together", "Where Do I Hide", "Where", "Window Shopper", "Woke Up This Morning", "Worthy to Say", "Yanking Out My Heart"];

var gameWord = "";
var guessesRemaining = 7;
var guessedLetters = [];

console.log("**************************************************".blue);
console.log("\n               Nickelback Hangman!".america.bold);
console.log("\n**************************************************\n".blue)
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
    gameWord = new Word(hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toUpperCase());

    //Return underscores and blanks for each new word character
    console.log("\nYour song is: \n" + gameWord.currGameStr(gameWord) + "\n");
    //Start the guess letter function
    guessLetter();
}

//This is the main function that will analyze the user's guess and do several checks
function guessLetter() {
    //Run a check to see if they lost
    if (guessesRemaining === 0) {
        //If so, let them know they're screwed and what their word was
        console.log("You lose!  Do you even like Nickelback?  Your song was:");
        console.log("\n              " + gameWord.word + "!\n");
        //Run a check to see if they want to play again
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
        //Check out the user's guess and run a couple of fx's to validate
        .then(function(letter){
            checkGuess(letter);
            //checkIfLetterInWord(letter);
            new gameWord.checkGuessedLetter(gameWord, letter.letterGuess.toUpperCase());
                console.log("\nYour song is: \n" + gameWord.currGameStr(gameWord) + "\n");
                console.log("**********************************************************".blue);
            if (gameWord.currGameStr(gameWord).indexOf("_") > -1) {
                //Recursively call the function if there are still letters to guess
                guessLetter();
            }
            else {
                console.log("You win!  You are a true Nickelback fan!");
                playAgainCheck();
            }
        })
    }
}

function checkGuess(letter) {
    var guess = letter.letterGuess.toUpperCase();
    var currWord = gameWord.word.toUpperCase();
    
    //If the guessed letter already exists in the current game string, give a duplicates message
    if ((gameWord.currGameStr(gameWord).indexOf(guess) != -1) || (guessedLetters.indexOf(guess) != -1)) {
        console.log("\nResult: You already guessed " + guess + ". Try again");
    }
    //Check to make sure only one letter was entered
    else if (guess.length > 1) {
        console.log("\nYou can only pick ONE letter, haven't you ever played this game before?  Try again.")
    }
    else if (!validator.isAlpha(guess)) {
        console.log("\nThat's not a letter.  Are you serious with this?  Pick a letter");
    }
    //Check to make sure the letter exists in the word and the game is still going
    else if ((guessedLetters.indexOf(guess) == -1) && (currWord.indexOf(guess) == -1) && (guessesRemaining > 0)) {
        //Push the letter into the guessed letters array if it was wrong and decrement the guesses remaining
        guessedLetters.push(guess);
        guessesRemaining--;
        console.log("Result: Wrong!");
    }
    console.log("\nWrong Guesses: ".red.bold + guessedLetters.join(", ").red);
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









