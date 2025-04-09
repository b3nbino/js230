document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.getElementById("buttons");
  let textBox = document.getElementById("text-box");
  let bold = document.getElementById("bold");
  let italic = document.getElementById("italic");
  let underline = document.getElementById("underline");
  let strikeThrough = document.getElementById("strikeThrough");
  let link = document.getElementById("createLink");
  let ul = document.getElementById("insertUnorderedList");
  let ol = document.getElementById("insertOrderedList");

  buttons.addEventListener("click", (event) => {
    event.preventDefault();

    let button = event.target;

    switch (button.id) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "strikeThrough":
        document.execCommand("strikeThrough");
        break;
      case "createLink":
        let url = window.prompt(
          "Please enter the URL you would like to link to:"
        );
        document.execCommand("createLink", false, url ?? "#");
        break;
      case "insertUnorderedList":
        document.execCommand("insertUnorderedList");
        break;
      case "insertOrderedList":
        document.execCommand("insertOrderedList");
        break;
      default:
        if (!button.id.includes("justify")) return;
        document.getElementById("justifyLeft").classList.remove("active");
        document.getElementById("justifyCenter").classList.remove("active");
        document.getElementById("justifyRight").classList.remove("active");
        document.getElementById("justifyFull").classList.remove("active");

        document.execCommand(button.id);

        break;
    }

    event.target.classList.toggle("active");
  });

  function deactivateButtons() {
    let allButtons = [bold, italic, underline, strikeThrough, link, ul, ol];

    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].classList.remove("active");
    }
  }

  textBox.addEventListener("click", (event) => {
    deactivateButtons();

    let elem = event.target;
    let effects = [];

    while (elem.id !== "text-box") {
      effects.push(elem.localName);
      elem = elem.parentElement;
    }

    if (effects.includes("b")) {
      bold.classList.add("active");
    }

    if (effects.includes("i")) {
      italic.classList.add("active");
    }

    if (effects.includes("u")) {
      underline.classList.add("active");
    }

    if (effects.includes("strike")) {
      strikeThrough.classList.add("active");
    }

    if (effects.includes("a")) {
      link.classList.add("active");
    }

    if (effects.includes("ul")) {
      ul.classList.add("active");
    }

    if (effects.includes("ol")) {
      ol.classList.add("active");
    }
  });
});
