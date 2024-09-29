function getTimer() {
  for (var i = 0; i < 5; i++) {
    // In this case, var has function scope and is
    setTimeout(() => {
      //not block-scoped. This means that the i inside the
      console.log(i); //setTimeout callback  refers to the same i
    }, i * 1000); // variable
  }
}
function getTimerFixd() {
  for (var i = 0; i < 5; i++) {
    //.here we are using concept of closures
    function time(sec) {
      //to fix the current bug
      setTimeout(() => {
        console.log(sec);
      }, sec * 1000);
    }
    time(i);
  }
}
function gerTimerFixdLet() {
  for (let i = 0; i < 5; i++) {
    //here let is block scoped so each iteration
    setTimeout(() => {
      // of the loop creates a new binding for i
      console.log(i);
    }, i * 1000);
  }
}
getTimer();
getTimerFixd();
gerTimerFixdLet();
