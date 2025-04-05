

# JS原型和原型链

在介绍原型之前，我们先来看一个例子

> 目标：JS实现一个 Person 类，包含一些属性，和一些方法

## 一、实现一个Person类

### 第一版

方案：使用工厂模式创建类

```js
function Person(name, age) {
  let person = {};
  person.name = name;
  person.age = age;
  person.play = function() {
    console.log('play');
  }
  person.sleep = function() {
    console.log('sleep');
  }
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

不足之处：每次创建对象都重新创建方法

### 第二版

改进思路：提取公共方法，在 `sharedMethods` 中单独管理，需要时引用获取

```js
const sharedMethods = {
  play: function() {
    console.log('play');
  },
  sleep: function() {
    console.log('sleep');
  }
}
function Person(name, age) {
  let person = {};
  person.name = name;
  person.age = age;
  person.play = sharedMethods.play;
  person.sleep = sharedMethods.sleep;
  
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

不足之处：`sharedMethods` 单独管理成本高，而且也没有解决方法多次创建的问题

### 第三版

改进方案：使用 `Object.create` 代理 `sharedMethods` 上的方法

```js
const sharedMethods = {
  play: function() {
    console.log('play');
  },
  sleep: function() {
    console.log('sleep');
  }
}
function Person(name, age) {
  let person = Object.create(sharedMethods);
  person.name = name;
  person.age = age;
  
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

这里 **Object.create** 帮助我们建立了一个指向 `sharedMethods` 的**代理**。

因此 `aaron` 对象虽然上并没有 `play` 方法，但是通过这个代理，可以获取到。解决了方法复用的问题。

**不足之处**：未解决 `sharedMethods` 单独管理成本高


### 第四版

```js
function Person(name, age) {
  let person = Object.create(Person.prototype);
  person.name = name;
  person.age = age;
  
  return person;
}

Person.prototype.play = function() {
  console.log('play');
}
Person.prototype.sleep = function () {
  console.log('sleep');
}

let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

利用 `javascript` 提供的 `prototype` 属性代替 `sharedMethods` ，来保存这些公用方法。

>  定义： **prototype** 是所有js函数都有的一个属性，我们可以用它来在示例间共享方法


### 第五版

使用 `new` 关键字简化：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.play = function() {
  console.log('play');
}
Person.prototype.sleep = function () {
  console.log('sleep');
}

let aaron = new Person('Aaron', 31);
let vera = new Person('Vera', 28);
aaron.play();
vera.sleep();
```

这里我们在创建对象时使用了 new 关键字 `new Person()`，代替原来的 `Person()`，效果其实是一样的，而且构造函数精简了不少。

new 关键词做了很多事情：

```js
let this = Object.create(Person.prototype) // 1.创建名为this的对象，然后将这个对象代理到 Person.prototype 上，因此this对象拥有它上面的方法
// this.name = name;
// this.age = age;
return this; // 2.返回创建的这个对象
```

为了加深对 `new` 的印象，我们可以自己模拟实现一个 new ：

```js
/**
 * 模拟new （不使用 Object.create）
 * @ctor 构造函数
 * @arg 参数
 **/
function myNew(ctor, ...arg) {
  let obj = {} // 1.创建一个空对象，等同于 let obj = new Object();
  obj.__proto__ = ctor.prototype // 2.将空对象obj的__proto__属性指向构造函数的 prototype 原型属性，来代理到构造函数上的方法
  let res = ctor.call(obj, ...arg) // 3.对以obj为上下文，执行构造函数，并返回结果
  return typeof res === 'object' ? res : obj // 4.若构造函数返回的是一个对象，则返回这个对象，否则返回第一步创建的obj
}

/**
 * 模拟new （使用 Object.create）
 * @ctor 构造函数
 * @arg 参数
 **/
function myNew2(ctor, ...arg) {
  let obj = Object.create(ctor.prototype) // 1. 创建一个空对象，并代理到 ctor.prototype 的方法上，同上面的第1和第2步
  let res = ctor.call(obj, ...arg) // 同上
  return typeof res === 'object' ? res : obj // 同上
}

let p1 = new Array(1,2,3)
let p2 = myNew(Array, 1,2,3)
let p3 = myNew2(Array, 1,2,3)
```

### 第六版

使用  `class` 实现

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  play() {
    console.log('play')
  }
  sleep() {
    console.log('sleep')
  }
}

let aaron = new Person('Aaron', 31);
let vera = new Person('Vera', 28);
aaron.play();
vera.sleep();
```

### 小结

上面的示例中，我们使用了几种不同的方式模拟实现 Person 类。

这也引出了几个JS原型中最核心的基础概念，比如 `prototype`  、`Object.create `、 `new` 、 `class`。

下面我们熟悉一下它们。

#### prototype

> prototype 是所有JS函数都有的一个属性，我们可以用它在实例间共享属性和方法

#### Object.create

> 定义：Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__ 
> 语法：Object.create(proto，[propertiesObject]) —— MDN

简单说，`Object.create(proto)` 方法帮助我们创建了一个新对象，这个对象的 `__proto__` 属性指向 `proto`，然后返回这个对象。

**我们来测试一下：**

```js
var obj = Object.create(null)
obj // {}
obj.__proto__ // undefined
obj.constructor === undefined // true
```

由于 `Object.create` 会先创建一个对象，最后返回它，因此 `obj` 是一个空对象
而由于 `null` 没有任何方法，因此 `obj` 的 `__proto__` 上也没有任何方法，直接为 `undefined`

**再看正常情况下的：**

```js
var o = { a: 1 }
var obj = Object.create(o)
obj // {}
obj.__proto__ // { a: 1 }
obj.a // 1
obj.constructor === Object // true
```

这个示例中，我们以 `o` 作为 `prototype` 原型，赋给了 `obj` 的 `__proto__` 。

* 因此 `obj` 依然还是 `{}` 
* 但 `obj.__proto__` 上拥有了 `o` 的所有属性和方法
* 执行 `obj.a` 时，首先会在 `obj` 对象本身查找，发现没有找到，因此会向 `obj.__proto__` 上查找，发现有这个属性，因此返回 1 
* `obj.constructor` 指向的是创建 `obj` 的构造函数，而在 `Object.create` 内部，创建 `obj` 时构造函数即为 `Object`

下面我们模拟实现一个 `Object.create()`：

```js
Object.myCreate = function(proto) {
  let obj = {} // 等同于 let obj = new Object()
  obj.__proto__ = proto
  return obj;
}
var o = { a: 1 }
var obj = Object.myCreate(o)
obj.constructor // Object
```

从第一行代码 `let obj = {}` 中我们发现，创建 `obj` 的时候，构造函数是 `Object` ，因此创建出来的对象，其构造函数就是 `Object`

**上面的示例中，我们是用对象 `o` 作为原型参数，下面我们看看用 `o.__proto__` 会是什么效果：**

```js
var o = { a: 1 }
var obj = Object.create(o.__proto__)
obj // {}
obj.__proto__ // Object.prototype
obj.a // undefined
obj.constructor === Object // true
```

这里，因为我们传入的原型参数是 `o.__proto__` ，其实也就是 `Object` 这个构造函数。

它上面有很多方法，`obj` 都可以调用，但并没有 `a` 属性，因此 `obj.a` 返回了 `undefined`

**最后，我们看看 `Object.create` 的第二个参数 `propertiesObject`**

> Object.create(proto, propertiesObject) 

`propertiesObject` 允许我们添加额外的属性，但是需要遵循 **属性描述符** 的格式，和 `Object.defineProperty` 的[第二个参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)一样：

```js
var o = { a: 1 }
var obj = Object.create(o, {
  b: {
    value: 2
  }
})
obj // { b: 2 }
obj.b = 3
obj // { b: 2 } 
```

上面的例子中，因为默认添加的 `b` 属性是 **不可写** ，**不可枚举**，**不可配置** 的，因此修改 b 的值无效。


```js
var o = { a: 1 }
var obj = Object.create(o, {
  b: {

    // 数据描述符
    // value: 2,
    // writable: true, // 默认为 false
    enumerable: true, // 默认为 false
    configurable: true, // 默认为 false

    // 访问器描述符
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
})
obj // { b: 10 }
obj.b = 3
obj // { b: 10 }
```

同样的，这个例子中，由于 `obj.b` 调用的是 b 属性的 `访问器描述符` ，因此每次都会返回 `10` 。

#### new

> 定义：`new 运算符` 创建一个**用户定义的对象类型**的实例或**具有构造函数的内置对象**的实例。 - MDN
> 语法：`new constructor[([arguments])]`

new 关键字是JS中的语法糖，它内部会进行如下几个操作：
1. 创建一个空对象
2. 为这个空对象添加属性 `__proto__` ，并链接到构造函数的原型对象上
3. 执行这个构造函数，并指定步骤1中创建的对象作为 `this` 的上下文
4. 如果构造函数没有返回对象，则返回 `this`，如果有返回对象，则返回这个对象

**自己实现一个new**：

```js
function myNew(ctor, ...arg) {
  var obj = Object.create(ctor.prototype)
  // var obj = {}
  // obj.__proto__ = ctor.prototype
  var res = ctor.call(obj, ...arg)
  return typeof res === 'object' ? res : obj
}
```

通过以上4个步骤，我们就可以用 new 创建对象的实例了。

```js
var a = new Object({a:1});

function Person(name, age) {
    this.name = name   
    this.age = age
}
var p = new Person('Aaron', 31)
```

#### class

> **class 声明**创建一个基于原型继承的具有给定名称的新类。

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHello() {
    console.log('Hello')
  }
}

var p = new Person('Aaron', 31);
p.__proto__ === Person.prototype // true
```

其实 class 声明是ES6添加的一个语法糖，可以通过这个 [babel在线工具](https://babeljs.io/repl/#?browsers=&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYGwhgzhAEAKCmAnCB7AdtA3gKGtY6EALogK7BEqIAUaYAtvADTRgDm8AlFrntEQAsAlhAB0dRtAC80CfF55BI0e3jTWHXgF9eEMAE8AEvBAgU1bjjw6tQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.15.8&externalPlugins=&assumptions=%7B%7D) 查看ES5的实现

## 二、原型链

通过上面的案例，我们了解到原型可以帮助我们在不同的实例间共享属性和方法，实现的过程中，会涉及这么几个概念：

* `prototype` 是构造函数上的属性，用来在不同的实例间共享属性和方法
* `__proto__` 是对象上的属性，指向这个对象的原型
* `constructor` 是对象的构造函数，指向创建这个对象的构造函数
* `instanceof` 是判断一个对象是否为这个构造函数的实例

他们之间的关系如下：

```js
var obj = new Object()
obj.__proto__ === Object.prototype // true
obj.constructor === Object // true
obj instanceof Object // true
```

下面我们看一个实例：

```js
function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.play = function() {
  console.log(`${this.name} play`)
}
let person = new Person('Aaron', 31)
person.play() // Aaron play
```

其中：

- 构造函数 `Person`
- 实例 `person`
- 原型实例 `Person.prototype`
- 实例的原型属性 `person.__proto__`
- 原型实例的构造函数 `Person.prototype.constructor`
- 原型的原型属性 `Person.prototype.__proto__`

它们之间的关系如下图：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

下面我们用代码来表示：

```js
person.__proto__ === Person.prototype // true
Person.prototype.constructor === Person // true
Person.prototype.__proto__ === Object.prototype // true
Object.prototype.constructor === Object // true
Object.prototype.__proto__ === null // true
```

至此，我们就将整个原型链的关系展现出来了。

## 三、继承的实现方式

### ES5继承

JS继承的实现一直是个麻烦事儿，我们先用 ES5 来实现以下：

```js
function Animal(name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function(num) {
  console.log(`${this.name} is eating ${num}...`)
}

Animal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping...`)
}

Animal.prototype.play = function()  {
  console.log(`${this.name} is playing...`)
}

// let leo = new Animal('leo', 10)

function Dog(name, energy, breed) {
  Animal.call(this, name, energy) // 1、继承属性
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype) // 2、继承方法（但这里会引起 constructor 异常）

Dog.prototype.bark = function() { // 3、在子类的原型上添加方法
  this.energy -= .1
}

Dog.prototype.constructor = Dog // 4、修复 constructor 异常

```

### ES6继承

现在我们用 ES6 的语法来实现继承：

```js
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }

  eat(num) {
    console.log(`${this.name} is eating ${num}...`)
  }

  sleep() {
    console.log(`${this.name} is sleeping...`)
  }

  play()  {
    console.log(`${this.name} is playing...`)
  }
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    super(name, energy) // 等同于调用了 Animal 的 constructor
    this.breed = breed
  }
  bark() {
    this.energy -= .1
  }
}
```

可以看到 ES6 的实现精简了许多，也和其他面相对象编程语言如 Java 、C++的语法更接近了

**Function Array 和 Object是什么关系？**

```js
Function.prototype.__proto__ === Object.prototype // true
Array.prototype.__proto__ === Object.prototype // true
```

上面的结果说明： **Function 和 Array 都继承自 Object，它们创建的实例都有 Object 原型方法**

**原型链的最初是什么状态？**

`null => Object => Array/Function`


## 四、Object对象上的属性和方法

### 1、创建相关
- **`Object.create(proto，[propertiesObject])`** 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
- **`Object.assign(target, ...sources)`** 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

### 2、属性相关
- **`Object.defineProperties(obj, props)`** 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
- `Object.getOwnPropertyNames(obj)` 方法返回一个由指定对象的所有自身属性的属性名（**包括不可枚举属性但不包括Symbol值作为名称的属性**）组成的数组。
- `Object.getOwnPropertyDescriptors(obj)` 方法用来获取一个对象的所有自身属性的描述符。
- `Object.getOwnPropertySymbols(obj)` 方法返回一个给定对象自身的所有 Symbol 属性的数组。

- `Object.seal(obj)` 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
- `Object.isSealed(obj)` 方法判断一个对象是否被密封。

- `Object.preventExtensions(obj)` 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
- `Object.isExtensible(obj)` 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

- `Object.freeze()` 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；
- `Object.isFrozen(obj)` 方法判断一个对象是否被冻结。

- **`Object.keys(obj)`** 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
- **`obj.hasOwnProperty(prop)`** 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

- `Object.entries(obj)` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
- `Object.fromEntries(iterable) ` 方法把键值对列表转换为一个对象。

- `Object.values(obj)` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

### 3、原型相关
- `Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。**性能原因建议使用 Object.create 替代**

- `Object.getPrototypeOf(obj)` 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
- `prototypeObj.isPrototypeOf(object)` 方法用于测试一个对象是否存在于另一个对象的原型链上。

### 4、其他
- `Object.is(value1, value2)` 方法判断两个值是否为同一个值。
- **`obj.toString()`** 方法返回一个表示该对象的字符串。
- **`obj.valueOf()`** 方法返回指定对象的原始值。

```js
let arr = [];
Object.getPrototypeOf(arr) === Array.prototype // true
```

## 五、JavaScript是如何设计对象的？
我们知道对象的三要素有：
- 唯一性：即使完全相同的两个对象，也并非同一个对象
- 状态：对象的状态，同一对象可能处于不同的状态之下
- 行为：可能因为行为产生状态变迁

而JavaScript设计对象时，将对象设计成为了：**具有高度动态性的属性集合**。具体表现在：
1. 将状态和行为抽象成了属性
2. 支持动态添加状态和行为

为了支持上述的设计，JavaScript的属性被设计成两类：**数据属性** 和 **访问器属性**，而且通过一组特征来描述属性：
- **数据属性**，接近其他语言的属性概念，通常我们定义的都是数据属性
    - value：属性的值
    - writable：决定属性能否被赋值
    - enumerable：决定 for in 能否枚举该属性
    - configurable：决定该属性能否被删除或者改变特征值
- **访问器属性**，可以通过 Object.defineProperty 来定义
    - getter：函数或 undefined，在取属性值时被调用
    - setter：函数或 undefined，在设置属性值时被调用
    - enumerable：决定 for in 能否枚举该属性
    - configurable：决定该属性能否被删除或者改变特征值
    用 Object.getOwnPropertyDescriptor 来查看属性的特征

**综上，实际上 JavaScript 对象的运行时是一个“属性的集合”，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。**

## 六、JavaScript是如何实现面向对象的？
> JavaScript是基于原型的面向对象语言

JavaScript是基于 **原型编程范式** 来实现面向对象的。原型编程范式的核心思想就是**利用实例来描述对象，用实例作为定义对象和继承的基础**。

在 JavaScript 中，原型编程范式的体现就是基于原型链的继承。这其中，对原型、原型链的理解是关键。

### 1、基于原型vs基于类
- JavaScript 使用了基于原型的方式实现面向对象，而不是基于类的方式。
- 由于公司政治原因，JavaScript 推出之时，管理层就要求它去模仿 Java，Brendan Eich在原型基础上引入了new、this等语言特性，使之语法看起来更像Java。
- 基于原型和基于类都能够满足基本的复用和抽象需求，它们的区别在于：基于原型强调行为，基于类则强调分类。猫->老虎（大猫），猫->老虎（猫科动物）

### 2、原型系统
抛开Java类的复杂语法设施(new、Function Object、函数的prototype属性等)，**其实原型系统相当简单**:
- **对象的原型上都有私有字段`[[prototype]]`**
- **对象上读取一个属性，如果当前对象本身没有，则会继续访问对象的原型，直到找到或原型为空为止**

早前，程序员只能通过Java风格的类接口来操纵原型运行时，ES6则提供内置函数来操纵原型：
- `Object.create` 根据指定的原型创建新对象，原型可以是null
- `Object.getPrototypeOf` 获得一个对象的原型
- `Object.setPrototypeOf` 设置一个对象的原型

### 3、JavaScript中的类
- ES3以前很弱，仅仅是运行时的一个私有字符串属性`[[class]]`，通过`Object.prototype.toString` 获取

- ES5开始，`[[class]]` 被 `Symbol.toStringTag` 代替，`Object.prototype.toString` 的意义从命名上不再跟 class 相关

- `new` 可以理解为JavaScript面向对象的一部分，new运算接收一个构造器和一组调用函数，实际上做了几件事：
    1. 以构造器的 prototype 属性为原型，创建新对象；
    2. 将 this 和调用参数传给构造器，执行；
    3. 如果构造器返回的是对象，则返回，否则返回第一步创建的对象。

- ES6加入了新特性 `class` ，`new` 跟 `function` 搭配的怪异行为终于可以退休了（虽然运行时没有变），在任何场景，都推荐使用ES6的语法来定义类，而令`function` 回归原本的函数语义。

## 总结
首先，我们通过实现一个 Person 类，了解到：
- prototype 原型是如何在实例间共享方法的
- Object.create(prototype) 的效果是创建一个对象，然后将其 `__proto__` 属性代理到 `prototype` 上，这样这个对象就可以调用 prototype 上的方法了
- new 关键字可以简化我们的构造函数，比如 `new Object()` 它主要做了如下几件事：
  1. 创建一个空对象 obj
  2. 设置这个对象的 `__proto__` 为构造函数 `Object.prototype`
  3. 执行这个构造函数，并以 obj 作为this上下文
  4. 第三步返回的若是一个对象，则返回这个对象，否则返回 obj

然后，我们分别对介绍了 `prototype` `Object.create(proto, propertiesObject)` `new` `class` 的使用

接着，我们比较了几种创建对象的方式：`{}` `Object.create({})` `new Object()`

再后来，对 Object 对象上的方法进行了详细的介绍，并分类列出了创建相关的、属性相关、原型相关的方法

最后，我们使用 ES5 和 ES6 的语法分别实现继承，并引出原型链。

**练习1：分别用ES5/ES6实现类、ES5/ES6实现继承、并用代码模拟原型链的查找过程**

**练习2：手写new、手写instanceof**
