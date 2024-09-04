import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow to be caught in the main function
  }
}

async function processData(data) {
  // Simulating processing data
  console.log("Processing data:", data);
  return data; // return processed data for further use
}

async function saveData(data) {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );
    console.log("Saved data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error; // rethrow to be caught in the main function
  }
}

async function main() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    await saveData(processedData);
    console.log("All done");
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

main();
