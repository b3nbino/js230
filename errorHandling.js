function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
      localStorage;
    }
  });
}

flakyService()
  .then(console.log)
  .catch(() => console.error("An error occurred"));

function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

fetchUserData()
  .then()
  .catch((e) => console.error(e.error))
  .finally(() => console.log("Fetching complete."));

function retryOperation(operationFunc) {
  let tries = 0;

  while (tries < 3) {
    try {
      tries += 1;
      let result = operationFunc();
      if (result === "Success!") {
        return result;
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Operation failed");
}

// Example usage:
retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))
    )
);
