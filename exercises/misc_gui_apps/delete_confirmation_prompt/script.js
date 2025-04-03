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
  let menu = document.getElementById("contextMenu");
  let clickedId;

  function showDialogue() {
    overlay.style.display = "block";
    dialogue.style.display = "block";
  }

  function hideDialogue() {
    overlay.style.display = "none";
    dialogue.style.display = "none";
  }

  function hideContext() {
    menu.style.display = "none";
  }

  function deleteTodo(id) {
    let todosLis = ul.querySelectorAll("li");

    for (let i = 0; i < todosLis.length; i++) {
      if (todosLis[i].dataset.id === id) {
        todosLis[i].remove();
      }
    }
  }

  //Add todos
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

  //Show dialogue when clicking "X"
  ul.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") return;

    event.preventDefault();

    clickedId = event.target.parentElement.dataset.id;

    showDialogue();
  });

  //Display context menu
  ul.addEventListener("contextmenu", (event) => {
    if (event.target.tagName !== "LI") return;

    event.preventDefault();

    //Show context menu at mouse position
    menu.style.display = "block";
    menu.style.top = event.clientY.toString() + "px";
    menu.style.left = event.clientX.toString() + "px";

    clickedId = event.target.dataset.id;
  });

  //Hide context menu
  document.addEventListener("click", hideContext);

  //Remove todo when yes is clicked in dialogue or close when no is clicked
  dialogue.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") return;

    if (event.target.classList.contains("yes")) {
      deleteTodo(clickedId);
    }

    hideDialogue();
  });

  //Hide dialogue when overlay is clicked
  overlay.addEventListener("click", hideDialogue);

  //Show confirmation dialogue when "Delete Todo" is clicked
  menu.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.textContent === "Delete Todo") {
      showDialogue();
    }
  });
});
