document.querySelector("html").addEventListener("click", (event) => {
  let elem = document.querySelector("#container");
  if (!elem.contains(event.target)) {
    elem.style = "display: none";
  }
});
