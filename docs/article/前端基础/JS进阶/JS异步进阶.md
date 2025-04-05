# JS异步进阶

## 前言

本文分为以下几个部分：

- 为什么需要异步？
- 异步的实现机制？EventLoop？
- 宏任务和微任务？
- 异步的演化

## 一、异步基础
### 为什么需要异步
JS设计为单线程，同步会阻塞代码的执行，异步不会阻塞代码的执行

### 异步的使用场景
- 网络请求，如Ajax请求
- 定时任务，如setTimeout

### Promise的基本使用
问题：回调地狱
promise的好处：窜行的方式代替回调嵌套

## 二、异步编程的演化

- callback
- promise
- generator
- async/await

### callback
高阶函数：接受函数作为参数的函数

```js
function sayHello(callback) {
  console.log('Hello');
  return callback()
}
sayHello(() => {
  console.log('callback')
})
```

比如下面的高阶函数例子：

```js
[1,2,3].map(el => el * el);
[1,2,3].filter(el => el > 2);
```

高阶函数中的函数参数被执行，就是回调，异步编程中回调是非常常见的编程范式。

但是会有回调地狱的问题，造成阅读困难，我们可以通过将函数进行提取缓解，但依然很难阅读。

为了解决这个问题，JS引入了 **promise**

### Promise
promise 有三个状态：`pending` `fulfilled` `rejected` ，默认状态是 `pending`

promise 内部可以通过 `resolve()` 修改状态为` fulfilled`，或` reject()` 修改状态为 `rejected`

修改状态为 fulfilled 会触发 promise.then()
修改状态为 rejected 会触发 promise.catch()

因此我们可以把成功的回调处理函数传入 promise.then()，报错的回调处理函数放入 promise.catch()

```js
const p = new Promise((resolved, rejected) => {
  resolved(1);
})
p.then((result) => {
  console.log(result);
})

```

promise 还支持链式调用，可以简化代码

但是毕竟还是异步的思维，于是ES7引入了 Async/Await ，一步到位

async 放在函数前，表示返回的是一个包裹了返回值的 promise，同时告诉JS引擎内部可能有异步函数调用
await 一定要配合 async 才能使用，不然会报错

**有了 async/await 组合，我们可以使用同步的写法来处理异步调用了**

错误处理可以用 `try{} catch(){}`

```js
try {

} catch(err) {

}
```

### async/await

同步语法，彻底消灭回调函数

### 1、async/await 使用

```js
// async function() {
//   await 
// }
```

### 2、async/await 和 Promise 的关系
- 执行async函数，返回的是一个Promise对象
- await 相当于 promise 的 then
- try...catch可捕获异常，代替了 promise 的 catch

### 3、async/await是语法糖，异步的本质还是回调函数
- async 函数会同步执行
- await 的后面，都可以看成是 callback 里的内容，即异步

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

```


### 4、for...of 的应用场景
- forEach for...in 同步
- for...of 支持异步

```js
async function multiple(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000)
    })
    
}

// forEach 是同步的，因此1秒后，全部输出
[1,2,3].forEach(async n => {
    let res = await multiple(n)
    console.log(res);
})

// for...of 支持异步，1秒输出一个数
for (let i of [1,2,3]) {
    let res = await multiple(i);
    console.log(res)
}
```

## 三、宏任务和微任务
### 什么是宏任务，什么是微任务？
- 宏任务：SetTimeout、Ajax、I/O、DOM事件
- 微任务：Promise、Async/Await

### 为什么要加入微任务？
宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合了，比如监听 DOM 的变化。

监听 DOM 变化技术方案的演化史
1. 轮询
2. Mutation Event
3. Mutation Observer（采用微任务机制，有效地权衡了实时性和执行效率的问题）

### Eventloop 和 DOM渲染
eventloop过程：
1. 执行当前同步代码，
2. callstack空闲，检查当前宏任务的微任务队列，并依次执行
3. 尝试DOM渲染
4. 触发EventLoop，从消息队列中获取宏任务并执行

### 宏任务和微任务的区别
- **本质：宏任务是由浏览器规定的、微任务是ES6语法规定的**
- **在EventLoop中的位置：微任务在DOM渲染前触发；宏任务在DOM渲染后触发**
- 实现原理：微任务会被放入当前**执行栈的微任务队列**中，执行时机是在主函数执行结束之后、当前宏任务结束之前执行回调函数；宏任务是把异步回调函数封装成一个宏任务，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数

### setTimeout的实现原理
渲染进程内部的延迟执行队列

### ajax的实现原理
![](https://static001.geekbang.org/resource/image/29/c6/2914a052f4f249a52077692a22ee5cc6.png)

执行流程：
1. 利用IPC和网络进程通讯
2. 网络进程发送网络请求到服务器
3. 网络进程收到服务器返回的消息，将消息体封装起来加入到消息队列中
4. 等当前执行栈空时，从消息队列中取出并执行

## 问答题：

### EventLoop的机制

> EventLoop 是 JS异步回调的实现机制

eventloop 执行过程：

1. 首先执行同步代码
2. 遇到异步调用，如setTimeout或ajax请求等web api时，则交由浏览器的其他进程或线程处理，继续执行同步代码
3. 异步调用处理完毕后，会将回调加入到回调队列中，等到同步代码执行完毕，会依次从回调队列取出并加入到执行栈中执行

### Promise 有哪三种状态？如何变化？

#### 三种状态：

- pending resolved rejected
- pending -> resolved 或 pending -> rejected
- 变化不可逆

#### 状态的表现

- resolved 会触发 then 回调函数
- rejected 会触发 catch 回调函数

#### then和catch状态改变规则（重要）

- `Promise.then` 正常返回 `resolved` ，里面有报错则返回 `rejected`
- `Promise.catch` 正常返回 `resolved` ，里面有报错则返回 `rejected`

## 场景题
### 场景题1：promise then和catch的连接

第一题：

```js
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})

```

第二题：

```js
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('error1')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
```

第三题：

```js
Promise.resolve().then(() => {
    console.log(1);
    throw new Error('err')
}).catch(() => {
    console.log(2)
}).catch(() => {
    console.log(3)
})
```

### 场景题2：async/await语法

```js
async function fn() {
  return 100
}
(async function() {
  const a = fn()
  const b = await fn()
})
```



```js
(async function() {
  console.log('start')
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  console.log('c', c)
  console.log('end')
})()
```



### 场景题3：promise 和 setTimeout 的顺序

```js
console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)
```



### 场景题4：外加async/await的顺序问题

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');
```

### 图片请求

[codepen](https://codepen.io/RealAaron/pen/BadJodP?editors=1011)

### Ajax请求封装
TODO...
### 模拟红绿灯

[codepen](https://codepen.io/RealAaron/pen/abyEBqx)

### 手写Promise

- 初始化 & 异步调用
- then catch 链式调用
- API .resolve .reject .all .race

```js
/**
 * @description MyPromise
 * @author Aaron
 */
class MyPromise {
  state = 'pending' // 状态 pending fulfilled rejected
  value = undefined // 成功后的值
  reason = undefined // 失败后的原因

  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor(fn) { // 传入有异步操作的函数
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn(value));
      }
    }

    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectCallbacks.forEach(fn => fn(reason));
      }
    }
    try {
      fn(resolveHandler, rejectHandler); // 跑异步代码
    } catch(err) {
      rejectHandler(err);
    }
  }

  then(fn1, fn2) {
    // 当pending状态时，fn1和fn2会保存在callbacks中
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (v) => v;

    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
            resolve(newValue);
          } catch (err) {
            reject(err)
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            resolve(newReason);
          } catch (err) {
            reject(err)
          }
        });
      })
    } else if (this.state === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue)
        } catch(err) {
          reject(err)
        }
      })
    } else if (this.state === 'rejected') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (err) {
          reject(err)
        }
      })
      return p1;
    }
  } 

  // 就是 then 的一个语法糖，简单模式
  catch(fn) {
    return this.then(null, fn)
  }

}


MyPromise.resolve = (value) => {
  return new MyPromise((resolve, reject) => resolve(value));
}

MyPromise.reject = (reason) => {
  return new MyPromise((resolve, reject) => reject(reason));
}

MyPromise.all = (promiseList = []) => {
  return new MyPromise((resolve, reject) => {
    const result = []; // 存储所有的返回结果
    const length = promiseList.length;
    let resolveCount = 0;

    promiseList.forEach((p,index) => {
      p.then(data => {
        result[index] = data; // 注意：这里promise resolve的结果需对应到result索引中
        resolveCount ++;
        
        if (resolveCount == length) {
          resolve(result);
        }
      }).catch (err => {
        reject(err)
      })
    })
  })
}

MyPromise.race = (promiseList = []) => {
  let resolved = false; // 标记
  return new MyPromise((resolve, reject) => {
    promiseList.forEach(p => {
      p.then(data => {
        if (!resolved) {
          resolve(data);
          resolve = true;
        }
      }).catch (err => {
        reject(err);
      });
    })
  })
}


const p1 = new MyPromise((resolve, reject) => {
  // resolve(100)
  // reject('错误信息...');
  setTimeout(() => {
    resolve(100)
  }, 500)
})

const p11 = p1.then(data1 => {
  console.log('data1 ', data1);
  return data1 + 1;
})

const p12 = p11.then(data2 => {
  console.log('data2 ', data2);
  return data2 + 2;
})

const p13 = p12.catch(err => console.error(err));

const p2 = MyPromise.resolve(200)
const p3 = MyPromise.reject('错误信息...')
const p4 = MyPromise.all([p1,p2]) // 传入 promise 数组，等待所有都 fulfilled 之后，返回新 Promise，包含前面所有的结果
const p5 = MyPromise.race([p1,p2]) // 传入 promise 数组，只要有一个 fulfilled ，即可返回
```

[codepen](https://codepen.io/RealAaron/pen/MWvrdEQ?editors=0012)