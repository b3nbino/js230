document.addEventListener("DOMContentLoaded", () => {
  let noSection = document.getElementById("no-contacts");
  let addSection = document.getElementById("add-contacts");
  let contactsMain = document.getElementById("contacts");
  let nav = document.querySelector("nav");
  let addButtons = document.querySelectorAll("button.add");
  let cancel = document.getElementById("cancel");
  let createForm = document.getElementById("create");

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

  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Convert form values into object
    let data = createForm.elements;
    let json = {};

    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let key = element.name;
      let value = element.value;

      if (element.type !== "submit") {
        json[key] = value;
      }
    }

    let response = await fetch(createForm.action, {
      method: createForm.method,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(json),
    });

    createForm.reset();
  });
});
