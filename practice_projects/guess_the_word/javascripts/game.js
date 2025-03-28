document.addEventListener("DOMContentLoaded", () => {
  let message = document.querySelector("#message");
  let letters = document.querySelector("#spaces");
  let guesses = document.querySelector("#guesses");
  let apples = document.querySelector("#apples");
  let replay = document.querySelector("#replay");

  let randomWord = (function () {
    let words = ["apple", "banana", "orange", "kiwi", "lemon", "blueberry"];

    return function () {
      let randIndex = Math.floor(Math.random() * words.length);

      return words.splice(randIndex, 1)[0];
    };
  })();

  class Game {
    constructor() {
      this.word = randomWord();
      if (!this.word) {
        this.displayMessage("Sorry! I've run out of words.");
        return this;
      }
      this.word = this.word.split("");

      this.lettersGuessed = [];
      this.incorrectGuesses = 0;
      this.incorrectAllowed = 6;
      this.correctGuesses = 0;
    }

    displayMessage(text) {
      message.textContent = text;
    }

    createBlanks() {
      let spaces = new Array(this.word.length + 1).join("<span></span>");

      let spans = document.querySelectorAll("span");
      spans.forEach((span) => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML("beforeend", spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    }

    endGame(message) {
      this.displayMessage(message);
      replay.style.display = "block";
      document.removeEventListener("keypress", handleKeypress);
    }

    addLetter(letter) {
      //Ignore already guessed letters
      if (this.lettersGuessed.includes(letter)) {
        return;
      }

      //Add to all guessed letters array and guesses html
      this.lettersGuessed.push(letter);
      guesses.innerHTML += `<span>${letter}</span>`;

      if (this.word.includes(letter)) {
        //Put letter in correct space and increment correct guesses
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === letter) {
            this.spaces[i].textContent = letter;
            this.correctGuesses++;
          }
        }

        //Display winning message and link
        if (this.correctGuesses === this.word.length) {
          this.endGame("You got it! Click above to play again.");
          document.body.style.backgroundColor = "green";
        }
      } else {
        //Increment incorrect guesses and change apples class name
        this.incorrectGuesses++;
        apples.className =
          "guess_" +
          String(Number(apples.className[apples.className.length - 1]) + 1);

        //Display losing message and new game link and remove keypress event
        if (this.incorrectGuesses === this.incorrectAllowed) {
          this.endGame("Sorry! You've run out of guesses.");
          document.body.style.backgroundColor = "red";
        }
      }
    }

    init() {
      this.createBlanks();
      document.addEventListener("keypress", handleKeypress);
    }
  }

  function handleKeypress(event) {
    //Ignore non-letter key presses such as Shift, Alt, etc...
    if (event.key.length !== 1) return;
    NewGame.addLetter(event.key);
  }

  //Reset and intialize game and keypress handler
  replay.addEventListener("click", (event) => {
    event.preventDefault();
    NewGame = new Game();

    if (!NewGame.word) return;

    NewGame.init();
    NewGame.displayMessage("");

    apples.className = "guess_0";
    document.body.style.backgroundColor = "white";
  });

  let NewGame = new Game();
  NewGame.init();
});
