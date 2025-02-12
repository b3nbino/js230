function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  });
}

//Example of using all method
// Promise.all([flakyService(), flakyService(), loadData()])
//   .then((result) => console.log(result))
//   .catch(() => console.log("One or more operation failed."));

const firstResource = new Promise((resolve) =>
  setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
  setTimeout(() => resolve("Second resource loaded"), 1000)
);

//Race ex:
// Promise.race([firstResource, secondResource]).then((result) =>
//   console.log(result)
// );

const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services).then((resultArr) =>
//   resultArr.forEach((result) => console.log(result.status))
// );

function loadResource(url) {
  return fetch(url)
    .then((result) => result.json())
    .catch(() => "Failed to fetch");
}

// loadResource("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
// Success response

// loadResource("badUrl.xyz").then(console.log);
// Failed to fetch

function loadMultipleResources(resourcesArr) {
  return Promise.allSettled(resourcesArr.map(loadResource));
}

loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch
