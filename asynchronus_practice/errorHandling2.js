const res = require("express/lib/response");

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

// flakyService()
//   .then(console.log)
//   .catch((status) => {
//     console.error("An error occurred.");
//   });

function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

// fetchUserData()
//   .then(console.log)
//   .catch((status) => console.error(status.error))
//   .finally(() => console.log("Fetching complete"));

function retryOperation(operationFunc) {
  operationFunc()
    .catch(operationFunc())
    .catch(operationFunc())
    .then(console.log)
    .catch(() => console.error("Operation failed"));
}

// Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))
//     )
// );

function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

// mockAsyncOp()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => console.log("Operation attempted!"));

function loadData() {
  return new Promise((resolve, reject) => {
    let randNum = Math.random();

    if (randNum < 0.5) {
      resolve("Data loaded");
    } else {
      reject("Network error");
    }
  })
    .then(console.log)
    .catch(() => console.log("Using cached data"));
}

loadData();
