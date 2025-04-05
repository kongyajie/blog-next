# 原型-instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
const myInstanceof = (instance, ctor) => {
  // 基本数据类型都返回false
  if (typeof instance !== 'object' || instance === null) return false;

  while(instance) {
      if (instance.__proto__ === ctor.prototype) return true;
      instance = instance.__proto__;
  }
  return false;
}

class Person {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
}
let p = new Person('Aaron', 31)

myInstanceof(p, Person); // true
myInstanceof(p, Object); // true
myInstanceof({a:1}, Object); // true
myInstanceof({a:1}, Person); // false
```