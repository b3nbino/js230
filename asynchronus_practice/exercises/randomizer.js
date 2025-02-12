function randomizer(...callbacks) {
  let seconds = 1;
  let timer = setInterval(() => {
    console.log(seconds);
    seconds++;

    if (seconds >= 2 * callbacks.length) {
      clearInterval(timer);
    }
  }, 1000);

  callbacks.forEach((cb) => {
    let timeout = Math.floor(Math.random() * 2000) * callbacks.length;
    setTimeout(cb, timeout);
  });
}

function callback1() {
  console.log("callback1");
}

function callback2() {
  console.log("callback2");
}

function callback3() {
  console.log("callback3");
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6
