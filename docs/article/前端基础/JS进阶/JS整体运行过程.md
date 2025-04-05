# JS整体运行过程

## 前言

在之前的JS概览中，我们知道JS需要在宿主环境中才能正常运行。

因此本文我们首先会从浏览器入手，初步了解浏览器的架构和运行机制，包括渲染引擎在浏览器中的作用，JS引擎和渲染引擎的关系等。

然后深入JS引擎，看看它是如何执行一段JS代码的，为什么JS被称为单线程却可以做到异步。

本文共分为两个部分：
- 一、浏览器的架构和运行机制
- 二、JavaScript的执行机制

（单线程）EventLoop -> （宏任务）执行script ->（编译原理） 先编译后执行-> 可执行代码（字节码）+ 执行上下文

## 一、浏览器的架构和运行机制

作为web开发人员，我们每天都会和浏览器打交道。而要了解JS的运行机制，就不得不提到JS引擎了。

JS引擎实际上是浏览器渲染引擎的一部分，因此我们先从浏览器的整体架构入手。

### 1、浏览器的整体架构

浏览器诞生于90年代，在WWW万维网发布后不久就出现了，但早期的浏览器并不好用，比如一个页面就是一个窗口，一个页面崩溃则其他页面也全部不可用。

经过多年的架构调整和优化，现代浏览器的体验和安全性已经得到长足进步。

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9E%B6%E6%9E%84.webp)

现代浏览器架构中一般会包含下面几个进程：

- **1个浏览器主进程**：主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
- **多个渲染进程**：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页
- **1个GPU进程**：初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制
- **1个网络进程**：主要负责页面的网络资源加载
- **多个插件进程**：主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

其中渲染进程的核心是 **渲染引擎**，如 WebKit

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/WebKit%E6%9E%B6%E6%9E%84.png)

WebKit的核心部分：
- **WebCore**：各个浏览器所使用的 WebKit 共享部分
- **JavaScriptCore**：WebKit 中默认 JavaScript 引擎，也就是说一些 WebKit 的移植使用该引擎。而且它只是默认，并不是唯一的，是可以替换的。事实上，WebKit 中对 JavaScript 引擎的调用是独立于引擎的。在 Google 的 Chormium 开源项目中，它被替换成*V8引擎*。
- **WebKit嵌入式接口**：支持手机端等环境的接口
- **WebKit Ports**：WebKit 中的非共享部分

至此，我们从浏览器的架构中找到了JS引擎的位置，下一步，我们深入JS的运行机制。

### 2、浏览器的页面循环系统EventLoop
> 浏览器页面是由消息队列和事件循环系统来驱动的。

#### EventLoop起因
每个渲染进程都有一个主线程，主线程非常繁忙，既要处理 DOM，又要计算样式，还要处理布局，同时还需要处理 JavaScript 任务（JS为单线程）以及各种输入事件。

要让这么多不同类型的任务在主线程中有条不紊地执行，这就需要一个系统来统筹调度这些任务，这个统筹系统就是**消息队列和事件循环系统**。

**注意：这个系统是浏览器/Node宿主提供的，而不是JS引擎单独提供，也不仅仅只是为了JS而设计的。**

另外，JavaScript从诞生起就是**单线程**。因为它的初衷就是要和浏览器进行交互，而多线程需要共享资源、且有可能修改彼此的运行结果，过于复杂，所以就约定俗成，JavaScript为一种单线程语言（虽然Web Worker可以实现多线程，但是JavaScript本身始终是单线程的）。

#### EventLoop设计理念
- **事件循环机制+**：让线程“活”起来
- **消息队列**：处理其他线程和其他进程发送过来的任务
- **宏任务/微任务**：处理高优先级任务（如DOM节点的变化）的效率和实时性

#### EventLoop执行过程
![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8EventLoop.png)

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%BE%AE%E4%BB%BB%E5%8A%A1.png)

**堆（heap）和栈（stack）**
当 javascript 代码执行的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针

**执行栈（call stack）**
当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫执行上下文。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为执行栈

**宏任务和微任务**
在JavaScript中，任务被分为宏任务和微任务两种：

- **宏任务(MacroTask)**：`script代码`、`setTimeout`、`setInterval`、`setImmediate`、`I/O`、`UI rendering`

- **微任务(MicroTask)**：`process.nextTick`、`Promises`、`Mutation Observer`，微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。

**EventLoop的执行过程**
1. 执行一个宏任务（一般一开始是整体代码（script）），如果没有可选的宏任务，则直接处理微任务
2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
3. 执行过程中如果遇到宏任务，就将它添加到宏任务的任务队列中
4. 执行一个宏任务完成之后，就需要检测微任务队列有没有需要执行的任务，有的话，全部执行，没有的话，进入下一步
5. 检查渲染，然后 GUI 线程接管渲染，进行浏览器渲染
6. 渲染完毕后，JS线程继续接管，开始下一个宏任务...（循环上面的步骤）

如下图所示：
![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8EventLoop%E6%B5%81%E7%A8%8B%E5%9B%BE.awebp)

**执行顺序总结**：执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环

**示例/练习：** 

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

更多请参见《[【前端进阶】深入浅出浏览器事件循环【内附练习题】](https://juejin.cn/post/6880419772127772679)》

**注意**：Node.js中的 EventLoop 和浏览器中的 EventLoop 不尽相同，具体可参考《[深入理解js事件循环机制（Node.js篇）](http://lynnelv.github.io/js-event-loop-nodejs)》 《[一篇文章教会你Event loop——浏览器和Node](https://segmentfault.com/a/1190000013861128)》

### 3、典型的WebAPI-setTimeout
- 首先，为了支持定时器的实现，浏览器增加了延时队列，同时setTimeout也依赖于循环机制进行定时处理。
- 其次，由于消息队列排队和一些系统级别的限制，通过 setTimeout 设置的回调任务并非总是可以实时地被执行，这样就不能满足一些实时性要求较高的需求了。
- 最后，在定时器中使用过程中，还存在一些陷阱，需要你多加注意。

1. 如果当前任务执行时间过久，会影响定时器任务的执行
```js

function bar() {
    console.log('bar')
}
function foo() {
    setTimeout(bar, 0);
    for (let i = 0; i < 5000; i++) {
        let i = 5+8+8+8
        console.log(i)
    }
}
foo()
```

2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒
```js
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);
```

#### requestAnimationFrame

requestAnimationFrame实现的动画效果比setTimeout好的原因：

使用 raf 不需要设置具体的时间，由系统来决定回调函数的执行时间，raf 里面的回调函数是在页面刷新之前执行，它跟着屏幕的刷新频率走，保证每个刷新间隔只执行一次。

另外，如果页面未激活的话，raf 也会停止渲染，这样既可以保证页面的流畅性，又能节省主线程执行函数的开销

### 4、典型的WebAPI-XMLHttpRequest
XMLHttpRequest 发起请求，是由浏览器的其他进程或者线程去执行，然后再将执行结果利用 IPC 的方式通知渲染进程，之后渲染进程再将对应的消息添加到消息队列中

#### fetch
Todo...

#### 跨域
Todo...
简单请求 vs 非简单请求
options

### 5、微任务

#### 监听DOM变化方法演变
- Mutation Event 同步、实时
- MutationObserver 异步、微任务、合并变更

#### Promise
特性：
- 消灭嵌套调用
- 合并多个任务的错误处理

1. Promise 中为什么要引入微任务？
使用微任务是因为 Promise 回调函数延迟绑定技术导致的

2. Promise 中是如何实现回调函数返回值穿透的？

3. Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？

#### generator 生成器
> 生成器底层使用协程来实现，利用生成器能实现生成器函数的暂停和恢复。

**协程** 是一种比线程更加轻量级的存在。你可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。

正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。最重要的是，协程不是被操作系统内核所管理，而完全是由程序所控制（也就是在用户态执行）。这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源。

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E5%8D%8F%E7%A8%8B%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.webp)

#### async/await
> async 是一个通过 **异步执行** 并 **隐式返回 Promise** 作为结果的函数。 —— MDN

#### 思考题
```js
async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')
```

更多详情请点击 [参考](https://time.geekbang.org/column/article/137827)

## 二、JavaScript的执行机制

> V8引擎是如何执行一段JavaScript代码的

编译器和解释器：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E7%BC%96%E8%AF%91%E5%99%A8%E5%92%8C%E8%A7%A3%E9%87%8A%E5%99%A8%E2%80%9C%E7%BF%BB%E8%AF%91%E2%80%9D%E4%BB%A3%E7%A0%81.webp)

V8 执行一段代码流程图：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/V8%20%E6%89%A7%E8%A1%8C%E4%B8%80%E6%AE%B5%E4%BB%A3%E7%A0%81%E6%B5%81%E7%A8%8B%E5%9B%BE.webp)


![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87.png)

### 1、生成抽象语法树（AST）和执行上下文
- 词法分析 => token
- 语法分析 => AST

### 2、生成字节码
> 字节码是为了解决手机上机器码内存占用问题而引入的。字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行。

### 3、执行代码
V8 执行时间越久，执行效率越高？
- 即时编译（JIT）

> 具体到 V8，就是指解释器 Ignition 在解释执行字节码的同时，收集代码信息，当它发现某一部分代码变热了之后，TurboFan 编译器便闪亮登场，把热点的字节码转换为机器码，并把转换后的机器码保存起来，以备下次使用。

### JavaScript执行过程是怎样的？
> 目标：从JS引擎的角度切入，最好用图文来描述整个过程

JavaScript是为了动态网页而诞生的，因此为了保证DOM修改的一致性，被设计成**单线程**的。单线程只有一个调用栈，也意味着一次只能做一件事。

而由于浏览器需要处理的不仅是 JavaScript脚本执行，还包括网络任务、渲染、用户交互、事件等，为了有序的对各个任务按照优先级进行执行浏览器实现了我们称为 **Event Loop 调度流程**。

**事件循环 EventLoop**的概念其实很简单，就是有一个无限循环，循环中 JS 引擎会等待任务，执行它们然后休眠，等待更多的任务。
EventLoop其实不只一个，我们常说的其实是window的eventloop，其实还有webWorker eventloop、worklet eventloop

**宏任务 MacroTask**是宿主发起的，包括：执行script、界面渲染、setTimeout、setInterval、I/O等

**微任务 MicroTask**是JS引擎发起的，有：Promise等

**requestAnimationFrame** 用来实现流畅动画，由于 setTimeout 可能会掉帧，而在 eventloop 中 rAF 会固定在重新渲染前调用

**requestIdleCallback** 在浏览器的空闲时段内调用的函数。把一些计算量较大但是又没那么紧急的任务放到空闲时间去执行。不要去影响浏览器中优先级较高的任务，比如动画绘制、用户输入等等

**一次事件循环**可以简单看成是：
1. 执行同步代码，将微任务加入微任务队列，将宏任务加入宏任务队列
2. 依次处理微任务队列中的微任务
3. 渲染DOM
4. 当前宏任务结束，加载宏任务队列中的下一个宏任务，回到1

**变量提升**：代码的创建阶段，也就是执行阶段前，函数或变量会先被储存在执行上下文中，这个被称为变量提升。其中var声明的变量在创建阶段会被赋值成 undefined，而
let/const/class等定义的变量/类则被赋值为未定义 uninitialized，在它们实际的声明前的区域被称为**暂时性死区**，在这个区间调用该变量/类都将报引用错误ReferenceError

**闭包**其实只是一个绑定了执行环境的函数，

一段代码执行所需的所有信息定义为：**执行上下文**。

**this**：调用函数时使用的引用，决定了函数执行时刻的 this 值。

**JavaScript语句执行的原理**：JavaScript 语句存在着嵌套关系，所以执行过程实际上主要在一个树形结构上进行， 树形结构的每一个节点执行后产生 Completion Record，根据语句的结构和 Completion Record，JavaScript 实现了各种分支和跳出逻辑。

**Completion Record** 表示一个语句执行完之后的结果，它有三个字段：
- [[type]] 表示完成的类型，有 break continue return throw 和 normal 几种类型；
- [[value]] 表示语句的返回值，如果语句没有，则是 empty；
- [[target]] 表示语句的目标，通常是一个 JavaScript 标签（标签在后文会有介绍）。

### 一些概念
- 执行上下文
    - 变量环境（var变量提升）
    - 词法环境（块级作用域的实现、let/const变量的存储、暂时性死区）
    - outer（静态/词法作用域、作用域链）
    - this指向
- 闭包

开发人员可以通过 functions/modules/packages 等管理代码复杂度，**执行上下文**则时JavaScript引擎用来管理解释和执行代码用的。

JS引擎运行代码时，首先会创建 **全局执行上下文（Global Execution Context）**，它包含：`window/global` 、 `this`

每个执行上下文都有两个独立的阶段：
- creation phrase 创建阶段
- exclusion phrase 执行阶段
它们有各自的职责。

创建阶段：
- 1. 创建全局对象
- 2. 创建 `this`
- 3. 为变量和函数分配内存空间
- 4. 为变量赋值 `undefined`（**变量提升**），将函数声明放入内存中

执行阶段：
- 逐行执行代码

当函数被调用时，会创建**函数执行上下文（Function Execution Context）**

创建阶段：
- 1. 创建 `arguments` 对象
- 其他同上

当一个函数被调用时，一个新的执行上下文被创建然后添加到**执行/调用栈**中，当它运行完创建和执行两个阶段后，会从调用栈出栈。

**执行上下文**是 JavaScript 执行一段代码时的运行环境，当函数被调用时，会创建**函数执行上下文（Function Execution Context）**

JavaScript 引擎正是利用栈的这种结构来管理执行上下文的。在执行上下文创建好后，JavaScript 引擎会将执行上下文压入栈中，通常把这种用来管理执行上下文的栈称为执行上下文栈，又称**调用栈**。
当一个函数被调用时，一个新的执行上下文被创建然后添加到**执行/调用栈**中，当它运行完创建和执行两个阶段后，会从调用栈出栈。

所谓的**变量提升**，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

其实在每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为**outer**。

**作用域**就是当前的执行上下文。（-MDN）

我们把通过作用域查找变量的链条称为**作用域链**

**词法作用域**就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。

#### this关键字

**`this` 的由来：你可以使用不同的上下文来复用函数，换句话说，`this`关键字让你可以决定在函数或者方法被调用时使用哪个对象来处理。**

> this的指向决定于**函数在哪里被调用**，所以要搞清楚this的指向，也就先要知道它是被谁调用的。

总共有下面5种情况：
- Implicit Binding （隐式绑定-大概占80%的情况）
- Explicit Binding （显示绑定）
- new Binding （new绑定）
- Lexical Binding （词法绑定）
- window Binding （window绑定）

##### 隐式绑定
原则: `关注点左边的对象(left of the dot)`

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`)
  }
}
user.greet();
```

左边没有点的情况下呢？继续往下看
#### 显示绑定
> “call” is a method on every function that allows you to invoke the function specifying in what context the function will be invoked.

```javascript
function greet() {
  alert(`Hello, my name is ${this.name}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}
greet.call(user);
```

原则：`关注call调用时的第一个参数`

> `apply` 和 `call` 的目的是一样的，除了传参方式不同外。
> `bind` 和 `call` 基本一样，只是它并不立即执行函数，而是返回一个新的函数，以便再未来使用。

#### new绑定

> `new` 一个函数时，js引擎会创建一个对象 this，然后返回出来，因此这里的 `this` 会指向接受这个返回值的变量。

```javascript
function User (name, age) {
  /*
    Under the hood, JavaScript creates a new object
    called `this` which delegates to the User's prototype
    on failed lookups. If a function is called with the
    new keyword, then it's this new object that interpreter
    created that the this keyword is referencing.
  */

  this.name = name
  this.age = age
}

const me = new User('Tyler', 27)
```

#### 词法绑定

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }, "")

    alert(hello + langs)
  }
}
```

> this is determined “lexically”. Arrow functions don’t have their own this. Instead, just like with variable lookups, the JavaScript interpreter will look to the enclosing (parent) scope to determine what this is referencing.

##### window 绑定

```javascript
function sayAge () {
  console.log(`My age is ${this.age}`)
}

const user = {
  name: 'Tyler',
  age: 27
}

sayAge() // My age is undefined
```

>  If none of the other rules are met, then JavaScript will default the this keyword to reference the window object.


#### this指向小结

> So putting all of our rules into practice, whenever I see the this keyword inside of a function, these are the steps I take in order to figure out what it’s referencing.
> 1. Look to where the function was invoked.
> 2. Is there an object to the left of the dot? If so, that’s what the “this” keyword is referencing. If not, continue to #3.
> 3. Was the function invoked with “call”, “apply”, or “bind”? If so, it’ll explicitly state what the “this” keyword is referencing. If not, continue to #4.
> 4. Was the function invoked using the “new” keyword? If so, the “this” keyword is referencing the newly created object that was made by the JavaScript interpreter. If not, continue to #5.
> 5. Is “this” inside of an arrow function? If so, its reference may be found lexically in the enclosing (parent) scope. If not, continue to #6.
> 6. Are you in “strict mode”? If yes, the “this” keyword is undefined. If not, continue to #7.
> 7. JavaScript is weird. “this” is referencing the “window” object.

## 总结
本文从浏览器入手，描述了：
- 浏览器的多进程架构，包含浏览器**主线程、渲染进程、网络进程、GPU进程**等；
- 渲染进程中只有一个主线程，**主线程负责了包括DOM解析、CSS解析、JS执行等大量繁重的任务**；
- 因此，基于**消息队列、事件循环**的 **EventLoop运行机制** 应运而生，负责协调主线程和其他线程以及进程的任务调度。

接着，从JS引擎引出JS的执行机制，主要包括编译和执行两个阶段：
- **编译阶段**包含**词法分析**和**语法分析**阶段，生成**抽象语法树AST**和**执行上下文**；
- **执行阶段**逐行执行代码，**热点代码**还会使用**即时编译（JIT）**进行优化

## 思考

给你一个index.html文件和一个index.js文件和style.css，在index.html中引入index.js和style.css，你能说说从浏览器中打开index.html到执行结束，这中间都发生了什么吗？

## 参考资料
- [什么是 Event Loop？](https://www.ruanyifeng.com/blog/2013/10/event_loop.html)

- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)

- [Loupe（EventLoop可视化工具）](http://latentflip.com/loupe/)
- [JavaScript GIF](https://dev.to/lydiahallie/series/3341)
- [JavaScirpt Visualizer（JS执行上下文可视化工具）](https://ui.dev/javascript-visualizer/)
- [JS parse AST](https://esprima.org/demo/parse.html)
- [JavaScript思维导图](https://www.processon.com/mindmap/61372ae607912906b8b7ec2c)
- [ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript](https://ui.dev/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)

[this-keyword-call-apply-bind-javascript](https://ui.dev/this-keyword-call-apply-bind-javascript/)

