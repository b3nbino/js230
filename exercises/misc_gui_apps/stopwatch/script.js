document.addEventListener("DOMContentLoaded", () => {
  //Get the time components of the stopwatch
  let hours = document.querySelector(".hours");
  let mins = document.querySelector(".mins");
  let secs = document.querySelector(".secs");
  let csecs = document.querySelector(".centisecs");

  //Get buttons
  let startStop = document.getElementById("start-stop");
  let reset = document.getElementById("reset");

  let timer = {
    start() {
      startStop.textContent = "Stop";

      //Starts timer counting
      this.timerInterval = setInterval(() => {
        let currHours = Number(hours.textContent);
        let currMins = Number(mins.textContent);
        let currSecs = Number(secs.textContent);
        let currCsecs = Number(csecs.textContent);

        currCsecs += 1;

        if (currCsecs === 100) {
          currCsecs = 0;
          currSecs += 1;
        }
        if (currSecs === 60) {
          currSecs = 0;
          currMins += 1;
        }
        if (currMins === 60) {
          currMins = 0;
          currHours += 1;
        }

        hours.textContent = this.formatNumbers(currHours);
        mins.textContent = this.formatNumbers(currMins);
        secs.textContent = this.formatNumbers(currSecs);
        csecs.textContent = this.formatNumbers(currCsecs);
      }, 10);
    },
    formatNumbers(num) {
      if (num > 9) {
        return String(num);
      } else {
        return String(num).padStart(2, 0);
      }
    },
    stop() {
      //Stops timer counting
      startStop.textContent = "Start";
      clearInterval(this.timerInterval);
    },
    reset() {
      //Sets timer to 00:00:00:00
      hours.textContent = "00";
      mins.textContent = "00";
      secs.textContent = "00";
      csecs.textContent = "00";
    },
    bindEvents() {
      //Adds event listeners to buttons
      startStop.addEventListener("click", () => {
        if (startStop.textContent === "Start") {
          this.start();
        } else {
          this.stop();
        }
      });
      reset.addEventListener("click", this.reset.bind(this));
    },
    init() {
      this.timerInterval = undefined;
      this.bindEvents();
    },
  };

  timer.init();
});
