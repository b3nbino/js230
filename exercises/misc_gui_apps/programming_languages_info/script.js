let languages = [
  {
    language: "JavaScript",
    description:
      "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.",
  },
  {
    language: "HTML",
    description:
      "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).",
  },
  {
    language: "CSS",
    description:
      "Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.",
  },
  {
    language: "TypeScript",
    description:
      "TypeScript is a programming language that adds static type checking to JavaScript.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  languages.forEach((obj, index) => {
    //Get each part of the article
    let article = document.querySelector("#lang" + String(index + 1));
    let h2 = article.querySelector("h2");
    let p = article.querySelector("p");

    //Fill each article with respective content
    h2.textContent = obj.language;

    if (obj.description.length > 120) {
      p.textContent = obj.description.slice(0, 120) + "...";

      let a = document.createElement("a");
      a.textContent = "Show More";
      article.appendChild(a);

      // Add an event listener to the show more button
      a.addEventListener("click", (event) => {
        event.preventDefault();

        if (a.textContent === "Show More") {
          p.textContent = obj.description;
          a.textContent = "Show Less";
        } else {
          p.textContent = obj.description.slice(0, 120) + "...";
          a.textContent = "Show More";
        }
      });
    } else {
      p.textContent = obj.description;
    }
  });
});
