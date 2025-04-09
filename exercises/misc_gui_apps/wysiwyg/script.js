document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.getElementById("buttons");

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
        document.getElementById("justifyLeft").classList.remove("active");
        document.getElementById("justifyCenter").classList.remove("active");
        document.getElementById("justifyRight").classList.remove("active");
        document.getElementById("justifyFull").classList.remove("active");

        document.execCommand(button.id);

        break;
    }

    event.target.classList.toggle("active");
  });
});
