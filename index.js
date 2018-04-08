const Promises = executor => {
  const _this = this;
  _this.status = 'pending';
  _this.value = null;
  _this.reason = null;

  const resolve = value => {
    if (_this.status === 'pending') {
      _this.status = 'fulfilled';
      self.value = value;
    }
  };

  const reject = reason => {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      self.reason = reason;
    }
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
};

Promises.prototype.then = function(onFulfilled, onRejected) {
  const _this = this;
  if (_this.status === 'fulfilled') {
    onFulfilled();
  }

  if (_this.status === 'rejected') {
    onRejected();
  }
};

module.exports = Promise;
