function dowloadFilePromise() {
  return new Promise((resolve, reject) => {
    console.log("Downloading file...");
    setTimeout(() => {
      resolve("Download complete!");
    }, 1000);
  });
}

function processDataPromise(arr, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let processed = arr.map(callback);
      resolve(processed);
    }, 1000);
  });
}

// Example usage:
// processDataPromise([1, 2, 3], (number) => number * 2).then(
//   (processedNumbers) => {
//     console.log(processedNumbers);
//     // After 1 second, logs: [2, 4, 6]
//   }
// );

let flakyService = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Operation successful");
  } else {
    reject("Operation failed");
  }
});
flakyService
  .then((result) => {
    console.log(result);
  })
  .catch((result) => {
    console.log(result);
  });

let operation = new Promise((resolve, reject) => {
  resolve();
});
operation.then().catch().finally();
