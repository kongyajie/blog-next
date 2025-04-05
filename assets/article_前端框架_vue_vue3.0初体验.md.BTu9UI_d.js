import{_ as i,c as a,o as n,ae as l}from"./chunks/framework.Dh1jimFm.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"article/前端框架/vue/vue3.0初体验.md","filePath":"article/前端框架/vue/vue3.0初体验.md","lastUpdated":1743859882000}'),e={name:"article/前端框架/vue/vue3.0初体验.md"};function t(p,s,h,k,r,E){return n(),a("div",null,s[0]||(s[0]=[l(`<h2 id="vue3-0初体验" tabindex="-1">Vue3.0初体验 <a class="header-anchor" href="#vue3-0初体验" aria-label="Permalink to &quot;Vue3.0初体验&quot;">​</a></h2><h2 id="学习思路" tabindex="-1">学习思路 <a class="header-anchor" href="#学习思路" aria-label="Permalink to &quot;学习思路&quot;">​</a></h2><ul><li>构建大局观：思维导图</li><li>拥抱变化：新特性</li><li>实战中学习：TodoList、我的博客网站</li></ul><h2 id="一、总览" tabindex="-1">一、总览 <a class="header-anchor" href="#一、总览" aria-label="Permalink to &quot;一、总览&quot;">​</a></h2><ul><li>介绍</li><li>应用/组件实例</li><li>模板语法</li><li>Data Property 和方法</li><li>计算属性和侦听器</li><li>Class 和 Style 绑定</li><li>条件渲染</li><li>列表渲染</li><li>事件处理</li><li>表单输入绑定</li><li>组件基础</li></ul><h2 id="二、新特性" tabindex="-1">二、新特性 <a class="header-anchor" href="#二、新特性" aria-label="Permalink to &quot;二、新特性&quot;">​</a></h2><ul><li><p>创建应用：createApp({})</p></li><li><p>组合式API</p><ul><li><p>什么是组合式 API ？</p><blockquote><p>初衷： 将同一个逻辑关注点相关代码收集在一起</p><p>方法：使用 setup</p></blockquote></li><li><p>Setup 组件选项</p><p>新的 <code>setup</code> 选项在组件被创建<strong>之前</strong>执行，一旦 <code>props</code> 被解析完成，它就将被作为组合式 API 的入口。</p><p><code>setup</code> 选项是一个接收 <code>props</code> 和 <code>context</code> 的函数，我们将在<a href="https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0" target="_blank" rel="noreferrer">之后</a>进行讨论。此外，我们将 <code>setup</code> 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。</p><p>因为 <code>setup</code> 是围绕 <code>beforeCreate</code> 和 <code>created</code> 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 <code>setup</code> 函数中编写。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  components: {},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  props: {},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Attribute (非响应式对象，等同于 $attrs)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context.attrs)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 插槽 (非响应式对象，等同于 $slots)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context.slots)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 触发事件 (方法，等同于 $emit)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context.emit)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 暴露公共 property (函数)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context.expose)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // mounted</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    onMounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Component is mounted!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p>带 ref 的响应式变量</p></li><li><p>在 setup 内注册生命周期钩子</p></li><li><p>watch 响应式更改</p></li><li><p>独立的 computed 属性</p></li></ul></li></ul><h2 id="三、实战" tabindex="-1">三、实战 <a class="header-anchor" href="#三、实战" aria-label="Permalink to &quot;三、实战&quot;">​</a></h2><h3 id="_1-启动时-使用了createapp-创建-vue实例" tabindex="-1">1. 启动时，使用了createApp 创建 vue实例 <a class="header-anchor" href="#_1-启动时-使用了createapp-创建-vue实例" aria-label="Permalink to &quot;1. 启动时，使用了createApp 创建 vue实例&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;counter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Counter: {{ counter }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Counter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      counter: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createApp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Counter).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#counter&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>前端Cloud IDE</p><ul><li><strong>CodeSandbox</strong></li><li><a href="https://stackblitz.com/" target="_blank" rel="noreferrer">StackBlitz</a></li><li>Codepen</li><li>Jsfiddle</li><li>Jsbin</li></ul>`,13)]))}const c=i(e,[["render",t]]);export{o as __pageData,c as default};
