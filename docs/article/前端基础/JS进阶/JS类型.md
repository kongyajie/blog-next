# JS类型

## 前言

**ECMAScript是JavaScript的标准，JavaScript是ECMAScript标准的实现** 

- 首先，ECMAScript标准定义了一系列语法和类型
- 接着，（浏览器大厂的）JS引擎开发者实现了这些标准
- 最后，作为开发者的我们才可以按照标准来使用这些类型，进而完成日常开发工作

那么问题来了，JS定义了哪些类型？各个类型都有什么特点呢？
另外，变量是如何存储的？如何知道一个变量的类型？如何进行类型转换呢？

本文将努力回答上述的问题，主要分为以下几个部分：

* 一、类型分类
* 二、数据存储
* 三、类型判定
* 四、类型转换
* 五、关于类型，有哪些你不知道的细节？

## 一、类型分类
JavaScript 的类型分为 原始类型 和 引用类型

### 原始类型

* Null：只包含一个值 null
* Undefined：只包含一个值 undefined
* Boolean：包含两个值 true 和 false
* Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
* String：一串表示文本值的字符序列
* Symbol：一种实例是唯一且不可改变的数据类型
* BigInt：在es10中加入

### 对象类型
* Object：单独分一类。Object、 Array、Function 等都属于特殊的对象

## 二、数据存储
> 原始数据类型存放在栈空间，引用类型存放在堆空间。

### 栈空间 vs 堆空间

效果：原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。

原因：

1. 通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。

2. JavaScript引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了，所有的数据都存放在栈空间里面，会影响上下文切换的效率，进而影响程序的执行效率。

### 值类型 vs 引用类型

* 什么是值传递

```javascript
let name = 'AaronKong';
function changeValue(name){
  name = 'Aaron';
}
changeValue(name);
console.log(name);
```

执行上面的代码，如果最终打印出来的name是'AaronKong'，没有改变，说明函数参数传递的是变量的值，即*值传递*。如果最终打印的是'Aaron'，函数内部的操作可以改变传入的变量，那么说明函数参数传递的是引用，即*引用传递*。

* 什么是引用传递

```javascript
let obj = {name:'AaronKong'};
function changeValue(obj){
  obj.name = 'Aaron';
}
changeValue(obj);
console.log(obj.name); // Aaron
```

首先明确一点，ECMAScript中所有的函数的参数都是按值传递的。

同样的，当函数参数是引用类型时，我们同样将参数复制了一个副本到局部变量，只不过复制的这个副本是指向堆内存中的地址而已，我们在函数内部对对象的属性进行操作，实际上和外部变量指向堆内存中的值相同，但是这并不代表着引用传递，下面我们再看一个例子：

```javascript
let obj = {};
function changeValue(obj){
  obj.name = 'AaronKong';
  obj = {name:'Aaron'};
}
changeValue(obj);
console.log(obj.name); // AaronKong
```

可见，函数参数传递的并不是变量的引用，而是变量拷贝的副本，当变量是原始类型时，这个副本就是值本身，当变量是引用类型时，这个副本是指向堆内存的地址。所以，再次记住：

**ECMAScript中所有的函数的参数都是按值传递的**

## 三、类型判定

类型判定的几种方式：

* **typeof** 判断基本类型和函数对象很方便，但无法区分 null 和 object（包括数组）。
* **instanceof** 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，只能检测对象的类型。
* **Object.prototype.toString** 可以准确返回当前对象的 Class 属性，因为JS中没有任何方法可以更改私有的 Class 属性
* **constructor** 通过对象的该属性可判断其类型（有被修改的风险）

typeof示例：

```js
typeof 1 // number
typeof '123' // string
typeof true // boolean
typeof undefined // undefined
typeof null // object
typeof {a:1} // object
typeof function(){} // function
```

小疑问：`typoef null` 输出为什么是 `object` ？
- 这是因为在早期JS实现中，一个JS的值由类型标识（tag）和值（value）两部分组成，object的tag是0，而null在tag和value均为0，因此被认为是object类型，是JS设计的一个bug。
- 后来有人提交更正给ECMAScript标准委员会，但被拒绝了，原因是担心影响现有的系统。于是这个bug一直保留到现在。
[why-is-typeof-null-object](https://stackoverflow.com/questions/18808226/why-is-typeof-null-object)

instanceof示例：

```js
var obj = {a:1}
obj instanceof Object // true
```

> 小疑问：如何实现一个 `instanceof` ？

`Object.prototype.toString` 示例：

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

Object.prototype.toString.call(number)
// ...
```

### 判断是否为数组

```js
if (!Array.isArray) { // 兼容
    Array.isArray = (arg) => {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
```

## 四、类型转换

因为 JS 是弱类型语言，所以类型转换发生非常频繁，大部分我们熟悉的运算都会先进行类型转换。

### 隐式类型转换的场景

* `if` 语句和逻辑语句
* 各种数学运算，如`+` `-` `>` `<` 等
* 臭名昭著的 `==` （试图跨类型比较）

### 转换规则

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2.webp)


比较容易混淆的几类规则：
* `StringToNumber` —— Number函数
* `NumberToString` —— 基本符合直觉
* 装箱转换（把基本类型转换为对应的对象） —— 内置对象（Number、String、Boolean等）
* 拆箱转换（对象类型到基本类型的转换） —— `valueOf` 和 `toString` 配置使用，前后顺序由调用方式决定

`StringToNumber` 示例：
```js
Number('123') // 123
```

`NumberToString` 示例：
```js
String(123) // '123'
```

装箱拆箱示例：

```javascript
var s = 'Hello World';
console.log(s + 'Aaron'); // 先装箱，再拆箱
```

## 五、关于类型，有哪些你不知道的细节？
### 1、null和undefined的区别

在原始类型中，有两个类型Null和Undefined，他们都有且仅有一个值，null和undefined，并且他们都代表无和空，我一般这样区分它们：

**null**

- 表示被赋值过的对象，刻意把一个对象赋值为null，故意表示其为空，不应有值
- 所以对象的某个属性值为null是正常的，null转换为数值时值为0

**undefined**

- 表示“缺少值”，即此处应有一个值，但还没有定义
- 如果一个对象的某个属性值为 `undefined`，这是不正常的，如 `obj.name=undefined` ，我们不应该这样写，应该直接 `delete obj.name`。
- undefined 转为数值时为 NaN (非数字值的特殊值)
- JavaScript是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（**因为存不存在只在运行期才知道**），这就是undefined的意义所在。对于JAVA这种强类型语言，如果有"undefined"这种情况，就会直接编译失败，所以它不需要一个这样的类型。

### 2、为什么有的编程规范要求用 void 0 代替 undefined？
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

### 3、JavaScript字符串有最大长度吗？
一点编码历史：

* 最初ASCII编码诞生用来表示英文字母和一些符号，但是其他国家的语言不支持
* 后来中国大陆搞了GB2312，欧洲日本韩国也都有自己的编码，并不统一
* 再后来Unicode统一码点，包含了全世界几乎所有国家的文字，但实现方式没有规定
* UTF-8，USC、UTF-16，UTF-32都是Unicode编码的具体实现，其中UTF8在互联网普及、UTF16> > 被JavaScript采用作为字符串的编码方式
* 1995年诞生的JavaScript字符串采用 1990年发布的 UCS-2编码方式，后来UCS-2被1996年发布的 UTF-16 编码取代
* **JS字符串的长度受到下标限制，理论最大长度是2^53-1（即js中可表达的最大安全整数）**

### 4、为什么 0.1 + 0.2 !== 0.3?

**JavaScript采用 IEEE754 双精度浮点数来表示数字，而0.1和0.2在转换为二进制时是除不尽的，因此会产生误差，相加后的二进制值转换为十进制时又产生了一次误差，共3次误差，因此是不相等的。**

> PS:64位 = 1符号位+11指数位+52有效位

进一步，可了解：

* 精度丢失的原因
* JavaScript可以存储的最大数字、最大安全数字
* JavaScript处理大数字的方法、避免精度丢失的方法

参考：[一网打尽JavaScript的Number类型](https://juejin.cn/post/6914107435942690823)

### 5、ES6 新加入的 Symbol 是什么？
ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有**一种机制，保证每个属性的名字都是独一无二的**就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入 **Symbol** 的原因。

使用示例：

```js
var sym = Symbol('foo');
typeof sym; // 'symbol'
Symbol('foo') === Symbol('foo'); // false

var obj = {[sym]: 1};
obj[sym]; // 1
```

由来：
- ES6引入Symbol，是为了解决对象属性名冲突

特性：
- Symbol函数前不能使用new命令，因为Symbol是一个原始类型的值，不是对象。
- Symbol函数可以接收一个字符串作为参数，表示对Symbol实例的描述
- Symbol值不能与其他类型的值进行运算，会报错

用途：
- 用途1：消除魔法字符串（代码中写死的值）
- 用途2：可以用来表示一个独一无二的变量防止命名冲突
- 用途3：利用 symbol 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量

```javascript
// 基本使用
var sym = Symbol('foo');
typeof sym; // 'symbol'
Symbol('foo') === Symbol('foo'); // false

var obj = {[sym]: 1};
obj[sym]; // 1

// Symbol.for()
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

// Symbol.keyFor()
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

参考：[ES6 系列之模拟实现 Symbol 类型](https://github.com/mqyqingfeng/Blog/issues/87)

### 6、BigInt有什么用？

- 目的是解决Number无法精确表示非常大的整数

```js
0n === 0
// ↪ false

0n == 0
// ↪ true
```

[BigInt](https://segmentfault.com/a/1190000019912017?utm_source=tag-newest)

### 7、为什么给对象添加的方法能用在基本类型上？
> 如 1.toString()

先装箱为 String 内置类型，然后拆箱出 string 字符串

### 8、浮点数精度问题

- 它存在于任何使用浮点数来表示数字的编程语言中，比如java/c中的使用的float和double

- 问题一：0.1+0.2!=0.3

  - 1、当JavaScript执行比较时，实际比较的是比特位；
  - 2、而JavaScript使用IEEE754浮点数标准表示数字，0.1和0.2因为尾数无限循环而触发3次舍入操作，单独存储0.3这个数字时，仅触发1次舍入，因此会不相等。

- 问题二：9007199254740992 == 9007199254740993 // true

  - 1、`Math.MAX_SAFE_INTEGER`:2^53-1,所有尾数都是1
  - IEEE754标准下，无法精确表示的非常大的整数将自动四舍五入。确切地说，JS 中的Number类型只能安全地表示-9007199254740991 (-(2^53-1)) 和9007199254740991(2^53-1)之间的整数，任何超出此范围的整数值都可能失去精度。
  - 3、`MAX_SAFE_INTEGER` 和 `MAX_VALUE` 之间的数字却并不能被正确地表示

- 问题三：指数偏移量为什么是1023（2^11劈一半+同时首位两个数值有特殊用途-2=>(2^11-2)/2）
  [IEEE 754浮点数标准中64位浮点数为什么指数偏移量是1023？](https://segmentfault.com/q/1010000016401244/a-1020000016446375)

- 问题四：为什么最大安全数是 2^53-1
  [参考](https://www.zhihu.com/question/29010688)

- 解决方案

  - 1.将数字转成整数

  ```js
  function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
    }
  ```

  - 2.三方库（Math.js、Big.js）
  - 3.ES6 Number.EPSILON

  ```js
    Number.EPSILON=(function(){   //解决兼容性问题
      return Number.EPSILON?Number.EPSILON:Math.pow(2,-52);
    })();
    //上面是一个自调用函数，当JS文件刚加载到内存中，就会去判断并返回一个结果，相比if(!Number.EPSILON){
    //   Number.EPSILON=Math.pow(2,-52);
    //}这种代码更节约性能，也更美观。
    function numbersequal(a,b){ 
      return Math.abs(a-b)<Number.EPSILON;
    }
    //接下来再判断   
    var a=0.1+0.2, b=0.3;
    console.log(numbersequal(a,b)); //这里就为true了
  ```

[原码/反码/补码](https://segmentfault.com/a/1190000021511009)
[原码/反码/补码计算器](http://www.atoolbox.net/Tool.php?Id=952)

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
