document.addEventListener("DOMContentLoaded", () => {
  let calculator = {
    init() {
      //Set-up variables
      this.total = 0;
      this.currNum = 0;
      this.lastOperator = "+";
      this.operated = false;

      //Get elements
      this.buttons = document.getElementById("buttons");
      this.entry = document.getElementById("entry");
      this.operation = document.getElementById("operation");
      this.bindEvents();
    },
    bindEvents() {
      this.buttons.addEventListener("click", (event) => {
        event.preventDefault();

        let clicked = event.target.textContent;

        switch (clicked) {
          case "CE":
            this.clearEntry();
            break;
          case "C":
            this.clearAll();
            break;
          case "NEG":
            this.negate();
            break;
          case "/":
            this.divide();
            break;
          case "x":
            this.multiply();
            break;
          case "-":
            this.subtract();
            break;
          case "+":
            this.add();
            break;
          case "=":
            this.equals();
            break;
          case "%":
            this.modulo();
            break;
          case ".":
            this.decimal();
            break;
          default:
            //Handles number button presses
            if (this.entry.textContent === "0" || this.operated === true) {
              this.entry.textContent = clicked;
              this.operated = false;
            } else {
              this.entry.textContent += clicked;
            }
            this.currNum = Number(this.entry.textContent);
            break;
        }
      });
    },
    calculateTotal(newOperator) {
      //Does the last operation queued
      switch (this.lastOperator) {
        case "+":
          this.total += this.currNum;
          break;
        case "-":
          this.total -= this.currNum;
          break;
        case "x":
          this.total *= this.currNum;
          break;
        case "/":
          this.total /= this.currNum;
          break;
        case "%":
          this.total %= this.currNum;
          break;
      }
      this.lastOperator = newOperator;
      return this.total;
    },
    add() {
      this.operation.textContent += String(this.currNum) + " + ";

      this.currNum = this.calculateTotal("+");
      this.entry.textContent = this.currNum;

      this.operated = true;
    },
    subtract() {
      this.operation.textContent += String(this.currNum) + " - ";

      this.currNum = this.calculateTotal("-");
      this.entry.textContent = this.currNum;

      this.operated = true;
    },
    multiply() {
      this.operation.textContent += String(this.currNum) + " x ";

      this.currNum = this.calculateTotal("x");
      this.entry.textContent = this.currNum;

      this.operated = true;
    },
    divide() {
      this.operation.textContent += String(this.currNum) + " / ";

      this.currNum = this.calculateTotal("/");
      this.entry.textContent = this.currNum;

      this.operated = true;
    },
    modulo() {
      this.operation.textContent += String(this.currNum) + " % ";

      this.currNum = this.calculateTotal("%");
      this.entry.textContent = this.currNum;

      this.operated = true;
    },
    equals() {
      this.operation.textContent = "";
      this.currNum = this.calculateTotal("+");
      this.total = 0;
      this.entry.textContent = this.currNum;
      this.operated = true;
    },
    clearAll() {
      this.operation.textContent = "";
      this.total = 0;
      this.lastOperator = "+";
      this.clearEntry();
    },
    clearEntry() {
      this.entry.textContent = "0";
      this.currNum = 0;
      this.operated = false;
    },
    negate() {
      this.currNum = this.currNum * -1;
      this.entry.textContent = this.currNum;
    },
    decimal() {
      if (this.entry.textContent.includes(".")) return;
      this.entry.textContent += ".";
    },
  };

  calculator.init();
});
