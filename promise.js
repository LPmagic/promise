const Promises = require('./index');

let p = new Promises(function(resolve, reject) {
  setTimeout(function() {
    resolve('北京');
  }, 1000);
});
let p2 = new Promises(function(resolve, reject) {
  setTimeout(function() {
    resolve('南京');
  }, 500);
});
let p3 = new Promises(function(resolve, reject) {
  setTimeout(function() {
    resolve('东京');
  });
});
Promises.race([p, p2, p3]).then(function(data) {
  console.log(data);
});
