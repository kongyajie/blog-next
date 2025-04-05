# React系列之6-hooks

## 前言

class组件存在问题：
- 大型项目很难拆分和重构，很难测试（即class不易拆分）
- 相同的业务逻辑，分散到各个方法中，逻辑混乱（ajax请求、绑定/解绑）
- 复用逻辑变的复杂，如Mixins、HOC、Render Props

React组件更易用函数表达：
- React提倡函数式编程，view=fn(props)
- 函数更灵活，更易拆分，更易测试
- 但函数组件太简单，需要增强能力 — —Hooks

本章主要内容：
- State Hooks
- Effect Hooks
- 其他 Hooks
- 自定义 Hooks
- 组件逻辑复用（Hooks的意义）
- 规范和注意事项

## 一、State Hooks

## 二、Effect Hooks
目的：让函数组件模拟生命周期
- 默认函数组件没有生命周期
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
- 使用 EffectHooks 把生命周期 “钩” 到纯函数中

useEffect 使用总结
- 模拟 componentDidMount - useEffect 依赖 [] 
- 模拟 componentDidUpdate - useEffect 无依赖，或者依赖[a,b]
- 模拟 componentWillUmMount - useEffect 中返回一个函数

useEffect 让纯函数有了副作用
- 如设置全局定时任务

小结
- 函数组件更适合React组件，但需要 Hooks 增强功能
- useState 可实现 state 和 setState
- useEffect 可模拟组件主要的生命周期

## 三、其他hooks
### useReducer能代替reduce吗
- useReducer 是 useState 的代替方案，用于state复杂变化
- useReducer 是单个组件状态管理，组件通讯还需要props
- redux 是全局的状态管理，多组件共享数据

### useMemo使用总结
- React默认会更新所有子组件
- Class组件使用SCU和PureComponent做优化
- Hooks中使用useMemo，但优化原理是相同的

### useCallback使用总结
- useMemo用来缓存数据
- useCallback用来缓存函数

## 四、自定义hook
- 本质是一个函数，以use开头
- 内部正常使用 useState useEffect 获取其他Hooks
- 自定义返回结果，格式不限

### 第三方hook
todo...

## 五、Hooks使用规范
- 只能用于React函数组件和自定义Hook中，其他地方不可以
- 只能用于顶层代码，不能在循环、判断中使用Hooks
- eslint插件eslint-plugin-react-hooks可以帮到你

### Hooks调用顺序必须保持一致
- 无论是render还是re-render，Hooks调用顺序必须保持一致
- 如果Hooks出现在循环、判断里，则无法保证顺序一致
- Hooks严重依赖于调用顺序！重要！

### class做组件逻辑复用的问题

### Hooks做组件逻辑复用的好处
- 完全符合Hook是原有规则，没有其他要求，易于理解记忆
- 变量作用域很明确
- 不会产生组件嵌套

## 六、React Hooks注意事项（哪些坑）
- useState初始化state值，只有第一次有效（修改state需要通过setState修改，不能通过props来修改state的值）
- useEffect内部不能修改state（依赖为空[]时不会执行）
- useEffect可能出现死循环（依赖里不能有对象或数组）


## 问题解答（自检）
#### 1、为什么要使用Hooks？
- 完善函数组件的能力，函数更适合React组件
    - class组件中，相同的逻辑散落在各处
    - DidMount和Didupdate

#### 2、react Hooks如何模拟组件生命周期？

#### 3、如何自定义Hook

#### 4、Hooks性能优化

#### 5、使用Hooks遇到哪些坑

#### 6、Hooks相比HOC和props render有哪些优点


## 我的疑问
### 如何看待hooks的作用？功能增强？和现有的功能如vue computed对比？
### 不同hooks之间的关系？如 useEffect和useRefs
### 带hooks的函数组件渲染和更新是怎么个逻辑？


## 总结

## 参考资料