import axios from "axios";

function fetchData() {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      console.log("Fetched data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error; // rethrow to be caught in the main function
    });
}

function processData(data) {
  // Simulating processing data
  console.log("Processing data:", data);
  return data; // return processed data for further use
}

function saveData(data) {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", data)
    .then((response) => {
      console.log("Saved data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      throw error; // rethrow to be caught in the main function
    });
}

function main() {
  fetchData()
    .then(processData)
    .then(saveData)
    .then(() => {
      console.log("All done");
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

main();
