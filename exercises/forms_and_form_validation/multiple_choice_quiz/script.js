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
  //Add quiz questions to DOM
  {
    let questionTemplate = Handlebars.compile(
      document.getElementById("question-template").getHTML()
    );
    Handlebars.registerPartial(
      "choices",
      document.getElementById("choices-partial").getHTML()
    );

    let quiz = questionTemplate({ questions });

    document.getElementById("questions").innerHTML = quiz;
  }

  let form = document.getElementById("quiz");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let submitButton = document.getElementById("submit");
    submitButton.setAttribute("disabled", true);
    let data = new FormData(form);
    let values = data.entries();

    values.forEach((question) => {
      let id = question[0][1];
      let answer = document.getElementById(`answer${id}`);

      if (question[1] === "null") {
        answer.textContent = `You didn't answer this question. The correct answer is ${answerKey[id]}`;
        answer.classList.add("wrong");
      } else if (question[1] === answerKey[id]) {
        answer.textContent = `Correct!`;
        answer.classList.add("correct");
      } else {
        answer.textContent = `Wrong answer. The correct answer is ${answerKey[id]}`;
        answer.classList.add("wrong");
      }

      answer.style.display = "block";
    });
  });

  form.addEventListener("reset", (event) => {
    event.preventDefault();

    {
      let questionTemplate = Handlebars.compile(
        document.getElementById("question-template").getHTML()
      );
      Handlebars.registerPartial(
        "choices",
        document.getElementById("choices-partial").getHTML()
      );

      let quiz = questionTemplate({ questions });

      document.getElementById("questions").innerHTML = quiz;
    }

    document.getElementById("submit").removeAttribute("disabled");
  });
});
