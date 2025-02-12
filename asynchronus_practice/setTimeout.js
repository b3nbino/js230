function delayLog() {
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
}

// delayLog();

function afterNSeconds(callback, duration) {
  setTimeout(callback, duration * 1000);
}

function startCounting() {
  let num = 1;
  return setInterval(() => {
    console.log(num);
    num++;
  }, 1000);
}

function stopCounting(id) {
  clearInterval(id);
}

let id = startCounting();
stopCounting(id);
