async function asyncDownloadFile() {
  console.log("Downloading file...");

  let result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Download complete!");
    }, 1500);
  });

  console.log(result);
}

// asyncDownloadFile();

async function asyncLoadData() {
  try {
    let result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      });
    }, 1000);

    console.log(result);
  } catch (e) {
    console.error("Data did not load:", e);
  }
}

// asyncLoadData();

async function fetchResource(url) {
  try {
    let resource = await fetch(url);
    resource = await resource.json();
    console.log(resource);
  } catch (e) {
    console.error("Failed to load resource:", url);
  } finally {
    console.log("Resource fetch attempt made");
  }
}

// Example usage:
fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// Logs fetched data, then "Resource fetch attempt made"
fetchResource("invalidUrl");
// Logs "Failed to load resource", then "Resource fetch attempt made"
