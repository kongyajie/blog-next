import{_ as i,c as a,o as e,ae as t}from"./chunks/framework.Dh1jimFm.js";const d=JSON.parse('{"title":"浏览器&HTTP协议","description":"","frontmatter":{},"headers":[],"relativePath":"article/前端自检/4-浏览器&HTTP协议.md","filePath":"article/前端自检/4-浏览器&HTTP协议.md","lastUpdated":1743859882000}'),o={name:"article/前端自检/4-浏览器&HTTP协议.md"};function s(r,l,n,p,h,u){return e(),a("div",null,l[0]||(l[0]=[t(`<h1 id="浏览器-http协议" tabindex="-1">浏览器&amp;HTTP协议 <a class="header-anchor" href="#浏览器-http协议" aria-label="Permalink to &quot;浏览器&amp;HTTP协议&quot;">​</a></h1><h2 id="一、如何发展的-解决什么问题-历史" tabindex="-1">一、如何发展的？解决什么问题？- 历史 <a class="header-anchor" href="#一、如何发展的-解决什么问题-历史" aria-label="Permalink to &quot;一、如何发展的？解决什么问题？- 历史&quot;">​</a></h2><ul><li>1990年 The WorldWideWeb browser（Nexus平台）</li><li>1993年 NCSA Mosaic</li><li>1994年 Netscape Navigator</li><li>1995年 Microsoft Internet Explorer</li><li>1996年 Opera</li><li>2003年，Apple Safari</li><li>2004年 Mozilla Firefox</li><li>2008年 Google Chrome</li><li>2015年 Microsoft Edge</li><li>2016年 Vivaldi</li></ul><h2 id="二、如何构成的-架构" tabindex="-1">二、如何构成的？- 架构 <a class="header-anchor" href="#二、如何构成的-架构" aria-label="Permalink to &quot;二、如何构成的？- 架构&quot;">​</a></h2><h3 id="背景知识" tabindex="-1">背景知识 <a class="header-anchor" href="#背景知识" aria-label="Permalink to &quot;背景知识&quot;">​</a></h3><ul><li>进程 <ul><li>进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）</li><li>IPC 进程间通讯</li></ul></li><li>线程 <ul><li>线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）</li></ul></li><li>协程</li></ul><h3 id="_1、单进程浏览器时代" tabindex="-1">1、单进程浏览器时代 <a class="header-anchor" href="#_1、单进程浏览器时代" aria-label="Permalink to &quot;1、单进程浏览器时代&quot;">​</a></h3><ul><li>特点：所有页面都运行在一个主进程中（网络线程、页面线程、其他线程）</li><li>IE6：单标签，一个页面一个窗口</li><li>缺点：不稳定、不流畅、不安全</li></ul><h3 id="_2、多进程浏览器时代" tabindex="-1">2、多进程浏览器时代 <a class="header-anchor" href="#_2、多进程浏览器时代" aria-label="Permalink to &quot;2、多进程浏览器时代&quot;">​</a></h3><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8/WebKit%E6%9E%B6%E6%9E%84.png" alt=""></p><p>结构：</p><ul><li>1个浏览器主进程：负责界面显示、用户交互、子进程管理，同时提供存储等功能</li><li>1个GPU进程：最初是为了实现3D CSS的效果，后来网页和浏览器UI界面也采用GPU绘制</li><li>1个网络进程：负责页面的网络资源加载</li><li>多个渲染进程：将HTML、CSS、JavaScript转换为用户可以与之交互的网页</li><li>多个插件进程：负责插件的运行</li></ul><p>优点：</p><ul><li>稳定性：进程间相互隔离</li><li>流畅性：JS只影响当前的渲染进程；关闭页面，进程所占用的内存会被系统回收</li><li>安全性：安全沙箱</li></ul><p>缺点：</p><ul><li>更高的资源占用、更复杂的体系架构</li></ul><h3 id="_3、未来面向服务的架构soa" tabindex="-1">3、未来面向服务的架构SOA <a class="header-anchor" href="#_3、未来面向服务的架构soa" aria-label="Permalink to &quot;3、未来面向服务的架构SOA&quot;">​</a></h3><blockquote><p>为了解决这些问题，在 2016 年，Chrome 官方团队使用“面向服务的架构”（Services Oriented Architecture，简称 SOA）的思想设计了新的 Chrome 架构。也就是说 Chrome 整体架构会朝向现代操作系统所采用的“面向服务的架构” 方向发展，原来的各种模块会被重构成独立的服务（Service），每个服务（Service）都可以在独立的进程中运行，访问服务（Service）必须使用定义好的接口，通过 IPC 来通信，从而构建一个更内聚、松耦合、易于维护和扩展的系统，更好实现 Chrome 简单、稳定、高速、安全的目标。如果你对面向服务的架构感兴趣，你可以去网上搜索下资料，这里就不过多介绍了。Chrome 最终要把 UI、数据库、文件、设备、网络等模块重构为基础服务，类似操作系统底层服务</p></blockquote><h3 id="_4、浏览器的差异在哪里" tabindex="-1">4、浏览器的差异在哪里？ <a class="header-anchor" href="#_4、浏览器的差异在哪里" aria-label="Permalink to &quot;4、浏览器的差异在哪里？&quot;">​</a></h3><ul><li><p>排版/渲染引擎：负责将标记内容、样式信息排版后输出至显示器或打印机</p><ul><li>Chrome：Blink</li><li>Safari：<strong>Webkit</strong></li><li>Mozilla：Gecko</li><li>Internet Explorer：Trident</li><li>Microsoft Edge：EdgeHTML</li><li>QQ浏览器/世界之窗/搜狗浏览器：Trident、Blink</li></ul></li><li><p>JS引擎：解释执行JS，由渲染引擎提供</p><ul><li>Rhino，由Mozilla基金会管理，开放源代码，完全以Java编写。</li><li><strong>SpiderMonkey</strong>，第一款JavaScript引擎，早期用于Netscape Navigator，现时用于Mozilla Firefox。</li><li><strong>V8</strong>，开放源代码，由Google丹麦开发，是Google Chrome的一部分。</li><li>JavaScriptCore，开放源代码，用于Safari。</li><li>Chakra (JScript引擎)，用于Internet Explorer。</li><li>Chakra (JavaScript引擎)，用于Microsoft Edge。</li></ul></li><li><p>浏览器User-Agent</p><blockquote><p>首部包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号</p></blockquote><p><code>User-Agent: Mozilla/&lt;version&gt; (&lt;system-information&gt;) &lt;platform&gt; (&lt;platform-details&gt;) &lt;extensions&gt;</code></p><p><code>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36</code></p><p>发展历程：</p><ul><li>1、Netscape Navigator2.0 支持GIF，而Mosaic不支持，因此引入UA标识，告诉服务器有Mozilla标识时才发送GIF；</li><li>2、IE出版，也支持GIF了，但是UA上没有Mozilla标识，于是微软也在UA上加上了Mozilla标识；</li><li>3、Netscape在第一次浏览器大站中输给了IE，接着以MozillaFirefox重生，搞出了Gecko引擎，并在UA上加上了Gecko，Gecko开源后有许多其他浏览器基于它的代码二次开发，因此也都在UA上加上了Gecko。每一个都假装自己是Mozilla，每一个都使用了Gecko的代码。</li><li>4、接着一帮搞Linux的人弄了个浏览器Konqueror，引擎叫KHTML，他们觉得KHTML和Gecko一样好，于是在UA上加上了（KHTML，like Gecko）</li><li>5、Apple弄出了Safari，以KHTML为基础打造出Webkit，然后叫 AppleWebKit（KHTML，like Gecko）</li><li>6、Google又基于Webkit搞出了Chrome，因此它为了伪装成safari，webkit伪装成KHTML，KHTML伪装成Gecko，最后所有的浏览器都伪装成 Mozilla。</li></ul></li></ul><h2 id="三、如何动起来的-页面循环系统" tabindex="-1">三、如何动起来的？- 页面循环系统 <a class="header-anchor" href="#三、如何动起来的-页面循环系统" aria-label="Permalink to &quot;三、如何动起来的？- 页面循环系统&quot;">​</a></h2><h3 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h3><blockquote><p>背景：渲染进程中的渲染主线程是单线程的,而它又要处理非常多的任务。</p><p>总体上：EventLoop 使用了事件循环+消息队列来实现</p></blockquote><h3 id="eventloop运行流程-重要" tabindex="-1">EventLoop运行流程（重要） <a class="header-anchor" href="#eventloop运行流程-重要" aria-label="Permalink to &quot;EventLoop运行流程（重要）&quot;">​</a></h3><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS/%E6%B5%8F%E8%A7%88%E5%99%A8EventLoop.png" alt=""></p><h3 id="微任务执行流程" tabindex="-1">微任务执行流程 <a class="header-anchor" href="#微任务执行流程" aria-label="Permalink to &quot;微任务执行流程&quot;">​</a></h3><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/JS/%E6%B5%8F%E8%A7%88%E5%99%A8EventLoop%E6%B5%81%E7%A8%8B-%E5%BE%AE%E4%BB%BB%E5%8A%A1.png" alt=""></p><h2 id="四、如何从url到页面显示的-重要" tabindex="-1">四、如何从URL到页面显示的？(重要) <a class="header-anchor" href="#四、如何从url到页面显示的-重要" aria-label="Permalink to &quot;四、如何从URL到页面显示的？(重要)&quot;">​</a></h2><h3 id="_1、三个阶段" tabindex="-1">1、三个阶段 <a class="header-anchor" href="#_1、三个阶段" aria-label="Permalink to &quot;1、三个阶段&quot;">​</a></h3><ul><li>网络请求阶段 <ul><li>判断是URL还是关键字</li><li>DNS解析</li><li>发送HTTP请求</li><li>服务器处理</li></ul></li><li>解析白屏阶段 <ul><li>解析HTML（预解析、下载CSS/JS、执行JS）</li><li>根据HTML生成DOM（为什么建议CSS要放在头部、JS放尾部？）</li><li>根据CSS生成CSSOM（计算样式Style）</li><li>将DOM树和CSSOM整合成LayoutTree（计算几何布局，过滤不需要显示的元素如header/script标签、display:none等）</li></ul></li><li>页面渲染阶段 <ul><li>生成图层树LayerTree（分层，从宏观上提升渲染效率）</li><li>生成绘制列表PaintList</li><li>光栅化（按照绘制列表中的指令生成图片）</li><li>分块（优先绘制靠近视口的图块，从微观层面提升渲染效率）</li><li>合成（图层合并，发送到缓冲区）</li></ul></li></ul><h3 id="_2、完整的渲染流水线示意图" tabindex="-1">2、完整的渲染流水线示意图 <a class="header-anchor" href="#_2、完整的渲染流水线示意图" aria-label="Permalink to &quot;2、完整的渲染流水线示意图&quot;">​</a></h3><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8/%E5%AE%8C%E6%95%B4%E7%9A%84%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%A4%BA%E6%84%8F%E5%9B%BE.webp" alt=""></p><h3 id="_3、含有-javascript-和-css-的页面渲染流水线" tabindex="-1">3、含有 JavaScript 和 CSS 的页面渲染流水线 <a class="header-anchor" href="#_3、含有-javascript-和-css-的页面渲染流水线" aria-label="Permalink to &quot;3、含有 JavaScript 和 CSS 的页面渲染流水线&quot;">​</a></h3><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8/%E5%90%AB%E6%9C%89%20JavaScript%20%E5%92%8C%20CSS%20%E7%9A%84%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF.webp" alt=""></p><h3 id="_4、关键渲染路径" tabindex="-1">4、关键渲染路径 <a class="header-anchor" href="#_4、关键渲染路径" aria-label="Permalink to &quot;4、关键渲染路径&quot;">​</a></h3><p>渲染流水线、浏览器的一帧中包含了哪些过程：</p><p><img src="https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8-%E5%85%B3%E9%94%AE%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84.png" alt=""></p><p>性能对比：合成 &gt; 重绘 &gt; 重排</p><p>举个🌰：transform:translate(xxx,xxx) &gt; div.style.background &gt; div.style.height</p><ul><li>合成：几何变换和透明度变换可以直接通过<strong>合成线程</strong>处理，无需主线程参与，大大提升渲染效率，可以此优化动画或特效</li><li>触发合成的条件： <ul><li>设置will-change: transform</li><li>设置opacity</li><li><code>3d transform</code></li><li><code>&lt;canvas&gt;</code></li><li><code>&lt;video&gt;</code></li></ul></li></ul><h2 id="五、如何进行性能优化-重要" tabindex="-1">五、如何进行性能优化？（重要） <a class="header-anchor" href="#五、如何进行性能优化-重要" aria-label="Permalink to &quot;五、如何进行性能优化？（重要）&quot;">​</a></h2><h3 id="_1、网络请求阶段" tabindex="-1">1、网络请求阶段 <a class="header-anchor" href="#_1、网络请求阶段" aria-label="Permalink to &quot;1、网络请求阶段&quot;">​</a></h3><blockquote><p>原则：优化关键资源的加载速度</p></blockquote><ul><li>减少关键资源的个数 <ul><li>内联/异步加载JS/CSS</li><li>打包合并代码（webpack打包）</li><li>合理利用缓存（webpack打包设置contenthash）</li><li>SSR服务端渲染</li></ul></li><li>减少关键资源的大小 <ul><li>代码压缩（webpack打包压缩混淆）</li><li>Tree-Shaking（清除多余代码优化项目打包体积，利用ES6 Module引入进行静态分析，判断那些模块和变量未被使用或者引用，进而删除对应代码）</li></ul></li><li>降低关键资源的 RTT（Round Trip Time）次数 <ul><li>CDN加速</li><li>使用HTTP2</li><li>合理利用缓存</li><li>DNS prefetch域名提前寻址</li></ul></li></ul><h3 id="_2、渲染交互阶段" tabindex="-1">2、渲染交互阶段 <a class="header-anchor" href="#_2、渲染交互阶段" aria-label="Permalink to &quot;2、渲染交互阶段&quot;">​</a></h3><blockquote><p>原则：让单个帧的生成速度变快</p></blockquote><ul><li><strong>图片优化</strong><ul><li>图片预加载，预加载LCP大图</li><li>图片格式/尺寸优化</li><li>图片懒加载-异步加载屏幕外的图片</li><li>iconfont，css代替图片</li></ul></li><li><strong>动画优化</strong><ul><li>合理利用CSS合成动画/特效（设置will-change: transform, opacity）</li><li>使用RAF代替setTImeout实现JS动画</li></ul></li><li><strong>JS性能优化</strong><ul><li>对DOM查询进行缓存</li><li>多个DOM操作一起插入DOM结构（createDocumentFragment）</li><li>节流throttle 防抖 debounce</li><li>使用Web Worker</li></ul></li></ul><h2 id="六、如何与服务器通讯-计算机网络" tabindex="-1">六、如何与服务器通讯？计算机网络 <a class="header-anchor" href="#六、如何与服务器通讯-计算机网络" aria-label="Permalink to &quot;六、如何与服务器通讯？计算机网络&quot;">​</a></h2><h3 id="_1、七层网络模型-待完善" tabindex="-1">1、七层网络模型（待完善） <a class="header-anchor" href="#_1、七层网络模型-待完善" aria-label="Permalink to &quot;1、七层网络模型（待完善）&quot;">​</a></h3><ul><li>应用层</li><li>传输层</li><li>数据链路层</li><li>物理层</li></ul><h3 id="_2、http协议的演化-重要" tabindex="-1">2、HTTP协议的演化（重要） <a class="header-anchor" href="#_2、http协议的演化-重要" aria-label="Permalink to &quot;2、HTTP协议的演化（重要）&quot;">​</a></h3><ul><li>HTTP0.9 <ul><li>核心：超文本传输协议</li><li>不足：仅支持HTML格式文件的传输</li></ul></li><li>HTTP1.0 <ul><li>核心：支持多种类型文件</li><li>变化 <ul><li>新增请求头/响应头，支持多种类型的文件下载</li><li>新增状态码</li><li>新增Cache缓存</li><li>新增用户代理user-agent</li></ul></li><li>不足：一个请求一个TCP连接</li></ul></li><li>HTTP1.1 <ul><li>核心：提高传输速度</li><li>变化 <ul><li>增加了持久连接：浏览器为每个域名最多同时维护 6 个 TCP 持久连接，支持使用 CDN 的实现域名分片机制</li><li>新增Cookie和安全机制</li></ul></li><li>不足 <ul><li>TCP慢启动，多条 TCP 连接竞争固定的带宽（TCP自身问题）</li><li>队头阻塞（HTTP2解决）</li></ul></li></ul></li><li>HTTP2 <ul><li>核心：继续提高传输速度</li><li>变化： <ul><li>一个域名只使用一个 TCP 长连接来传输数据</li><li>添加二进制分帧层拆分请求包，来实现多路复用机制，进而消除队头阻塞问题（重要）</li><li>可以设置请求的优先级</li><li>服务器推送（服务器预览index.html，主动推送css/js文件）</li><li>头部压缩（采用前后端统一的映射和一些算法）</li></ul></li><li>不足 <ul><li>TCP上的队头阻塞：在 TCP 传输过程中，由于单个数据包的丢失而造成的阻塞</li><li>TCP建立连接慢：三次握手，以及可能的TLS层握手</li></ul></li></ul></li><li>HTTP3 <ul><li>核心：解决TCP的一些问题</li><li>变化：QUIC协议（基于UDP）</li><li>实现了类似 TCP 的流量控制、传输可靠性的功能</li><li>集成TLS加密功能</li><li>实现HTTP2的多路复用</li><li>实现了快速握手功能</li><li>不足 <ul><li>中间设备僵化</li><li>UDP优化不及TCP</li><li>浏览器和服务器支持度较低</li></ul></li></ul></li></ul><h3 id="_3、http协议" tabindex="-1">3、HTTP协议 <a class="header-anchor" href="#_3、http协议" aria-label="Permalink to &quot;3、HTTP协议&quot;">​</a></h3><p><a href="https://www.ruanyifeng.com/blog/2016/08/http.html" target="_blank" rel="noreferrer">HTTP协议入门</a></p><h4 id="_1-ajax" tabindex="-1">1）ajax <a class="header-anchor" href="#_1-ajax" aria-label="Permalink to &quot;1）ajax&quot;">​</a></h4><p><strong>XMLHttpRequest</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> xhr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> XMLHttpRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;GET&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/api&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onreadystatechange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (xhr.readyState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (xhr.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(xhr.responseText)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p><strong>状态码</strong></p><p>xhr.readyState</p><ul><li>0：未初始化，还未调用send方法</li><li>1：载入，已调用send方法，正发送请求</li><li>2：载入完成，send方法执行完毕，已接收到全部响应内容</li><li>3：交互，正在解析响应内容</li><li>4：完成，响应内容解析完成，可以再客户端调用</li></ul><p>xhr.status</p><ul><li>2xx：请求成功，200</li><li>3xx：重定向，301永久，302临时，304访问资源未发生变化（可使用缓存）</li><li>4xx：客户端请求错误，404访问地址找不到，403无权限访问</li><li>5xx：服务端错误</li></ul><h4 id="_2-跨域-同源策略-跨域解决方案" tabindex="-1">2）跨域：同源策略，跨域解决方案 <a class="header-anchor" href="#_2-跨域-同源策略-跨域解决方案" aria-label="Permalink to &quot;2）跨域：同源策略，跨域解决方案&quot;">​</a></h4><p><strong>同源策略</strong></p><ul><li>ajax请求时，<strong>浏览器</strong>要求当前页面和server必须同源（安全）</li><li>同源：协议、域名、端口，三者必须一致</li><li>加载 img css js 可无视同源策略</li></ul><p><strong>跨域方式</strong></p><p>1：JSONP</p><ul><li><code>&lt;script&gt;</code> 可绕过跨域限制</li><li>服务器可以任意动态拼接数据返回</li><li>所以，<code>&lt;script&gt;</code> 就可以获得跨域的数据，只要服务端愿意返回</li></ul><p>2：CORS（跨院资源共享）-服务器设置 http header <a href="https://www.ruanyifeng.com/blog/2016/04/cors.html" target="_blank" rel="noreferrer">cors</a></p><ul><li>Access-Control-Allow-Origin: <a href="http://api.bob.com" target="_blank" rel="noreferrer">http://api.bob.com</a></li><li>Access-Control-Allow-Methods: GET, POST, PUT</li><li>Access-Control-Allow-Headers: X-Custom-Header</li></ul><p><strong>几个名词的对比</strong></p><ul><li>技术名词：ajax（asyn json and xml）</li><li>浏览器 API： XMLHttpRequest、Fetch（xhr的升级版，使用更简洁，支持promise）</li><li>插件/库：jquery、axios</li></ul><h4 id="_3-浏览器存储" tabindex="-1">3）浏览器存储 <a class="header-anchor" href="#_3-浏览器存储" aria-label="Permalink to &quot;3）浏览器存储&quot;">​</a></h4><p><strong>cookie</strong></p><ul><li>用于浏览器和server进行通讯</li><li>document.cookie（不同key追加，同key会覆盖）</li><li>缺点： <ul><li>存储太小，最大4kb；</li><li>http请求时需要发送到服务端，增加请求数据量</li><li>只能用 document.cookie 来修改，太过简陋</li></ul></li></ul><p><strong>localStorage 和 sessionStorage</strong></p><ul><li>HTML5专门为存储而设计，最大可存5M</li><li>API简单易用 setTime getItem</li><li>不会随着 http 请求发送出去</li><li>localStorage 数据会永久存储，除非代码或手动删除</li><li>sessionStorage 数据只存在于当前会话，浏览器关闭则清空</li></ul><p><strong>三者的区别</strong></p><ul><li>容量</li><li>API</li><li>是否跟随http请求发送出去</li></ul><h4 id="_4-http" tabindex="-1">4）HTTP <a class="header-anchor" href="#_4-http" aria-label="Permalink to &quot;4）HTTP&quot;">​</a></h4><p><strong>http 常见的状态码有哪些</strong></p><ul><li>1xx 服务器收到请求</li><li>2xx 请求成功，如200-成功</li><li>3xx 重定向，如301-永久重定向，302-临时重定向 304-资源已被请求过且未被修改</li><li>4xx 客户端错误，如401-Unauthorized当前请求需要用户验证 403 Forbidden 服务器已经收到请求，但拒绝执行，没有权限 404-Not Found 服务器无法根据用户的请求找到资源</li><li>5xx 服务端错误，如500-服务器错误 504-网关超时</li></ul><p><strong>http 常见的header有哪些</strong></p><ul><li>常见的 Request Headers <ul><li>Accept 浏览器可接收的数据格式</li><li>Accept-Encoding 浏览器可接收的压缩算法，如gzip</li><li>Accept-Lan 浏览器可接收的语言，如zh-CH</li><li>Connection: keep-alive 一次TCP链接重复使用</li><li>cookie</li><li>Host</li><li>User-Agent 浏览器信息（简称UA）</li></ul></li><li>常见的 Response Headers <ul><li>Content-Type 返回数据的格式，如 application/json</li><li>Content-length 返回数据的大小，多少字节</li><li>Content-Encoding 返回数据的压缩算法，如gzip</li><li>Set-Cookie</li><li>Cache-Control Expires</li><li>Last-Modified If-Modified-Since</li><li>Etag If-None-Match</li></ul></li></ul><p><strong>什么是 Restful API</strong></p><ul><li><p>①　一种新的API设计方法</p></li><li><p>②　与传统API设计的区别 (背)：传统API设计:把每个url当做一个功能；Restful API 设计: 把每个url当做一个唯一的资源</p></li><li><p>③　如何设计成一个资源?：尽量不用url参数; 用/api/list/2 代替 /api/list?pageIndex=2对应的后端: get(‘/api/list/:pageIndex’)用method表示操作类型 ;post只新建,get只获取,其它methods类推</p></li><li><p>get获取数据</p></li><li><p>post 新建数据</p></li><li><p>patch/put 更新数据</p></li><li><p>delete 删除数据</p></li></ul><h4 id="_5-描述一下-http-的缓存机制-重要" tabindex="-1">5）描述一下 http 的缓存机制（重要） <a class="header-anchor" href="#_5-描述一下-http-的缓存机制-重要" aria-label="Permalink to &quot;5）描述一下 http 的缓存机制（重要）&quot;">​</a></h4><p><a href="https://segmentfault.com/a/1190000015245578" target="_blank" rel="noreferrer">浏览器的强缓存与弱缓存</a></p><blockquote><p>目的：缓存可以减少网络请求的次数和时间</p></blockquote><p><strong>缓存分类</strong></p><ul><li>强缓存（本地缓存）</li><li>弱缓存（协商缓存）</li></ul><p><strong>请求一个静态资源时的HTTP流程</strong></p><ol><li><strong>强缓存阶段</strong>：先在本地查找该资源，如果发现该资源，并且其他限制也没有问题(比如:缓存有效时间)，就命中强缓存，返回200，直接使用强缓存，并且不会发送请求到服务器</li><li><strong>弱缓存阶段</strong>：在本地缓存中找到该资源，发送一个http请求到服务器，服务器判断这个资源没有被改动过，则返回304，让浏览器使用该资源。</li><li><strong>缓存失败阶段(重新请求)</strong>：当服务器发现该资源被修改过，或者在本地没有找到该缓存资源，服务器则返回该资源的数据。</li></ol><p><strong>强缓存</strong></p><blockquote><p>强缓存是利用Expires或者Cache-Control，让原始服务器为文件设置一个过期时间，在多长时间内可以将这些内容视为最新的。</p></blockquote><ol><li><p>初次请求</p></li><li><p>返回资源，和 Cache-Control</p></li><li><p>再次请求</p></li><li><p>返回本地缓存资源</p></li><li><p>Cache-Control（Expire被替代了）</p><ul><li><p>max-age</p></li><li><p>no-cache</p></li><li><p>no-store</p></li><li><p>private</p></li><li><p>public</p></li></ul></li></ol><p><strong>协商缓存</strong></p><p>详细流程：</p><ul><li>客户端第一次向服务器发起请求,服务器将附加Last-Modified/ETag到所提供的资源上去</li><li>当再一次请求资源,如果没有命中强缓存,在执行在验证时,将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。</li><li>服务器检查该Last-Modified或ETag，并判断出该资源页面自上次客户端请求之后还未被修改，返回响应304和一个空的响应体。</li></ul><p>简单流程：</p><ol><li>初次请求</li><li>返回资源，和资源标识（Last-modified / Etag）</li><li>再次请求，带着资源标识（if-Modified-Since / If-None-Match）</li><li>返回304，或返回资源和新的资源标识 Last-Modified 资源的最后修改时间 Etag 资源的唯一表示（一个字符串） 会优先使用 Etag，Last-Modified 只能精确到秒级</li></ol><p>Etag 主要为了解决 Last-Modified 无法解决的一些问题：</p><ul><li>一些文件也许内容并不改变(仅仅改变的修改时间)，这个时候我们不希望文件重新加载。（Etag值会触发缓存，Last-Modified不会触发）</li><li>If-Modified-Since能检查到的粒度是秒级的，当修改非常频繁时，- Last-Modified会触发缓存，而Etag的值不会触发，重新加载。</li><li>某些服务器不能精确的得到文件的最后修改时间。</li></ul><p><strong>强缓存和协商缓存的异同</strong></p><ul><li><strong>获取资源形式相同</strong>：都是从缓存中获取</li><li><strong>状态码不同</strong>：强缓存返回200（from cache）、协商缓存返回304状态码</li><li><strong>是否请求不同</strong>：强缓存不发送请求，直接从缓存中取；协商缓存需发送请求到服务端，验证这个文件是否可使用（未改动过）</li></ul><p><strong>刷新操作方式,对缓存的影响，不同的刷新方式,不同的缓存策略</strong></p><ol><li>正常操作 : 地址栏输入url ,跳转链接,前进后退等; 两种缓存都有效</li><li>手动刷新 : F5 ,点击刷新按钮,右击菜单刷新; 仅协商缓存有效</li><li>强制刷新 : ctrl +f5 cmd + r; 都无效</li></ol><p><strong>缓存设置</strong></p><h4 id="_6-简单请求-vs-非简单请求" tabindex="-1">6）简单请求 vs 非简单请求 <a class="header-anchor" href="#_6-简单请求-vs-非简单请求" aria-label="Permalink to &quot;6）简单请求 vs 非简单请求&quot;">​</a></h4><ol><li><p>请求方法是以下三种方法之一：</p><ul><li><p>HEAD</p></li><li><p>GET</p></li><li><p>POST</p></li></ul></li><li><p>HTTP的头信息不超出以下几种字段：</p><ul><li><p>Accept</p></li><li><p>Accept-Language</p></li><li><p>Content-Language</p></li><li><p>Last-Event-ID</p></li><li><p>Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain</p></li></ul></li></ol><p>非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。</p><h2 id="七、如何保证浏览器安全" tabindex="-1">七、如何保证浏览器安全？ <a class="header-anchor" href="#七、如何保证浏览器安全" aria-label="Permalink to &quot;七、如何保证浏览器安全？&quot;">​</a></h2><h3 id="_1、web页面安全" tabindex="-1">1、Web页面安全 <a class="header-anchor" href="#_1、web页面安全" aria-label="Permalink to &quot;1、Web页面安全&quot;">​</a></h3><h4 id="_1-同源策略-same-origin-policy" tabindex="-1">1）同源策略（Same-origin policy） <a class="header-anchor" href="#_1-同源策略-same-origin-policy" aria-label="Permalink to &quot;1）同源策略（Same-origin policy）&quot;">​</a></h4><blockquote><p>定义：如果两个 URL 的<strong>协议</strong>、<strong>域名</strong>和<strong>端口</strong>都相同，我们就称这两个 URL 同源。</p></blockquote><ul><li>限制： <ul><li>同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作</li><li>同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据</li><li>同源策略限制了通过 XMLHttpRequest Fetch直接进行跨域请求</li></ul></li></ul><h4 id="_2-同源策略后门" tabindex="-1">2）同源策略后门 <a class="header-anchor" href="#_2-同源策略后门" aria-label="Permalink to &quot;2）同源策略后门&quot;">​</a></h4><ul><li>可以任意引用第三方资源（图片、JS、CSS等）</li><li>跨域资源共享CORS（Cross Origin Resource Sharing）</li><li>两个不同源的 DOM 之间进行通信（跨文档消息机制 window.postMessage）</li></ul><h4 id="_3-后门导致的攻击" tabindex="-1">3）后门导致的攻击 <a class="header-anchor" href="#_3-后门导致的攻击" aria-label="Permalink to &quot;3）后门导致的攻击&quot;">​</a></h4><ul><li><p>XSS攻击</p><ul><li><p>定义：XSS 全称是 <strong>Cross Site Scripting</strong>，为了与 CSS 区分开来，故简称 XSS，翻译过来就是“<strong>跨站脚本</strong>”。XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。</p><p>最开始的时候，这种攻击是通过跨域来实现的，所以叫“跨域脚本”。但是发展到现在，往 HTML 文件中注入恶意代码的方式越来越多了，所以是否跨域注入脚本已经不是唯一的注入手段了，但是 XSS 这个名字却一直保留至今。</p></li><li><p>常见的三种XSS攻击模式</p><ul><li><strong>存储型XSS攻击（服务器漏洞）</strong><ul><li>首先黑客利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库中；</li></ul><ul><li><p>然后用户向网站请求包含了恶意 JavaScript 脚本的页面；</p></li><li><p>当用户浏览该页面的时候，恶意脚本就会将用户的 Cookie 信息等数据上传到服务器。</p></li></ul></li><li><strong>反射型XSS攻击（服务器漏洞）</strong><ul><li>我们会发现用户将一段含有恶意代码的请求提交给 Web 服务器，Web 服务器接收到请求时，又将恶意代码反射给了浏览器端，这就是反射型 XSS 攻击。在现实生活中，黑客经常会通过 QQ 群或者邮件等渠道诱导用户去点击这些恶意链接，所以对于一些链接我们一定要慎之又慎。</li></ul><ul><li>另外需要注意的是，<strong>Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方。</strong></li></ul></li><li>基于DOM的XSS攻击 <ul><li>基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。</li></ul></li></ul></li><li><p>被注入恶意脚本的风险和后果</p><ul><li><strong>窃取Cookie信息</strong>：恶意 JavaScript 可以通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器；恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作。</li><li><strong>监听用户行为</strong>：恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。黑客掌握了这些信息之后，又可以做很多违法的事情。</li><li><strong>修改DOM</strong>：可以通过修改 DOM 伪造假的登录窗口，用来欺骗用户输入用户名和密码等信息。</li><li><strong>生成浮窗广告</strong>：还可以在页面内生成浮窗广告，这些广告会严重地影响用户体验。</li></ul></li><li><p>如何阻止</p><ul><li>（后端）服务器对输入的内容进行过滤或者转码： 如将script标签替换成 <code>&amp;ltscript&amp;gt</code></li><li>（后端）使用HttpOnly来保护重要的cookie信息：通常服务器可以将某些 Cookie 设置为 HttpOnly 标志，HttpOnly 是服务器通过 HTTP 响应头来设置的</li><li>（前端）充分利用好CSP，CSP有如下几个功能： <ul><li>限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；</li><li>禁止向第三方域提交数据，这样用户数据也不会外泄；</li><li>禁止执行内联脚本和未授权的脚本；</li><li>还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。</li></ul></li><li>（产品）添加验证码防止脚本冒充用户提交危险操作</li></ul></li></ul></li><li><p>CSRF攻击</p><ul><li><p>**定义：CSRF 英文全称是 Cross-site request forgery，所以又称为“跨站请求伪造”。是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。**和 XSS 不同的是，CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状态来实施攻击</p></li><li><p>攻击方式</p><ul><li>自动发起Get请求（图片）</li><li>自动发起Post请求（Form表单）</li><li>引诱用户点击链接（图片）</li></ul></li><li><p>攻击条件</p><ul><li>目标站点一定要有CSRF漏洞</li><li>用户要登陆过目标站点，并在浏览器上保持有该站点的登陆状态</li><li>需要用户打开一个第三方站点，可以是黑客的站点，也可以是一些论坛</li></ul></li><li><p>如何防止CSRF攻击</p><ul><li><p>Cookie的SameSite属性</p><ul><li>Strict 最为严格。如果 SameSite 的值是 Strict，那么浏览器会完全禁止第三方 Cookie。简言之，如果你从极客时间的页面中访问 InfoQ 的资源，而 InfoQ 的某些 Cookie 设置了 SameSite = Strict 的话，那么这些 Cookie 是不会被发送到 InfoQ 的服务器上的。只有你从 InfoQ 的站点去请求 InfoQ 的资源时，才会带上这些 Cookie。</li></ul><ul><li>Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。而如果使用</li></ul><ul><li>None 的话，在任何情况下都会发送 Cookie 数据。</li></ul></li><li><p>验证请求的来源站</p><ul><li>Referer</li><li>Origin（优先判断）</li></ul></li><li><p>使用CSRF Token：原页面保留服务端生成的字符串Token，以此来区分第三方站点（无此Token）</p></li></ul></li></ul></li></ul><h4 id="_4-浏览器安全机制" tabindex="-1">4）浏览器安全机制 <a class="header-anchor" href="#_4-浏览器安全机制" aria-label="Permalink to &quot;4）浏览器安全机制&quot;">​</a></h4><ul><li>内容安全策略 CSP：核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码。</li><li>HttpOnly</li><li>SameSite和Origin</li></ul><h3 id="_2、浏览器系统安全" tabindex="-1">2、浏览器系统安全 <a class="header-anchor" href="#_2、浏览器系统安全" aria-label="Permalink to &quot;2、浏览器系统安全&quot;">​</a></h3><ul><li>浏览器多进程架构 <ul><li>浏览器内核（浏览器主进程、网络进程、其他进程）</li><li>渲染内核（渲染进程）：使用安全沙箱</li></ul></li><li>安全沙箱机制 <ul><li>**目的是隔离渲染进程和操作系统，让渲染进程没有访问操作系统的权利。**不能防止 XSS 或者 CSRF 一类的攻击，XSS 或者 CSRF 主要是利用网络资源获取用户的信息，这和操作系统没有关系的</li><li><strong>对渲染进程的限制</strong>：持久存储、网络访问、用户交互</li></ul></li><li>站点隔离机制 <ul><li>所谓站点隔离是指 Chrome 将同一站点（包含了相同根域名和相同协议的地址）中相互关联的页面放到同一个渲染进程中执行。</li><li>效果：将恶意的 iframe 隔离在恶意进程内部</li></ul></li></ul><h3 id="_3、浏览器网络安全-https-重要-待完善" tabindex="-1">3、浏览器网络安全 HTTPS（重要，待完善） <a class="header-anchor" href="#_3、浏览器网络安全-https-重要-待完善" aria-label="Permalink to &quot;3、浏览器网络安全 HTTPS（重要，待完善）&quot;">​</a></h3><h2 id="八、未来发展趋势" tabindex="-1">八、未来发展趋势 <a class="header-anchor" href="#八、未来发展趋势" aria-label="Permalink to &quot;八、未来发展趋势&quot;">​</a></h2><h3 id="pwa" tabindex="-1">PWA <a class="header-anchor" href="#pwa" aria-label="Permalink to &quot;PWA&quot;">​</a></h3><blockquote><p>定义：它是一套理念，渐进式增强 Web 的优势，并通过技术手段渐进式缩短和本地应用或者小程序的距离。 基于这套理念之下的技术都可以归类到 PWA。</p></blockquote><p>Web页面缺少什么？</p><ul><li>首先，Web 应用缺少离线使用能力，在离线或者在弱网环境下基本上是无法使用的。而用户需要的是沉浸式的体验，在离线或者弱网环境下能够流畅地使用是用户对一个应用的基本要求。</li><li>其次，Web 应用还缺少了消息推送的能力，因为作为一个 App 厂商，需要有将消息送达到应用的能力。</li><li>最后，Web 应用缺少一级入口，也就是将 Web 应用安装到桌面，在需要的时候直接从桌面打开 Web 应用，而不是每次都需要通过浏览器来打开。</li></ul><p>PWA解决方案：</p><ul><li>离线使用能力（Service Worker）</li><li>消息推送（Service Worker）</li><li>一级入口（manifest.json，可以让开发者自定义桌面的图标、显示名称、启动方式等信息，还可以设置启动画面、页面主题颜色等信息。）</li></ul><h3 id="浏览器worker" tabindex="-1">浏览器Worker <a class="header-anchor" href="#浏览器worker" aria-label="Permalink to &quot;浏览器Worker&quot;">​</a></h3><blockquote><p>概括地说，Web Worker，Service Worker和Worklet都是在与浏览器页面线程不同的线程上运行的脚本。它们的不同之处在于它们的使用位置以及启用这些用例所必须具备的功能。</p></blockquote><ul><li><p><strong>Web Worker</strong>：与浏览器的渲染管道挂钩，使我们能够对浏览器的渲染过程（例如样式和布局）进行低级访问。</p></li><li><p><strong>Service Worker</strong>：是浏览器和网络之间的代理。通过拦截文档发出的请求，service worker可以将请求重定向到缓存，从而实现脱机访问。</p></li><li><p><strong>worklet</strong>：是通用脚本，使我们能够从页面线程上卸载处理器密集型worker。</p></li></ul><h3 id="webassembly" tabindex="-1">WebAssembly <a class="header-anchor" href="#webassembly" aria-label="Permalink to &quot;WebAssembly&quot;">​</a></h3><h3 id="webcomponent" tabindex="-1">WebComponent <a class="header-anchor" href="#webcomponent" aria-label="Permalink to &quot;WebComponent&quot;">​</a></h3><ul><li>提出背景： <ul><li>满足界面组件化需求；</li><li>同时组件需要高内聚、低耦合</li></ul></li><li>API设计 <ul><li>Custom elements 自定义元素</li><li>Shadow DOM 影子DOM <ul><li>每个影子DOM都有一个 shadow root 根节点</li><li>可以看成是一个独立的DOM</li><li>有自己的样式、属性，内部样式不影响外部样式</li><li>影子 DOM 中的元素对于整个网页是不可见的</li><li>影子 DOM 的 CSS 不会影响到整个网页的 CSSOM</li><li>影子 DOM 内部的 CSS 只对内部的元素起作用</li></ul></li><li>HTML templates HTML模板</li></ul></li><li>实现原理 <ul><li>浏览器为了实现影子 DOM 的特性，在代码内部做了<strong>大量的条件判断</strong>，比如当通过 DOM 接口去查找元素时，渲染引擎会去判断 geek-bang 属性下面的 shadow-root 元素是否是影子 DOM，如果是影子 DOM，那么就直接跳过 shadow-root 元素的查询操作。所以这样通过 DOM API 就无法直接查询到影子 DOM 的内部元素了。</li><li>另外，当生成布局树的时候，渲染引擎也会判断 geek-bang 属性下面的 shadow-root 元素是否是影子 DOM，如果是，那么在影子 DOM 内部元素的节点选择 CSS 样式的时候，会直接使用影子 DOM 内部的 CSS 属性。所以这样最终渲染出来的效果就是影子 DOM 内部定义的样式</li></ul></li><li>和Vue/React区别 <ul><li>Web Component是提供原生API-来对css和dom进行隔离</li><li>Vue/React是采用取巧的手法 <ul><li>JS执行上下文的封装利用闭包</li><li>样式的封装利用文件hash值作为命名空间 在CSS选择的时候多套一层选择条件</li><li>本质上还是全局的</li></ul></li></ul></li></ul>`,138)]))}const k=i(o,[["render",s]]);export{d as __pageData,k as default};
