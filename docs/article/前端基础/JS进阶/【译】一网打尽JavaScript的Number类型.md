# 【译】一网打尽JavaScript的Number类型

> 本文翻译自 [here-is-what-you-need-to-know-about-javascripts-number-type](https://indepth.dev/posts/1139/here-is-what-you-need-to-know-about-javascripts-number-type) 如有错误，欢迎指正。

本文将会详细解释下面的问题：

- 0.1 + 0.2 == 0.3 // false
- 9007199254740992 == 9007199254740993 // true

大多数的静态编程语言，比如`Java` 、`C` ，有多种不同的数字类型。

比如，你可以使用 `Java` 的  `byte` ，或是 `C` 语言的 `char` 来储存一个 `[-128,127]` 的整数，它们都只占用 `1字节` 。对于更大的整数，你可以使用 `int` 或者 `long` ，分别占用 `4字节` 和 `8字节`。对于小数的存储，你还可以使用占用4字节的 `float` 或者8字节的 `double` ，它们经常被认为是 `浮点数格式` ，后面的部分我们会解释这个名字的来历。

然而，`JavaScript` 并没有这么多种数字类型， `ECMAScript` 标准仅定义了一种 `双精度64位二进制格式IEEE754` 的数字类型。这个类型被用来储存整数和小数，和 `Java` `C`中的 `double` 几乎等同。新接触 `JavaScript` 的开发者会以为 `1` 在内存中的储存结构如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e348e3c143aa44ada06b50e1b08a12cb~tplv-k3u1fbpfcp-zoom-1.image)

然而事实上的储存结构为：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3df5bcf263594b16a5f23c476e174091~tplv-k3u1fbpfcp-zoom-1.image)

这可能会造成许多疑惑，让我们看看 `Java` 的循环：

```java
for (int i=1; 1/i > 0; i++) {
  System.out.println("Count is: " + i);
}
```

思考一下，上面的程序会运行多久？

不难看出，程序将会在第一次循环后终止。在第二次循环中， 计数器 `i` 将会增加到 `2` ， `1/2` 计算结果为 `0.5` ，但由于 `i` 是 `integer` 类型，它将会被截短为 `0` ，因此 `1/2 > 0` 将会返回 `false` 。

同样的循环，在 `JavaScript` 中会是如何：

```javascript
for (var i=1; 1/i > 0; i++) {
  console.log("Count is: " + i);
}
```

结果是，上面的程序永远不会结束。因为 `1/i` 的值是浮点数而非整数。

是不是有点意思，让我们继续往下看。

不熟悉 `JavaScript` 机制的开发者常常会拿另一个特殊的案例来和其他语言作比较，那就是 `0.1+0.2=0.30000000000000004`，它表示说 `0.1+0.2` 不等于 `0.3`。由于相关问题的搜索实在太频繁，以至于 `stackoverflow` 不得不在搜索框上加上特殊的提示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f747a1bea314531a62c801470432d06~tplv-k3u1fbpfcp-zoom-1.image)

有趣的是，这个问题往往都被打上 `JavaScript`的标签，但事实上，它存在于任何使用浮点数来表示数字的编程语言中。同时，在 `Java` 或 `C` 中使用 `float` 或 `double` 时，也会遇到同样的问题。

另一个有趣的点是，`0.1+0.2` 的结果并不是在浏览器中打印出的 `0.30000000000000004`，而是 `0.3000000000000000444089209850062616169452667236328125`。

这篇文章将解释浮点数如何工作，以及上面提到过的 `for loop` 和 `0.1+0.2` 的例子。

> 在这里有必要提到 `BigInt` ，它是 `JavaScript` 新增的基础数据类型，用来表示任意大的整数。有了 `BigInt`，你甚至可以安全地存储和操作**超过`Number`安全整数限制**的大型整数。它在今年的 *[V8](https://v8.dev/blog/bigint)* 中推出，并已兼容 *[Chrome 67+](https://developers.google.com/web/updates/2018/05/bigint) 和 [Node v10.4.0+](http://thecodebarbarian.com/an-overview-of-bigint-in-node-js.html). 点击 [这里](https://developers.google.com/web/updates/2018/05/bigint)了解更多。*

### 在科学计数法中表示数字

在了解 `浮点数` 和 `IEEE754 `标准前，我们先来看看如何使用科学计数法表示一个数字：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efd97e7e33e6426f8051b06e0944e3f7~tplv-k3u1fbpfcp-zoom-1.image)

`Significant` 表示数字的 `有效部分` ，也叫 `尾数` 、`精度` 。零通常被认为只是用来占位，而不是有效部分。

`Base` 表示采用的具体 `数值系统`，比如 `10` 代表十进制，`2` 代表 `二进制`。

`Exponent` 定义了小数点需要向左或向右移动几位，以还原出原始的数字。

任何数字都可以使用科学计数法表示，比如，数字`2` 在十进制和二进制中分别可以表示成：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff7ec17a35634b28b84960adc249030c~tplv-k3u1fbpfcp-zoom-1.image)

指数为0表示不需要额外进行移位操作，另一个例子，`0.0000022` 有效数字部分是 `22` ，让我们移动小数点来去掉其中的0：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8caf0f6bf1248a6a5520ac7e247cf80~tplv-k3u1fbpfcp-zoom-1.image)

上面的计算过程展示了，小数点右移和指数变化的关系。通过这种变化，我们可以让原始数字中只包含有效数字：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c727ff999cfb43548594993c7eea658f~tplv-k3u1fbpfcp-zoom-1.image)

通过将小数点右移 `8` 位 ，我们得到了 `22` 这个有效数字。因此，这里的指数还需要补一个 `-8` 。

同样，下面的例子中，通过左移小数点，我们得到了 `22300000` 的有效数字：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9afb6109401d4d7abdd758ae75c22f2a~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，科学计数法可以很方便的表示很大和很小的数字。有了指数，有效数字最终都可以表示成一个整数或小数。转换为科学计数法计数时，当小数点左移，指数为正；小数点右移，指数为负。

那么什么样的数字格式是标准化的呢？使用科学计数法标准化的数字，它的小数点前面只能是一个非零的数字，下面是一个格式化数字的案例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81a0c6aa76b84e1aa3f7a068ce26d583~tplv-k3u1fbpfcp-zoom-1.image)

你可能也注意到了一件事，二进制数的小数点前总是1。这样格式标准化后的数字在做比较时，就可以简单地按顺序比较尾数就可以了。

我们可以把科学计数法可以理解成浮点数的一种表现形式，`浮点` 表示小数点是可以 `浮动` 的，它可以被放在数字有效位的任意位置。通过上面的介绍我们知道，小数点的位置和指数有关。

### 基于IEEE754标准的浮点数
`IEEE 754` 规定了不少和浮点数算法相关的内容，我们这里只关注数字是 `存储` 、`进位` 和 `加法运算` 。在另一篇文章中，我详细介绍了 [二进制如何舍入](https://indepth.dev/how-to-round-binary-numbers/)。`舍入`是一个很常见的操作，它往往出现在当某个格式没有足够的比特数来存储数字时。了解它的原理很重要，现在让我们看看数字是如何存储的，后面的例子中我们都将拿二进制数字来举例。

### 数字是如何存储的
`IEEE754` 中定义了两种常用格式 —— `单精度` 和 `双精度` 。他们的区别在于使用的比特数不一样，因此能存储的数字范围也不同。同样，将数字转换为这两种格式的方法也基本类似，唯一的区别在于，它们给有效位和指数分配的位数是不同的。

`IEEE754` 浮点数由 `符号位` ，`有效位` 和 `指数` 组成，下图展示了 JavaScript Number类型所采用的双精度格式是如何分配这些比特位的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1935dd1460a46caac6f389b9e82c1e3~tplv-k3u1fbpfcp-zoom-1.image)

`符号位` 占用 1 比特位，`指数`占用 11 比特位，而另外的 52 比特位则都分配给了 `尾数`（即有效位）。下表展示了每种格式的比特位分配情况：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33059d15bbee46fab4e086d7eca1da57~tplv-k3u1fbpfcp-zoom-1.image)

指数按补码格式存储，在另一篇 [深入补码格式](https://indepth.dev/the-mechanics-behind-exponent-bias-in-floating-point/) 的文章中，我详细介绍了它和另外两种实现方式的区别，请花一点时间理解，因为我们将会在后面的转换中频繁使用它。

### 整数的存储
上面我们提到过比特位的分配模式，接下来，我们看看整数 `1` 和 `3` 是如何存储的。数字 `1` 在所有进制系统中都表示为 `1` ，因此无需额外进行转换，它在科学计数法的表示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f8373588cf541a08bf917b76cedc29d~tplv-k3u1fbpfcp-zoom-1.image)

它的尾数是 `1` ，指数是 `0` ，我们可能会以为它的浮点数表示是下面的样子：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdb72179b56e440b8c13d64fdc2b65bb~tplv-k3u1fbpfcp-zoom-1.image)

事实是这样吗？可惜的是JavaScript 并没有提供一个内置函数来直观地展示出某个数字存储时每个比特位是什么。为此，我写了一个简单的函数，它能让我们看到数字是如何存储的：

```javascript
function to64bitFloat(number) {
    var i, result = "";
    var dv = new DataView(new ArrayBuffer(8));

    dv.setFloat64(0, number, false);

    for (i = 0; i < 8; i++) {
        var bits = dv.getUint8(i).toString(2);
        if (bits.length < 8) {
            bits = new Array(8 - bits.length).fill('0').join("") + bits;
        }
        result += bits;
    }
    return result;
}
```

通过上面的方法，我们可以看到，数字 `1` 的存储是这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d6c3cb18aa74bf1817d98f9d98ff096~tplv-k3u1fbpfcp-zoom-1.image)

这和我们之前的猜想完全不同。尾数全是0，而且指数有一堆1。下面，让我们一探究竟吧。

首先，我们要知道，每个数字都会被转换成科学计数法的格式，这样做有什么优点呢？如果小数点前的数字总是 `1` ，我们就无需给它分配1比特的空间，同时，在进行数学运算时，硬件会自动补上这个 `1` 。由于数字 `1` 在标准格式中小数点后没有任何数字，而小数点前的数字 `1` 无需存储，因此它的有效位全是0。

然后，让我们看看指数中的一堆 `1` 从哪儿来。之前我们提到过，指数是按补码的格式存储的，因此我们来计算一下偏移量：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3759c2f1bb90484bb930e308c61baad7~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，这和我们上面展示的一致，因此根据补码的规则，其实保存的值是 `0` ，如果对此有疑问，可以阅读这篇  [二进制补码](https://indepth.dev/the-mechanics-behind-exponent-bias-in-floating-point/)。

现在我们用上面了解的信息试着将数字 `3` 转换为浮点数格式。`3` 的二进制是 `11` ,如果不记得为什么，可以查阅这篇 [二进制与十进制的转换算法](https://indepth.dev/the-simple-math-behind-decimal-binary-conversion-algorithms/) 。正常情况下，数字 `3` 的二进制格式会是这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/921a0846453744f1bee0c4a4419f788f~tplv-k3u1fbpfcp-zoom-1.image)

在小数点后仅有一个数字 `1` ，它将会被作为尾数储存。同时，根据之前的介绍，小数点前的数字 `1` 将不会被储存。另外指数位是 `1` ，我们看看二进制补码是如何计算出来的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9f330dc99f448998d85074245a9cae9~tplv-k3u1fbpfcp-zoom-1.image)

另外，需要注意的是，尾数部分在储存时顺序和科学计数法中的顺序是一致的——从左到右，有了这个概念，我们就可以知道整个浮点数的表示了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15c2e4fbc5254ef4b39902c3f985fa99~tplv-k3u1fbpfcp-zoom-1.image)

如果你使用我在上面提供的函数，就可以得到一致的浮点数表示。

### 0.1+0.2为什么不等于0.3

现在我们知道了数字是如何被储存的，下面让我们看看这个经常被提到的例子，它的简单解释是：

> 只有某个小数的分母是2的指数倍，它才可以在二进制格式中被完整地表示。而0.1的分母和0.2的分母都不是2的指数倍，因此它们不能在二进制格式中被完整地表示。在 IEEE-754浮点数 标准下储存，它们的尾数中的有效位会被进位到可以容纳的最大位数 —— 半精度为10位，单精度为23位，双精度则为52位，由于不同的精度使用的比特位不同，0.1和0.2的浮点数近似值可能略大于或略小于十进制的表示，但不会相等。因此，0.1+0.2==0.3 不可能成立。

对于开发人员来说，上面解释的可能已经足够清楚，不过最好的方式是你自己演示计算机的整个计算流程，这也是我们接下来要做的。

### 0.1和0.2的浮点数表示

首先让我们看看 `0.1` 的浮点数表示。第一步，我们要先通过乘 `2` 算法将 `0.1 ` 转换为二进制，具体的原理可以参考我的这篇 [十进制和二进制的转换算法](https://indepth.dev/the-simple-math-behind-decimal-binary-conversion-algorithms/) 。转换后，我们得到了一个无限循环小数：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ee515891fd3445bbf6121c3e0142e93~tplv-k3u1fbpfcp-zoom-1.image)

下一步，将它展示成标准的科学计数法来表示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c29ab2f034b84a0da645e50a3f1134ff~tplv-k3u1fbpfcp-zoom-1.image)

由于尾数最多只能有 `52` 位，因此我们需要将小数点后的 52 位进行进位。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d12108fcd6148beb30cce2cb05516c4~tplv-k3u1fbpfcp-zoom-1.image)

使用IEEE754标准中定义的舍入规则，以及我另一篇 [二进制数的舍入](https://medium.com/@maximus.koretskyi/how-to-round-binary-fractions-625c8fa3a1af) 所描述的方法，我们得到了进位后的数字：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31210f8759e04dc89995b3e4cd4e8191~tplv-k3u1fbpfcp-zoom-1.image)

最后，计算出指数的补码：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8eddde834ac412ab9f8fa0451e52fd7~tplv-k3u1fbpfcp-zoom-1.image)

然后，我们得到了数字 `0.1` 的浮点数表示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/255bf58d7a0e47018f79e698f103183f~tplv-k3u1fbpfcp-zoom-1.image)

建议你试着自己计算 `0.2` 的浮点数表示，最终你会得到的科学计数法表示和二进制表示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11a6d3b6778141f7a697f7e7e1951901~tplv-k3u1fbpfcp-zoom-1.image)

### 计算0.1+0.2的结果

首先，将0.1和0.2转换成科学计数法的格式，我们将得到：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1d720645df34e34a6cfa59ec7c67b8f~tplv-k3u1fbpfcp-zoom-1.image)

加法运算要求数字必须拥有相同的指数，而根据规则，需要将指数值小的数字统一成值更大的指数，因此我们将第一个数字的指数从 `-4` 转换成 `-3` ，以和第二个数字保持一致：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/721c5f0c28fc4c209c089c6020f4c7bf~tplv-k3u1fbpfcp-zoom-1.image)

接下来，执行加法运算：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/715beda672ae4440b1f6e920030bfdc3~tplv-k3u1fbpfcp-zoom-1.image)

现在的计算结果是浮点数格式，因此我们还需要将它标准化，其中包括了按需舍入，以及计算指数中的补码。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99ef0decb4fd4c3aa1de408f6f0e9e43~tplv-k3u1fbpfcp-zoom-1.image)

标准化后的数字触发了舍入，因此我们得到：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be35fcbc5704e83a981a328f9773df3~tplv-k3u1fbpfcp-zoom-1.image)

最终，浮点数的表示为：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94bbd92397e34240a3cb783bfa5dbee2~tplv-k3u1fbpfcp-zoom-1.image)

这就是执行 `0.1+0.2` 后最终的存储结果，为了得到这个结果，计算机一共需要进行 `3` 次舍入 —— 包括两次对单个数字的舍入，一次在进行加法运算时。而当单独储存0.3这个数字时，计算机仅对它进行一次舍入。**正是因为这种区别，导致了 `0.1+0.2` 和 `0.3` 二进制表示的不同**。当JavaScript执行 `0.1+0.2 === 0.3` 时，实际比较的其实是这些比特位表示，而由于它们不同，因此返回结果为 *false* 。另一方面，如果在某种情形下两者的比特位排列一样的话，即便0.1和0.2在二进制中不能被有限表示，`0.1+0.2 === 0.3` 还是会判断为 `true`。

试着用我之前提供的工具方法  `to64bitFloat(0.3)` 验证 `0.3` 的比特位排列，你会发现结果和我们上面计算`0.1+0.2` 的结果是不同的。

如果你想知道这个结果的转换为十进制后的数，只需将这些比特位表示为指数为0的科学计数法，然后将其转换成十进制。最终你将得到  `0.1+0.2` 实际存储的十进制数为 `0.3000000000000000444089209850062616169452667236328125` ，而 `0.3` 的十进制数则为 `0.299999999999999988897769753748434595763683319091796875` 。

### 无限循环问题的答案

了解无限循环问题，有一个关键的数字 `9007199254740991` ，下面我们来聊聊这个特殊的数字。

#### Number.MAX_SAFE_INTEGER

在控制台输入 `Number.MAX_SAFE_INTEGER` ，会打印出我们的关键数字 `9007199254740991` 。为什么它如何特殊，甚至还拥有自己的常量名？下面是 [ECMAScript Language Specification](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer) 对它的描述：

> Number.MAX_SAFE_INTEGER 表示最大的安全整数**n** ，因此 `n` 和 `n+1` 表示的其实是同一个数字。Number.MAX_SAFE_INTEGER 的值为 **9007199254740991** (2⁵³−1).

MDN 也有一些补充说明：

> 这里安全存储的意思是指能够准确区分两个不相同的值，例如 `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` 将得到 true的结果，而这在数学上是错误的。

需要注意的是，它并不是` JavaScript` 所能表示的最大数字。举个例子，`MAX_SAFE_INTEGER + 3` 所表示的数字  `9007199254740994` 就可以被安全地表示。而通过常量`Number.MAX_VALUE` ，你将得到可以表示的最大数字 `1.7976931348623157e+308` 。让人惊讶的是，有一些介于 `MAX_SAFE_INTEGER` 和 `MAX_VALUE` 之间的数字却并不能被正确地表示。事实上，`MAX_SAFE_INTEGER` 和`MAX_SAFE_INTEGER+ 3` 的 `9007199254740993` 就是其中之一。如果将它输入在控制台上，你会得到 `9007199254740992` 。看起来，JavaScript 并没有采用原始的值，而是减去了1之后的值。

为了一探究竟，我们来看看 `9007199254740991 (MAX_SAFE_INTEGER)` 的浮点数表示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d94b90ee136f470eb2a8ec4af6dd40d4~tplv-k3u1fbpfcp-zoom-1.image)

转换为科学计数法后：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f6125771c9f4b80b92fe191fcc6f7b8~tplv-k3u1fbpfcp-zoom-1.image)

现在，为了让指数为0，我们将小数点右移52位到最右端：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2da2abde807944cfa41997a6a875b6b9~tplv-k3u1fbpfcp-zoom-1.image)

现在，为了储存 `MAX_SAFE_INTEGER` ，我们用掉了所有的尾数位，此时指数为52。为了存储更大的数字，只能将指数+1，也就是53，因此我们将小数点右移53位，而由于尾数只有52位，我们在末尾补上0。指数为54的情况下，末尾会补上2个0，指数为55，补3个0，以此类推。

这会有什么影响呢？你可能已经猜到了。由于所有大于 **MAX_SAFE_INTEGER** 的数字末尾都是0，因此在64位的浮点数标准中，任何大于 **MAX_SAFE_INTEGER** 的奇数都无法被表示出来。为了储存这些数字，尾数需要超过52位的空间。让我们看看具体的行为：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0604bc329c104a608c886cec7e717197~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，`9007199254740993`, `9007199254740995` 不能被表示为 `64位` 的浮点数，而当数字不断增加时，不能被储存的数字范围还将急剧扩大。

### 无限循环

让我们回头看看这个 `for` 循环：

```javascript
for (var i=1; 1/i > 0; i++) {
    console.log("Count is: " + i);
}
```

上面的代码会进入无限循环。在文章的开头我提到过，这是由于在 JavaScript 中 `1/i` 的结果不是一个整数，而是一个浮点数。现在你应该已经知道了浮点数的工作原理，以及 `Number.MAX_SAFE_INTEGER` 的含义，这将使你更容易理解为什么它会进入无限循环。

上面的循环停止的条件是， `i` 达到 `Inifinity` ，因为`1/Infinity` 结果是 `false` ，然而这并没有发生。在前面的篇幅中我解释了为什么有些整数不能被储存，而会被进位成最近的偶数。在这个例子中，计数器 `i` 的累加会一直达到 `9007199254740993` ，也就是 `MAX_SAFE_INTEGER+2` 。这是第一个不能被储存的整数，因为它会被舍入到最近的偶数 `9007199254740992` 。因此循环会卡在这个数字上，导致了这里的无限循环。

### 简单聊聊 NaN 和 Infinity

在结束这篇文章之前，我想简单解释一下 `NaN` 和 `Infinity` 。尽管两者都被看作是浮点数以及浮点数运算中的特例，但 `NaN` 表示的是 `Not a Number` ，和 `Infinity` 不同。另外，他们的指数位都是 `1024` `(11111111111)` ，而 `Number.MAX_VALUE` 的指数位则是  `1023` `(111111111101)` 。

由于 `NaN` 实质上也是一个浮点数，因此在浏览器中运行 `typeof NaN` 会返回 `Number` ，同时它的指数位全是1，尾数仅有一个不是0：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0b9167957664730b5272e8c5b96d3c9~tplv-k3u1fbpfcp-zoom-1.image)

有一些数学运算可能会得到 `NaN` ，比如 `0/0` 或 `Math.sqrt(-4)` 。JavaScript 中也有一些方法可能会返回 `NaN` ，比如当 `parseInt` 参数为字符串时 `parseInt("s")` 。有趣的是，将 `NaN` 和任何对象比较时，总会返回 `false` 。例如，下面操作的返回值均为 `false`：

```javascript
NaN === NaN
NaN > NaN
NaN < NaN

NaN > 3
NaN < 3
NaN === 3
```

而且， `NaN`  是唯一一个和自己不相等的值。另外，JavaScript 还提供了 `isNaN()` 方法来检测一个值是否为 `NaN` 。

`Infinity` 是另一个特殊的浮点数，它被用来处理溢出以及一些数学运算，例如 `1/0` 。`Infinity` 的指数位全是1，尾数位全是0：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cb5ac90d297418e9898e85c9d01a304~tplv-k3u1fbpfcp-zoom-1.image)

正无穷大的符号位是0，负无穷大的符号位是1。 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)也描述了返回 `Infinity` 的一些场景。另外，和 `NaN` 不同， `Infinity` 可以被用来安全地做比较。

> 本文翻译自 [here-is-what-you-need-to-know-about-javascripts-number-type](https://indepth.dev/posts/1139/here-is-what-you-need-to-know-about-javascripts-number-type) 如有错误，欢迎指正。