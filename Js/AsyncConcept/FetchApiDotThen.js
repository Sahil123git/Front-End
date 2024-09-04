const getPost = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Something went wrong");
      }
      return resp.json();
    })
    .then((resp) => {
      //   console.log({ resp });
      return resp;
    });
};
const processData = (prevResp) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log({ prevResp });
      res("Data Processed");
    }, 1000);
  });
};
const sendData = (data) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "sahil" }),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      console.log({ resp, data });
    });
};
const main1 = () => {
  getPost()
    .then(processData)
    .then(sendData)
    .catch((err) => console.log(err));
};
const main2 = async () => {
  try {
    const resp = await getPost();
    console.log({ resp });
  } catch (err) {
    console.log(err);
  }
};
main1(); //using .then
main2(); //using await/async
