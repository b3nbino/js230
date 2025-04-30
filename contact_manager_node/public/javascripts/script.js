document.addEventListener("DOMContentLoaded", () => {
  let noSection = document.getElementById("no-contacts");
  let addSection = document.getElementById("add-contacts");
  let contactsMain = document.getElementById("contacts");
  let nav = document.querySelector("nav");
  let addButtons = document.querySelectorAll("button.add");
  let cancel = document.getElementById("cancel");
  let submit = document.getElementById("submit-contact");

  //Show the add contact page
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", (event) => {
      noSection.classList.toggle("hide");
      nav.classList.toggle("hide");
      addSection.classList.toggle("hide");
      contactsMain.classList.toggle("hide");
    });
  }

  //Hide the add contact page
  cancel.addEventListener("click", (event) => {
    noSection.classList.toggle("hide");
    nav.classList.toggle("hide");
    addSection.classList.toggle("hide");
    contactsMain.classList.toggle("hide");
  });
});
