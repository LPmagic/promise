const Promises = require('./index');

let p = new Promise(function(resolve, reject) {
  reject('错错错');
});
p
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log(e); // '错错错'
  });
