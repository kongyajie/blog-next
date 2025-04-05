# React系列之4-原理

### 原理

#### 函数式编程
- 纯函数
- 不可变值

#### JSX的本质&vdom和diff算法
- JSX即createElement函数
- 执行生成vnode
- patch(elem,vnode) patch(vnode,newVnode)

#### 合成事件机制
- 更好的兼容性和跨平台（摆脱DOM的限制，比如在移动端使用时不需重新写一套）
- 减少内存消耗，避免频繁解绑
- 方便事件的统一管理（如事务机制）
- React17事件绑定到root
    - React16绑定到document
    - React17绑定到root
    - 有利于多个React版本并存，例如微前端


#### setState和batchUpdate机制
- setState 的表现（重要）主流程
- batchUpdate 机制
- transaction（事务）机制

#### 组件渲染和更新的过程
- 组件渲染过程
    - props/state
    - render()生成vnode
    - patch(elem,vnode)
- 组件更新过程
    - setState(newState) --> dirtyComponents(可能有子组件)
    - 遍历dirtyComponents，根据newState，newProps，通过render()生成newVnode
    - patch(vnode,newVnode)
- patch被拆分为两个阶段
    - reconciliation阶段：执行diff算法，纯JS计算
    - commit阶段：将diff结果渲染DOM
- 为什么要拆分：可能会有性能问题
    - JS是单线程，且和DOM渲染公用一个线程
    - 当组件足够复杂，组件更新计算和渲染都压力大
    - 同时再有DOM操作需求（动画、鼠标拖拽等），将卡顿
- React fiber
    - 将reconciliation阶段进行任务拆分（commit dom渲染无法拆分）
    - DOM需要渲染时暂停，空闲时恢复
    - window.requestIdleCallback