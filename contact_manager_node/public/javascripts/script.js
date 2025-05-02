document.addEventListener("DOMContentLoaded", async () => {
  let noSection = document.getElementById("no-contacts");
  let addSection = document.getElementById("add-contacts");
  let editSection = document.getElementById("edit-contacts");
  let contactsMain = document.getElementById("contacts");
  let nav = document.querySelector("nav");
  let addButtons = document.querySelectorAll("button.add");
  let cancelSubmit = document.getElementById("cancel-submit");
  let cancelEdit = document.getElementById("cancel-edit");
  let createForm = document.getElementById("create");
  let editForm = document.getElementById("edit");
  let searchbar = document.getElementById("searchbar");
  let contacts;
  let currId;

  async function renderContacts() {
    contacts = await fetch("/api/contacts").then((res) => res.json());

    if (contacts.length > 0) {
      noSection.classList.add("hide");

      let contactTemplateScript = document.getElementById("contact-template");
      let contactTemplate = Handlebars.compile(contactTemplateScript.innerHTML);
      let contactsHTML = contactTemplate({ contacts });

      contactsMain.innerHTML = contactsHTML;
      contactsMain.classList.remove("hide");
    } else {
      contactsMain.innerHTML = null;
      noSection.classList.remove("hide");
    }
  }

  async function searchContacts(query) {
    contacts = await fetch("/api/contacts")
      .then((res) => res.json())
      .then((res) => res.filter((obj) => obj["full_name"].includes(query)));

    if (contacts.length > 0) {
      noSection.classList.add("hide");

      let contactTemplateScript = document.getElementById("contact-template");
      let contactTemplate = Handlebars.compile(contactTemplateScript.innerHTML);
      let contactsHTML = contactTemplate({ contacts });

      contactsMain.innerHTML = contactsHTML;
      contactsMain.classList.remove("hide");
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
      nav.classList.add("hide");
      addSection.classList.toggle("hide");
      contactsMain.classList.add("hide");
    });
  }

  //Hide the add contact page
  cancelSubmit.addEventListener("click", (event) => {
    nav.classList.remove("hide");
    addSection.classList.add("hide");
    renderContacts();
  });

  //Hide the edit contact page
  cancelEdit.addEventListener("click", (event) => {
    nav.classList.remove("hide");
    editSection.classList.add("hide");
    renderContacts();
  });

  //Handles create form submition event
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

    fetch(createForm.action, {
      method: createForm.method,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(json),
    });

    renderContacts();
    addSection.classList.add("hide");
    nav.classList.remove("hide");
    createForm.reset();
  });

  //Handles edit form submition event
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Convert form values into object
    let data = editForm.elements;
    let json = {};

    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let key = element.name;
      let value = element.value;

      if (element.type !== "submit") {
        json[key] = value;
      }
    }

    fetch(editForm.action + "/" + currId, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(json),
    });

    renderContacts();
    editSection.classList.add("hide");
    nav.classList.remove("hide");
    editForm.reset();
  });

  //Handles edit and delete button clicks on contact
  contactsMain.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    currId = event.target.dataset.id;

    if (event.target.classList.contains("edit")) {
      //Open edit page for contact
      nav.classList.add("hide");
      contactsMain.classList.add("hide");
      editSection.classList.remove("hide");

      let contact = contacts.filter((obj) => obj.id === Number(currId))[0];
      let elements = editForm.elements;

      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];

        if (element.type === "submit") {
          continue;
        }

        element.value = contact[element.name];
      }
    } else {
      if (window.confirm("Are you sure you want to delete this contact?")) {
        fetch(`/api/contacts/${currId}`, {
          method: "DELETE",
        });
      }
      renderContacts();
    }
  });

  //Search bar input
  searchbar.addEventListener("keyup", (event) => {
    console.log(searchbar.value);
    searchContacts(searchbar.value);
  });
});
