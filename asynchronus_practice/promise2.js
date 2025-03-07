function downloadFilePromise(callback) {
  return new Promise((resolve, reject) => {
    console.log("Downloading file...");

    setTimeout(() => {
      resolve("Download complete!");
    }, 1500);
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

function flakyService() {
  return new Promise((resolve, reject) => {
    let randNum = Math.random();
    if (randNum > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  })
    .then(console.log)
    .catch(console.error);
}

// flakyService();

function operation() {
  return new Promise((resolve) => {
    console.log("Operation started");
    setTimeout(() => {
      resolve("Operation complete");
    }, 1000);
  });
}

operation()
  .then(console.log)
  .finally(() => {
    console.log("Cleaning up resources...");
  });

Promise.resolve(7)
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then((result) => console.log(result));
