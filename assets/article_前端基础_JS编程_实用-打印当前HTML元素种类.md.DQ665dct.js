import{_ as i,c as a,o as t,ae as n}from"./chunks/framework.Dh1jimFm.js";const g=JSON.parse('{"title":"实用-打印当前HTML元素种类","description":"","frontmatter":{},"headers":[],"relativePath":"article/前端基础/JS编程/实用-打印当前HTML元素种类.md","filePath":"article/前端基础/JS编程/实用-打印当前HTML元素种类.md","lastUpdated":1743859882000}'),h={name:"article/前端基础/JS编程/实用-打印当前HTML元素种类.md"};function e(l,s,p,k,r,d){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="实用-打印当前html元素种类" tabindex="-1">实用-打印当前HTML元素种类 <a class="header-anchor" href="#实用-打印当前html元素种类" aria-label="Permalink to &quot;实用-打印当前HTML元素种类&quot;">​</a></h1><p>一行代码可以解决：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelectorAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> el.tagName))].</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>值得注意的是：DOM操作返回的是类数组，需要转换为数组之后才可以调用数组的方法。</p>`,4)]))}const o=i(h,[["render",e]]);export{g as __pageData,o as default};
