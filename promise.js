const Promises = require('./index');

let p = new Promises((resolve, reject) => {
  // 异步操作
  setTimeout(function() {
    resolve('ok');
  }, 1000);
}).then(
  data => {
    console.log(1);
    console.log(data); // 'ok'
    return `下面的人接着  + ${data}`;
  },
  err => {
    console.log(2);
    console.log(err);
  }
);
