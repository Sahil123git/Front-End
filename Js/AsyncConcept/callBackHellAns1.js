const fetchData1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Sahil");
    }, 1000);
  });
};
const fetchData2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(22);
      // reject("user not found");
    }, 1000);
  });
};
const userInfo = (name, age) => {
  console.log({ name, age });
};
const main1 = async () => {
  const userName = await fetchData1();
  const userAge = await fetchData2();

  userInfo(userName, userAge);
};
const main2 = () => {
  fetchData1()
    .then((resp) => {
      console.log(resp);
      return fetchData2();
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
};
main1();
main2();
