# Vue系列之5-常见问题

## 前言

本章介绍Vue常见问题

## 一、基础使用

### computed和watch的区别
- computed 
    - 不支持异步
    - 多对一
    - 默认是set函数
- watch
    - 支持异步
    - 一对多
    - 可设置deep和immediate，以及字符串的形式监听'obj.a'

### v-if 和 v-show有什么区别
- v-if 不会渲染出元素
- v-show 会渲染元素，只是将display设为了none
- visibility:hidden，是隐藏元素，但元素依然占据空间
- opacity:0 是设置透明度，可以看做是障眼法

### v-if 和 v-for 不推荐一起使用？
- 因为v-for优先级比v-if要高，而遍历时会重复执行条件判断，影响性能
- 解决方案：使用computed筛选

```html
<ul>
    <li
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id"
    >
        {{user.name}}
    </li>
</ul>
```

```html
<ul>
    <li
        v-for="user in activeUsers"
        :key="user.id"
    >
        {{user.name}}
    </li>
</ul>
```

```js
computed: {
    activeUsers() {
        return this.users.filter(el => el.isActive);
    }
}
```

## 二、组件相关

### vue生命周期（重点）

- **beforeCreated** （初始化前）
- **created**  （vue实例的数据对象data有了）
- **beforeMounted** （vue实例的data和$el都初始化了，但未渲染）
- **mounted** （vue实例挂载完成，成功渲染）
- **beforeUpdated**
- **updated**
- **beforeDestoryed** （解除事件监听和dom绑定，但dom结构依然存在）
- **destroyed** （All Gone）

> 1.**创建前/后**： 在beforeCreate阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el为undefined，还未初始化。

> 2.**载入前/后**：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。

> 3.**更新前/后**：当data变化时，会触发beforeUpdate和updated方法

> 4.**销毁前/后**：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

### 组件间通讯（重点）
- 父传子：props
- 子传父：$emit()
- 组件之间：eventBus事件中心、Vuex

### 定义组件一定要使用单文件组件吗？

> 单文件组件为了解决 Vue.component 直接定义组件的种种限制而提出的,因此不是必须的。

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
- **不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- **没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html#ad)

### 为什么vue组件中的data必须是一个函数

> 对象为引用类型，当复用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object的实例），引用地址不同，则不会出现这个问题。

## 三、高级特性相关

### vue如何获取dom
```javascript
this.$refs.domName
```

### v-on可以监听多个方法吗
```html
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur, }">
```

### slot插槽使用场景
很多时候，我们封装了一个子组件之后，在父组件使用的时候，想添加一些dom元素，这个时候就可以使用slot插槽了，但是这些dom是否显示以及在哪里显示，则是看子组件中slot组件的位置了。

### vue初始化白屏问题
使用vue开发时，在vue初始化之前，由于div是不归vue管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于{{message}}的字样，虽然一般情况下这个时间很短暂，但是我们还是有必要让解决这个问题的。
首先：在css里加上以下代码
```css
[v-cloak] {
    display: none;
}
```

如果没有彻底解决问题，则在根元素加上`style="display: none;" :style="{display: 'block'}"`

### $nextTick是什么（重点）
> nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用nextTick，则可以在回调中获取更新后的 DOM

[Vue的nextTick具体是微任务还是宏任务?](https://juejin.cn/post/6875492931726376974)
### v-model的原理&自定义v-model（重点）
v-model的原理：
1. 绑定 `value` 属性
2. 监听 `input` 事件，触发时，将 `event.target.value` 赋值给 `value`

自定义v-model
1. 自定义组件需要使用v-model进行双向数据绑定时，如 
```html
<colorPicker v-model="colorValue"></colorPicker>
```
2. 需添加 `model` 选项来指定 `prop` 和 `event`

- [自定义组件的-v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

### .sync的作用和原理（重点）
> .sync 用来实现双向数据绑定，但可能会带来维护上的问题，因为子组件可以修改父组件，且在子组件和父组件都没有明显的改动来源。

正常情况下我们组件间通讯通过父组件prop传值和子组件$emit()发送事件来实现：

```html
<!--父组件给子组件传入一个函数-->
 <Footers :name="name" @setName="(res)=> name = res"></Footers>
 
<!--子组件通过调用这个函数来实现修改父组件的状态。-->
<script>
mounted () {
  console.log(this.$emit('setName',1234567));
}
</script>
```

.sync则可以这样实现：
```html
<!--父组件将name传给子组件并使用.sync修饰符。-->
<Footers :name.sync="name"></Footers>

<!--子组件触发事件-->
<script>
 mounted () {
    console.log(this.$emit('update:name',1234567));
 }
</script>
```

### Vue.mixin vs Vue.Extend（重点）

  - mixin用来分发 Vue 组件中的可复用功能，如 `methods` `directives` 等，可以是在组件层级使用，或全局使用，全局使用会影响之后创建的vue实例
  
  - Vue.extend(options)是产生一个继承自Vue类的子类，只会影响这个子类的实例对象，不会对Vue类本身以及Vue类的实例对象产生影响。

  - Vue.component 定义一个全局组件（内部有调用Vue.extend）
  - new Vue() 创建一个vue实例

[what-is-vue-extend-for](https://stackoverflow.com/questions/40719200/what-is-vue-extend-for)

## 四、周边工具
### vue-cli3脚手架配置（vue.config.js）
- **publicPath** 部署应用包时的基本 URL
- **productionSourceMap** 不允许打包时生成项目来源映射文件，在生产环境下可以显著的减少包的体积
- **assetsDir** 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录,默认是'',
- **indexPath** 指定生成的 index.html 的输出路径(相对于outputDir)。也可以是一个绝对路径。默认是'index.html'
- **lintOnSave** 是否在每次保存时使用eslint检查，这个对语法的要求比较严格，对自己有要求的同学可以使用
- **css**
```js
css: {
    //是否启用css分离插件，默认是true，如果不启用css样式分离插件，打包出来的css是通过内联样式的方式注入至dom中的，
    extract: true,
    sourceMap: false,//效果同上
    modules: false,// 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
  },
```
- **devServer** 本地开发服务器配置
- **pluginOptions** 第三方插件选项
- **chainWebpack** 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
### vuex是什么
> Vuex 是一个专为 Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### vuex中有几个核心属性，分别是什么
- **state** 唯一数据源,Vue 实例中的 data 遵循相同的规则
- **getters** 可以认为是 store 的计算属性,就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值.
- **mutation** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,非常类似于事件,通过store.commit 方法触发
- **action** Action 类似于 mutation，不同在于Action 提交的是 mutation，而不是直接变更状态，Action 可以包含任意异步操作
- **module** 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。


### mutation和action区别
- action 提交的是 mutation，而不是直接变更状态。mutation可以直接变更状态
- action 可以包含任意异步操作。mutation只能是同步操作
- 提交方式不同

```js
// action 是用this.store.dispatch('ACTION_NAME',data)来提交。
// mutation是用this.$store.commit('SET_NUMBER',10)来提交
```

- 接收参数不同
```js
{
    state,      // 等同于 `store.state`，若在模块中则为局部状态
    rootState,  // 等同于 `store.state`，只存在于模块中
    commit,     // 等同于 `store.commit`
    dispatch,   // 等同于 `store.dispatch`
    getters,    // 等同于 `store.getters`
    rootGetters // 等同于 `store.getters`，只存在于模块中
}
```

### vue-router是什么
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的
- 路由配置路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

## 五、原理相关

### Vue.js内部运行机制
### MVVM
> `MVVM(Model-View-ViewModel)` 是一种软件架构模式。来自MVC模式，由微软架构师Ken Cooper和Ted Peters开发，通过利用WPF（微软.NET图形系统）和Silverlight（WPF的互联网应用派生品）的特性来简化用户界面的事件驱动程序设计。微软的WPF和Silverlight架构师之一John Gossman于2005年在他的博客上发表了MVVM。
> `MVVM也被称为model-view-binder`

### vue-loader是什么
> vue文件的一个加载器，将template/js/style转换成js模块。

### Vue的双向绑定原理是什么

> vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

- 1、需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

- 2、compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

- 3、Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
①在自身实例化时往属性订阅器(dep)里面添加自己
②自身必须有一个update()方法
③待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

- 4、MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

### Object.defineProperty vs Proxy（重点）
Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。Avalon.js 为了兼容IE6，使用了 VBScript 来实现响应式。

#### 1、Object.defineProperty
> Object.defineProperty 本质上是对对象属性的劫持，vue1、vue2采用，支持IE9+

**缺点1、无法检测对象属性的添加和移除**
- 原因：Object.defineProperty api的限制，只能对已知的属性进行绑定，因此直接在对象上添加属性是无法监听到的，需要额外处理；而移除操作在这个api上也是无法知晓的，因此需要额外处理。
- 解决方法：vue提供$set、$delete处理
- 另外请注意 `this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })` 和 `Object.assign(this.someObject, { a: 1, b: 2 })` 的区别）


**缺点2、数组API方法监听不到（对数组api方法进行重写）**
- 原因：Object.defineProperty 监听不到数组的变化
- 解决方法：Vue2.0 对数组的**变更方法**进行了重写：[参考](https://segmentfault.com/a/1190000015075679)
  * push()
  * pop()
  * shift()
  * unshift()
  * splice()
  * sort()
  * reverse()
  非变更方法比如 `filter()` `concat()` `slice` 每次都会返回一个新的数组，vue中的vdom会尽量复用，因此也不用担心性能问题

**缺点3、需深度遍历对象中的对象属性（会有一些性能消耗）**
- 原因：Object.defineProperty 是对对象属性的监听，因此需要遍历对象的属性，当嵌套较深时，会有一些性能消耗
- 解决方法：Vue3 使用了 proxy 实现

#### 2、Proxy（vue3.0采用，IE11+）
- 相当于在对象外层加拦截
- 缺点：
  -  不兼容IE11，也没有 polyfill
### v-for key的作用（重点）
> 在diff算法中的 updateChildren 时，尽可能的复用key相同的节点，尽量使用移动而不是更新dom的操作
>
> 在vdom diff算法中，若 tag 和 key 都相同，则认为是同一节点，因此在v-for中添加key，可复用节点，进而提高性能

### vue.js的template编译过程（重点）
> **简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）**，详细步骤如下：
> 
> 首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option
>
> 然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）

### vue源码整体运行流程/逻辑？（重点，待完善）

- 1、new Vue(options) 

  - options.$el （模板编译 traversal）
  - options.data（数据绑定：Object.define，Proxy）
  - options.methods（添加function属性到this）

- 2、渲染和更新

  - 首次渲染时，会进行依赖收集
  - 之后数据有变化时，触发Proxy中set的依赖方法
  - 调用依赖方法后，Dom更新

- 3、vdom（可通过snabbdom学习vdom机制）

  - 数据变化后触发更新时，出于性能考虑，vue不是直接更新真正的Dom，而是会通过vdom。
  - 首先，用js模拟DOM结构
  - 然后，计算出最小的变更
  - 最后，更新DOM
  - 具体来说，就是：
    - 只进行同级比较，不跨级比较
    - 优先保留相同节点
    - 其次移动节点
    - 最后删除和重建节点

### React Fiber 能否用于 Vue？

最早Vue3的提案其实是包含时间切片方案的，最后废弃的主要原因，是时间切片解决的的问题，Vue3基本碰不到
1. Vue3把虚拟Dom控制在组件级别，组件之间使用响应式，这就让Vue3的虚拟Dom不会过于庞大
2. Vue3虚拟Dom的静态标记和自动缓存功能，让静态的节点和属性可以直接绕过Diff逻辑，也大大减少了虚拟Dom的Diff事件
3. 时间切片也会带来额外的系统复杂性

所以引入时间切片对于Vue3来说投入产出比不太理想，在后来的讨论中，Vue3的时间切片方案就被废弃了

## 六、Vue的UI框架对比
移动端：
- mint-ui
- vant
- vux

pc端：
- element-ui
- ant design vue
- iview
- heyui

## 七、新趋势
- Vue3.0 [变化](https://juejin.cn/post/6847902222743765005)
    - 首先是源码优化，vue.js框架本身的优化，目的是让代码更易于开发和维护（使用Typescript）
    - 性能优化（Object.define => proxy）
    - 优化逻辑组织（提供compsositon api）
- TypeScript
- Vite



## 参考
- [vue问答](https://juejin.cn/post/6870374238760894472)

- [ToyVue by Winter](https://www.bilibili.com/s/video/BV1XV411U7NU)

- [史上最强vue总结---面试开发全靠它了](https://juejin.cn/post/6850037277675454478)

- [mini-vue](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/)

- [[Vue官方教程笔记]- 尤雨溪手写mini-vue](https://juejin.cn/post/6911897255087702030)

- [剖析 Vue.js 内部运行机制](https://juejin.cn/book/6844733705089449991)
