import{_ as i,c as a,o as n,ae as e}from"./chunks/framework.Dh1jimFm.js";const l="/assets/bl_1_stack.DKmBtCMS.png",h="/assets/bl_2_stack.DJKL98qF.png",p="/assets/bl_3_heap.DmKJJRg6.png",t="/assets/bl_4_copy.Cz-Rwn1I.png",k="/assets/bl_5_copy.DNMwemv3.png",d="/assets/bl_6_compare.CG6KX9-T.png",r="/assets/bl_7_null.CUGVZTti.png",m=JSON.parse('{"title":"你真的掌握变量和类型了吗（一）数据类型","description":"","frontmatter":{},"headers":[],"relativePath":"article/前端基础/JS进阶/你真的掌握变量和类型了吗（一）数据类型.md","filePath":"article/前端基础/JS进阶/你真的掌握变量和类型了吗（一）数据类型.md","lastUpdated":1743859882000}'),o={name:"article/前端基础/JS进阶/你真的掌握变量和类型了吗（一）数据类型.md"};function E(c,s,g,y,F,u){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="你真的掌握变量和类型了吗-一-数据类型" tabindex="-1">你真的掌握变量和类型了吗（一）数据类型 <a class="header-anchor" href="#你真的掌握变量和类型了吗-一-数据类型" aria-label="Permalink to &quot;你真的掌握变量和类型了吗（一）数据类型&quot;">​</a></h1><h2 id="导读" tabindex="-1">导读 <a class="header-anchor" href="#导读" aria-label="Permalink to &quot;导读&quot;">​</a></h2><p>变量和类型是学习 <code>Javascript</code> 最先接触到的东西，但是往往看起来最简单的东西往往还隐藏着很多你不了解、或者容易犯错的知识，比如下面几个问题：</p><ul><li><code>Javascript</code> 中的变量在内存中的具体存储形式是什么？</li><li><code>0.1+0.2</code> 为什么不等于 <code>0,3</code> ？发生小数计算错误的具体原因是什么？</li><li><code>Symbol</code> 的特点，以及实际应用场景是什么？</li><li><code>[] == ![]</code> 、<code>[undefined] == false</code> 为什么等于 <code>true</code> ？代码中何时会发生隐式类型转换？转换的规则是什么？</li><li>如何精确的判断变量的类型？</li></ul><p>如果你还不能很好的解答上面的问题，那说明你还没有完全掌握这部分的知识，那么请好好阅读下面的文章吧。</p><p>本文从底层原理到实际应用详细介绍了 <code>Javascript</code> 中的变量和类型相关知识。</p><h2 id="一、javascript数据类型" tabindex="-1">一、JavaScript数据类型 <a class="header-anchor" href="#一、javascript数据类型" aria-label="Permalink to &quot;一、JavaScript数据类型&quot;">​</a></h2><p><a href="http://www.ecma-international.org/ecma-262/9.0/index.html" target="_blank" rel="noreferrer">ECMAScript标准</a> 规定了7中数据类型，其把这7种数据类型又分为两种：原始类型和对象类型。</p><p><strong>原始类型</strong></p><ul><li><code>Null</code>：只包含一个值 <code>null</code></li><li><code>Undefined</code>：只包含一个值 <code>undefined</code></li><li><code>Boolean</code>：包含两个值 <code>true</code> 和 <code>false</code></li><li><code>Number</code>：整数或浮点数，还有一些特殊值（<code>-Infinity</code>、<code>+Infinity</code>、<code>NaN</code>）</li><li><code>String</code>：一串表示文本值的字符序列</li><li><code>Symbol</code>：一种实例是唯一且不可改变的数据类型</li></ul><p>（在 <code>ES10</code> 中加入了第七种原始类型 <code>BigInt</code>，现已被最新 <code>Chrome</code> 支持）</p><p><strong>对象类型</strong></p><ul><li><code>Object</code>：自己分一类丝毫不过分，除了常用的 <code>Object</code>，<code>Array</code>、<code>Function</code> 等都属于特殊的对象</li></ul><h2 id="二、为什么区分原始类型和对象类型" tabindex="-1">二、为什么区分原始类型和对象类型 <a class="header-anchor" href="#二、为什么区分原始类型和对象类型" aria-label="Permalink to &quot;二、为什么区分原始类型和对象类型&quot;">​</a></h2><h3 id="_2-1-不可变性" tabindex="-1">2.1 不可变性 <a class="header-anchor" href="#_2-1-不可变性" aria-label="Permalink to &quot;2.1 不可变性&quot;">​</a></h3><p>上面所提到的原始类型，在 <code>ECMAScript</code> 标准中，它们被定义为 <code>primitive values</code>，即原始值，代表值本身是不可被改变的。</p><p>以字符串为例，我们在调用操作字符串的方法时，没有任何方法是可以直接改变字符串的：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">substr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toLowerCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// AaronKong</span></span></code></pre></div><p>在上面的代码中我们对 <code>str</code> 调用了几个方法，无一例外，这些方法都在原字符串的基础上产生了一个新字符串，而非直接去改变 <code>str</code>，这就印证了字符串的不可变性。</p><p>那么，当我们继续调用下面的代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;6&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// AaronKong6</span></span></code></pre></div><p>你会发现， <code>str</code> 的值被改变了，这不就打脸了字符串的不可变性么？其实不然，我们从内存上来理解：</p><p>在 <code>JavaScript</code> 中，每一个变量在内存中都需要一个空间来存储。</p><p>内存空间又被分为两种，栈内存与堆内存。</p><p>栈内存：</p><ul><li>存储的值大小固定</li><li>空间较小</li><li>可以直接操作其保存的变量，运行效率高</li><li>由系统自动分配存储空间</li></ul><p><code>JavaScript</code> 中的原始类型的值被直接存储在栈中，在变量定义时，栈就为其分配好了内存空间。</p><p><img src="`+l+'" alt=""></p><p>由于栈中内存空间的大小是固定的，那么注定了存储在栈中的变量就是不可变的。</p><p>在上面的代码中，我们执行了 <code>str += &#39;6&#39;</code> 的操作，实际上是在栈中又开辟了一块内存空间用于存储 <code>AaronKong6</code>，然后将变量 <code>str</code> 指向这块空间，所以这并不违背 <code>不可变性的</code> 特点。</p><p><img src="'+h+`" alt=""></p><h3 id="_2-2-引用类型" tabindex="-1">2.2 引用类型 <a class="header-anchor" href="#_2-2-引用类型" aria-label="Permalink to &quot;2.2 引用类型&quot;">​</a></h3><p>堆内存：</p><ul><li>存储的值大小不定，可动态调整</li><li>空间较大，运行效率低</li><li>无法直接操作其内部存储，使用引用地址读取</li><li>通过代码进行分配空间</li></ul><p>相对与上面具有不可变性的原始类型，我习惯把对象称为引用对象，引用类型的值实际存储在堆内存中，它在栈中只存储了一个固定长度的地址，这个地址指向堆内存中的值。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Aaronkong&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {age:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> obj3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj4 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span></code></pre></div><p><img src="`+p+`" alt=""></p><blockquote><p>由于内存是有限的，这些变量不可能一直在内存中占用资源，这里推荐下这篇文章 <a href="https://juejin.im/post/5cb33660e51d456e811d2687" target="_blank" rel="noreferrer">JavaScript中的垃圾回收和内存泄露</a>，这里告诉你 <code>JavaScript</code> 是如何进行垃圾回收以及可能会发生内存泄露的一些场景。</p></blockquote><p>当然，引用类型就不再具有 <code>不可变性</code> 了，我们可以轻易的改变它们：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj1.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong6&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj2.age </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 19</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj4.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj1); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// {name: &quot;AaronKong6&quot;}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// {age: 19}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj4); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// []</span></span></code></pre></div><p>以数组为例，它的很多方法都可以改变它自身。</p><ul><li><code>pop()</code> 删除数组最后一个元素，如果数组为空，则不改变数组，返回undefined，改变原数组，返回被删除的元素</li><li><code>push()</code> 向数组末尾添加一个多多个元素，改变原数组，返回新数组的长度</li><li><code>shift()</code> 把数组的第一个元素删除，若空数组，不进行任何操作，返回undefined，改变原数组，返回第一个元素的值</li><li><code>unshift()</code> 向数组的开头添加一个或多个元素，改变原数组，返回新数组的长度</li><li><code>reverse()</code> 颠倒数组中元素的顺序，改变原数组，返回该数组</li><li><code>sort()</code> 对数组元素进行排序，改变原数组，返回改数组</li><li><code>splice()</code> 从数据中添加/删除项目，改变原数组，返回被删除的元素</li></ul><p>下面我们通过几个操作来对比一下原始类型和引用类型的区别：</p><h3 id="_2-3-复制" tabindex="-1">2.3 复制 <a class="header-anchor" href="#_2-3-复制" aria-label="Permalink to &quot;2.3 复制&quot;">​</a></h3><p>当我们把一个变量的值复制到另一个变量上时，原始类型和引用类型的表现是不一样的，先来看看原始类型：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;孔先生你好&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// AaronKong</span></span></code></pre></div><p><img src="`+t+`" alt=""></p><p>内存中有一个变量 <code>name</code>，值为 <code>AaronKong</code> 。我们从变量 <code>name</code> 中复制一个变量 <code>name2</code> ，此时在内存中创建了一块新的空间用于存储 <code>Aaronkong</code>，虽然两者值是相同的，但是两者指向的内存空间完全不同，这两个变量参与任何操作都互不影响。</p><p>复制一个引用类型：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj2.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;孔先生你好&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj.name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 孔先生你好</span></span></code></pre></div><p><img src="`+k+'" alt=""></p><p>当我们复制引用类型的变量时，实际上复制的是栈中存储的地址，所以复制出来的 <code>obj2</code> 实际上和 <code>obj</code> 指向的堆中同一个对象。因此，我们改变其中任何一个变量的值，另一个变量都会受到影响，这就是为什么会有深拷贝和浅拷贝的原因。</p><h3 id="_2-4-比较" tabindex="-1">2.4 比较 <a class="header-anchor" href="#_2-4-比较" aria-label="Permalink to &quot;2.4 比较&quot;">​</a></h3><p>当我们在对两个变量进行比较时，不同类型的变量的表现是不同的：</p><p><img src="'+d+`" alt=""></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span></code></pre></div><p>对比原始类型，比较时会直接比较它们的值，如果值相等，即返回 <code>true</code>。</p><p>对于引用类型，比较时会比较它们的引用地址，虽然两个变量在堆中存储的对象具有的属性值都是相等的，但是它们被存储在了不同的存储空间，因此比较值为 <code>false</code>。</p><h3 id="_2-5-值传递和引用传递" tabindex="-1">2.5 值传递和引用传递 <a class="header-anchor" href="#_2-5-值传递和引用传递" aria-label="Permalink to &quot;2.5 值传递和引用传递&quot;">​</a></h3><p>借助下面的例子，我们先来看一看什么是值传递，什么是引用传递：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Aaron&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;孔先生你好&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name);</span></span></code></pre></div><p>执行上面的代码，如果最终打印出来的 <code>name</code> 是 <code>AaronKong</code>，没有改变，说明函数参数传递的是变量的值，即值传递。如果最终打印的是 <code>孔先生你好</code>，函数内部的操作可以改变传入的变量，那么说明函数参数传递的是引用，即引用传递。</p><p>很明显，上面的执行结果是 <code>AaronKong</code> ，即函数参数仅仅是被传入变量复制给了的一个局部变量，改变这个局部变量不会对外部变量产生影响。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">obj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  obj.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;孔先生你好&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj.name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 孔先生你好</span></span></code></pre></div><p>上面的代码可能让你产生疑惑，是不是参数是引用类型就是引用传递呢？</p><p>首先明确一点， <code>ECMAScript</code> 中所有的函数的参数都是按值传递的。</p><p>同样的，当函数参数是引用类型时，我们同样将参数复制了一个副本到局部变量，只不过复制的这个副本是指向堆内存中的地址而已，我们在函数内部对对象的属性进行操作，实际上和外部变量指向堆内存中的值相同，但是这并不代表着引用传递，下面我们再看一个例子：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">obj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  obj.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;AaronKong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;孔先生你好&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj.name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// AaronKong</span></span></code></pre></div><p>可见，函数参数传递的并不是变量的引用，而是变量拷贝的副本，当变量是原始类型时，这个副本就是值本身，当变量是引用类型时，这个副本是指向堆内存的地址。所以，再次记住：</p><blockquote><p><code>ECMAScript</code> 中所有的函数的参数都是按值传递的。</p></blockquote><h2 id="三、分不清的-null-和-undefined" tabindex="-1">三、分不清的 null 和 undefined <a class="header-anchor" href="#三、分不清的-null-和-undefined" aria-label="Permalink to &quot;三、分不清的 null 和 undefined&quot;">​</a></h2><p><img src="`+r+'" alt="img"></p><p>在原始类型中，有两个类型 <code>Null</code> 和 <code>Undefined</code>，他们都有且仅有一个值，<code>null</code> 和 <code>undefined</code> ，并且他们都代表无和空：</p><h3 id="null" tabindex="-1">null <a class="header-anchor" href="#null" aria-label="Permalink to &quot;null&quot;">​</a></h3><p>表示被赋值过的对象，刻意把一个对象赋值为 <code>null</code>，故意表示其为空，不应有值。</p><p>所以对象的某个属性值未 <code>null</code> 是正常的，<code>null</code> 转换为数值时值为 <code>0</code>。</p><h3 id="undefined" tabindex="-1">undefined <a class="header-anchor" href="#undefined" aria-label="Permalink to &quot;undefined&quot;">​</a></h3><p>表示“缺少值”，即此处应有一个值，但还没有定义。</p><p>如果一个对象的某个属性值为 <code>undefined</code>，这是不正常的，如<code>obj.name=undefined</code>，我们不应该这样写，应该直接 <code>delete obj.name</code>。</p><p><code>undefined</code>转为数值时未 <code>NaN</code>（非数字值的特殊值）</p><p><code>JavaScript</code>是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（因为存不存在只有在运行期才知道），这就是<code>undefined</code>的意义所在。对于<code>Java</code>这种强类型语言，如果有<code>undefined</code>这种情况，就会直接编译失败，所以它不需要一个这样的类型。</p><h2 id="四、不太熟的sybmbol类型" tabindex="-1">四、不太熟的Sybmbol类型 <a class="header-anchor" href="#四、不太熟的sybmbol类型" aria-label="Permalink to &quot;四、不太熟的Sybmbol类型&quot;">​</a></h2><p><code>Symbol</code>类型是<code>ES6</code>中新加入的一种原始类型。</p><blockquote><p>每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。</p></blockquote><h2 id="五、不老实的number类型" tabindex="-1">五、不老实的Number类型 <a class="header-anchor" href="#五、不老实的number类型" aria-label="Permalink to &quot;五、不老实的Number类型&quot;">​</a></h2><p>为什么说 <code>Number</code> 类型不老实呢，相信大家多多少少的在开发中遇到过小数计算不精确的问题，比如 <code>0.1+0.2!==0.3</code>，下面我们来追本溯源，看看为什么会出现这种现象，以及该如何避免。</p><p><a href="https://www.aaronkong.top/article/JS%E8%BF%9B%E9%98%B6/%E6%B5%AE%E7%82%B9%E6%95%B0%E7%B2%BE%E5%BA%A6%E9%97%AE%E9%A2%98.html" target="_blank" rel="noreferrer">浮点数精度问题</a></p><h3 id="javascript能表示的最大数字" tabindex="-1">JavaScript能表示的最大数字 <a class="header-anchor" href="#javascript能表示的最大数字" aria-label="Permalink to &quot;JavaScript能表示的最大数字&quot;">​</a></h3><p>由于 <code>IEEE 754</code> 双精度64位规范的限制：</p><p><code>指数位</code>能表示的最大数字：<code>1023</code> （十进制） <code>尾数位</code>能表达的最大数字即尾数位都为 <code>1</code> 的情况</p><p>所以JavaScript能表示的最大数字为 1.111... X 2 <sup>1023</sup>，这个结果转换成十进制是 1.7976931348623157e+308，这个结果即为 <code>Number.MAX_VALUE</code>。</p><h3 id="最大安全数字" tabindex="-1">最大安全数字 <a class="header-anchor" href="#最大安全数字" aria-label="Permalink to &quot;最大安全数字&quot;">​</a></h3><p>JavaScript 中 <code>Number.MAX_SAFE_INTEGER</code> 表示最大安全数字，计算结果是 <code>9007199254740991</code>，即在这个数范围内不会出现精度丢失（小数除外），这个数实际上是 1.111... X 2<sup>52</sup>。</p><p>我们同样可以用一些开源库来处理大整数：</p><ul><li><a href="https://github.com/justmoon/node-bignum" target="_blank" rel="noreferrer">node-bignum</a></li><li><a href="https://github.com/substack/node-bigint" target="_blank" rel="noreferrer">node-bigint</a></li></ul><p>其实官方也考虑到了这个问题，<code>bigInt</code>类型在<code>es10</code>中被提出，现在<code>Chrome</code>中已经可以使用，使用<code>bigInt</code>可以操作超过最大安全数字的数字。</p>',96)]))}const A=i(o,[["render",E]]);export{m as __pageData,A as default};
