document.addEventListener("DOMContentLoaded", (_) => {
  let randNum = Math.floor(Math.random() * 100) + 1;
  let guessCount = 0;
  let p = document.querySelector("body > main > p");
  let submit = document.querySelector(
    "body > main > form > fieldset > input[type=submit]:nth-child(2)"
  );
  let newGameLink = document.querySelector("body > main > a");

  p.textContent = "Guess a number from 1 to 100";

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    guessCount += 1;
    let guess = parseInt(document.querySelector("#guess").value);

    if (guess > randNum) {
      p.textContent = `My number is less than ${guess}`;
    } else if (guess < randNum) {
      p.textContent = `My number is greater than ${guess}`;
    } else {
      p.textContent = `You guessed it! It took you ${guessCount} guesses.`;
    }
  });

  newGameLink.addEventListener("click", (event) => {
    event.preventDefault();
    randNum = Math.floor(Math.random() * 100) + 1;
    p.textContent = "Guess a number from 1 to 100";
    guessCount = 0;
  });
});
