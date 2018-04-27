

//Letter constructor
function Letter(letter) {
    //Letter property will be the fed letter
    this.letter = letter
    //LetterGuessed will always start as false
    this.letterGuessed = false

    //Fx to check if the fed letter has already been guessed.  If not, display an underscore.  If so, display the letter
    this.toString = function(letter) {
        //Check for spaces
        if (this.letter == " ") {
            return(" ");
        }
        //Return placeholder for unguessed letters
        else if (this.letterGuessed == false) {
            return ("_")
        }
        //Return the letter for guessed letters
        else {
            return (letter)
        };
    };

    //Fx to check the guessed letter against the underlying letter.  If it's a match, change the boolean to True.  The letter will be displayed once we run the above fx for every letter in the word string
    this.analyzeLetter = function(letter) {
        if (letter == this.letter) {
            this.letterGuessed = true
        }
    }
}

//Export the Letter object
module.exports = Letter;



