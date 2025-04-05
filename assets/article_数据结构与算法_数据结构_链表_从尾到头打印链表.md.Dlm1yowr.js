import{_ as i,c as a,o as n,ae as l}from"./chunks/framework.Dh1jimFm.js";const g=JSON.parse('{"title":"从尾到头打印链表","description":"","frontmatter":{},"headers":[],"relativePath":"article/数据结构与算法/数据结构/链表/从尾到头打印链表.md","filePath":"article/数据结构与算法/数据结构/链表/从尾到头打印链表.md","lastUpdated":1743859882000}'),h={name:"article/数据结构与算法/数据结构/链表/从尾到头打印链表.md"};function p(t,s,k,e,r,d){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="从尾到头打印链表" tabindex="-1">从尾到头打印链表 <a class="header-anchor" href="#从尾到头打印链表" aria-label="Permalink to &quot;从尾到头打印链表&quot;">​</a></h1><h2 id="一、题目描述" tabindex="-1">一、题目描述 <a class="header-anchor" href="#一、题目描述" aria-label="Permalink to &quot;一、题目描述&quot;">​</a></h2><blockquote><p>输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。</p></blockquote><blockquote><p>示例 1： 输入：head = [1,3,2] 输出：[2,3,1]</p></blockquote><h2 id="二、解题思路" tabindex="-1">二、解题思路 <a class="header-anchor" href="#二、解题思路" aria-label="Permalink to &quot;二、解题思路&quot;">​</a></h2><p>1、辅助栈法</p><blockquote><p>链表特点： 只能从前至后访问每个节点。 题目要求： 倒序输出节点值。 这种 先入后出 的需求可以借助 栈 来实现。</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reversePrint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(head) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        result.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unshift</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(head.val);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        head </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> head.next;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>复杂度分析：</p><ul><li>时间复杂度：O(n)</li><li>空间复杂度：O(n)</li></ul><p>2、递归法</p><blockquote><p>利用递归： 先走至链表末端，回溯时依次将节点值加入列表 ，这样就可以实现链表值的倒序输出。</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reversePrint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> head </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reversePrint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(head.next).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">concat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(head.val);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>复杂度分析：</p><ul><li>时间复杂度 O(N)： 遍历链表，递归 N 次。</li><li>空间复杂度 O(N)： 系统递归需要使用 O(N) 的栈空间。</li></ul><p>3、双指针（反转链表）</p><ul><li>定义两个指针： pre 和 cur ；pre 在前 cur 在后。</li><li>每次让 pre 的 next 指向 cur ，实现一次局部反转</li><li>局部反转完成之后， pre 和 cur 同时往前移动一个位置</li><li>循环上述过程，直至 pre 到达链表尾部</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {ListNode}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> head</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {ListNode}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reverseList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pre </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> head;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (curr) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tmpNext </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curr.next; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1.临时保存下一个节点指针</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        curr.next </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pre;         </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2.反转当前节点指向</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        pre </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curr;              </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3.pre指针右移</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        curr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tmpNext;          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 4. curr指针右移</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pre;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>二、简洁的递归</p><p>-<a href="https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/" target="_blank" rel="noreferrer">leetcode</a></p>`,20)]))}const c=i(h,[["render",p]]);export{g as __pageData,c as default};
