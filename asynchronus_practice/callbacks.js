function basicCallback(cb, num) {
  setTimeout(cb, 2000, num);
}

// Example usage:
// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);
// After 2 seconds, logs: 10

function downloadFile(callback) {
  console.log("Downloading file...");
  setTimeout(callback, 1500, "Download complete!");
}

function processData(arr, callback) {
  setTimeout(() => {
    let processed = arr.map(callback);
    console.log(processed);
  }, 1000);
}

function waterfallOverCallbacks(callbackArr, num) {
  callbackArr.forEach((callback) => (num = callback(num)));
  console.log(num);
}

// Example usage:
// const double = (x) => x * 2;
// waterfallOverCallbacks([double, double, double], 1);
// Logs: 8

function startCounter(callback) {
  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    if (callback(counter)) {
      clearInterval(intervalId);
    }
  }, 1000);
}

// Example usage:
startCounter((count) => {
  console.log(count);
  return count === 5;
});
// Logs 1, 2, 3, 4, 5, then stops
