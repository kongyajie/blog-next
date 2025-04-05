# 实用-打印当前HTML元素种类

一行代码可以解决：

```js
const fn = () => {
  return [...new Set([...document.querySelectorAll('*')].map(el => el.tagName))].length;
}
```

值得注意的是：DOM操作返回的是类数组，需要转换为数组之后才可以调用数组的方法。