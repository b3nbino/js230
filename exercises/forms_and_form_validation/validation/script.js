document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("signUp");
  let submit = document.querySelector("button");

  form.addEventListener("focusout", checkValidity);
  form.addEventListener("focusin", (event) => {
    if (event.target.tagName !== "INPUT") return;

    event.target.classList.remove("invalid");
    event.target.previousElementSibling.textContent =
      event.target.previousElementSibling.textContent.replace(" Required", "");
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].dispatchEvent(new Event("focusout", { bubbles: true }));
    }

    if (document.querySelectorAll(".invalid").length > 0) {
      document.getElementById("submitError").textContent =
        "Please fix any errors before submitting";
      return;
    }
  });

  function checkValidity(event) {
    if (event.target.tagName !== "INPUT") return;
    let valid = true;
    let input = event.target;

    if (
      (input.value.length === 0 && input.id !== "phone") ||
      (input.id === "password" && input.value.length < 10) ||
      (input.id === "phone" &&
        input.value.length > 0 &&
        !/\d\d\d-\d\d\d-\d\d\d\d/.test(input.value)) ||
      (input.id === "email" && !/.+@.+/gi.test(input.value))
    ) {
      valid = false;
    }

    if (!valid) {
      input.classList.add("invalid");
      input.previousElementSibling.textContent += " Required";
    } else if (document.querySelectorAll(".invalid").length === 0) {
      document.getElementById("submitError").textContent = "";
    }
  }
});
