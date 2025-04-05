# JavaScript-webapi

### 考点总结
- eventloop
- DOM事件和event loop
- Promise进阶
- async/await

### DOM
- DOM 本质：HTML解析出的一棵树
- DOM 节点操作
  - 获取DOM节点
  - property和attribute
    - property：修改JS对象属性，不会体现再HTML结构中
    - attribute：修改HTML属性，会改变HTML结构（标签结构）
    - 两者都有可能引起DOM重新渲染
    - 建议：尽量用 property 操作，因为property可能会在JS机制中，避免一些不必要的DOM渲染；但是attribute是修改HTML结构，一定会引起DOM结构的重新渲染，而DOM重新渲染是比较耗费性能的
- DOM 结构操作
  - 新增/插入节点 
    - appendChild
  - 获取子元素列表，获取父元素
    - childNodes
    - parentNode
    - nodeName
    - nodeType
  - 删除子元素
    - removeChild
- DOM操作性能优化
  - DOM查询做缓存
  - 将频繁操作改为一次性操作 document.createDocumentFragment()
- HTML 页面的生命周期包含三个重要事件
  - **DOMContentLoaded** —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。
  - **load** —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
  - **beforeunload**/**unload** —— 当用户正在离开页面时。

### BOM（Browser Object Model）
- navigator
  - userAgent
- screen
  - width
  - height
- location
  - href
  - protocol
  - hostname
  - pathname
  - search
  - hash
- history
  - back()
  - forward()

### 事件
- 面试题
  - 写一个通用的事件绑定函数
  - 描述事件冒泡的流程
    - 基于DOM树形结构
    - 事件会顺着触发元素向上冒泡
    - 应用场景：代理
  - 无限下拉的图片列表，如何监听每个图片的点击
    - 事件代理
    - 用 e.target 获取触发元素
    - 用 matches 来判断是否是触发元素
- 知识点
  - 事件绑定
  - 事件冒泡
  - 事件代理
    - 代码简洁
    - 减少浏览器内存占用
    - 但是，不要滥用