let todos = [
  {
    id: "1",
    title: "GUI Exercises",
  },
  {
    id: "2",
    title: "Review JS230",
  },
  {
    id: "3",
    title: "JS230 Written Assessment",
  },
  {
    id: "4",
    title: "JS230 Project",
  },
  {
    id: "5",
    title: "TS240 Course",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let ul = document.getElementById("todoList").querySelector("ul");
  let dialogue = document.getElementById("dialogue");
  let overlay = document.getElementById("overlay");
  let clickedId;

  function showDialogue() {
    overlay.style.display = "block";
    dialogue.style.display = "block";
  }

  function hideDialogue() {
    overlay.style.display = "none";
    dialogue.style.display = "none";
  }

  todos.forEach((todo) => {
    //Create li, fill with text node and close button link
    let listItem = document.createElement("li");
    listItem.dataset.id = todo.id;
    let text = document.createTextNode(todo.title);

    let closeButton = document.createElement("a");
    closeButton.setAttribute("href", "#");
    closeButton.textContent = "✘";

    listItem.appendChild(text);
    listItem.appendChild(closeButton);

    //Add li to page
    ul.appendChild(listItem);
  });

  ul.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") return;

    event.preventDefault();

    clickedId = event.target.parentElement.dataset.id;

    showDialogue();
  });

  overlay.addEventListener("click", hideDialogue);

  dialogue.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") return;

    if (event.target.classList.contains("yes")) {
      let todosLis = document.querySelectorAll("li");

      for (let i = 0; i < todosLis.length; i++) {
        if (todosLis[i].dataset.id === clickedId) {
          todosLis[i].remove();
        }
      }
    }

    hideDialogue();
  });
});
