## Vue3.0初体验

## 学习思路

- 构建大局观：思维导图
- 拥抱变化：新特性
- 实战中学习：TodoList、我的博客网站



## 一、总览

- 介绍
- 应用/组件实例
- 模板语法
- Data Property 和方法
- 计算属性和侦听器
- Class 和 Style 绑定
- 条件渲染
- 列表渲染
- 事件处理
- 表单输入绑定
- 组件基础

## 二、新特性

- 创建应用：createApp({})

- 组合式API

  - 什么是组合式 API ？

    > 初衷： 将同一个逻辑关注点相关代码收集在一起
    >
    > 方法：使用 setup

  - Setup 组件选项

    新的 `setup` 选项在组件被创建**之前**执行，一旦 `props` 被解析完成，它就将被作为组合式 API 的入口。

    `setup` 选项是一个接收 `props` 和 `context` 的函数，我们将在[之后](https://v3.cn.vuejs.org/guide/composition-api-setup.html#参数)进行讨论。此外，我们将 `setup` 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

    因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

    ```js
    export default {
      components: {},
      props: {},
      setup(props, context) {
        // Attribute (非响应式对象，等同于 $attrs)
        console.log(context.attrs)
    
        // 插槽 (非响应式对象，等同于 $slots)
        console.log(context.slots)
    
        // 触发事件 (方法，等同于 $emit)
        console.log(context.emit)
    
        // 暴露公共 property (函数)
        console.log(context.expose)
        
        // mounted
        onMounted(() => {
          console.log('Component is mounted!')
        })
      }
    }
    ```

  - 带 ref 的响应式变量

  - 在 setup 内注册生命周期钩子

  - watch 响应式更改

  - 独立的 computed 属性

## 三、实战



### 1. 启动时，使用了createApp 创建 vue实例

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```


前端Cloud IDE

- **CodeSandbox**
- [StackBlitz](https://stackblitz.com/)
- Codepen
- Jsfiddle
- Jsbin

