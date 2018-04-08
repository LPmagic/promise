function Promises(executor) {
  const _this = this;
  _this.status = 'pending';
  _this.value = null;
  _this.reason = null;
  _this.onFulfilledCb = [];
  _this.onRejectedCb = [];

  const resolve = value => {
    if (_this.status === 'pending') {
      _this.status = 'fulfilled';
      _this.value = value;
      _this.onFulfilledCb.forEach(item => {
        item();
      });
    }
  };

  const reject = reason => {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      _this.reason = reason;

      _this.onRejectedCb.forEach(item => {
        item();
      });
    }
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 这里不能使用箭头函数
Promises.prototype.then = function(onFulfilled, onRejected) {
  const _this = this;
  if (_this.status === 'fulfilled') {
    onFulfilled(_this.value);
  }

  if (_this.status === 'rejected') {
    onRejected(_this.reason);
  }

  if (_this.status === 'pending') {
    // 将成功的回调添加到数组中
    _this.onFulfilledCb.push(function() {
      onFulfilled(_this.value);
    });
    _this.onRejectedCb.push(function() {
      onRejected(_this.reason);
    });
  }
};

module.exports = Promises;
