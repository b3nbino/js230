document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let input1 = document.querySelector("input[name='num1']");
  let input2 = document.querySelector("input[name='num2']");
  let select = document.querySelector("#operator");
  let result = document.querySelector("#result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let operation = select.value;
    let num1 = Number(input1.value);
    let num2 = Number(input2.value);

    switch (operation) {
      case "add":
        result.textContent = num1 + num2;
        break;
      case "subtract":
        result.textContent = num1 - num2;
        break;
      case "multiply":
        result.textContent = num1 * num2;
        break;
      case "divide":
        result.textContent = (num1 / num2).toFixed(2);
        break;
    }
  });
});
