async function greet(name) {
  console.log("Hello", name);
  await console.log("Can you hear me?");
  console.log("Bye now, ", name);
}

// greet("Tom");
// greet("Bradley");

async function asyncDownloadFile() {
  console.log("Downloading file...");
  let result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Download complete!");
    }, 1000);
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
      }, 1000);
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// asyncLoadData();

async function fetchResource(url) {
  try {
    let result = await fetch(url);
    result = await result.json();
    console.log(result);
  } catch (e) {
    console.error("Failed to load resource");
  } finally {
    console.log("Resource fetch attempt made");
  }
}

// Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// Logs fetched data, then "Resource fetch attempt made"
// fetchResource("invalidUrl");
// Logs "Failed to load resource", then "Resource fetch attempt made"

async function fetchUserData(userId) {
  try {
    let user = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    let posts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    let todos = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );

    user = await user.json();
    posts = await posts.json();
    todos = await todos.json();

    console.log(user);
    console.log(posts);
    console.log(todos);
  } catch (error) {
    console.log("Failed to fetch data");
  }
}
