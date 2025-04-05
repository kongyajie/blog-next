# 函数-new

## 实现

```js
function newObj(ctor, ...args) {
    let obj = {}; // 1、创建一个空对象
    obj.__proto__ = ctor.prototype; // 2、将对象的原型属性链接到构造器的原型实例上，建立原型链
    let res = ctor.apply(obj, args); // 3、执行构造器函数
    
    return typeof res === 'object' ? res : obj; // 4、若构造器函数返回的是一个对象，则return这个对象，否则返回第1步中创建的实例
}
```

这里return前要判断构造器是否返回对象的原因是：构造器可能将属性和方法都通过return返回出来，而不是在this上。

看下面的例子：
```js
function newObj(ctor, ...args) {
    let obj = {}; // 1、创建一个空对象
    obj.__proto__ = ctor.prototype; // 2、将对象的原型属性链接到构造器的原型实例上，建立原型链
    ctor.apply(obj, args); // 3、执行构造器函数
    
    return obj; // 4、若构造器函数返回的是一个对象，则return这个对象，否则返回第1步中创建的实例
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
let person1 = new Person('Aaron',31); // Person {name: 'Aaron', age: 31}
let person2 = newObj(Person,'Aaron',31); // Person {name: 'Aaron', age: 31}
```

上面的例子中，构造器将属性绑定到this上，因此在newObj中创建的obj中，也响应的绑定上了。

再看下面的例子：
```js
function newObj(ctor, ...args) {
    let obj = {}; // 1、创建一个空对象
    obj.__proto__ = ctor.prototype; // 2、将对象的原型属性链接到构造器的原型实例上，建立原型链
    ctor.apply(obj, args); // 3、执行构造器函数
    
    return obj; // 4、若构造器函数返回的是一个对象，则return这个对象，否则返回第1步中创建的实例
}
function Person(name, age) {
  let obj = {};
  obj.name = name;
  obj.age = age;
  return obj;
}

let person1 = new Person('Aaron',31); // Person {name: 'Aaron', age: 31}
let person2 = newObj(Person,'Aaron',31); // Person {}

```

上面的例子中，person2返回的是空对象，因为在构造器中属性是绑定在内部对象上，然后通过return返回出来的。为了接受到这个返回，我们需要判断一下，也就是 `return typeof res === 'object' ? res : obj` 这行代码的意义所在了。

## 加强版（仅供参考）

3个步骤：

1. 以ctor.prototype为原型创建一个对象。
2. 执行构造函数并将this绑定到新创建的对象上。
3. 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象。


```js
function newOperator(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error');
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}
```