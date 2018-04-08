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
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function(value) {
        return value;
      };

  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(err) {
        throw err;
      };

  const _this = this;
  let promise2;
  if (_this.status === 'fulfilled') {
    promise2 = new Promises(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  if (_this.status === 'rejected') {
    promise2 = new Promises(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  if (_this.status === 'pending') {
    promise2 = new Promises(function(resolve, reject) {
      // 将成功的回调添加到数组中
      _this.onFulfilledCb.push(function() {
        setTimeout(function() {
          try {
            let x = onFulfilled(_this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });

      _this.onRejectedCb.push(function() {
        setTimeout(function() {
          try {
            let x = onRejected(_this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  }

  return promise2;
};

// 验证部分
function resolvePromise(p2, x, resolve, reject) {
  if (p2 === x) {
    // 不能返回自己
    return reject(new TypeError('循环引用'));
  }
  let called; // 表示是否调用成功or失败
  // x返回的可能是对象和函数也可能是一个普通的值
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          function(y) {
            // 防止多次调用
            if (called) return;
            called = true;
            // y可能还是个promise，所以递归继续解析只到返回一个普通值
            resolvePromise(p2, y, resolve, reject);
          },
          function(e) {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 处理then不是函数的情况，如{then: 1}，就直接返回成功
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x); // 返回一个普通值
  }
}
module.exports = Promises;
