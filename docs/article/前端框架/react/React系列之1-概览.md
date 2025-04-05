# React系列之1-概览

## 前言

2018年接触Vue，到现在已经3年了，中间通过自学、公司项目零零散散地学习了Vue的使用和原理。而使用React则比较晚，到了2021年才真正开始在项目中使用。如今的前端，Vue和React已经是必备的技能，因此有必要回顾和总结，对react有一个系统性的认知。

本文是对 `react` 的系统性总结，主要涵盖以下几个部分：
1. **概览**：涵盖React的诞生背景，它和其他mvvm的区别，以及未来的发展趋势等内容
2. **使用**：涵盖安装、基本使用、组件、高级特性等内容
3. **周边工具**：涵盖react-router路由、redux状态管理
4. **原理**：涵盖三大因素，模板编译、数据响应式、虚拟dom和diff算法
5. **常见问答**：主要是汇总一些常见的react问题和解答
6. **react hooks**：涵盖新特性、原理

希望通过本系列，能帮助你构建起 **react的知识体系** 。

## 概览


那么，react解决了什么问题？
- HTML：从0到1
- CSS：提供装饰
- JavaScript(DOM)：支持页面动态化（例如倒计时）
- jQuery：解决浏览器兼容问题、优雅API（解放前端，造轮子）
- Angular/React/Vue：**数据驱动视图**，让开发者从DOM操作中解放（如倒计时，自加器）

前端三大框架对比 

| 框架 | 发布年份 | 出自 | star数 | 特性 |
| --- | --- | --- | --- | --- |
| Angular | 2010年 | Google | 73.7k | 双向数据绑定 |
| React | 2013年 | Facebook | 169k | VirtualDOM、Redux |
| Vue | 2014年 | 尤雨溪EvanYou | 184k | 更轻量、易于上手、中文文档友好 |

- 框架趋同/互相借鉴
    - **Vue借鉴knockout模板引擎、借鉴Angular双向数据绑定、借鉴React虚拟dom/redux/JSX**
    - 跨端开发（Ionic/ReactNative/Weex）
    - 桌面开发（electron支持vue/react）
    - 总之，你有我有全都有，大家好才是真的好

- 类vue的开发模式（新赛道）：小程序、uniapp
- vue3.0 vs react hooks

## 总结
本章主要介绍了react的诞生背景，和其他mvvm的区别，以及未来的发展趋势等内容。

## 参考资料

