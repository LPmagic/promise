let p = new Promise((resolve, reject) => {
  reject('失败');
  resolve('成功');
});
p.then(
  data => {
    console.log(data, 1);
  },
  err => {
    console.log(err, 2);
  }
);
