document.addEventListener("DOMContentLoaded", () => {
  let images = document.querySelectorAll("img");
  let captionInterval;

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("mouseenter", (event) => {
      let image = event.currentTarget;
      let figure = image.parentElement;
      let figCap = figure.querySelector("figcaption");

      captionInterval = setTimeout(() => {
        figCap.style.display = "block";
      }, 2000);
    });

    images[i].addEventListener("mouseleave", (event) => {
      if (captionInterval) {
        clearTimeout(captionInterval);
        captionInterval = undefined;
      }
      let image = event.currentTarget;
      let figure = image.parentElement;
      let figCap = figure.querySelector("figcaption");

      figCap.style.display = "none";
    });
  }
});
