# CSS-float的工作原理和流的破坏与保护

## 前言

在日常开发中，经常会遇到float浮动导致的父级塌陷问题，为此，我们可以通过clearfix来解决，但内部到底发生了什么？
本文将带你理解其中的原理，主要分为4个部分：

- 流式布局
- 流的破坏-float浮动
- 流的保护-clear清除浮动
- 流的保护-BFC结界

## 流式布局
我们知道，HTML默认按照 `流` 在页面上进行排列布局，`流式布局`是指利用元素 `流` 的特性实现各种布局。
简单说，流式布局从上到下，从左到右，块状元素独占一行，内联元素非独占，如下图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321c768070594e938c1d4d25e199a9ae~tplv-k3u1fbpfcp-watermark.image)

```html
<div class="container">
  <div>我是块状元素</div>
  <span>我是内联元素</span>
  <div>
    <span>我是内联元素1</span>
    <span>我是内联元素2</span>
  </div>
</div>
```

流式布局可以满足早期像W3C那样的简单页面布局，但像文字环绕图片这样的需求却力不从心。
这时，float应运而生了。

## 流的破坏-float浮动

最初，float的初衷是用来实现文字环绕图片，类似下图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec936f01396b44e183f61a0004b274cf~tplv-k3u1fbpfcp-watermark.image)

```html
<div class="container">
  <img src="https://www.imooc.com/static/img/index/logo.png" class="left" style="margin-right: 10px;"/>
  <p class="">某一段文字……某一段文字……某一段文字……某一段文字……某一段文字……某一段文字……某一段文字……某一段文字……</p>
</div>
```

float实现文字环绕的原理是：
1. 首先，图片脱离文档流，覆盖在父级元素上（父级元素和图片是重叠的）。这也导致父级元素在计算高度时排除了图片，可能出现父级元素高度小于图片高度的情况，造成**父级塌陷**的感觉；

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a86e4a869e0f4c6ba652ae94c4d1bc20~tplv-k3u1fbpfcp-watermark.image)

2. 其次，每行文字和图片都要保证不重叠。

上面提到，添加float属性的元素会有父级塌陷的问题，影响后面的元素，比如：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8173f634a1ab40528bb652680d320c2a~tplv-k3u1fbpfcp-watermark.image)

```html
<div class="container">
  <img src="https://www.imooc.com/static/img/index/logo.png" class="left" style="margin-right: 10px;"/>
  <p class="">某一段文字……某一段文字……</p>
</div>

<!-- 父级塌陷导致下面的元素也受到影响 -->
<p style="width:300px;">另一段文字...另一段文字...另一段文字...另一段文字...另一段文字...另一段文字......</p>
```
可以看到，上面的元素影响到底部的文字的显示。

由于float被用来做布局，其父级塌陷的特性导致了许多不便，因此clear属性应运而生，用来解决这个问题。

## 流的保护-clear清除浮动

> `clear` 属性的原理是：让自身不能和前面的(clear:left)或后面的(clear:right)浮动元素相邻（改变自身，而不是改变浮动元素）

- clear:none

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7071538344b949f3b3400025b17c201e~tplv-k3u1fbpfcp-watermark.image)

- clear:left

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb1d40dab2c2487396f7e07274c82b95~tplv-k3u1fbpfcp-watermark.image)

- clear:right/clear:both

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23f2523a185a4c768bfbc936cfefeacf~tplv-k3u1fbpfcp-watermark.image)

具体可参考 [mdn clear](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)

### clearfix

> 如果一个元素里只有浮动元素，那它的高度会是0。如果你想要它自适应即包含所有浮动元素，那你需要清除它的子元素。一种方法叫做 `clearfix` ，即clear一个不浮动的 ::after 伪元素。

`clear` 属性只有块级元素才有效，而::after等伪元素默认都是内联水平，这就是借助伪元素清除浮动时需要设置display属性的原因：

```css
#container::after {
  content: "";
  display: block;
  clear: both;
}
```

但 `clear` 属性消除浮动不是一个完美的解决方案，比如：
1. 如果clear:both元素前面的元素就是float元素，则 `margin-top` 负值即使设成-9999px，也无效

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbd28321f756488488c1adc5ce584956~tplv-k3u1fbpfcp-watermark.image)

```html
<div style="float:left;">我是谁</div>
<div style="clear:both;margin-top:-9999px">我在哪</div>
```

2. clear:both 后面的元素依旧可能会发生文字环绕的现象（`margin-top:-xxpx`）:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d795752a90fc415792adbad8d9eba3eb~tplv-k3u1fbpfcp-watermark.image)

```html
<div class="container clearfix">
  <img src="https://www.imooc.com/static/img/index/logo.png" class="left" style="margin-right: 10px;"/>
  <p class="">某一段文字……某一段文字……某一段文字……某一段文字……</p>
</div>
<p style="width:300px;margin-top:-30px;">另一段文字...另一段文字...另一段文字...另一段文字...另一段文字...另一段文字...</p>
```

那有没有更好的办法来解决float布局造成的父级塌陷问题呢？
答案是 `BFC`

## 流的保护-BFC结界

`BFC` 全称是 `Block Format Context`，中文是块级格式化上下文。BFC的特性可以简单理解为结界：通过一些特定的手段形成的封闭空间，里面的人出不去，外面的人进不来，具有极强的防御性。BFC的特性表现如出一辙。

### BFC的触发条件
- `<html>`根元素
- float 值不为none
- overflow 值为auto/scroll/hidden
- display 值为table-cell/table-caption/inline-block
- position 值不为 static/relative

### BFC与流体布局
> BFC的结界特性最重要的用途其实不是去margin重叠，或者是清除float影响，而是实现更健壮、更智能的自适应布局。

既然BFC这么优秀，为什么它没有完全替代流体布局呢？

### BFC的缺点
触发BFC的属性都自带副作用,最后筛选出两个常用的：

- overflow:hidden;
- display:table-cell;

两种方案均有一点不足，前者如果子元素要定位到父元素外面可能会被隐藏，后者无法直接让连续英文字符换行。所以，大家可以根据实际的项目场景选择合适的技术方案。

## 总结
本文主要讲解了float浮动的实现原理和父级塌陷的解决方案，希望能对你有所帮助。
文中的代码可以在 [codepen](https://codepen.io/RealAaron/pen/LYLpXqj?editors=1100) 中查看。

谢谢您的阅读，欢迎点赞和评论交流~

## 参考资料
- [《CSS世界》](https://book.douban.com/subject/27615777)