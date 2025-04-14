document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("signUp");

  //Check input validity when user clicks off
  form.addEventListener("focusout", checkValidity);

  //When an input is clicked, remove the invalid status and error message
  form.addEventListener("focusin", (event) => {
    //Guard clause
    if (event.target.tagName !== "INPUT") return;

    //Remove invalid status
    event.target.classList.remove("invalid");

    //Remove error message

    //Find label
    let label = event.target.previousElementSibling;
    while (label.tagName !== "LABEL") {
      label = label.previousElementSibling;
    }

    let message = label.textContent;
    label.textContent = message.slice(0, message.indexOf(":") + 1);
  });

  //When submmitting make sure all fields are checked for errors first
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Get inputs
    let inputs = document.querySelectorAll("input");

    //Dispatch a focusin and focusout event to each input to check their validity
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].dispatchEvent(new Event("focusin", { bubbles: true }));
      inputs[i].dispatchEvent(new Event("focusout", { bubbles: true }));
    }

    //If there are still errors display an error message at the top of the page
    if (document.querySelectorAll(".invalid").length > 0) {
      document.getElementById("submitError").textContent =
        "Please fix any errors before submitting";
      return;
    } else {
      //Submit the form
    }
  });

  document
    .getElementById("firstName")
    .addEventListener("keypress", disableNonAlphabetic);

  document
    .getElementById("lastName")
    .addEventListener("keypress", disableNonAlphabetic);

  document
    .getElementById("phone")
    .addEventListener("keydown", disableAlphabetic);

  let creditInputs = document.querySelectorAll(".credit");

  for (let i = 0; i < creditInputs.length; i++) {
    //Disable letters
    //Move focus when maxlength is reached
    if (i < creditInputs.length - 1) {
      creditInputs[i].addEventListener("keydown", (event) => {
        disableAlphabetic(event);

        setTimeout(() => {
          if (creditInputs[i].value.length === 4) {
            creditInputs[i + 1].focus();
            creditInputs[i + 1].select();
          }
        }, 0);
      });
    } else {
      creditInputs[i].addEventListener("keypress", disableAlphabetic);
    }
  }

  //Determines the appropriate status for an input when clicking away from the input
  function checkValidity(event) {
    //Guard clause
    if (event.target.tagName !== "INPUT") return;

    let valid = true;
    let input = event.target;
    let errorMessage;

    //Check for errors and set appropriate error message
    if (
      input.id === "phone" &&
      input.value.length > 0 &&
      !/\d\d\d-\d\d\d-\d\d\d\d/.test(input.value)
    ) {
      valid = false;
      errorMessage = "Enter number in ***-***-**** format";
    } else if (
      input.classList.contains("credit") &&
      input.value.length > 0 &&
      !/\d\d\d\d/.test(input.value)
    ) {
      valid = false;
      errorMessage = "Please enter a valid credit card number";
    } else if (
      input.value.length === 0 &&
      input.id !== "phone" &&
      !input.classList.contains("credit")
    ) {
      if (input.id === "password" && input.value.length < 10) {
        valid = false;
        errorMessage = "Password must be at least 10 characters";
      } else {
        valid = false;
        errorMessage = "This field is required";
      }
    } else if (input.id === "email" && !/.+@.+/i.test(input.value)) {
      valid = false;
      errorMessage = "Please enter a valid e-mail";
    }

    if (!valid) {
      //Add invalid class to input and error messge to label
      input.classList.add("invalid");

      //Find label
      let label = input.previousElementSibling;
      while (label.tagName !== "LABEL") {
        label = label.previousElementSibling;
      }

      label.textContent += " " + errorMessage;
    } else if (document.querySelectorAll(".invalid").length === 0) {
      //Remove submition error message when all inputs are valid
      document.getElementById("submitError").textContent = "";
    }
  }

  //Stop digits and symbols from being entered into name inputs
  function disableNonAlphabetic(event) {
    if (event.key.length === 1 && !/[a-zA-Z'\s]/.test(event.key)) {
      event.preventDefault();
    }
  }

  //Stop letters and symbols (excluding "-") from being entered into numeric inputs
  function disableAlphabetic(event) {
    if (event.key.length === 1 && !/(\d|Backspace|-)/.test(event.key)) {
      event.preventDefault();
    }
  }
});
