const tracker = {
  events: [],
  tags: [],

  list() {
    return [...this.events];
  },
  elements() {
    return [...this.tags];
  },
  clear() {
    this.events = [];
    this.tags = [];
  },
};

function track(callback) {
  return function (event) {
    if (!tracker.list().includes(event)) {
      tracker.events.push(event);
      tracker.tags.push(event.target);
      callback(event);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  let divRed = document.querySelector("#red");
  let divBlue = document.querySelector("#blue");
  let divOrange = document.querySelector("#orange");
  let divGreen = document.querySelector("#green");

  divRed.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "red";
    })
  );

  divBlue.addEventListener(
    "click",
    track((event) => {
      event.stopPropagation();
      document.body.style.background = "blue";
    })
  );

  divOrange.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "orange";
    })
  );

  divGreen.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "green";
    })
  );
});
