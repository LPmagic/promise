const Promises = require('./index');

let p = new Promises(function(resolve, reject) {
  // 异步操作
  setTimeout(function() {
    resolve('ok');
  }, 1000);
}).then(
  function(data) {
    console.log(data); // 'ok'
    return `下面的人接着  + ${data}`;
  },
  function(err) {
    console.log(err);
  }
);
