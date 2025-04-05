import{_ as e,c as i,o as l,ae as t}from"./chunks/framework.Dh1jimFm.js";const u=JSON.parse('{"title":"浏览器工作原理系列之1-发展历史","description":"","frontmatter":{},"headers":[],"relativePath":"article/前端基础/浏览器/浏览器工作原理系列之1-发展历史.md","filePath":"article/前端基础/浏览器/浏览器工作原理系列之1-发展历史.md","lastUpdated":1743859882000}'),r={name:"article/前端基础/浏览器/浏览器工作原理系列之1-发展历史.md"};function o(p,a,c,s,n,h){return l(),i("div",null,a[0]||(a[0]=[t('<h1 id="浏览器工作原理系列之1-发展历史" tabindex="-1">浏览器工作原理系列之1-发展历史 <a class="header-anchor" href="#浏览器工作原理系列之1-发展历史" aria-label="Permalink to &quot;浏览器工作原理系列之1-发展历史&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>本文分为一下几个部分：</p><ul><li>浏览器的发展历程</li><li>浏览器之间的差异</li><li>浏览器进程架构演化</li></ul><h2 id="一、浏览器的发展历程" tabindex="-1">一、浏览器的发展历程 <a class="header-anchor" href="#一、浏览器的发展历程" aria-label="Permalink to &quot;一、浏览器的发展历程&quot;">​</a></h2><h3 id="_1990年-the-worldwideweb-browser-nexus平台" tabindex="-1">1990年 The WorldWideWeb browser（Nexus平台） <a class="header-anchor" href="#_1990年-the-worldwideweb-browser-nexus平台" aria-label="Permalink to &quot;1990年 The WorldWideWeb browser（Nexus平台）&quot;">​</a></h3><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a215ecb44834f35a5bd39c404328cb0~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>Tim Berners Lee 使⽤Objective-C在NeXT上开发</li><li>世界第⼀款⽹⻚浏览器</li><li>双击链接跳转、所⻅即所得⽹⻚编辑器、⾃定义style</li><li>模拟器：<a href="https://worldwideweb.cern.ch/browser/" target="_blank" rel="noreferrer">https://worldwideweb.cern.ch/browser/</a></li></ul><h3 id="_1993年-ncsa-mosaic" tabindex="-1">1993年 NCSA Mosaic <a class="header-anchor" href="#_1993年-ncsa-mosaic" aria-label="Permalink to &quot;1993年 NCSA Mosaic&quot;">​</a></h3><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8af31e058144414942d4d6122d61845~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>马克·安德森在伊利诺大学的NCSA组织开发 （NCSA：国家超级电脑应用中心）</li><li>Mosaic名字由来：镶嵌图案</li><li>第一个可以在文字中嵌入图片，而不是在单独的窗口中显示图片的浏览器</li><li>引发1990年代互联网泡沫的网页浏览器</li></ul><h3 id="_1994年-netscape-navigator" tabindex="-1">1994年 Netscape Navigator <a class="header-anchor" href="#_1994年-netscape-navigator" aria-label="Permalink to &quot;1994年 Netscape Navigator&quot;">​</a></h3><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4a4ca9611bc4ba5b70994227d16a884~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>马克·安德森离开NCSA后创立 Netscape 公司</li><li>软件最初以 Mozilla（Mosaic Killer） 名称公开，后因市场取向更名为 NetScape</li><li>添加JavaScript、Gif动画等独有功能，在1996年70%市占率；</li><li>第一次浏览器大战输给了IE，2006年年底，不到1%，为第二次浏览器大战埋下伏笔。</li></ul><h3 id="_1995年-microsoft-internet-explorer" tabindex="-1">1995年 Microsoft Internet Explorer <a class="header-anchor" href="#_1995年-microsoft-internet-explorer" aria-label="Permalink to &quot;1995年 Microsoft Internet Explorer&quot;">​</a></h3><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b17405114da845a2a63f452d853de40d~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>微软基于 Spyglass Mosaic 重新设计而出 IE1.0</li><li>首个支持CSS技术的主流浏览器。它引进ActiveX控件、Java Applet</li><li>1995年，内置在各个新版本的Windows操作系统</li><li>2003年，达到95%使用率</li><li>2020年，微软宣布将于11月底前将陆续停止支持Internet Explorer</li></ul><h3 id="_1996年-opera" tabindex="-1">1996年 Opera <a class="header-anchor" href="#_1996年-opera" aria-label="Permalink to &quot;1996年 Opera&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2db027905f2f4926b2d9a5d1f158ec42~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>挪威软件公司</li><li>个性化：鼠标手势、键盘快捷键</li><li>定制化：自定义菜单、工具栏</li><li>实用功能：免费VPN（导致被禁）</li><li>美国网络安全公司Purewire数据显示有26%的黑客使用Opera</li><li>2013年，被中国财团和360收购</li></ul><h3 id="_2003年-apple-safari" tabindex="-1">2003年，Apple Safari <a class="header-anchor" href="#_2003年-apple-safari" aria-label="Permalink to &quot;2003年，Apple Safari&quot;">​</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d012467c7e774334b2a714b09c35a202~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>safari在斯瓦希里语为旅行，字源来自阿拉伯语同意词 سفرة （safra）</li><li>NetScape-&gt;IE-&gt;Safari</li><li>Apple产品的默认浏览器</li></ul><h3 id="_2004年-mozilla-firefox" tabindex="-1">2004年 Mozilla Firefox <a class="header-anchor" href="#_2004年-mozilla-firefox" aria-label="Permalink to &quot;2004年 Mozilla Firefox&quot;">​</a></h3><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b15c7c32ef3c4cdb80d38b6906f00fe7~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>开源浏览器，由Mozilla基金会及其子公司Mozilla公司开发</li><li>独立于 Mozilla Application Suite 开发的浏览器</li><li>MDN（Mozilla Developer Network）</li><li>Phoenix -&gt; Mozilla Firefox</li></ul><h3 id="_2008年-google-chrome" tabindex="-1">2008年 Google Chrome <a class="header-anchor" href="#_2008年-google-chrome" aria-label="Permalink to &quot;2008年 Google Chrome&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e196b80503de404fa99b000717b9b950~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>是化学元素”铬“的英文名称</li><li>提升稳定性、速度和安全性 <ul><li>多进程架构</li><li>自动更新</li><li>黑名单、沙箱</li><li>基于WebKit 自研了 Blink</li><li>开发出V8高性能JS引擎</li></ul></li></ul><h3 id="_2015年-microsoft-edge" tabindex="-1">2015年 Microsoft Edge <a class="header-anchor" href="#_2015年-microsoft-edge" aria-label="Permalink to &quot;2015年 Microsoft Edge&quot;">​</a></h3><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c0713d56caf4a7a87463c6ca9ce0559~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>EdgeHTML版Edge浏览器</li><li>后改为基于Chromium开发</li><li>第三次浏览器大战？</li></ul><h3 id="_2016年-vivaldi" tabindex="-1">2016年 Vivaldi <a class="header-anchor" href="#_2016年-vivaldi" aria-label="Permalink to &quot;2016年 Vivaldi&quot;">​</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a5844487b75454292f40f811ee5c863~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>原Opera创始人创办</li><li>有不少专属功能</li><li>高端技术专家、重度的互联网用户为主</li></ul><h3 id="浏览器市场份额" tabindex="-1">浏览器市场份额 <a class="header-anchor" href="#浏览器市场份额" aria-label="Permalink to &quot;浏览器市场份额&quot;">​</a></h3><p><a href="https://gs.statcounter.com/browser-market-share" target="_blank" rel="noreferrer">https://gs.statcounter.com/browser-market-share</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/923da9e55bce45fba2c7c19da2d3f59a~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50061a40b2a241cd92d55a5ba32f3b46~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><h2 id="二、浏览器的差异在哪里" tabindex="-1">二、浏览器的差异在哪里？ <a class="header-anchor" href="#二、浏览器的差异在哪里" aria-label="Permalink to &quot;二、浏览器的差异在哪里？&quot;">​</a></h2><h3 id="排版-渲染引擎" tabindex="-1">排版/渲染引擎 <a class="header-anchor" href="#排版-渲染引擎" aria-label="Permalink to &quot;排版/渲染引擎&quot;">​</a></h3><blockquote><p>负责将标记内容、样式信息排版后输出至显示器或打印机</p></blockquote><ul><li>Chrome：Blink</li><li>Safari：Webkit</li><li>Mozilla：Gecko</li><li>Internet Explorer：Trident</li><li>Microsoft Edge：EdgeHTML</li><li>QQ浏览器：Trident、Blink</li><li>世界之窗：Trident</li><li>搜狗浏览器：Trident，Blink</li></ul><h3 id="js引擎" tabindex="-1">JS引擎 <a class="header-anchor" href="#js引擎" aria-label="Permalink to &quot;JS引擎&quot;">​</a></h3><ul><li>Rhino，由Mozilla基金会管理，开放源代码，完全以Java编写。</li><li>SpiderMonkey，第一款JavaScript引擎，早期用于Netscape Navigator，现时用于Mozilla Firefox。</li><li>V8，开放源代码，由Google丹麦开发，是Google Chrome的一部分。</li><li>JavaScriptCore，开放源代码，用于Safari。</li><li>Chakra (JScript引擎)，用于Internet Explorer。</li><li>Chakra (JavaScript引擎)，用于Microsoft Edge。</li></ul><h3 id="浏览器user-agent" tabindex="-1">浏览器User-Agent <a class="header-anchor" href="#浏览器user-agent" aria-label="Permalink to &quot;浏览器User-Agent&quot;">​</a></h3><blockquote><p>首部包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>User-Agent: Mozilla/&lt;version&gt; (&lt;system-information&gt;) &lt;platform&gt; (&lt;platform-details&gt;) &lt;extensions&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f40d6c717dc4f63984bf3428bedc68b~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><p><strong>一点历史</strong>：</p><ol><li>Netscape Navigator2.0 支持GIF，而Mosaic不支持，因此引入UA标识，告诉服务器有Mozilla标识时才发送GIF；</li><li>IE出版，也支持GIF了，但是UA上没有Mozilla标识，于是微软也在UA上加上了Mozilla标识；</li><li>Netscape在第一次浏览器大站中输给了IE，接着以MozillaFirefox重生，搞出了Gecko引擎，并在UA上加上了Gecko，Gecko开源后有许多其他浏览器基于它的代码二次开发，因此也都在UA上加上了Gecko。每一个都假装自己是Mozilla，每一个都使用了Gecko的代码。</li><li>接着一帮搞Linux的人弄了个浏览器Konqueror，引擎叫KHTML，他们觉得KHTML和Gecko一样好，于是在UA上加上了（KTHML，like Gecko）</li><li>Apple弄出了Safari，已KTHML为基础打造出Webkit，然后叫 AppleWebKit（KHTML，like Gecko）</li><li>Google又基于Webkit搞出了Chrome，因此它为了伪装成safari，webkit伪装成KTHML，KHTML伪装成Gecko，最后所有的浏览器都伪装成 Mozilla。</li></ol><h2 id="三、浏览器进程架构演化" tabindex="-1">三、浏览器进程架构演化 <a class="header-anchor" href="#三、浏览器进程架构演化" aria-label="Permalink to &quot;三、浏览器进程架构演化&quot;">​</a></h2><h3 id="单进程" tabindex="-1">单进程 <a class="header-anchor" href="#单进程" aria-label="Permalink to &quot;单进程&quot;">​</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c3a06c2c9654d71b805e5ce4b64a960~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><ul><li>特点：所有页面都运行在一个主进程中</li><li>IE6：单标签，一个页面一个窗口</li><li>缺点：不稳定、不流畅、不安全</li></ul><p>不稳定：早期浏览器需要借助于插件来实现诸如 Web 视频、Web 游戏等各种强大的功能，但是插件是最容易出问题的模块，并且还运行在浏览器进程之中，所以一个插件的意外崩溃会引起整个浏览器的崩溃。</p><p>不流畅：所有页面的渲染模块、JavaScript 执行环境以及插件都是运行在同一个线程中的，这就意味着同一时刻只能有一个模块可以执行，死循环或内存泄漏</p><p>不安全：通过插件可以获取到操作系统的任意资源，当你在页面运行一个插件时也就意味着这个插件能完全操作你的电脑。如果是个恶意插件，那么它就可以释放病毒、窃取你的账号密码，引发安全性问题。至于页面脚本，它可以通过浏览器的漏洞来获取系统权限，这些脚本获取系统权限之后也可以对你的电脑做一些恶意的事情，同样也会引发安全问题</p><p>这是一段不堪回首的过去，也许你没有经历过，不过你可以想象一下这样的场景：当你正在用浏览器打开多个页面时，突然某个页面崩溃了或者失去响应，随之而来的是整个浏览器的崩溃或者无响应，然后你发现你给老板写的邮件页面也随之消失了，这时你的心情会不会和页面一样崩溃呢？</p><h3 id="多进程" tabindex="-1">多进程 <a class="header-anchor" href="#多进程" aria-label="Permalink to &quot;多进程&quot;">​</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808706cfde874b76aabb93bc27948f40~tplv-k3u1fbpfcp-watermark.image" alt="image.png"></p><p>结构：</p><ul><li>1个浏览器主进程：负责界面显示、用户交互、子进程管理，同时提供存储等功能</li><li>1个GPU进程：最初是为了实现3D CSS的效果，后来网页和浏览器UI界面也采用GPU绘制</li><li>1个网络进程：负责页面的网络资源加载</li><li>多个渲染进程：将HTML、CSS、JavaScript转换为用户可以与之交互的网页</li><li>多个插件进程：负责插件的运行</li></ul><p>优点：</p><ul><li>稳定性：进程间相互隔离</li><li>流畅性：JS只影响当前的渲染进程；关闭页面，进程所占用的内存会被系统回收</li><li>安全性：安全沙箱</li></ul><p>由于进程是相互隔离的，所以当一个页面或者插件崩溃时，影响到的仅仅是当前的页面进程或者插件进程，并不会影响到浏览器和其他页面，这就完美地解决了页面或者插件的崩溃会导致整个浏览器崩溃，也就是不稳定的问题。</p><p>JavaScript 也是运行在渲染进程中的，所以即使 JavaScript 阻塞了渲染进程，影响到的也只是当前的渲染页面，而并不会影响浏览器和其他页面，因为其他页面的脚本是运行在它们自己的渲染进程中的。所以当我们再在 Chrome 中运行上面那个死循环的脚本时，没有响应的仅仅是当前的页面。对于内存泄漏的解决方法那就更简单了，因为当关闭一个页面时，整个渲染进程也会被关闭，之后该进程所占用的内存都会被系统回收，这样就轻松解决了浏览器页面的内存泄漏问题。</p><p>采用多进程架构的额外好处是可以使用安全沙箱，你可以把沙箱看成是操作系统给进程上了一把锁，沙箱里面的程序可以运行，但是不能在你的硬盘上写入任何数据，也不能在敏感位置读取任何数据，例如你的文档和桌面。Chrome 把插件进程和渲染进程锁在沙箱里面，这样即使在渲染进程或者插件进程里面执行了恶意程序，恶意程序也无法突破沙箱去获取系统权限。</p><p>缺点</p><ul><li>更高的资源占用、更复杂的体系架构</li></ul><h3 id="未来面向服务的架构" tabindex="-1">未来面向服务的架构 <a class="header-anchor" href="#未来面向服务的架构" aria-label="Permalink to &quot;未来面向服务的架构&quot;">​</a></h3><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b61de3c3685042aeb8a89ec621fe3270~tplv-k3u1fbpfcp-watermark.image" alt="image.png"> -（Services Oriented Architecture，简称 SOA）进程</p><ul><li>最终要把 UI、数据库、文件、设备、网络等模块重构为基础服务，类似操作系统底层服务</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2>',75)]))}const m=e(r,[["render",o]]);export{u as __pageData,m as default};
