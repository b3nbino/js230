let mainHeader = document.body.childNodes[3];
document.body.insertBefore(mainHeader, document.body.firstChild);

let title = document.querySelector("h1");
mainHeader.insertBefore(title, mainHeader.firstChild);

let images = document.querySelectorAll("figure");
document.querySelector("article").appendChild(images[1]);
document.querySelector("article").appendChild(images[0]);
