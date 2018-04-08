const Promises = require('./index');

function read() {
  let defer = Promises.defer(); // Q里写的是Q.defer()
  defer.resolve(1111);
  return defer.promise;
}

read().then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);
