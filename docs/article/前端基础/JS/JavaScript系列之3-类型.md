# JavaScript系列之3-类型

## 前言
ECMAScript标准定义了一系列类型，以及这些类型的特性和运行规则。

JS引擎的实现者则实现了这些类型的标准，让其能够按照标准中的规则来运行。

因此，作为开发者，我们可以方便地使用标准定义的这些类型，来完成我们日常的开发工作。

那么，JS定义了哪些类型？各个类型的特点是什么？
另外，不同类型的变量是如何存储的？如何知道一个变量是什么类型？类型之间的转换是怎样的？

本文将努力回答上述的问题，主要分为一下几个部分：

* 一、类型分类
* 二、数据存储
* 三、类型判定
* 四、类型转换
* 五、关于类型，有哪些你不知道的细节？

## 一、类型分类

### 原始类型

* Null：只包含一个值 null
* Undefined：只包含一个值 undefined
* Boolean：包含两个值 true 和 false
* Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
* String：一串表示文本值的字符序列
* Symbol：一种实例是唯一且不可改变的数据类型
* BigInt：在es10中加入

### 对象类型
object：单独分一类，Object、 Array、Function 等都属于特殊的对象

## 二、数据存储
> 原始数据类型存放在栈空间，引用类型存放在堆空间。

效果：因此原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。

原因：

1. 通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。

2. JavaScript引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了，所有的数据都存放在栈空间里面，会影响上下文切换的效率，进而影响程序的执行效率。

### 值类型 vs 引用类型

* 什么是值传递

```javascript
let name = 'ConardLi';
function changeValue(name){
  name = 'code秘密花园';
}
changeValue(name);
console.log(name);
```

执行上面的代码，如果最终打印出来的name是'ConardLi'，没有改变，说明函数参数传递的是变量的值，即*值传递*。如果最终打印的是'code秘密花园'，函数内部的操作可以改变传入的变量，那么说明函数参数传递的是引用，即*引用传递*。

* 什么是引用传递

```javascript
let obj = {name:'ConardLi'};
function changeValue(obj){
  obj.name = 'code秘密花园';
}
changeValue(obj);
console.log(obj.name); // code秘密花园
```

首先明确一点，ECMAScript中所有的函数的参数都是按值传递的。

同样的，当函数参数是引用类型时，我们同样将参数复制了一个副本到局部变量，只不过复制的这个副本是指向堆内存中的地址而已，我们在函数内部对对象的属性进行操作，实际上和外部变量指向堆内存中的值相同，但是这并不代表着引用传递，下面我们再按一个例子：

```javascript
let obj = {};
function changeValue(obj){
  obj.name = 'ConardLi';
  obj = {name:'code秘密花园'};
}
changeValue(obj);
console.log(obj.name); // ConardLi
```

可见，函数参数传递的并不是变量的引用，而是变量拷贝的副本，当变量是原始类型时，这个副本就是值本身，当变量是引用类型时，这个副本是指向堆内存的地址。所以，再次记住：

> ECMAScript中所有的函数的参数都是按值传递的。

## 三、类型判定

* **typeof** 判断基本类型和函数对象很方便，但无法区分 null 和 object（包括数组）。
* **instanceof** 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，只能检测对象的类型。
* **Object.prototype.toString** 默认返回当前对象的 [[Class]]
* **constructor** 通过对象的该属性可判断其类型（有被修改的风险）

```js
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]
Math    //[object Math]
JSON  //[object JSON]
```

### 判断是否为数组

```js
if (!Array.isArray) {
    Array.isArray = (arg) => {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
```

## 四、类型转换

### 隐式类型转换的场景：

* if 语句和逻辑语句
* 各种数学运算
* ==

### 具体情况

StringToNumber
NumberToString

内置对象

* Boolean
* String
* Number
* 装箱转换
* 拆箱转换-ToPrimitive函数

```javascript
var s = 'Hello World';
console.log(s + 'Aaron'); // 先装箱，再拆箱
```

## 五、关于类型，有哪些你不知道的细节？
### null和undefined的区别

在原始类型中，有两个类型Null和Undefined，他们都有且仅有一个值，null和undefined，并且他们都代表无和空，我一般这样区分它们：

**null**

表示被赋值过的对象，刻意把一个对象赋值为null，故意表示其为空，不应有值。

所以对象的某个属性值为null是正常的，null转换为数值时值为0。

**undefined**

表示“缺少值”，即此处应有一个值，但还没有定义，

如果一个对象的某个属性值为 `undefined`，这是不正常的，如 `obj.name=undefined` ，我们不应该这样写，应该直接 `delete obj.name`。

undefined 转为数值时为 NaN (非数字值的特殊值)

JavaScript是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（**因为存不存在只在运行期才知道**），这就是undefined的意义所在。对于JAVA这种强类型语言，如果有"undefined"这种情况，就会直接编译失败，所以它不需要一个这样的类型。

### 为什么有的编程规范要求用 void 0 代替 undefined？
JavaScript中的 `undefined` 是一个变量，不是关键字，这是JavaScript公认的设计失误之一。为了避免无意中被篡改，建议用 `void 0` 来获取 `undefined` 值

ES5后 `undefined` 已经被改为了 `read-only` 了，但是在局部作用域上，使用 `var` 定义时，依然可以被修改：

```js
const a = () => {
    var undefined = 'abc';
    console.log(undefined); // abc
    console.log(typeof undefined) // string
}
a();
```

而在全局作用域上使用 var/let/const 均无法修改 undefined 的值：

```js
var undefined = 'abc';
console.log(undefined); // undefined
console.log(typeof undefined) // undefined

const undefined = 'abc'; // Uncaught SyntaxError: Identifier 'undefined' has already been declared
console.log(undefined);
console.log(typeof undefined)

let undefined = 'abc'; // Uncaught SyntaxError: Identifier 'undefined' has already been declared
console.log(undefined);
console.log(typeof undefined)
函数作用域上使用 let/const 会提示常量已经被定义：

a = () => {
    const undefined = 'abc'; // Uncaught TypeError: Assignment to constant variable
    console.log(undefined);
    console.log(typeof undefined)
}
a()
```

#### JavaScript字符串有最大长度吗？
一点编码历史：

* 最初ASCII编码诞生用来表示英文字母和一些符号，但是其他国家的语言不支持；
* 后来中国大陆搞了GB2312，欧洲日本韩国也都有自己的编码，并不统一；
* 再后来Unicode统一码点，包含了全世界几乎所有国家的文字，但实现方式没有规定；
* UTF-8，USC、UTF-16，UTF-32都是Unicode编码的具体实现，其中UTF8在互联网普及、UTF16> > 被JavaScript采用作为字符串的编码方式。
* 1995年诞生的JavaScript字符串采用 1990年发布的 UCS-2编码方式，后来UCS-2被1996年发布的 UTF-16 编码取代。
* JS字符串的长度受到下标限制，理论最大长度是2^53-1（即js中可表达的最大安全整数）。


#### 为什么 0.1 + 0.2 !== 0.3?
JavaScript采用 IEEE754 双精度浮点数来表示数字，而0.1和0.2在转换为二进制时是除不尽的，因此会产生误差，相加后的二进制值转换为十进制时又产生了一次误差，共3次误差，因此是不相等的。

> PS:64位 = 1符号位+11指数位+52有效位

进一步，可了解：

* 精度丢失的原因
* JavaScript可以存储的最大数字、最大安全数字
* JavaScript处理大数字的方法、避免精度丢失的方法

参考：[一网打尽JavaScript的Number类型](https://juejin.cn/post/6914107435942690823)

#### ES6 新加入的 Symbol 是什么？
ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

使用示例：

```js
var sym = Symbol('foo');
typeof sym; // 'symbol'
Symbol('foo') === Symbol('foo'); // false

var obj = {[sym]: 1};
obj[sym]; // 1
```
参考：[ES6 系列之模拟实现 Symbol 类型](https://github.com/mqyqingfeng/Blog/issues/87)

#### 为什么给对象添加的方法能用在基本类型上？
> 如 1.toString()

因为 JS 是弱类型语言，所以类型转换发生非常频繁，大部分我们熟悉的运算都会先进行类型转换。

每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。

在 JavaScript 标准中，规定了 **ToPrimitive** 函数，它是对象类型到基本类型的转换（即，拆箱转换）。在 ES6 之后，还允许对象通过显式指定 toPrimitive Symbol 来覆盖原有的行为。

```js
var o = {
    valueOf : () => {console.log("valueOf"); return {}},
    toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}

console.log(o + "")
// toPrimitive
// hello
```

## 总结
本文重要描述了一下几个部分：

* 类型分类：类型分为 原始数据类型（undefined null number string boolean symbol bigInt） 和 引用类型（object）
* 类型存储：原始数据类型存放在栈空间，引用类型存放在堆空间。 本质上，ECMAScript中都是值传递的。
* 类型判定：
    * typeof 判断基本类型和函数对象很方便，但无法区分 null 和 object（包括数组）。
    * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，只能检测对象的类型。
    * Object.prototype.toString 默认返回当前对象的 [[Class]]
    * constructor 通过对象的该属性可判断其类型（有被修改的风险）
* 类型的转换：常见的隐式类型转换的场景、以及使用内置对象进行的装箱拆箱的过程
* 类型细节：比如为什么 0.1 + 0.2 !== 0.3 、为什么推荐用 void 0 代替 undefined

感谢阅读，希望看完本文你能有所收获，也欢迎点赞留言，一起交流进步~

**思考题：类型到底是什么？在执行JS的过程中它扮演着怎样的角色？**
