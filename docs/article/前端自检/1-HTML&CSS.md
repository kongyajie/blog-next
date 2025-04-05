# HTML&CSS

[[toc]]

## 一、HTML

### 如何理解语义化？

- 让人更容易理解（提高代码可维护性）
- 让机器更容易理解（有利于搜索引擎优化SEO、页面爬取、读屏软件）

### 块级元素 & 内联元素？

- display:block/table；div h1 h2 ul li ol p 等
- display:inline/inline-block；span a input button 等

## 二、CSS

### 1、CSS布局

#### 盒模型

- 标准盒模型中：`width` 和 `height` 指的是 `content` 的宽度和高度。
- IE盒模型中：`width` 和 `height` 指的是 `content+border+padding` 的宽度和高度。

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/CSS/%E6%A0%87%E5%87%86%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/CSS/IE%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.png)

DOM属性之 OffsetWidth / ClientWidth / ScrollWidth：

1. **OffsetWidth** 对象所在元素的实际宽度

   ```ini
   dom.offsetWidth = dom_content + padding + border（包含滚动条）+ margin
   ```

2. **ClientWidth** 对象内容的可视区域的宽度

   ```ini
   dom.clientWidth = dom_content + padding（不包含滚动条）
   ```

3. **ScrollWidth** 对象的实际内容的宽度（包含滚动区域中未显示完全的部分）

   ```ini
   dom.scrollWidth = real_content + padding
   ```

#### margin合并问题

> 块级元素的margin-top和margin-bottom有时会合并成单个外边距，这样的现象称为“margin合并”

**margin合并的3种场景**

1. 相邻兄弟元素margin合并
```html
<div style="margin-bottom:15px">123</div>
<div style="margin-top:15px">123</div>

<h1>Title</h1>
<h2>SubTitle</h2>
```

2. 父级元素和子元素

```html
<div style="margin-bottom:15px">
   <div style="margin-bottom:15px">123</div>
</div>

```

3. 空块级元素的margin合并

```html
<div style="overflow: hidden;">
  <div style="margin: 15px 0"></div>
</div>
```

**margin合并的计算规则**

- 正正取大值
- 正负值相加
- 负负最负值

**margin合并的意义**

1. 兄弟元素margin合并的作用：和em类似，都是让图文信息的排版更加舒服自然；
2. 父子margin合并的意义：在页面任何地方嵌套或者直接放入空`<div>`，都不会影响原来的块状布局；
3. 自身margin合并的意义：避免不小心遗落或者生成的空标签影响排版和布局。

**如何阻止margin合并**

- 父元素设置为BFC
- 父元素设置border/padding值

#### margin负值问题

**效果**：

- margin-top 和 margin-left 负值，元素向上、向左移动
- margin-right 负值，右侧元素左移，自身不受影响
- margin-bottom 负值，下方元素上移，自身不受影响

```html
<div style="display:flex">
  <div style="margin-left:-10px">Hello</div>
  <div>World</div>
</div>

<div style="display:flex">
  <div style="margin-right:-10px">Hello</div>
  <div>World</div>
</div>

<div>
  <div style="margin-top:-10px">Hello</div>
  <div>World</div>
</div>

<div>
  <div style="margin-bottom:-10px">Hello</div>
  <div>World</div>
</div>
```
原理

![](https://pic3.zhimg.com/80/v2-a7d813afe7ab2c6c4233146609d00dfa_1440w.png)

- 当margin-top、margin-left为负值时，margin-box 与 border-box 上方/左侧的距离减少，因此看上去元素分别向上、向左移动了；
- 当margin-bottom、margin-right为负值时，margin-box 与 border-box 下方/右侧的距离减少，因此看上去下方/右侧元素移动了。

**使用场景**

- 水平垂直居中（top/left 50%后，margin-top/margin-top:-xxpx 再拉回来子元素的一半，即居中了）
- 列表项两端对齐
```html
<div class="container">
   <!-- 这里拉回来一下 -->
  <div style="margin-right: -10px">
    <div class="child">Hello World</div>
    <div class="child">Hello World</div>
    <div class="child">Hello World</div>  
  </div>
</div>
```
```css
.container {
  width: 320px;
  height: 150px;
  border: 1px solid red;
  position: relative;
  margin-right: -10px;
}
.child {
  float: left;
  width: 100px;
  margin-right: 10px;
}
```

- 三栏自适应布局（了解即可，现在多用flex布局）
> 中间的主体使用双层标签，外层`<div>`宽度100%显示，并且浮动，内层`<div>`为真正的主体内容，含有左右110px的margin值。左栏和右栏都采用margin负值。左栏左浮动，margin-left为-100%，正好使左栏位于页面左侧。右栏左浮动，大小为其本身的宽度100px。

```html
<body>
  <div class="main">
    <div class="in"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>  
</body>

```
```css
html,body{
    height: 100%;
}
body{
    margin: 0;
}
.main{
    width: 100%;
    height: 100%;
    float: left;
}
.main .in{
    margin: 0 110px;
    background-color: pink;
    height: 100%;
}
.left , .right{
    height: 100%;
    width: 100px;
    float: left;
    background-color:lightgreen;
}
.left{
    margin-left: -100%;
}
.right{
    margin-left: -100px;
}

```

- 三栏等高布局（了解即可，现在多用flex布局）

#### margin:auto的涵义

- 如果一侧定值，一侧auto，则auto为剩余空间；
- 如果两侧均是auto，则平分剩余空间。

**margin:auto可以用来做水平垂直居中**

```css
.father {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid red;
}

.son {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: gray;
  width: 200px;
  height: 100px;
  margin: auto;
}
```

#### BFC 理解与应用

- 什么是BFC？ 
   - **Block format context，块级格式化上下文。好处是它是一块独立渲染区域，内部元素的渲染不会影响边界以外的元素**。
- 形成BFC的常见条件？
   - float 不是 none
   - position 是 absolute 或 fixed
   - overflow 不是 visible
   - display 是 flex inline-block 等
- 常见的BFC应用
   - 清除浮动
```css
.clearfix:after {
   content: '';
   display: block;
   clear: both;
}
```
[CSS-float的工作原理和流的破坏与保护](https://juejin.cn/post/7002144518199836679)

#### float布局-圣杯布局和双飞翼布局的目的

> 两者都是为了实现三栏布局（类似淘宝首页），不同的是实现思路不一样

特点是：
- 中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于PC网页

实现：
- 圣杯布局
- 双飞翼布局
- flex布局

参考：
- [圣杯布局与双飞翼布局](https://zhuanlan.zhihu.com/p/58355168)
- [圣杯布局和双飞翼布局（前端面试必看）](https://www.cnblogs.com/xiaohuochai/p/5314289.html)
- [深入理解CSS中的margin负值](https://www.jianshu.com/p/f9bcddb0e8b4)
#### Flex 布局

- flex 实现一个三点的色子
> `.item:nth-child(2) {align-self: flex-start/center/flex-end;}`

```html
<div class="box">
  <span class="item"></span>
  <span class="item"></span>
  <span class="item"></span>
</div>
```

```css
.box {
  width: 200px;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;

  display: flex;
  justify-content: space-between;
}
.item {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #666;
}
.item:nth-child(2) {
  align-self: center;
}
.item:nth-child(3) {
  align-self: flex-end;
}
```

- 常用语法：flex-direction/justice-content/align-items/flex-wrap/align-self
- flex语法：
   - flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
   - flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
   - flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
   - 默认：flex: 0 1 auto
   - 快捷设置：1 => 1 0 auto; auto => 1 1 auto; none => 0 0 auto;
- 更多内容请参考 [Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### Grid布局（待完善）

### 3、CSS定位

#### absolute 和 relative 分别依据什么定位？

- relative 依据自身定位
- absolute 依据最近一层的定位元素定位（absolute/relative/fixed直到body）

#### 居中对齐有哪些实现方式？（重要）

- 水平居中 
inline元素：text-align:center
block元素：margin:auto

- 垂直居中
inline元素：line-height值等于height值

- **absolute元素（不定高定宽）**
   - flex布局（优先）
   - left:50%, top:50%, translate:transform(-50%, -50%) （transform百分比是相对自身的,top是相对父级的）
   - top,left,bottom,right:0 + margin:auto（利用流动性）

- absolute元素（定高定宽）
   - top:50% + margin-top 负值 （top 和 margin-top 的`百分比`都是相对父级元素计算的，所以这里需要知道宽高，直接设置子元素margin-top: -height/2），同理水平居中也是一样
#### line-height 如何继承

1. 具体数值，则继承该值
2. 比例：如2/1.5，则继承该比例
3. 百分比，如200%，则继承计算出来的值

### 4、CSS-响应式

#### 响应式布局的常见方案

- `rem`：基于根元素的相对单位
- `@media-query`：根据不同屏幕的宽度设置根元素的font-size
- `vw/vh`：网页视口高度window.innerHeight的 1/100 

#### rem

是什么？

>  基于根元素的相对单位（事实上，我们需要做的是等比例缩放，而rem正好拥有此特性，所以就用它了~）
>
> - px 绝对长度单位，最常用
> - em 相对长度单位，相对于父元素，不常用
> - rem 相对长度单位，相对于根元素，常用于响应式布局

使用方式，引入`flexible.js`库：

1. 设置当前设备的 `clientWidth/10` 为 `root` 的 `font-size` 大小，设备逻辑宽度 `750` ，则 `font-size:75px` ;

2. 页面的其他部分，可以使用rem来作为单位，如文字、图片等。比如设计稿宽度是375，字体是14px，则这里的字体rem为 `((750/375) * 14px) / 75px`

3. [1px像素问题](https://zhuanlan.zhihu.com/p/268419107)：也就是说，当逻辑像素是 1pt 时，在 DPR 为 2 的 设备上显示为 2px 的物理像素

弊端：“阶梯”性，计算会有小数点，所以字体可能有偏差

#### @media-query

#### vw/vh

网页视口尺寸

- window.screen.height // 屏幕高度
- window.innerHeight // 网页视口高度（砍掉浏览器头尾，pc上模拟时无头尾）
- document.body.clientHeight // body高度（内容高度）

vw/vh

- vh 网页视口高度window.innerHeight的 1/100 
- vw 网页视口宽度window.innerWidth的 1/100
- vmax 取两者最大值；vmin 取两者最小值

 [参考-移动端适配和性能优化](https://blog.csdn.net/frontend_frank/article/details/106110664)

### 5、CSS动画（待完善）

- 实现动画的几种方式及对比
   - JS
   - CSS transtion
   - CSS animation
   - Canvas
- 跑马灯实践
- `transform` 为何能提升性能
- requestAnimationFrame，setTimeout setInterval 可能不精确（单线程+宏任务最后执行）

### 6、CSS练习题

#### 如何在浏览器显示小于12px的文字

- transform: scale(0.5)（推荐）
- svg图片（可保真，但比较麻烦）
- rem/vw（适用于移动端自适应）

#### CSS画三角形

```html
<div class="triangle"></div>
```
```css
.triangle {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-left: 50px solid yellow;
/*   border-top: 50px solid blue;
  border-bottom: 50px solid red;
  border-right: 50px solid green; */
}

```
