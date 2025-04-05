# 函数-手写call apply bind

## call

于call唯一不同的是，call()方法接受的是一个参数列表

```js
// 使用场景：大多数情况下，使用call是为了复用函数，但当前对象又没有这个函数
// 实现目标：以context为上下文，调用当前this函数，并传入参数
// 实现思路：在context上临时添加当前函数，并调用
// 难点：如何在context上临时添加函数，用完记得要删除掉
Function.prototype.call2 = function(context = window, ...arg) {
    if (typeof this !== 'function') throw new TypeError('Type Error') // 0、类型检查

    let fn = Symbol('fn') // 1、创建一个唯一key
    context[fn] = this  // 2、在context添加这个key，指向当前函数this
    const res = context[fn](...arg) // 3、调用函数，缓存结果（这里因为还要删除key，因此不能直接返回结果）
    delete context[fn] // 4、删除key
    return res // 5、返回结果
}

// 测试
function Hello(age) {
    console.log('Hello ', this.name, age);
}
var p1 = {name: 'Aaron'}
Hello.call2(p1, 31) // 对比 Hello.call(p1, 31) 
```

## apply

第一个参数是绑定的this，默认为window，第二个参数是数组或类数组

```js
Function.prototype.apply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}

```

## bind

```js
Function.prototype.bind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error("Type Error");
  }
  // 保存this的值
  var self = this;

  return function F() {
    // 考虑new的情况
    if(this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args, ...arguments])
  }
}

```