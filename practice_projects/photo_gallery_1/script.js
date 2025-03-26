document.addEventListener("DOMContentLoaded", () => {
  let mainImg = document.querySelector("#focused");
  let thumbnails = document.querySelectorAll("li");

  for (let i = 0; i < thumbnails.length; i++) {
    const thumbnail = thumbnails[i];

    thumbnail.addEventListener("click", (event) => {
      //Get the thumbnail img element
      let clickedThumbnail = event.currentTarget.firstElementChild;
      if (clickedThumbnail.getAttribute("src") === mainImg.getAttribute("src"))
        return;

      //Change the focused img to match selected thumbnail
      mainImg.classList.toggle("fade-in-image");
      mainImg.setAttribute("src", clickedThumbnail.getAttribute("src"));

      //Removes border from previously selected thumbnail then adds it to clicked thumbnail
      document.querySelector(".selected").classList.remove("selected");
      clickedThumbnail.classList.add("selected");
    });
  }
});
