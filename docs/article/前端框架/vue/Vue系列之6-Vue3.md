# Vue系列之6-Vue3

## 前言

本章主要内容：
- 新功能
- 原理
- vite

### Vue3比Vue2有什么优势？（重点）
- **性能更好**
- 体积更小
- **更好的TS支持**
- **更好的代码组织&逻辑抽离**
- 更多新功能

### Vue3和Vue2生命周期有什么区别？
Options API声明周期

- beforeDestory => beforeUnmount
- destoryed => unmounted

### 如何理解Composition API和Options API（重要）
CompositionAPI带来了什么
- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

如何选择
- 不建议共用，会引起混乱
- 小型项目、业务逻辑简单，用Options API
- 中大型项目、逻辑复杂，用Composition API

### 如何理解ref toRef和toRefs
ref
- 生成值类型的响应式数据
- 可用于模板和reactive
- 通过.value修改值

最佳使用方式
- **用reactive做对象的响应式，用ref做值类型的响应式**
- setup中返回toRefs(state)，或者toRef(state,'xxx')
- ref的变量命名都用xxxRef
- 合成函数返回响应式对象时，使用toRefs

为何需要ref？
- 返回值类型，会丢失响应式
- 如在setup、computed、合成函数，都有可能返回值类型
- Vue如不定义ref，用户将自造ref，反而混乱

为何需要.value?
- ref是一个对象（不丢失响应式），value存储值
- 通过.value属性的get和set实现响应式
- 用于模板、Reactive时，不需要.value，其他情况都需要

为何需要toRef和toRefs？
- 初衷：不丢失响应式的情况下，把对象数据**分解/解构**
- 前提：针对的是响应式对象（reative封装的）非普通对象
- 注意：**不创造**响应式，而是**延续**响应式

> reactive/ref创建响应式，toRef/toRefs延续响应式


### Vue3升级了哪些重要功能
- createApp
- emits属性
- 生命周期
- 多事件
- Fragment
- 移除.sync
- 异步组件写法
- 移除filter
- Teleport
- Supense
- Composition API

### Composition API 实现逻辑复用

- 抽离逻辑代码到一个函数
- 函数命名约定为 useXxxx 格式（React Hooks也是）
- 在 setup 中引用 useXxxx 函数

### Vue3如何实现响应式

- 回顾vue2.x的Object.defineProperty
- 学习Proxy语法
- Vue3如何用Proxy实现响应式

Object.definePropery的缺点：
- 深度监听需要一次性递归
- 无法监听新增属性/删除属性（vue.set Vue.delete)
- 无法原生监听数组，需要特殊处理

Proxy实现响应式
- 基本使用
- Reflect
- 实现响应式

Reflect作用
- 和Proxy能力一一对应
- 规范化、标准化、函数化
- 代替Object上的工具函数（防止Object大而全，会更纯净）

Vue3用Proxy实现响应式
- 深度监听，性能更好
- 可监听新增/删除属性
- 可监听数组变化
- Proxy无法兼容所有浏览器，无法polyfill

### watch和watchEffect的区别
- 两者都可监听data属性变化
- watch需要明确监听哪个属性
- watchEffect会根据其中的属性，自动监听其变化

### setup中如何获取组件实例
- 在setup和其他composition API中没有this
- 可通过getCurrentInstance获取当前实例
- 若使用Options API可正常获取this

### Vue3为什么比Vue2快（重要）
- Proxy响应式
- PatchFlag 静态比较
- hoistStatic 静态提升
- CacheHandler 缓存事件
- SSR优化
- Tree-Shaking优化

PatchFlag
- 编译模板时，动态节点做标记
- 标记，分为不同的类型，如Text、Props
- diff算法时，可以区分静态节点，以及不同类型的动态节点

hoistStatic
- 将静态节点的定义，提升到父作用域，缓存起来
- 多个相邻的静态节点，会被合并起来
- 典型的拿空间换时间的优化策略

SSR优化
- 静态节点输出，绕过Vdom
- 动态节点，还是需要动态渲染


Vite为什么这么快
- 开发环境下使用ES6 Module，无需打包——非常快
- 生产环境使用rollup，并不会快很多
- ES6 Module兼容性目前大部分浏览器都支持，未来几年很可能生产环境也可以使用


### Composition API和React Hooks对比
- 前者setup只会被调用一次，而后者函数会被多次调用
- 前者无需useMemo、useCallback，因为setup只调用一次
- 前者无需顾虑调用顺序，而后者需要保证hooks的顺序一致
- 前者reactive和ref比后者useState，要难理解

