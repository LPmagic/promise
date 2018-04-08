const Promises = require('./index');

let p = new Promises(function(resolve, reject) {
  setTimeout(function() {
    resolve('北京');
  }, 1000);
});
let p2 = new Promises(function(resolve, reject) {
  setTimeout(function() {
    resolve('南京');
  }, 200);
});
let p3 = new Promises(function(resolve, reject) {
  resolve('东京');
});

Promises.all([p, p2, p3]).then(function(data) {
  console.log(data);
});
