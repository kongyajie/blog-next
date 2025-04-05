import{_ as a,c as s,o as i,ae as t}from"./chunks/framework.Dh1jimFm.js";const k=JSON.parse('{"title":"经验总结-Web获取元素大小与各种宽高距离总结","description":"","frontmatter":{},"headers":[],"relativePath":"article/碎片知识/经验总结-获取元素大小.md","filePath":"article/碎片知识/经验总结-获取元素大小.md","lastUpdated":1743859882000}'),l={name:"article/碎片知识/经验总结-获取元素大小.md"};function n(h,e,o,d,c,p){return i(),s("div",null,e[0]||(e[0]=[t(`<h1 id="经验总结-web获取元素大小与各种宽高距离总结" tabindex="-1">经验总结-Web获取元素大小与各种宽高距离总结 <a class="header-anchor" href="#经验总结-web获取元素大小与各种宽高距离总结" aria-label="Permalink to &quot;经验总结-Web获取元素大小与各种宽高距离总结&quot;">​</a></h1><h2 id="_1、获取元素自身大小、滚动位移" tabindex="-1">1、获取元素自身大小、滚动位移 <a class="header-anchor" href="#_1、获取元素自身大小、滚动位移" aria-label="Permalink to &quot;1、获取元素自身大小、滚动位移&quot;">​</a></h2><p><code>DOM API</code> 支持获取元素自身的各种宽高大小，滚动位移等，每个属性都有其使用场景，根据需要获取即可：</p><ul><li><code>clientWidth/clientHeight</code>：元素内容的可视部分，不包含边框、滚动条，但是包含内边距</li><li><code>offsetWidth/offsetHeight</code>：元素盒子的可视部分，包含宽高、内边距、边框</li><li><code>scrollWidth/scrollHeight</code>：滚动宽高，包含盒子的所有内容，包括隐藏的滚动区域</li></ul><h2 id="_2、获取网页的宽高" tabindex="-1">2、获取网页的宽高 <a class="header-anchor" href="#_2、获取网页的宽高" aria-label="Permalink to &quot;2、获取网页的宽高&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getPagearea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      width: Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(document.documentElement.scrollWidth,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             document.documentElement.clientWidth),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      height: Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(document.documentElement.scrollHeight,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              document.documentElement.clientHeight)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="_3、获取元素距离顶部距离" tabindex="-1">3、获取元素距离顶部距离 <a class="header-anchor" href="#_3、获取元素距离顶部距离" aria-label="Permalink to &quot;3、获取元素距离顶部距离&quot;">​</a></h2><p>获取元素距离顶部距离：</p><p>方法一：<code>offsetParent.offsetTop</code> 方法二：<code>getBoundingClientRect</code> 方法返回元素的大小及其相对于视口的位置。</p><h2 id="_4、获取元素内部滚动位移" tabindex="-1">4、获取元素内部滚动位移 <a class="header-anchor" href="#_4、获取元素内部滚动位移" aria-label="Permalink to &quot;4、获取元素内部滚动位移&quot;">​</a></h2><p>内容超过元素最大宽度/高度时，使用下面的属性获取：</p><ul><li><code>scrollTop</code></li><li><code>scrollLeft</code></li></ul><blockquote><p><code>document.documentElement</code> 也同样拥有上面的这些属性，如获取当前页面的滚动位移：</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取当前页面垂直滚动条位移（兼容性写法）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.documentElement.scrollTop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.body.scrollTop</span></span></code></pre></div><h2 id="_5、获取鼠标到元素、视口、文档、屏幕距离" tabindex="-1">5、获取鼠标到元素、视口、文档、屏幕距离 <a class="header-anchor" href="#_5、获取鼠标到元素、视口、文档、屏幕距离" aria-label="Permalink to &quot;5、获取鼠标到元素、视口、文档、屏幕距离&quot;">​</a></h2><p>这种主要是读取event对象中的值：</p><ul><li><code>ev.offsetX</code> 到元素距离</li><li><code>ev.clientX</code> 到视口距离</li><li><code>ev.pageX</code> 到文档距离，包含滚动距离</li><li><code>ev.screenX</code> 到屏幕距离</li></ul><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844903846636961806" target="_blank" rel="noreferrer">元素大小与获取各种高度 宽度 距离总结</a></p><p><a href="https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively" target="_blank" rel="noreferrer">Understanding offsetWidth, clientWidth, scrollWidth and -Height, respectively</a></p>`,20)]))}const E=a(l,[["render",n]]);export{k as __pageData,E as default};
