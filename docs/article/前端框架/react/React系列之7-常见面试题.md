# React 常见面试题

## 一、React 基础

### React 的核心特性是什么？
- 组件化：代码可复用。
- 虚拟 DOM：提高渲染性能。
- 单向数据流：保证数据流动的可预测性。
- JSX：提供声明式的 UI 编写方式。

### 什么是 JSX？它与 HTML和JS 有什么区别？
JSX 是 JavaScript 的语法扩展，用于在 React 中描述 UI 结构，看起来像 HTML，但最终会被编译为 JavaScript 代码（如 `React.createElement` 调用）。

JSX 和 JS 的区别：

- 语法：JSX 类似 HTML，嵌套在 JS 中；JS 是标准 JavaScript 语法。
- 功能：JSX 用于定义 React 组件的 UI；JS 用于逻辑控制和操作。
- 处理：JSX 需编译为 JS 才能运行；JS 可直接运行。
- 表达式：JSX 支持在 {} 中嵌入动态 JS 表达式。

### React 中的组件有哪些类型？
- **函数组件**：使用函数定义，支持 Hooks。
- **类组件**：使用 ES6 类定义，支持生命周期方法。
- **PureComponent**：类组件的优化版本，自动实现浅比较。

### 什么是 props 和 state？它们的区别是什么？
- **props**：父组件传递给子组件的数据，只读。
- **state**：组件内部管理的状态，可修改。
- **区别**：props 是外部传入的，state 是内部管理的。

### React 中的事件处理与原生 DOM 事件有什么区别？
- React 事件是合成事件（`SyntheticEvent`），是对原生事件的封装。
- React 事件处理函数使用驼峰命名（如 `onClick`）。
- React 事件会自动处理浏览器兼容性问题。

React事件机制和JS原生事件机制在`事件绑定`、`事件触发`、`事件传播`、`事件对象`等方面存在一些区别，以下是详细介绍：
- **事件绑定**
    - **JS原生事件**：可以通过HTML属性直接绑定，如`<button onclick="handleClick()">点击我</button>`，也可以使用`addEventListener`方法在JavaScript代码中动态绑定，例如`element.addEventListener('click', handleClick)`。
    - **React事件**：采用驼峰命名法来绑定事件，如`<button onClick={handleClick}>点击我</button>`。React中的事件绑定是通过JSX语法来实现的，将事件处理函数作为属性值传递给组件。
- **事件触发**
    - **JS原生事件**：当用户操作触发事件时，浏览器会根据事件类型和目标元素，直接执行相应的事件处理函数。
    - **React事件**：React会对原生事件进行封装，当事件触发时，React会在自己的事件系统中处理，然后调用对应的事件处理函数。这意味着React可以对事件进行统一的管理和优化，例如批量更新等。
- **事件传播**
    - **JS原生事件**：遵循标准的事件传播机制，包括捕获阶段、目标阶段和冒泡阶段。可以通过`stopPropagation`方法来阻止事件在传播过程中的进一步传递。
    - **React事件**：在大多数情况下，React的事件传播机制与原生事件类似，但有一些细微的差别。React的事件传播是在自己的合成事件系统中进行的，默认情况下，React事件会在冒泡阶段进行传播。如果需要阻止事件传播，可以使用`stopPropagation`方法，但需要注意的是，它只能阻止React合成事件的传播，不能阻止原生事件的传播。
- **事件对象**
    - **JS原生事件**：事件触发时，会传递一个原生的事件对象，该对象包含了与事件相关的各种属性和方法，如`event.target`表示触发事件的目标元素，`event.preventDefault`方法用于阻止默认行为。
    - **React事件**：React会将原生事件对象进行封装，生成一个合成事件对象。合成事件对象提供了与原生事件对象类似的属性和方法，但在不同浏览器环境下具有更好的兼容性。例如，`event.nativeEvent`可以获取原生事件对象，`event.stopPropagation`方法用于阻止事件传播。 React 使用合成事件 (`SyntheticEvent`) 统一处理跨浏览器的事件兼容性。
- **性能优化**
    - **JS原生事件**：在处理大量事件时，可能会因为频繁的DOM操作和事件处理函数的执行而导致性能问题。
    - **React事件**：React通过事件委托和批量更新等机制来优化性能。事件委托是指将事件绑定在父元素上，通过事件传播来处理子元素的事件，这样可以减少事件处理函数的数量，提高性能。批量更新则是将多个状态更新合并到一次更新中，减少不必要的渲染，提高页面的响应速度。

### React组件通信有哪些方式
1、父传子：props
2、子传父：props+回调函数
3、兄弟组件通讯：状态提升到父组件，结合props和回调函数
4、跨层级组件传值：Context API
5、全局状态管理：Redux、MobX、Recoil 或 Zustand

### React中的props为什么是只读的？

在 React 中，props 是只读的，因为它们用于从父组件传递数据到子组件，遵循`单向数据流`的原则。子组件不能修改 props，这样可以`确保数据流向清晰、组件行为可预测，并避免副作用`。如果需要修改数据，应该使用 state。

### React的严格模式如何使用，有什么用处？

React 的严格模式通过 <React.StrictMode> 组件启用，它会在开发模式下对应用进行额外的检查和警告，帮助开发者发现潜在的问题。它不会影响生产环境的行为，只在开发模式下生效。

1. `帮助发现不安全的生命周期方法`：
React 严格模式会检测是否使用了过时或不安全的生命周期方法（如 componentWillMount、componentWillUpdate、componentWillReceiveProps）并发出警告，鼓励开发者使用更新的生命周期方法（如 getDerivedStateFromProps、getSnapshotBeforeUpdate）。
2. `检测副作用`：
严格模式会在渲染过程中多次调用组件的 render 方法，帮助检测不必要的副作用（比如不必要的状态更新或副作用的重复执行）。这有助于开发者优化组件的渲染和副作用处理。
3. `验证 React 对象`：
它还会检查应用中是否存在不安全的副作用或其他潜在的错误，比如检查开发者是否在组件中使用了不合法的 refs、setState 等。
4. `支持未来的 React 特性`：
严格模式还为未来的 React 特性提供支持，帮助开发者在早期发现潜在的不兼容性。

---

## 二、React 进阶

### 什么是 React Hooks？常用的 Hooks 有哪些？
- Hooks 是 React 16.8 引入的特性，允许在函数组件中使用状态和生命周期方法。
- 常用 Hooks：
  - `useState`：管理状态。
  - `useEffect`：处理副作用。
  - `useContext`：访问上下文。
  - `useReducer`：复杂状态管理。

[「React 进阶」 React 全部 Hooks 使用大全 （包含 React v18 版本 ）](https://juejin.cn/post/7118937685653192735)

### React hooks解决了什么问题? 

1. 状态管理：在函数组件中引入 useState，无需类组件也能管理状态。
2. 副作用处理：通过 useEffect 统一处理生命周期逻辑，避免类组件中复杂的生命周期方法。
3. 代码复用：自定义 Hook 提供更清晰的逻辑复用方式，代替高阶组件 (HOC) 和 render props。
4. 简化代码：减少类组件中的模板代码，提升开发效率。

### React Hooks的使用规则/限制？

1. 只能在函数组件或自定义 Hook 中使用，不能在类组件或普通函数中调用。
2. 调用顺序必须一致，不能在条件语句、循环或嵌套函数中调用。
3. 只能在组件的顶层调用，不能在回调或事件处理函数中使用。
4. 自定义 Hook 必须以 use 开头，确保 React 能识别。
5. 不能在类组件中使用，只能在函数组件中。

### 为什么 hooks 不能写在循环或者条件判断语句里？
确保 Hooks 在每一次渲染中都按照同样的顺序被调用。我们可以把文件里所有的Hooks按照出现顺序当成一个链表，每次更新的时候这个链表都得保持一致，然而当条件存在时，当条件从真->假时，这个链表会变化。

[一文讲清楚为啥React Hook不能写在条件语句里](https://juejin.cn/post/7116730718356504613)

### 如何自定义Hook？

1. 自定义 Hook 是一个函数，其名称必须以 use 开头，并且可以使用 React 内置的 Hook（如 useState、useEffect 等）。
2. 自定义 Hook 允许在多个组件之间复用状态逻辑。

### hook之间的区别

useState 和 useRef 的区别

useCallback 和 useMemo 的区别

useEffect 和useLayoutEffect的区别

useEffect是如何清除副作用的

useState和useReducer的区别

[【React】Hooks面试题集锦](https://juejin.cn/post/7327502674017468470)

### 函数组件与类组件的区别？

1、写法：

- 函数组件是无状态组件，直到引入 `Hooks` 才支持状态管理。
- 类组件通过 `class` 声明，依赖 this 来管理状态和生命周期。

2、状态和生命周期：

- 函数组件用 `useState` 和 `useEffect` 管理状态和副作用。
- 类组件用 `state` 和生命周期方法。

3、性能：

- 函数组件更轻量，性能更优（不涉及 this 和原型链）。

4、 代码复用：

- 函数组件通过 `Hook` 实现更灵活的逻辑复用。
- 类组件通常使用 `HOC` 和 `render props`。

总之，函数组件适合现代 React 开发，类组件主要用于维护旧代码。

### useEffect 的依赖项数组有什么作用？
- 控制 `useEffect` 的执行时机：
  - 空数组 `[]`：只在组件挂载和卸载时执行。
  - 有依赖项：依赖项变化时执行。
  - 无依赖项：每次渲染后都执行。

### React 中的上下文（Context）是什么？如何使用？
- Context 用于跨组件传递数据，避免层层传递 props。
- 使用步骤：
  1. 使用 `React.createContext` 创建上下文。
  2. 使用 `Provider` 提供数据。
  3. 使用 `useContext` 或 `Consumer` 消费数据。

### 什么是高阶组件（HOC）？它的作用是什么？
- 高阶组件是一个函数，接收一个组件并返回一个新组件。
- 作用：
  - 代码复用。
  - 逻辑抽象（如权限校验、日志记录）。

### React 中的 refs 是什么？如何使用？
- refs 是 React 提供的一种机制，用于访问和操作 DOM 元素或类组件实例。
- 使用方法：
  - `useRef`：函数组件中使用。
  - `createRef`：类组件中使用。
  - 回调 ref：通过回调函数获取 ref。

### 对React中Fragment的理解，它的使用场景是什么？
空元素，同 `<></>`

使用场景：
1. 占位元素，避免增加额外的DOM元素；
2. 列表渲染时，占位元素加 key

### 什么是受控组件和非控组件

1、“受控”（由 prop 驱动）或是“不受控”（由 state 驱动）？ —— 官网 https://zh-hans.react.dev/learn/sharing-state-between-components

2、state控制，DOM控制？—— 待验证

---

## 三、React 性能优化

### React 中的 key 属性有什么作用？说说React diff 算法
- key 用于标识列表中的元素，帮助 React 识别哪些元素发生了变化、被添加或移除，从而提高渲染性能。


React Diff 算法 是 React 用于优化组件更新和渲染的核心机制。其主要目的是通过比较新旧虚拟 DOM（V-DOM）树，尽可能减少真实 DOM 的操作，提高性能。

核心思想

- 最小化 DOM 更新：React 通过虚拟 DOM 进行比对，只更新发生变化的部分，而不是整个 DOM。
- 按组件进行比较：React 会先比较组件的类型和属性，只有在有必要的时候才更新其内部元素。

Diff 算法的关键策略

1、分层比较：

React 将整个 UI 拆分为树状结构，每一层比较时，只会比较不同类型的组件。
如果两个节点的类型不同（比如一个是 `<div>`，另一个是 `<span>`），React 会直接删除旧节点，创建新节点。

2、同级比较：

同一个层级的节点（兄弟节点）会根据 key 值进行比较。key 帮助 React 精确识别每个元素的位置，优化重排（reordering）。

3、元素更新和删除：

如果两个节点具有相同的 key，React 会更新它们，否则 React 会销毁旧节点并创建新节点。

4、避免不必要的更新：

如果组件的 state 或 props 没有变化，React 会跳过重新渲染该组件，提升性能。

具体步骤
1、先比较节点类型：如果类型不同，直接销毁旧节点，创建新节点。
2、同类型节点比较：如果类型相同，React 会继续比较它们的属性、子节点，计算差异并进行更新。
3、递归对比子节点：React 会递归地对比所有子节点，并尽量重用现有节点（基于 key）。

key 的作用

提高效率：key 用于标识哪些子节点发生了变化，帮助 React 判断哪些节点需要被移除或重新排序，减少 DOM 操作。

总结

React 的 Diff 算法通过高效地比对虚拟 DOM 来减少不必要的 DOM 更新，使得页面渲染更加高效，从而优化性能。

### 如何避免不必要的组件渲染？
- 使用 `React.memo` 缓存函数组件。
- 使用 `PureComponent` 或 `shouldComponentUpdate` 优化类组件。
- 避免在渲染函数中创建新的对象或函数。

### 什么是 React 的懒加载（Lazy Loading）？如何实现？
- 懒加载用于延迟加载组件，减少初始加载时间。
- 实现方法：
  - 使用 `React.lazy` 动态导入组件。
  - 使用 `Suspense` 包裹懒加载组件，并提供 `fallback` UI。

### 如何优化 React 应用的性能？
- 使用 `React.memo` 和 `useMemo` 缓存计算结果。
- 使用 `useCallback` 缓存回调函数。
- 使用代码分割和懒加载。
- 使用性能分析工具（如 React DevTools）定位性能瓶颈。

### 什么是虚拟 DOM？它是如何提高性能的？
- 虚拟 DOM 是 React 维护的一个轻量级 DOM 副本。
- 通过对比虚拟 DOM 的变化，React 可以最小化实际 DOM 操作，从而提高性能。

### 什么操作会触发 React 重新渲染组件

1. **State 变化：**当使用 useState 或 useReducer 等 hooks 更新状态时，React 会触发组件重新渲染。
2. **Props 变化：**当父组件传递给子组件的 props 发生变化时，React 会重新渲染子组件。
3. **Context 变化：**当 React Context 的值发生变化时，所有使用该 Context 的组件都会重新渲染。例如，使用 useContext 钩子的组件会在所订阅的 Context 值发生变化时重新渲染。
4. **key 变化：**当组件的 key 值发生变化时，React 会将其视为一个新的组件，导致组件重新渲染（通常在列表渲染中使用 key）。

---

## 四、React 生态工具

### Redux 的工作原理是什么？
- Redux 是一个状态管理库，基于单向数据流。
- 工作原理：
  - **Store**：存储全局状态。
  - **Action**：描述状态变化。
  - **Reducer**：根据 Action 更新状态。

### React Router 的作用是什么？
- React Router 用于实现客户端路由，支持单页应用（SPA）的页面跳转。
- 常用组件：
  - `BrowserRouter`：基于 HTML5 History API。
  - `Route`：定义路由规则。
  - `Link`：实现导航。

### 什么是 Next.js？它的优势是什么？
- Next.js 是一个 React 框架，支持服务端渲染（SSR）、静态站点生成（SSG）和 API 路由。
- 优势：
  - 更好的 SEO 支持。
  - 开箱即用的性能优化。
  - 简化路由配置。

### 如何实现 React 应用的服务端渲染（SSR）？
- 使用 Next.js 或自定义 SSR 实现。
- 在服务器端渲染组件为 HTML。
- 将渲染结果发送到客户端，并在客户端“注水”（hydrate）。

### 什么是 React Query？它的作用是什么？
- React Query 是一个数据获取库，用于管理服务器状态。
- 作用：
  - 自动缓存和更新数据。
  - 提供加载状态和错误处理。
  - 支持分页、无限加载等功能。

---

## 五、React 高级概念

### 什么是 React Fiber？React Fiber架构的设计目标与实现原理？
- React Fiber 是 React 16 引入的新的渲染引擎，支持增量渲染和任务优先级调度，提高了复杂应用的性能。

React Fiber是React 16引入的一种新的协调算法和架构，用于更高效地进行组件的渲染、更新和调度。

#### 设计目标
- **提高性能**：通过将渲染任务拆分成多个小的单元，能够在不阻塞主线程的情况下进行增量式渲染，从而提高应用的响应速度和流畅度，解决大型应用中可能出现的卡顿问题。
- **支持异步渲染**：使React能够暂停、恢复和中断渲染过程，根据浏览器的空闲时间来合理安排任务，更好地应对高优先级的交互，如用户输入等，提升用户体验。
- **更好的组件复用和更新**：提供更细粒度的组件更新控制，能够更精确地计算哪些组件需要重新渲染，减少不必要的渲染操作，提高渲染效率。

#### 实现原理
- **任务切片**：将渲染任务分解为一个个小的任务单元，称为Fiber节点。每个Fiber节点代表一个组件或元素，包含了组件的各种信息，如状态、属性、子节点等。React会按照一定的顺序遍历这些Fiber节点，执行相应的渲染和更新操作。
- **异步可中断的调度**：利用浏览器的`requestIdleCallback` API（如果不支持，则使用`setTimeout`模拟），在浏览器空闲时间执行渲染任务。如果在执行过程中遇到高优先级的任务，如用户输入事件，React可以暂停当前的渲染任务，先处理高优先级任务，待空闲时再恢复渲染。
- **双缓存机制**：React Fiber使用了双缓存机制，即存在两棵Fiber树，一棵是当前正在渲染的`current` Fiber树，另一棵是正在构建的`workInProgress` Fiber树。在渲染过程中，React会在`workInProgress` Fiber树上进行各种计算和更新操作，当整个`workInProgress` Fiber树构建完成后，会将其切换为`current` Fiber树，一次性将所有的更新应用到DOM上，实现批量更新，减少DOM操作次数，提高性能。

### React 中的错误边界（Error Boundary）是什么？
- 错误边界是用于捕获子组件中 JavaScript 错误的组件。
- 通过 `componentDidCatch` 或 `static getDerivedStateFromError` 实现。

### 什么是 React 的并发模式（Concurrent Mode）？
- 并发模式是 React 的一种渲染模式，支持中断和恢复渲染，从而提高应用的响应性。

### React 中的 Portals 是什么？
- Portals 允许将子组件渲染到 DOM 树中的其他位置，常用于模态框、弹窗等场景。

### 什么是 React 的 Suspense？
- Suspense 用于在组件加载时显示 `fallback` UI，支持懒加载和数据获取。

---

## 六、React 实战问题

### 如何在 React 中实现表单处理？
- 使用受控组件（controlled component）。
- 使用 `useState` 或 `useReducer` 管理表单状态。
- 使用第三方库（如 Formik、React Hook Form）。

### 如何在 React 中实现国际化（i18n）？
- 使用 `react-i18next` 或 `react-intl` 库。
- 定义多语言资源文件。
- 在组件中根据语言切换显示内容。

### 如何在 React 中实现动画？
- 使用 CSS 动画或过渡。
- 使用第三方库（如 Framer Motion、React Spring）。

### 如何在 React 中实现权限控制？
- 使用高阶组件或自定义 Hook 封装权限逻辑。
- 根据用户角色或权限动态渲染组件。

### 如何在 React 中实现主题切换？
- 使用 CSS 变量或 CSS-in-JS（如 styled-components）。
- 使用上下文（Context）管理主题状态。

---

## 七、React 未来趋势

### React Server Components 是什么？
- React Server Components 是一种新的组件类型，允许在服务器端渲染组件并发送到客户端，减少客户端 JavaScript 的加载量。

### React 18 的新特性有哪些？

- `并发渲染（Concurrent Rendering）`：使得 React 能在后台进行渲染工作，避免阻塞 UI 更新，提升性能。
- `自动批处理（Automatic Batching）`：React 18 会自动批处理多次 setState 更新，减少不必要的渲染，提升性能。
- useId Hook：提供一个生成唯一 ID 的 Hook，帮助解决 SSR（服务器端渲染）中的 ID 不一致问题。
- `startTransition API`：允许开发者将某些更新标记为低优先级，确保高优先级的渲染不被阻塞。
- Suspense 支持 SSR：Suspense 现在支持服务端渲染（SSR），使得异步组件加载更加平滑。

这些更新提升了 React 的性能和开发体验，特别是在处理复杂 UI 和异步渲染时。

### React 的未来发展方向是什么？
- 更强大的并发渲染能力。
- 更好的服务器端渲染支持。
- 更轻量级的客户端运行时。

---

## 八、其他问题

### React 和 Vue 的区别是什么？
- React 使用 JSX，Vue 使用模板语法。
- React 更灵活，Vue 更易上手。
- React 生态更丰富，Vue 更集成化。

### React 和 Angular 的区别是什么？
- React 是一个库，Angular 是一个框架。
- React 使用单向数据流，Angular 使用双向数据绑定。
- React 更轻量，Angular 更全面。

### Vuex与Redux状态管理库的异同