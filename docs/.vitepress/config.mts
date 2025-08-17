import { defineConfig } from 'vitepress'

// 判断是否为生产环境
const isProd = import.meta.env.MODE === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端AK君",
  description: "系统性学习，打造完善的知识体系",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    // ['meta', { name: 'theme-color', content: '#3eaf7c' }],

    // 百度统计代码 - 仅生产环境
    ...(isProd ? [
      [
        'script',
        {},
        [
          'var _hmt = _hmt || [];',
          '(function() {',
          '  var hm = document.createElement("script");',
          '  hm.src = "https://hm.baidu.com/hm.js?fab4383346b3b4bda0abd348f99b9e1c";',
          '  var s = document.getElementsByTagName("script")[0];',
          '  s.parentNode.insertBefore(hm, s);',
          '})();'
        ].join('\n')
      ]
    ] : []) as any
  ],
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: { text: '上次更新' }, // 文档更新时间：每个文件 git 最后提交的时间
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'JS', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'JS进阶',
        items: [
          { text: 'JS进阶系列', link: '/article/前端基础/JS进阶/JS进阶系列' },
          { text: 'JS概览', link: '/article/前端基础/JS进阶/JS概览' },
          { text: 'JS类型', link: '/article/前端基础/JS进阶/JS类型' },
          { text: 'JS原型原型链', link: '/article/前端基础/JS进阶/JS原型原型链' },
          { text: 'JS执行机制', link: '/article/前端基础/JS进阶/JS执行机制' },
          { text: 'JS异步编程', link: '/article/前端基础/JS进阶/JS异步编程' },
          { text: 'JS异步进阶', link: '/article/前端基础/JS进阶/JS异步进阶' },
          { text: 'JS异常处理', link: '/article/前端基础/JS进阶/JS异常处理' },
          { text: 'JS精选题集', link: '/article/前端基础/JS进阶/JS精选题集' },
          { text: 'JS编程', link: '/article/前端基础/JS编程/总览' },
        ],
        collapsed: true,
      },
      {
        text: '前端基础',
        items: [
          { text: 'CSS-float的工作原理和流的破坏与保护', link: '/article/前端基础/CSS/CSS-float的工作原理和流的破坏与保护' },
          { text: '浏览器工作原理系列介绍', link: '/article/前端基础/浏览器/浏览器工作原理系列介绍' },
          { text: '1-发展历史', link: '/article/前端基础/浏览器/浏览器工作原理系列之1-发展历史' },
          { text: '2-页面循环系统', link: '/article/前端基础/浏览器/浏览器工作原理系列之2-页面循环系统' },
          { text: '3-如何从URL到页面显示的', link: '/article/前端基础/浏览器/浏览器工作原理系列之3-如何从URL到页面显示的？' },
          { text: '4-如何进行性能优化', link: '/article/前端基础/浏览器/浏览器工作原理系列之4-如何进行性能优化？' },
          { text: '5-如何与服务器通讯', link: '/article/前端基础/浏览器/浏览器工作原理系列之5-如何与服务器通讯？' },
          { text: '6-如何保证浏览器安全', link: '/article/前端基础/浏览器/浏览器工作原理系列之6-如何保证浏览器安全？' },
          { text: '7-未来发展方向', link: '/article/前端基础/浏览器/浏览器工作原理系列之7-未来发展方向？' },
        ],
        collapsed: true,
      },
      {
        text: '前端框架',
        items: [
          { text: 'Vue系列之1-概览', link: '/article/前端框架/vue/Vue系列之1-概览' },
          { text: 'Vue系列之2-使用', link: '/article/前端框架/vue/Vue系列之2-使用' },
          { text: 'Vue系列之3-周边工具', link: '/article/前端框架/vue/Vue系列之3-周边工具' },
          { text: 'Vue系列之4-原理', link: '/article/前端框架/vue/Vue系列之4-原理' },
          { text: 'Vue系列之5-常见问题', link: '/article/前端框架/vue/Vue系列之5-常见问题' },
          { text: 'Vue系列之6-Vue3', link: '/article/前端框架/vue/Vue系列之6-Vue3' },
          { text: 'React系列之1-概览', link: '/article/前端框架/react/React系列之1-概览' },
          { text: 'React系列之2-使用', link: '/article/前端框架/react/React系列之2-使用' },
          { text: 'React系列之3-周边工具', link: '/article/前端框架/react/React系列之3-周边工具' },
          { text: 'React系列之4-原理', link: '/article/前端框架/react/React系列之4-原理' },
          { text: 'React系列之5-常见问题', link: '/article/前端框架/react/React系列之5-常见问题' },
          { text: 'React系列之6-hooks', link: '/article/前端框架/react/React系列之6-hooks' },
          { text: 'React系列之7-常见面试题', link: '/article/前端框架/react/React系列之7-常见面试题' },
          { text: 'webpack', link: '/article/前端框架/webpack/webpack' },
          { text: 'webpack分享', link: '/article/前端框架/webpack/webpack分享' },
        ],
        collapsed: true,
      },
      {
        text: '数据结构与算法',
        items: [
          { text: '总览', link: '/article/数据结构与算法/总览' }
        ],
        collapsed: true,
      },
      {
        text: '设计模式',
        items: [
          { text: '总览', link: '/article/设计模式/总览' }
        ],
        collapsed: true,
      },
      {
        text: '前端自检',
        items: [
          { text: '总览', link: '/article/前端自检/总览' },
          { text: '【自检】前端知识清单', link: '/article/综合/【自检】前端知识清单' },
          { text: '【自检】前端知识清单（附解答）', link: '/article/综合/【自检】前端知识清单（附解答）' },
        ],
        collapsed: true,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kongyajie/' }
    ],
    footer: {
      message: "MIT Licensed | 沪ICP备20013265号-1 | Copyright © 2019-present AaronKong"
    },
  }
})
