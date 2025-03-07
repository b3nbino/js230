document.addEventListener("DOMContentLoaded", () => {
  let input = document.querySelector(".text-field");
  let content = document.querySelector(".content");
  let cursorIntervalId;

  //Click on input
  input.addEventListener("click", (event) => {
    event.stopPropagation();
    //Blacken border
    input.classList.add("focused");

    //Add cursor
    if (cursorIntervalId === undefined) {
      cursorIntervalId = setInterval(() => {
        input.classList.toggle("cursor");
      }, 500);
    }
  });

  //Click on document
  document.addEventListener("click", (event) => {
    //Focus removal
    input.classList.remove("focused");

    //Cursor removal
    clearInterval(cursorIntervalId);
    cursorIntervalId = undefined;
    input.classList.remove("cursor");
  });

  //Typing
  document.addEventListener("keydown", (event) => {
    if (input.classList.contains("focused") && event.key.length === 1) {
      content.textContent += event.key;
    } else if (event.key === "Backspace") {
      content.textContent = content.textContent.slice(
        0,
        content.textContent.length - 1
      );
    }
  });
});
