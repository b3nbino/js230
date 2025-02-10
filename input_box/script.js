document.addEventListener("DOMContentLoaded", (_) => {
  let field = document.querySelector(".text-field");
  let content = document.querySelector(".content");
  let intervalId;

  field.addEventListener("click", (event) => {
    event.stopPropagation();
    field.classList.add("focused");

    if (!intervalId) {
      intervalId = setInterval((_) => {
        field.classList.toggle("cursor");
      }, 500);
    }
  });

  document.addEventListener("click", (event) => {
    field.classList.remove("focused");
    field.classList.remove("cursor");
    clearInterval(intervalId);
    intervalId = null;
  });

  document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (field.classList.contains("focused")) {
      if (key === "Backspace") {
        content.textContent = content.textContent.slice(
          0,
          content.textContent.length - 1
        );
      } else if (key.length === 1) {
        content.textContent = content.textContent.concat(key);
      }
    }
  });
});
