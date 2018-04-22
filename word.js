//Pull in the dependencies
var letter = require("./letter.js");


//Set up the Word constructor
function Word(gameWord) {
    //Gameword is the randomly selected hangman word from index.js
    this.word = gameWord
    //Array holds each individual letter string
    this.gameLetters = [];

    //Fill the array by looping through the word and parsing out the letters

    for (var i = 0; i < gameWord.length; i++) {
        this.gameLetters.push(new letter(gameWord.charAt(i).toUpperCase()))
    }


    //This function will run the letter.toString fx for each letter in the word
    this.currGameStr = function(testWord) {
        //Set up an array to hold all the toString returns
        var newArr = [];
        //Loop thru each letter; run toString fx; and return an underscore or the letter
        for (var i = 0; i < testWord.gameLetters.length; i++) {
            newArr.push(testWord.gameLetters[i].toString(testWord.gameLetters[i].letter))
        }
        //finally, return the new array
        return("\n"+newArr.join(" "));
    }

    this.checkGuessedLetter = function(gameWord, letterGuess) {
        for (var i = 0; i < gameWord.gameLetters.length; i++) {
            if (letterGuess == gameWord.gameLetters[i].letter) {
                gameWord.gameLetters[i].analyzeLetter(letterGuess);
            }
        }
    }
    
}


//Export the Word object
module.exports = Word;

