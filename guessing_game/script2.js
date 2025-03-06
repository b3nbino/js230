document.addEventListener("DOMContentLoaded", () => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let input = document.querySelector("#guess");
  let form = document.querySelector("form");
  let link = document.querySelector("a");
  let message = "Guess a number between 1 and 100.";
  let messageElem = document.querySelector("p");

  messageElem.textContent = message;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let guess = parseInt(input.value);

    if (guess < answer) {
      message = "Your guess was to low.";
    } else if (guess > answer) {
      message = "Your guess was to high.";
    } else {
      message = "You got it!";
    }

    messageElem.textContent = message;
  });

  link.addEventListener("click", (event) => {
    event.preventDefault();

    answer = Math.floor(Math.random() * 100) + 1;
    message = "Guess a number between 1 and 100.";
    messageElem.textContent = message;
  });
});
