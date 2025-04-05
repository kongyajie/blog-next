# React系列之2-使用

## 前言

本章主要内容：
- 安装
- 基础使用
- 组件
- 高级特性

## 一、安装
### 1、引入CDN文件 

- 第一步，引入 `react.js` `react-dom.js` `babel.js`（用于JSX支持）
- 第二步，添加一个 `id` 为 `root` 的 `div` 元素
- 第三步，添加一段 script 代码，注意其中 type 属性 为 `text/babel`

最终的HTML代码如下：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Hello React!</title>
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
 
<div id="root"></div>
<script type="text/babel">
ReactDOM.render(
    <h1>Hello, React!</h1>,
    document.getElementById('root')
);
</script>
 
</body>
</html>
```

### 2、使用 `create-react-app` 快速构建 React 开发环境

Create React App 是一个用于学习 React 的舒适环境，也是用 React 创建**新的单页应用**的最佳方式。

它会配置你的开发环境，以便使你能够使用最新的 JavaScript 特性，提供良好的开发体验，并为生产环境优化你的应用程序。你需要在你的机器上安装 `Node >= 8.10 和 npm >= 5.6`。要创建项目，请执行：

执行以下命令创建项目：

```bash
npx create-react-app my-app
cd my-app
npm start
```

项目的目录结构如下：

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

manifest.json 指定了开始页面 index.html，一切的开始都从这里开始，所以这个是代码执行的源头。

尝试修改 src/App.js 文件代码：

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello React</h2>
        </div>
        <p className="App-intro">
          你可以在 <code>src/App.js</code> 文件中修改。
        </p>
      </div>
    );
  }
}
 
export default App;
```

## 二、基础使用

### 1、JSX语法：
变量表达式/class/style/子元素和组件
* 使用 `className` 代替 `class` ，因为 `class` 是JS中的保留字
* 属性和方法需要使用驼峰写法，比如 `onclick` -> `onClick`
* 使用 `{}` 表示内部为JS表达式
* 注意：`false`, `null`, `undefined`, 和 `true` 是合法的子元素，但它们并不会被渲染，而 `0` 会被渲染


```jsx
render() {
    const rawHtml = `<span>This demo is about JSX</span>`;
    const rawHtmlData = {
      __html: rawHtml
    }
    return (
      <div>
        {/* 插值 */}

        {/* 获取state变量 */}
        <p>My name is {this.state.name}</p>

        {/* 表达式 */}
        <p>Am I a male ： {this.state.flag ? 'Yes' : 'No' }</p>

        {/* class */}
        <p className="red">Hello React</p>

        {/* style */}
        <p style={{color: 'red'}}>So glad you're here.</p>

        {/* 原生html */}
        <p>{rawHtml}</p>
        <p dangerouslySetInnerHTML={rawHtmlData}></p>
        
      </div>
    )
  }
```
### 2、条件判断
* &&写法（常用）
* 三元表达式

```jsx
{/* &&写法 */}
<p>{this.state.flag && yes}</p>

{/* 三元表达式写法 */}
<p>{this.state.flag ? yes : no }</p>
```

### 3、渲染列表
1、使用 `arr.map` 进行迭代，对比 vue 使用 `v-for`
2、item,index同vue
3、注意加 **key** ，必填，不能是 index 或 random ，同vue
4、可使用 `arr.filter` 过滤

```jsx
<ul>
  {
    this.state.list.map(
      (item, index) => {
      return (
        <li key={item.id}>
          <span>{index + 1}、My name is {item.name}, I'm {item.gender}</span>
        </li>
      ) 
    })
  }
</ul>
```

### 4、事件处理（需注意this指向）
* React 事件的命名采用小驼峰式（camelCase），而不是纯小写，如 `onclick` => `onClick`
* 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
* 处理未 this 为 undefined 的问题：
  * `handler = ()=>{}` （在元素上写，或函数定义写时均可）
  * `handler.bind(this)` （在元素上写，或函数定义写时均可）
* 不能通过 `return false` 的方式阻止默认行为，而必须显式的使用 `preventDefault`
* 一些键盘事件如 `onKeyDown` `onKeyPress` `onKeyUp`

```jsx
add() {
  this.setState({
    count: this.state.count + 2
  })
}
// reset() {
//   this.setState({
//     count: 0
//   })
// }
reset = () => {
  this.setState({
    count: 0
  })
}
render() {
  return (
    <div>
      {/* 事件处理 */}

      <button onClick={this.add.bind(this)}>Add</button>

      {/* <button onClick={() => {this.reset()}}>Reset</button> */}

      <button onClick={this.reset}>Reset</button>

      <div>{this.state.count}</div>

    </div>
  )
}
```

### 5、表单（受控组件）
> 受控组件：表单输入元素，**组件控制输入后的更新**，组件内部维护state

* props vs state
  * props（自上而下，父级传入，无法修改）
  * state（对应vue中的data，组件内维护）
  State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

* 如何选择使用props还是state？
  * 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
  * 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
  * 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

### 6、props
- 类型检查
  
### 7、state和setState

state是不可变值，要保证不会修改state，要牢记一些数组和对象的API方法：

**数组**
- this.state.list.concat(100) // 追加
- [...this.state.list, 100] // 追加
- this.state.slice(0,3) // 截取
- this.state.list.filter(item => item > 100) // 筛选
- copy // 其他操作
- 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

**对象**
- Object.assign({}, this.state.obj1, {a:100})
- {...this.state.obj2, a:100}
- 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值

**setState三件事**
- 不要直接修改state
- state的更新可能是异步的
- state的更新会被合并

```jsx
// 1、普通更新
// this.setState({
//   count: this.state.count + 1
// })

// 2、普通更新+nextTick
// this.setState({
//   count: this.state.count + 1
// }, () => { // 类比 vue 中的 $nextTick()
//   console.log('setState callback: ', this.state.count)  
// })
// console.log('current count: ', this.state.count)

// 3、setState默认异步更新，异步更新中修改会被合并。传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1
// this.setState({
//   count: this.state.count + 1
// })
// this.setState({
//   count: this.state.count + 1
// })
// this.setState({
//   count: this.state.count + 1
// })

// 4、回调函数更新，不会被合并
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})
this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})

// 5、setTimeout中，setState为同步更新，修改不会被合并
// setTimeout(() => {
//   this.setState({
//     count: this.state.count + 1
//   })
//   this.setState({
//     count: this.state.count + 1
//   })
//   this.setState({
//     count: this.state.count + 1
//   })
// }, 100)
```


## 三、组件
### 函数组件 vs Class组件
定义组件最简单的方式就是编写 JavaScript 函数：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class 来定义组件：

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

生命周期
- 初始化阶段（初始化state和props）
- 挂载阶段（componentWillMount -> render -> componentDidMount）
- 更新阶段（shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate）
- 卸载阶段（componentWillUnmount）

[React 生命周期详解](https://segmentfault.com/a/1190000021827650)

React Fiber（React16）
- 实际上是对React核心算法（调和过程）的重写
- 背景：React15中渲染分为两个阶段，协调阶段和渲染阶段。协调阶段执行diff算法，纯JS计算；渲染器负责渲染DOM。问题是协调器是递归处理虚拟DOM的，又由于JS是单线程，性能较差。因此Fiber添加了调度器来优化协调过程，使用了 requestIdleCallback 机制进行任务拆分，提高了性能。

[浅谈对 React Fiber 的理解](https://segmentfault.com/a/1190000039189408)
## 四、高级特性
### 1、函数组件
纯函数组件 vs class组件
- 纯函数，输入props，输出JSX
- 没有实例、没有声明周期、没有state
- 不能扩展其他方法

### 2、受控和非受控组件
> 非受控组件的使用场景：必须使用DOM元素，setState实现不了的时，比如文件上传 `<input type="file">`，某些富文本编辑器，需要传入 DOM 元素

> 优先使用受控组件，符合React设计原则；必须使用DOM时，使用非受控组件。

ref的使用
- 创建ref： `this.inputRef = React.createRef();`
- 将ref绑定到元素上：`<div ref={this.inputRef}></div>`
- 获取ref：`let dom = this.inputRef.current`

### 3、portals（传送门，把一个东西传给另一个东西）
> Portal 提供了一种将**子节点渲染到存在于父组件以外**的 DOM 节点的优秀的方案。

我们知道，组件默认会按照既定层次嵌套渲染。也就是说，父组件内的子组件，会被渲染在父组件对应的DOM内。但在某些场景下，可能需要将子组件渲染在父组件的DOM元素之外。比如：
- 父组件z-index值太小
- overview:hidden
- fixed需要放在body第一层级

Portal 使用类似hack的方式达到这一目的，但不会打乱编写时的组件结构。

使用方式如下：

```jsx
ReactDOM.createPortal(
    this.props.children,
    domNode
)`
```

### 4、context
> Context 就是跨组件层级传递数据，一个生产者 Provider 和若干个消费者 Consumer，和vue中的provider、inject效果一样

- 公共信息（语言、主体）如何传递给每一个组件？
- 用props太繁琐
- 用redux小题大做

### 5、异步组件
> 性能优化
- import ()
- React.lazy
- React.Suspense

### 6、性能优化
> 性能优化对于 React 更加重要

**shouldComponentUpdate**
> SCU默认返回true，即React默认重新渲染所有子组件
> 必须配合“不可变值“一起使用

为什么 react SCU的声明周期默认返回true？
- SCU默认返回true：React默认父组件有更新，子组件则无条件也更新

还提供给用户返回false的能力？
 - 简单的项目基本不需要考虑优化问题，需要优化时优化就对了
 
**pureComponent和memo**
> 由于深比较性能较差，所以 `pureComponent` 在 `SCU` 中实现了浅比较，而浅比较已经能满足大部分场景

> class组件使用pureComponent，默认就会在SCU中进行浅比较，以判断是否要更新
```js
class MyList extends React.pureComponent
```

> 函数组件使用memo
```js
function MyComnent(props) {
    /*使用props进行渲染*/
}

function areEqual(prevProps, nextProps) {
    /*比较prevProps和nextProps*/
}

React.memo(MyComponent, areEqual)
```

**immutable.js**

### 7、组件公共部分抽离
- Mixin（React已弃用）
- 高阶组件 HOC High Order Component
- Render Props

**HOC**
- 高阶组件不是一个功能，而是一种工厂模式
- 模式简单，但会增加组件层级

**Render Props**
- 更高级，更优雅的实现方式
- 代码简洁，学习成本较高

**HOC VS RenderProps**
- 按需使用

## 总结
本章的代码库 [learn-framework-project](https://gitee.com/AaronKong/learn-framework-project) 

## 参考资料