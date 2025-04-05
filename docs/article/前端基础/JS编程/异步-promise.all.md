# 异步-promise.all

## 一、Promise概念
Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一。

Promise.all()接受一个由promise任务组成的数组，可以同时处理多个promise任务，当所有的任务都执行完成时，Promise.all()返回resolve，但当有一个失败(reject)，则返回失败的信息，即使其他promise执行成功，也会返回失败。

和后台的事务类似。和rxjs中的forkJoin方法类似，合并多个 Observable 对象 ，等到所有的 Observable 都完成后，才一次性返回值。

## 二、Promise.all 如何使用

对于 Promise.all(arr) 来说，在参数数组中所有元素都变为决定态后，然后才返git回新的 promise。

```js
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});
```

```js
// 以下 demo，请求两个 url，当两个异步请求返还结果后，再请求第三个 url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)
Promise.all([p1, p2])
  .then((datas) => { // 此处 datas 为调用 p1, p2 后的结果的数组
    return request(`http://some.url.3?a=${datas[0]}&b=${datas[1]}`)
  })
  .then((data) => {
    console.log(msg)
  })
```

### 三、Promise.all 代码实现

`Promise.all` 是支持链式调用的，本质上就是返回了一个 `Promise` 实例，通过 `resolve` 和` reject` 来改变实例状态。

```js
Promise.all = function(promiseList) {
  return new Promise((resolve, reject) => {
    // 异常处理
    if (!Array.isArray(promiseList)) {
      return reject(new TypeError('argument must be an array'));
    }

    let result = [];
    let resolvedCount = 0;
    for (let i = 0; i < promiseList.length; i++) {
      let p = promiseList[i];
      p.then(res => {
        result[i] = res; // 按索引号接收结果，防止顺序错乱
        resolvedCount++;
        if (resolvedCount === promiseList.length) { // 全部 promise 完成时，resolve并返回结果
          resolve(result);
        }
      }, (err) => {
        reject(err) // 任何一个 promise 报错，则 promise.all 返回报错
      });
    }
  })
}

var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)
var pAll = Promise.all([p1,p2,p3]).then(result => {
    console.log(result);
}, (err) => {
    console.error(err);
})

```

### 四、Promise.all错误处理

有时候我们使用Promise.all()执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回reject，要错都错，这样显然是不合理的。如何做才能做到promise.all中即使一个promise程序reject，promise.all依然能把其他数据正确返回呢?

- 1、全部改为串行调用（失去了node 并发优势）
- 2、当promise捕获到error 的时候，代码吃掉这个异常，返回resolve，约定特殊格式表示这个调用成功了

```js
var p1 =new Promise(function(resolve,reject){
  setTimeout(function(){
      resolve(1);
  },0)
});
var p2 = new Promise(function(resolve,reject){
  setTimeout(function(){
      resolve(2);
  },200)
 });
 var p3 = new Promise(function(resolve,reject){
  setTimeout(function(){
      try{
      console.log(XX.BBB);
      }
      catch(exp){
          resolve("error");
      }
  },100)
});
Promise.all([p1, p2, p3]).then(function (results) {
  console.log("success")
  console.log(results);
}).catch(function(r){
  console.log("err");
  console.log(r);
});

```