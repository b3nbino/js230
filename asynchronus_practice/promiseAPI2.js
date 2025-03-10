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

// Promise.all([flakyService(), flakyService(), loadData()])
//   .then(console.log)
//   .catch(() => console.error("One or more operations failed."));

const firstResource = new Promise((resolve) =>
  setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
  setTimeout(() => resolve("Second resource loaded"), 1000)
);

// Promise.race([firstResource, secondResource]).then(console.log);

const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services).then((resultsArr) => {
//   resultsArr.forEach((service) => {
//     if (service.status === "fulfilled") {
//       console.log(service.value);
//     } else {
//       console.error(service.reason);
//     }
//   });
// });

// Promise.any(services)
//   .then(console.log)
//   .catch((error) => console.error("All operations failed:", error));

function loadResource(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error("Something went wrong :(", err));
}

// loadResource("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
// // Success response

// loadResource("badUrl.xyz").then(console.log);
// Failed to fetch

function loadMultipleResources(urlArr) {
  return Promise.allSettled(urlArr.map((url) => fetch(url)));
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
