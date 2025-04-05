# vue
### 使用
- vue-cli
- 基本使用
  - 模板（插值、指令）
  - computed和watch
  - class和style
  - 条件
  - 循环
  - 事件
  - 表单
- 组件
  - 声明周期
  - props（类型和默认值）
  - v-on和$emit
  - 自定义事件
- 高级特性
  - 自定义v-model
  - $nextTick
  - refs
  - slot
  - 动态组件
  - 异步组件
  - keep-alive
  - mixin

### 周边工具
- vuex
  - state
  - getters
  - action
  - mutation
  - 用于vue(dispatch, commit, mapState, mapGetters, mapActions, mapMutations)
- vue-router
  - 动态路由
  - to和push
  - hash和history
  - 懒加载（配合动态组件）

### 原理
vue的原理主要包含三个部分：响应式、虚拟dom/diff算法、模板编译，它们三个合在一起，实现了vue的数据驱动视图，大大提升了前端开发效率。

数据驱动视图，意味着开发者只需关注数据逻辑，而视图的部分vue会自动帮我们进行渲染和更新，而响应式则是其中的第一步；
有了数据响应式，每次数据修改都会进行界面渲染，但dom操作非常耗时，因此react提出了用js来模拟dom结构，计算出最小变更，操作DOM，这样可以大大优化渲染效率。
而虚拟dom的实现中，diff算法又是重中之重。
最后，模板编译是将template


- 1.组件化和MVVM
  - 组件化-web1.0就有组件化了，不过传统组件只是静态渲染，更新还要依赖DOM操作
  - 创新-数据驱动视图-MVVM，不需要手动修改DOM
  - MVVM（Model-View-ViewModel）

- 2.响应式原理
  - 现象：组件data的数据一旦变化，立刻触发视图的更新
  - Vue响应式
    - 核心API-Object.defineProperty
      - 基本使用
      - 监听对象，监听数据
      - 复杂对象，深度监听
      - 缺点
        - 深度监听，需要递归到底，一次性计算量大
        - 无法监听新增/删除属性（Vue.set Vue.delete）
        - 无法原生监听数组，需要特殊处理
    - 如何实现响应式，代码演示
    - Object.defineProperty缺点（Vue3.0启用Proxy）
    - Proxy有兼容性问题，且无法polyfill,比如IE11
    - Object.defineProperty()是对对象属性的操作，所以需要对对象进行深度遍历去对属性进行操作。
    - vue3.0 用 Proxy 是对对象进行拦截操作，无论是对对象做什么样的操作都会走到 Proxy 的处理逻辑中

- 3.vdom和diff算法
  vdom起因：
  - DOM操作非常耗费性能
  - 以前用jQuery，可以自行控制DOM操作的时机，手动调整
  - Vue和React是数据驱动视图，如何有效控制DOM操作？
  - 解决方案-vdom-用JS模拟DOM结构，计算出最小的变更，操作DOM
  用JS模拟DOM结构（vnode）
  - vnode: tag、props、children
  - 新旧vnode对比，得出最小的更新范围，最后更新DOM
  通过 snabbdom 学习vdom
  - h函数
  - vnode数据结构
  - patch函数
    diff算法
    - vdom diff 两棵树做diff
    - 树diff的时间复杂度O(n^3)-遍历tree1，遍历tree2，排序，1000个节点，要计算一亿次
    - 优化时间复杂度到O(n)
      - 1.只比较同一层级，不跨级比较
      - 2.tag不相同，则直接删掉重建，不再深度比较
      - 3.tag和key两者都相同，则认为是相同节点，不再深度比较
    - sameVnode()
    - patchVnode()
    - updateChildren（key的重要性）
      1、先找到 不需要移动的相同节点，消耗最小
      2、再找相同但是需要移动的节点，消耗第二小
      3、最后找不到，才会去新建删除节点，保底处理
    - 为何再v-for中用key
      - diff算法中通过tag和key来判断，是否是sameNode
      - 减少渲染次数，提升渲染性能



- 4.模板编译

- 5.组件渲染过程

- 6.前端路由

## vue3
### vue3新功能
- createApp
- emits属性
- 多事件处理
- Fragment
- 移除.sync改为v-model参数
- 异步组件的引用方式
- 移除filter
- Teleport
- Suspense
- Composition API（reactive, ref toRef toRefs readonly computed, watch watchEffect 钩子函数生命周期）

### 原理
- Proxy实现响应式
- 编译优化
- Vite-ES5 Module

### 面试题
- v-show和v-if的区别
- 为何v-for中要用key
- 描述Vue组件生命周期
- Vue组件如何通讯
- 描述组件渲染和更新的过程
- 双向数据绑定v-model的实现原理