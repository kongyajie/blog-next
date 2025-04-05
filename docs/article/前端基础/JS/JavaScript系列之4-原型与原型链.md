# JavaScript系列之4-原型与原型链

## 前言
> **编程范型、编程范式或程序设计法**（英语：Programming paradigm），是指软件工程中的一类典型的编程风格。常见的编程范型有：函数式编程、指令式编程、过程式编程、面向对象编程等等。 —— [维基百科](https://zh.wikipedia.org/wiki/%E7%BC%96%E7%A8%8B%E8%8C%83%E5%9E%8B)

JavaScript是基于**原型编程范式**来实现面向对象的。原型编程范式的核心思想就是**利用实例来描述对象，用实例作为定义对象和继承的基础**。

在 JavaScript 中，原型编程范式的体现就是基于原型链的继承。这其中，对原型、原型链的理解是关键。

本文分为以下几个部分：
- 原型和原型链案例
- JavaScript是如何设计对象的？
- JavaScript是如何实现面向对象的？
- 对象的创建
- 对象的继承

## 一、原型和原型链案例
```js
funciton Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.eat = function() {
    console.log('吃饭')
}
const person = new Person('Aaron', 31)
```

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

- 构造函数 `Person`
- 原型 `Person.prototype`
- 原型的构造函数 `Person.prototype.constructor`
- 实例的原型属性 `person.__proto__`
- 原型的原型属性 `Person.prototype.__proto__`

## 二、JavaScript是如何设计对象的？
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

## 三、JavaScript是如何实现面向对象的？
> JavaScript是基于原型的面向对象语言

### 1、基于原型vs基于类
- JavaScript 使用了基于原型的方式实现面向对象，而不是基于类的方式。
- 由于公司政治原因，JavaScript 推出之时，管理层就要求它去模仿 Java，Brendan Eich在原型基础上引入了new、this等语言特性，使之语法看起来更像Java。
- 基于原型和基于类都能够满足基本的复用和抽象需求，它们的区别在于：基于原型强调行为，基于类则强调分类。猫->老虎（大猫），猫->老虎（猫科动物）

### 2、原型系统
抛开Java类的复杂语法设施(new、Function Object、函数的prototype属性等),其实原型系统相当简单:
- 对象的原型上都有私有字段`[[prototype]]`
- 对象上读取一个属性，如果当前对象本身没有，则会继续访问对象的原型，直到找到或原型为空为止

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



## 对象的创建

## 对象的继承

## 总结

## 参考资料