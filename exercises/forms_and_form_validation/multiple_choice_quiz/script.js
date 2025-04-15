const questions = [
  {
    id: 1,
    description: "Who is the author of The Hitchhiker's Guide to the Galaxy?",
    options: [
      "Dan Simmons",
      "Douglas Adams",
      "Stephen Fry",
      "Robert A. Heinlein",
    ],
  },
  {
    id: 2,
    description:
      "Which of the following numbers is the answer to Life, the \
                  Universe and Everything?",
    options: ["66", "13", "111", "42"],
  },
  {
    id: 3,
    description: "What is Pan Galactic Gargle Blaster?",
    options: ["A drink", "A machine", "A creature", "None of the above"],
  },
  {
    id: 4,
    description: "Which star system does Ford Prefect belong to?",
    options: ["Aldebaran", "Algol", "Betelgeuse", "Alpha Centauri"],
  },
];

const answerKey = {
  1: "Douglas Adams",
  2: "42",
  3: "A drink",
  4: "Betelgeuse",
};

document.addEventListener("DOMContentLoaded", () => {
  let questionTemplate = Handlebars.compile(
    document.getElementById("question-template").getHTML()
  );
  Handlebars.registerPartial(
    "choices",
    document.getElementById("choices-partial").getHTML()
  );

  let quiz = questionTemplate({ questions });

  document.getElementById("questions").innerHTML = quiz;
});
