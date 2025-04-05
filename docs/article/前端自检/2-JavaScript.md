# JavaScript

## 一、JS概览

### JS的由来

- `JavaScript` 的诞生是为了解决网页的动态化，被设计成一门脚本语言

### JS的特性

- 作为一门脚本语言，`JavaScript` 拥有 **单线程**、**动态**、**弱类型**、**解释性语言** 等特性，同时它借鉴了 `self` 语言的 **原型编程** 、`scheme` 的 **函数式编程** ，以及c语言的语法结构。又因为当时 `Java` 的时髦，所以最终命名为`JavaScript` 。

### JS是什么

- `ECMAScript` 标准描述了 `JavaScript` 的语法和基本对象等。

- `JavaScript` 需要运行在宿主环境如浏览器、Node.js中，宿主环境中的JS引擎负责解释执行JS脚本。

## 二、JS类型

### 类型分类

- 原始数据类型：`undefined` `null` `number` `string` `boolean` `symbol` `bigInt`） 
- 引用类：`object`

### 类型存储

- 原始数据类型存放在栈空间，引用类型存放在堆空间。
-  本质上，`ECMAScript` 中都是值传递的。 

### 类型判定（重要）

- `typeof` 判断**基本类型**和**函数对象**很方便，但无法区分 `null` 和 `object`（包括数组）。
- `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，只能检测对象的类型。
- `Object.prototype.toString` 默认返回当前对象的 `[[Class]]`
- `constructor` 通过对象的该属性可判断其类型（有被修改的风险）

### 类型的转换

常见的隐式类型转换的场景、以及使用内置对象进行的装箱拆箱的过程

### 类型细节

- 为什么 `0.1 + 0.2 !== 0.3` 
- 为什么推荐用 `void 0` 代替 `undefined`

## 三、原型和原型链

### 实现类

- 练习：ES5/ES6手写Person类

### 原型链（重要）

- `prototype` 是构造函数上的属性，用来在不同的实例间共享属性和方法
- `__proto__` 是对象上的属性，指向这个对象的原型
- `constructor` 是对象的构造函数，指向创建这个对象的构造函数
- `instanceof` 是判断一个对象是否为这个构造函数的实例

![原型链](https://img3.mukewang.com/szimg/605754fc0001ec9a19201080.jpg)

原型链示例：

- obj => Object.prototype => null
- func => Function.prototype => Object.prototype => null
- arr => Array.prototype => Object.prototype => null

**instanceof**

- **如果A沿着原型链能找到 B.prototype，那么 A instanceof B 为 true**

- func instanceof Function === true
- func instanceof Object === true
- 实现：

```js
function instanceOf(instance, ctor) {
  let p = instance;
  while(p) {
    if (p === ctor.prototype) return true;
    p = p.__proto__;
  }
  return false;
}
```



### 实现继承

- 练习：ES5/ES6手写Student类

### Object对象上的属性和方法

- 创建相关
  - **`Object.create(proto，[propertiesObject])`** 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
  - **`Object.assign(target, ...sources)`** 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
- 属性相关
  - **`Object.defineProperties(obj, props)`** 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
  - **`Object.keys(obj)`** 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
  - **`obj.hasOwnProperty(prop)`** 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
- 原型相关
  - `Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。**性能原因建议使用 Object.create 替代**
  - `Object.getPrototypeOf(obj)` 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
  - `prototypeObj.isPrototypeOf(object)` 方法用于测试一个对象是否存在于另一个对象的原型链上。
- 其他
  - `Object.is(value1, value2)` 方法判断两个值是否为同一个值。
  - **`obj.toString()`** 方法返回一个表示该对象的字符串。
  - **`obj.valueOf()`** 方法返回指定对象的原始值。

### **练习**

- 练习1：分别用ES5/ES6实现类、ES5/ES6实现继承、并用代码模拟原型链的查找过程

- 练习2：手写new、手写instanceof

##  四、执行机制

### **JS执行过程（重要）**

（单线程）EventLoop -> （宏任务）执行script ->（编译原理） 先编译后执行-> 可执行代码（字节码）+ 执行上下文

### **变量提升（重要）**

- 变量提升现象
- 执行过程：编译+执行
- 编译时，会创建执行上下文（全局、函数、eval）和可执行代码
- 执行上下文中包含变量环境，辅助变量提升
- 变量提升是设计缺陷，为了简单，只设计了全局和函数作用域，没有设计块级作用域，因此带来的变量提升会造成变量覆盖、变量污染等问题
- 因此，ES6加入了let和const来解决这个问题，本质是加入了块级作用域

### **块级作用域（重要）**

- 块级作用域的原理是：在执行上下文中的**词法环境**来管理的，词法环境也是一个栈结构，这样块级作用域内部的变量就不会被提升，进而影响到外部环境了
- 有了块级作用域后，变量的查找路径变为：当前执行上下文的词法环境 => 当前执行上下文的变量环境 => outer指向的执行上下文的词法环境、变量环境
- outer和作用域链有关，而js的作用域链是按照词法作用域的规则来的，也就是在代码声明的时候，outer就确定好了的
- 由于词法作用域要求，内部函数需要能访问到外部函数的变量，因此外部函数的变量不能随便被GC，于是有了闭包

### **闭包（重要）**

- 闭包可以理解为内部函数引用外部函数变量的集合
- 闭包的产生是在外部函数返回内部函数时，外部函数执行完毕，外部函数的执行上下文出栈，这时JS引擎会判断返回的这个内部函数是否有引用外部函数内的变量，如果有，则形成闭包，并加入到调用栈中
- 闭包使用时，内部函数被调用，这时会首先在内部函数的执行上下文中查找，如果没有，则向闭包中查找变量
- 闭包的释放，当引用内部函数的变量是全局变量时，和页面同生命周期；当是局部变量时，定义这个局部变量的函数若被销毁，则这个局部变量引用的闭包也会销毁。
- 闭包的作用是保存私有变量和维护它的状态

### **this（重要）**

- this存在于执行上下文中，是被设计用来在对象内部使用对象内部的属性的
- 全局执行上下文中，this指向window
- 函数执行上下文中，this默认指向这个函数，但我们也可以修改它的指向
- 修改方法：apply/call/bind、new、在对象中调用
- this的设计有缺陷，比如嵌套函数的this不会从外层嵌套中继承
- 解决办法是：使用箭头函数、或者定义self（使用作用域链机制代替this）
- 比如普通函数中的this默认指向全局对象window，解决办法是：使用严格模式

### **箭头函数（重要）**

- 箭头函数的引入是为了解决this不能继承的缺陷的，同时简化写法
- 箭头函数的特点是它不绑定this、不能当做构造函数new对象，没有prototype属性（构造函数才有）

### **严格模式**

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

### **垃圾回收**

- 什么是垃圾
  - 没有被引用的对象就是垃圾
- 如何捡垃圾
  - **标记-清除算法**（Mark-Sweep GC）
    - 1、标记阶段:从根集合出发，将所有活动对象及其子对象打上标记
    - 2、清除阶段：遍历堆，将非活动对象（未打上标记）的连接到空闲链表上
    - 优点：实现简单， 容易和其他算法组合
    - 缺点：碎片化， 会导致无数小分块散落在堆的各处
  - 引用计数（Reference Counting）
    - 引用计数，就是记录每个对象被引用的次数，每次新建对象、赋值引用和删除引用的同时更新计数器，如果计数器值为0则直接回收内存。
    - 优点：可即刻回收垃圾
    - 缺点：计数器的增减处理繁重、占用很多位
  -  [参考](https://segmentfault.com/a/1190000018605776)

### **内存泄漏**

1. 闭包引起的内存泄漏

2. 没有清理的DOM元素引用

3. 没有清理的定时器/事件监听

### **练习**

- 分析原型链
- 分析代码的执行过程
- 分析闭包执行原理

## 五、JS异步

### 异步基础

- 为什么需要异步：JS设计为单线程，同步会阻塞代码的执行，异步不会阻塞代码的执行
- 异步的使用场景：`Ajax` 、`setTimeout1

- 异步编程的演化
  - callback
  - promise
  - generator
  - async/await

### EventLoop（重要）

- 是什么？
- 解决什么问题？
- 执行过程如何？

### 宏任务和微任务（重要）

- 什么是宏任务，什么是微任务

  - 宏任务：SetTimeout、Ajax、I/O、DOM事件
  - 微任务：Promise、Async/Await

- 为什么要加入微任务？

  >  宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合了，比如监听 DOM 的变化。

  监听 DOM 变化技术方案的演化史

  1. 轮询
  2. Mutation Event
  3. Mutation Observer（采用微任务机制，有效地权衡了**实时性**和执行效率的问题）

### eventloop 和 DOM渲染

- 1、Call Stack空闲 
- 2、执行当前的微任务
- 3、尝试DOM渲染 
- 3、触发eventLoop机制

### Promise（重要）

- 三种状态和变化
  - pending/resolved/rejected
  - pending->resolved 或 pending->rejected
  - 变化不可逆
- 状态的表现
  - pending状态不会触发then和catch
  - resolved状态，会触发后续的then回调函数
  - rejected状态，会触发后续的catch回调函数
- then 和 catch 对状态的影响（重要）：
  - 只要没报错，then/catch都返回resolved Promise
  - 有报错，都返回rejected Promise
- then 和 catch 的链式调用（常考）

### await/async 和 Promise 的关系（重要）

- 执行aynsc函数，返回的是Promise对象
- await相当于promise的then
- try...catch可捕获异常，代替了promise的catch

### 什么场合用async/await，什么场合用Promise？

- 需要用到Promise各种便捷的方法（比如.race()之类）的时候，一定用Promise。
- 并行的请求最好用Promise。
- 不需要并行的场合，如果要传递参数，最好用Promise。
- 其他ajax场合，看你喜好try...catch...还是.catch()，以决定使用哪一方。

### 异步的本质

- async/await 是消灭异步回调的终极武器
- JS还是单线程，还是得有异步，还是得基于 event loop
- async/await 只是一个语法糖，但这颗糖真香！

### 练习

- 手写Promise
- Promise根据代码判断执行结果

## 六、常见JS编程题

- [实用-节流&防抖](https://blog.aaronkong.top//article/前端基础/JS编程/实用-防抖和节流.html)
- [实用-手写响应式](https://blog.aaronkong.top//article/前端基础/JS编程/实用-手写响应式.html)
- [数组-乱序](https://blog.aaronkong.top//article/前端基础/JS编程/数组-乱序.html)
- [数组-扁平化](https://blog.aaronkong.top//article/前端基础/JS编程/数组-扁平化.html)
- [对象-扁平化&反扁平化](https://blog.aaronkong.top//article/前端基础/JS编程/对象-扁平化.html)
- [对象-深拷贝](https://blog.aaronkong.top//article/前端基础/JS编程/对象-深拷贝.html)
- [函数-模拟new 操作](https://blog.aaronkong.top//article/前端基础/JS编程/函数-new.html)
- [函数-柯里化](https://blog.aaronkong.top//article/前端基础/JS编程/函数-柯里化.html)
- `Promise-Promise.all&Promise.race`

## 七、常见面试题

### 何为变量提升？
- 1.js 会将变量的声明提升到js顶部执行，本质是js引擎在编译的时候，就将所有的变量声明了，因此执行时所有的变量都已经完成了声明。
- 2.当有多个同名变量声明的时候，函数声明会覆盖其他的声明。如果有多个函数声明，则是由最后的一个函数声明覆盖之前所有的声明。
- 3.let和const都具有变量提升的效果，但是它们都具有临死性死区，从作用域开始，一直到变量的声明语句这整一块，你都不能使用该变量。

### var 和 let const 的区别
  - var声明是全局作用域或函数作用域，而let和const是块作用域。
  - var变量可以在其范围内更新和重新声明； let变量可以被更新但不能重新声明； const变量既不能更新也不能重新声明。
  - 它们都被提升到其作用域的顶端。 但是，虽然使用变量undefined初始化了var变量，但未初始化let和const变量。
  - 尽管可以在不初始化的情况下声明var和let，但是在声明期间必须初始化const。

  > 暂时性死区：ES6规定，let/const 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
  总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
  这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）。

### typeof 返回哪些类型
  - undefined string number boolean symbol
  - object（注意，typeof null === 'object'）
  - function
### 列举强制类型转换和隐式类型转换
  - 强制：parseInt parseFloat toString
  - 隐式：if 、逻辑运算、 == 、+拼接字符串

### 手写深度比较 isEqual

### 数组的API有哪些是纯函数
  - 纯函数：
    - 不改变原数组；
    - 返回一个数组
    - 如concat map filter slice

  - 非纯函数：
    - push pop shift unshift forEach some every reduce

  - reduce `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`
  - 数组方法
    - concat()	连接两个或更多的数组，并返回结果。
    - copyWithin()	从数组的指定位置拷贝元素到数组的另一个指定位置中。
    - entries()	返回数组的可迭代对象。
    - every()	检测数值元素的每个元素是否都符合条件。
    - fill()	使用一个固定值来填充数组。
    - filter()	检测数值元素，并返回符合条件所有元素的数组。
    - find()	返回符合传入测试（函数）条件的数组元素。
    - findIndex()	返回符合传入测试（函数）条件的数组元素索引。
    - forEach()	数组每个元素都执行一次回调函数。
    - from()	通过给定的对象中创建一个数组。
    - includes()	判断一个数组是否包含一个指定的值。
    - indexOf()	搜索数组中的元素，并返回它所在的位置。
    - isArray()	判断对象是否为数组。
    - join()	把数组的所有元素放入一个字符串。
    - keys()	返回数组的可迭代对象，包含原始数组的键(key)。
    - lastIndexOf()	搜索数组中的元素，并返回它最后出现的位置。
    - map()	通过指定函数处理数组的每个元素，并返回处理后的数组。
    - pop()	删除数组的最后一个元素并返回删除的元素。
    - push()	向数组的末尾添加一个或更多元素，并返回新的长度。
    - reduce()	将数组元素计算为一个值（从左到右）。
    - reduceRight()	将数组元素计算为一个值（从右到左）。
    - reverse()	反转数组的元素顺序。
    - shift()	删除并返回数组的第一个元素。
    - slice()	选取数组的一部分，并返回一个新数组。
    - some()	检测数组元素中是否有元素符合指定条件。
    - sort()	对数组的元素进行排序。
    - splice()	从数组中添加或删除元素。
    - toString()	把数组转换为字符串，并返回结果。
    - unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
    - valueOf()	返回数组对象的原始值。

### JS运行机制检测
```js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function(resolve, reject) {
  console.log(2);
  resolve()
}).then(function() {
  console.log(3)
});
process.nextTick(function () {
  console.log(4)
})
console.log(5)
```
### JS异步面试题

- promise then 和 catch的连接

```js
// 第一题
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

// 第二题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error1');
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

// 第三题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error1');
}).catch(() => {
  console.log(2)
}).catch(() => {
  console.log(3)
})
```

- async/await语法

```js
async function fn() {
  return 100
};

(async function() {
  const a = fn()
  console.log('a', a);
  const b = await fn()
  console.log('b', b);
})();

(async function() {
  console.log('start');
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  console.log('c', c)
  console.log('end')
})();
```

- Promise 和 setTimeout顺序

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

- async/await顺序

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
}).then(function () {
  console.log('promise2')
})

console.log('script end');

// 1.执行同步任务
// 2.执行微任务
// 3.尝试触发DOM渲染
// 4.触发eventLoop，执行宏任务
```

