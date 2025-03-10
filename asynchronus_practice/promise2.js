const res = require("express/lib/response");

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

// let flakyService = new Promise((resolve, reject) => {
//   let randNum = Math.random();

//   if (randNum > 0.5) {
//     resolve("Operation successful!");
//   } else {
//     reject("Operation failed...");
//   }
// })
// .then(console.log)
// .catch(console.error);

// let cleanup = new Promise((resolve) => resolve("Operation complete")).finally(
//   () => {
//     console.log("Starting cleanup...");
//     setTimeout(() => {
//       console.log("Cleanup complete!");
//     }, 5000);
//   }
// );

let chain = new Promise((resolve) => resolve(5))
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then(console.log);
