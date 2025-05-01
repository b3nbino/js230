document.addEventListener("DOMContentLoaded", () => {
  let noSection = document.getElementById("no-contacts");
  let addSection = document.getElementById("add-contacts");
  let contactsMain = document.getElementById("contacts");
  let nav = document.querySelector("nav");
  let addButtons = document.querySelectorAll("button.add");
  let cancel = document.getElementById("cancel");
  let createForm = document.getElementById("create");

  async function renderContacts() {
    let contacts = await fetch("/api/contacts").then((res) => res.json());

    if (contacts.length > 0) {
      noSection.classList.add("hide");

      let contactTemplateScript = document.getElementById("contact-template");
      let contactTemplate = Handlebars.compile(contactTemplateScript.innerHTML);
      let contactsHTML = contactTemplate({ contacts });

      contactsMain.innerHTML = contactsHTML;
    } else {
      contactsMain.innerHTML = null;
      noSection.classList.remove("hide");
    }
  }

  renderContacts();

  //Show the add contact page
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", (event) => {
      noSection.classList.add("hide");
      nav.classList.toggle("hide");
      addSection.classList.toggle("hide");
      contactsMain.classList.toggle("hide");
    });
  }

  //Hide the add contact page
  cancel.addEventListener("click", (event) => {
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

    renderContacts();
    contactsMain.classList.toggle("hide");
    addSection.classList.toggle("hide");
    nav.classList.toggle("hide");
    createForm.reset();
  });

  contactsMain.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    let id = event.target.dataset.id;

    if (event.target.classList.contains("edit")) {
      //Open edit page for contact
    } else {
      if (window.confirm("Are you sure you want to delete this contact?")) {
        fetch(`/api/contacts/${id}`, {
          method: "DELETE",
        });
      }
    }

    renderContacts();
  });
});
