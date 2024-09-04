//Call Back Hell
const fetchData1 = (cb) => {
  setTimeout(() => {
    cb("sahil");
  }, 1000);
};

const fetchData2 = (cb) => {
  setTimeout(() => {
    cb(23);
  }, 1000);
};

const userInfo = (name, age) => {
  console.log(name, age);
};
const main = () => {
  fetchData1((name) => {
    fetchData2((age) => {
      userInfo(name, age);
    });
  });
};
main();
