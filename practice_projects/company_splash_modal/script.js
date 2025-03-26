document.addEventListener("DOMContentLoaded", () => {
  let openModal = document.querySelectorAll(".openModal");
  let closeModal = document.querySelectorAll(".closeModal");
  let overlay = document.querySelector("#overlay");

  let chris = document.querySelector("#chrisModal");
  let kevin = document.querySelector("#kevinModal");
  let kasper = document.querySelector("#kasperModal");
  let louis = document.querySelector("#louisModal");

  for (let i = 0; i < openModal.length; i++) {
    const element = openModal[i];

    element.addEventListener("click", (event) => {
      event.preventDefault();
      let linkId = element.getAttribute("id");

      switch (linkId) {
        case "openKevin":
          kevin.style.display = "block";
          overlay.style.display = "block";
          break;
        case "openChris":
          chris.style.display = "block";
          overlay.style.display = "block";
          break;
        case "openKasper":
          kasper.style.display = "block";
          overlay.style.display = "block";
          break;
        case "openLouis":
          louis.style.display = "block";
          overlay.style.display = "block";
          break;
      }
    });
  }

  for (let i = 0; i < closeModal.length; i++) {
    const element = closeModal[i];

    element.addEventListener("click", (event) => {
      event.preventDefault();

      overlay.style.display = "none";
      chris.style.display = "none";
      kevin.style.display = "none";
      louis.style.display = "none";
      kasper.style.display = "none";
    });
  }
});
