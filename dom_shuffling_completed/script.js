let header = document.querySelector("body > header");
let main = document.querySelector("main");

document.body.insertBefore(header, main);
header.insertBefore(
  document.querySelector("body > main > h1"),
  document.querySelector("header > nav")
);

let section = document.querySelector("section > article");
section.insertAdjacentElement(
  "beforeend",
  document.querySelector("#content > figure:nth-child(3)")
);
section.insertAdjacentElement(
  "beforeend",
  document.querySelector("#content > figure")
);
