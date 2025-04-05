# JS异步编程

内容提要：
* 1、什么是异步？为什么需要异步？
* 2、JS异步是如何实现的?
* 3、JS异步编程方式演化
* 4、实战

### 1、什么是异步？

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d6657dc3a3f68b~tplv-t2oaga2asx-image.image)

同步：一定要等任务执行完了，得到结果，才执行下一个任务。
异步：不等任务执行完，直接执行下一个任务。

日常工作的大部分场景，我们都可以使用同步代码来实现。告诉编译器，你应该先做什么，再做什么：
```javascript
do('来左边儿 跟我一起画个龙'); // 第1步
do('在你右边儿 画一道彩虹（走起）'); // 第2步
do('来左边儿 跟我一起画彩虹'); // 第3步
do('在你右边儿 再画个龙（别停）'); // 第4步
do('在你胸口上比划一个郭富城'); // 第5步
do('...'') //...
```
**如果函数是同步的，即使调用函数执行的任务比较耗时，也会一直等待直到得到预期结果。**

但是也会有一些场景，同步并不能满足，这时就需要用到异步的写法：

```javascript
// 定时器
setTimeout(() => {
    console.log('Hello');
}, 3000)
//读取文件
fs.readFile('hello.txt', 'utf8', function(err, data) {
    console.log(data);
});
//网络请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = xxx; // 添加回调函数
xhr.open('GET', url);
xhr.send(); // 发起函数
```
**如果函数是异步的，发出调用之后，马上返回，但是不会马上返回预期结果。调用者不必主动等待，当被调用者得到结果之后会通过回调函数主动通知调用者。**

"异步模式"非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，"异步模式"甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。

### 2、JS异步是如何实现的？
#### 多线程 VS 单线程

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d6669ca66d5b8c~tplv-t2oaga2asx-image.image)

在上面介绍异步的过程中就可能会纳闷：既然JavaScript是单线程，怎么还存在异步，那些耗时操作到底交给谁去执行了？

众所周知javascript是单线程的，它的设计之初是为浏览器设计的GUI编程语言，GUI编程的特性之一是保证UI线程一定不能阻塞，否则体验不佳，甚至界面卡死。

所谓"单线程"，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

**JavaScript其实就是一门语言，说是单线程还是多线程得结合具体运行环境。JS的运行通常是在浏览器中进行的，具体由JS引擎去解析和运行**。下面我们来具体了解一下浏览器。

#### 浏览器
目前最为流行的浏览器为：Chrome，IE，Safari，FireFox，Opera。**浏览器的内核是多线程的**。
一个浏览器通常由以下几个常驻的线程：

* **渲染引擎线程**：顾名思义，该线程负责页面的渲染
* **JS引擎线程**：负责JS的解析和执行
* 定时触发器线程：处理定时事件，比如setTimeout, setInterval
* 事件触发线程：处理DOM事件
* 异步http请求线程：处理http请求

需要注意的是，渲染线程和JS引擎线程是不能同时进行的。渲染线程在执行任务的时候，JS引擎线程会被挂起。因为JS可以操作DOM，若在渲染中JS处理了DOM，浏览器可能就不知所措了。

#### JS引擎
通常讲到浏览器的时候，我们会说到两个引擎：渲染引擎和JS引擎。渲染引擎就是如何渲染页面，Chrome／Safari／Opera用的是Webkit引擎，IE用的是Trident引擎，FireFox用的是Gecko引擎。不同的引擎对同一个样式的实现不一致，就导致了经常被人诟病的浏览器样式兼容性问题。这里我们不做具体讨论。

**JS引擎可以说是JS虚拟机，负责JS代码的解析和执行**。通常包括以下几个步骤：

* 词法分析：将源代码分解为有意义的分词
* 语法分析：用语法分析器将分词解析成语法树
* 代码生成：生成机器能运行的代码
* 代码执行

不同浏览器的JS引擎也各不相同，Chrome用的是V8，FireFox用的是SpiderMonkey，Safari用的是JavaScriptCore，IE用的是Chakra。

**之所以说JavaScript是单线程，就是因为浏览器在运行时只开启了一个JS引擎线程来解析和执行JS**。那为什么只有一个引擎呢？如果同时有两个线程去操作DOM，浏览器是不是又要不知所措了。

所以，虽然JavaScript是单线程的，可是浏览器内部不是单线程的。一些I/O操作、定时器的计时和事件监听（click, keydown...）等都是由浏览器提供的其他线程来完成的。


#### 消息队列与事件循环

通过以上了解，可以知道其实JavaScript也是通过JS引擎线程与浏览器中其他线程交互协作实现异步。但是回调函数具体何时加入到JS引擎线程中执行？执行顺序是怎么样的？

这一切的解释就需要继续了解消息队列和事件循环。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d667350069d580~tplv-t2oaga2asx-image.image)

如上图所示，左边的栈存储的是同步任务，就是那些能立即执行、不耗时的任务，如变量和函数的初始化、事件的绑定等等那些不需要回调函数的操作都可归为这一类。
右边的堆用来存储声明的变量、对象。下面的队列就是消息队列，一旦某个异步任务有了响应就会被推入队列中。如用户的点击事件、浏览器收到服务的响应和setTimeout中待执行的事件，每个异步任务都和回调函数相关联。

**JS引擎线程用来执行栈中的同步任务，当所有同步任务执行完毕后，栈被清空，然后读取消息队列中的一个待处理任务，并把相关回调函数压入栈中，单线程开始执行新的同步任务。**

JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/25/16d6675419c24f62~tplv-t2oaga2asx-image.image)

上图以AJAX异步请求为例，发起异步任务后，由AJAX线程执行耗时的异步操作，而JS引擎线程继续执行堆中的其他同步任务，直到堆中的所有异步任务执行完毕。然后，从消息队列中依次按照顺序取出消息作为一个同步任务在JS引擎线程中执行，那么AJAX的回调函数就会在某一时刻被调用执行。


#### 实例
引用一篇文章中提到的考察JavaScript异步机制的面试题来具体介绍。

> 执行下面这段代码，执行后，在 5s 内点击两下，过一段时间（>5s）后，再点击两下，整个过程的输出结果是什么？

```javascript
setTimeout(function(){
    for(var i = 0; i < 100000000; i++){}
    console.log('timer a');
}, 0)

for(var j = 0; j < 5; j++){
    console.log(j);
}

setTimeout(function(){
    console.log('timer b');
}, 0)

function waitFiveSeconds(){
    var now = (new Date()).getTime();
    while(((new Date()).getTime() - now) < 5000){}
    console.log('finished waiting');
}

document.addEventListener('click', function(){
    console.log('click');
})

console.log('click begin');
waitFiveSeconds();
```

要想了解上述代码的输出结果，首先介绍下定时器。
`setTimeout` 的作用是在间隔一定的时间后，将回调函数插入消息队列中，等栈中的同步任务都执行完毕后，再执行。因为栈中的同步任务也会耗时，所以间隔的时间一般会大于等于指定的时间。
`setTimeout(fn, 0)` 的意思是，将回调函数fn立刻插入消息队列，等待执行，而不是立即执行。看一个例子：

```javascript
setTimeout(function() {
    console.log("a")
}, 0)

for(let i=0; i<10000; i++) {}
console.log("b")

// b  a
```

打印结果表明回调函数并没有立刻执行，而是等待栈中的任务执行完毕后才执行的。栈中的任务执行多久，它就得等多久。

理解了定时器的作用，那么对于输出结果就容易得出了。

首先，先执行同步任务。其中 `waitFiveSeconds` 是耗时操作，持续执行长达5s。
```
0
1
2
3
4
click begin
finished waiting
```

然后，在JS引擎线程执行的时候，'timer a'对应的定时器产生的回调、 'timer b'对应的定时器产生的回调和两次 click 对应的回调被先后放入消息队列。**由于JS引擎线程空闲后，会先查看是否有事件可执行，接着再处理其他异步任务**。因此会产生 下面的输出顺序。
。

```
click
click
timer a
timer b

```
最后，5s 后的两次 click 事件被放入消息队列，由于此时JS引擎线程空闲，便被立即执行了。

```
click
click
```

理解了JS异步实现的机制后，我们再看看JS异步编程方式的演化。

### 3、JS异步编程方式演化

异步发展史可以简单归纳为： 
callback -> promise -> generator + co -> async+await(语法糖)

下面会一步一步展现各种方式。

#### 3.1 callback回调函数

这是异步编程最基本的用法。

实现1秒后打印消息：

```javascript
function asyncPrint(value, ms) {
    setTimeout(() => {
        console.log(value);
    },ms)
}
asyncPrint('Hello World', 1000);
```

回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

#### 3.2 Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

Promise 到底是什么？

当我们通过new Promise创建 Promise 的时候，你实际创建的只是一个简单的 JavaScript 对象，这个对象可以调用两个方法then和catch。

这是关键所在：

- 当 Promise 的状态变为fulfilled的时候，传递给.then的函数将会被调用。
- 如果 Promise 的状态变为rejected，传递给.catch的函数将会被调用。

这就意味着，在你创建 Promise 的时候，要通过.then将你希望异步请求成功时调用的函数传递进来，通过.catch将你希望异步请求失败时调用的函数传递进来。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

比如，上面的例子可以写成：

```javascript
function asyncPrint(value, ms) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve, ms, value);
    })
}

asyncPrint('Hello Wolrd', 1000).then((value) => {
  console.log(value);
});
```

Promise 不仅可以避免回调地狱，还可以统一捕获失败的原因。但这种方法的缺点就是编写和理解，都相对比较难

#### 3.3 Generator(ECMAScript6)

1. 生成器是一个函数，需要加* ，可以用来生成迭代器
2. 生成器函数和普通函数不一样，普通函数是一旦调用一定会执行完，但是生成器函 数中间可以暂停。
3. 生成器和普通函数不一样，调用它并不会立即执行
4. 它会返回此生成器的迭代器,迭代器是一个对象，每调用一次next就可以返回一个值对象

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

使用 Generator，上面的例子可以改写成：

```javascript
function *asyncPrint(value, ms) {
    let timer = yield setTimeout((value)=>{console.log(value)}, ms, value);
    return timer;
}

var a = asyncPrint('Hello World', 1000);
a.next();
```

#### 3.4 co
随着前端的迅速发展，大神们觉得要像同步代码一样写异步，co问世了，co是 TJ 大神结合了promise 和 生成器 的一个库，实际上还是帮助我们自动执行迭代器

```javascript
function asyncPrint(value, ms) {
    return new Promise((resolve,rejuect) => {
        setTimeout(resolve, ms, value);
    })
}
function *print() {
  let a = yield asyncPrint('Hello World', 1000);
  return a;
}
function co(gen) {
  let it = gen();//我们要让我们的生成器持续执行
  return new Promise(function (resolve, reject) {
    !function next(lastVal) {
        let {value,done} = it.next(lastVal);
        if(done){
          resolve(value);
        }else{
          value.then(next,reject);
        }
    }()
  });
}
co(print).then(function (data) {
  console.log(data);
});
```

#### 3.5 async/await
async await是语法糖，内部是generator+promise实现
async函数就是将Generator函数的星号（*）替换成async，将yield替换成await。

```javascript
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 1000);
```

### 4. JS异步实战

有了前面内容的热身，我们直接趁热打铁，再来看一道比较典型的问题。

> 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

请分别用上面的几种方法实现，具体实现可参考：[红绿灯任务控制](https://codepen.io/RealAaron/pen/LYPyMew)

由于篇幅的缘故，其中没有提到的宏任务、微任务，以及 Promise、 Generator基础 等知识点，大家可以自行百度或Google。

以上就是对 JavaScript 异步编程的全部介绍，如果觉得有收获，欢迎点赞和留言咯。

### 参考文章

[JavaScript的运行原理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[JavaScript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

[JS 异步发展流程 —— 异步历史](https://juejin.im/post/6844903574980263949)

[异步编程的前世今生(异步流程历史)](https://zhuanlan.zhihu.com/p/33107664)

[100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)

[Javascript异步详解](https://juejin.im/post/6844903556084924423)

