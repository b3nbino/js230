function basicCallback(callback, num) {
  setTimeout(callback, 2000, num);
}

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

function startCounter(callback) {
  let count = 0;
  setInterval(() => {
    count += 1;
    console.log(count);
    callback();
  }, 1000);
}
