# Webpack分享

## 前言

>  演示： 猎萝卜项目打包后效果

**提出问题 —— 中间发生了什么？**

- 代码压缩、语法转换、模块合并等。

**为什么要了解webpack？**

- 了解现代webapp的代码构成
- 了解 cli 内部的机制
- 了解如何手动配置一个项目

**主题：**

1. Webpack产生的背景，以及webpack要解决什么问题？

2. Webpack的基本概念、配置、优化、原理

3. 对比纯 Webpack vs Vue-cli

## 一、前端发展历史

> 近年来 Web 应用变得更加复杂与庞大，Web 前端技术的应用范围也更加广泛。 从复杂庞大的管理后台到对性能要求苛刻的移动网页，再到类似 ReactNative 的原生应用开发方案，Web 前端工程师在面临更多机遇的同时也会面临更大的挑战。 通过直接编写 **JavaScript、CSS、HTML** 开发 Web 应用的方式已经无法应对当前 Web 应用的发展。近年来前端社区涌现出许多新思想与框架

### 模块化

>  **模块化**是指把一个复杂的系统分解到多个模块以方便编码。

- 命名空间（window.$，但容易冲突，加载顺序无法控制）
- IIFE（立即执行函数表达式，防止变量污染，`(function(){})()`）

- CommonJs（nodeJs采用，支持同步加载依赖，`module.exports / require`）

- AMD（requireJs实现，支持异加载依赖，适合浏览器 `define / require`）

- **ES Module** （ES6标准，无需引入任何库，终极方案，缺点是目前运行环境支持度不高，`import/export`）
- Less/Sass/Scss（样式模块化，`import` 文件依赖，`mixin @include` 代码块复用）

### 新框架

> MVVM框架，数据驱动的开发模式

- React `render(true ? <h1>hello,react</h1> : <div>404</div>);`
- Vue `<h1>{{title}}</h1>`
- Angular

### 新语言

- ES6/7/8/9/10/11（`Async/Await` 、装饰器）
- Flow/TypeScript（静态类型检查）
- Less/Sass/Scss（嵌套、模块化）

## 二、前端构建工具

前端技术发展之快，各种可以提高开发效率的新思想和框架被发明。但是这些东西都有一个共同点：

> **源代码无法直接运行，必须通过转换后才可以正常运行**。

**构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码**，包括如下内容：

- **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- **文件优化**：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- **模块合并**：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- **代码校验**：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- **自动刷新**：监听本地源代码的变化，自动重新构建、刷新浏览器。
- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统。

**构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程**。 构建给前端开发注入了更大的活力，解放了我们的生产力。

历史上先后出现一系列构建工具，它们各有其优缺点。**由于前端工程师很熟悉 JavaScript ，Node.js 又可以胜任所有构建需求，所以大多数构建工具都是用 Node.js 开发的**。

### 构建工具

- Npm Script（运行shell脚本）
- Grunt（进化版 Npm Script，插件+任务的模式，但集成度不高，要写很多配置后才可以用，无法开箱即用）

- Gulp（进化版 Grunt，新增流式处理的功能，缺点同Grunt）

- Fis3（进化版 Gulp，开箱即用的集成式解决方案，**高度集成的工具箱**，缺点是官方已经不再更新维护）
- Parcel（开箱即用，但社区不完善，仅限于 web 开发）

- **Webpack** （2012年发布，一些文件皆模块，通过 loader 转换文件，通过 plugin 注入钩子，最后输出结果）
  - **开箱即用**，可通过 Plugin **扩展**，完整好用又不失灵活；
  - **社区庞大活跃**，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
  - 使用场景不仅限于 Web 开发（开发类库、node.js应用、Electron应用）
  - 缺点：打包速度较慢、打包体积较大

- **Rollup**（引入 tree-shaking ，打包体积更小，适合打包类库）

- **Vite**（ webpack + rollup + **解决构建速度问题**，下一代前端开发与构建工具）
  - 打包原生ESM源码
  - 使用 ESBuilder（go编写）
  - 浏览器协商缓存



## 三、Webpack

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%A1%86%E6%9E%B6/webpack%E6%A6%82%E8%A7%88%E5%9B%BE.png)

### 核心概念（重要）

> [webpack](https://webpack.docschina.org/) 中，一切皆模块。

- entry（入口，构建任务的起点）

- output（输出，在哪里输出创建的 *bundle*，以及如何命名这些文件）

- loader（处理不同类型的文件，如图片、样式文件，并将它们转换为有效的模块）

- plugin（插件，用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量）
- mode（模式，development 、production，启动相应的内置优化行为）

### 实战

- 见 webpack demo 演示

### 优化（重要）

#### 1、优化产出代码

- 使用生产环境（自带：代码压缩、删除Vue/React的warning、Tree-shaking）
- 小图片 base64编码（减少http请求）
- bundle 加 hash （利用缓存）
- 提取公共代码（拆包 splitchunks）（利用缓存）
- 懒加载（import (xxx.js) => {}）（利用缓存）

#### 2、优化构建速度

- 设置 include/exclude，减少打包范围
- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin
- DllPlugin

### 原理（重要）

- Webpack 内部原理
  - 核心概念：
    - 配置 entry、output、loader、plugin
    - 效果 module => chunk => bundle
  - 打包流程：
    - 初始化阶段：启动构建，读取和合并配置参数，加载Plugin，实例化Compiler
    - 编译阶段：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
    - 输出阶段：对编译后的 Module 组合成 Chunk ，把 Chunk 转换成文件，输出到文件系统

- loader 实现原理
  - 演示：自定义 loader

- plugin 实现原理
  - 演示：自定义 plugin

- Webpack调试
    - `node --inspect-brk ./node_modules/webpack/bin/webpack.js`
    - 打开 Chrome 浏览器，地址栏里输入 `chrome://inspect/#devices`

- HMR（模块热替换）实现原理
    1. 本地 DevServer启动
    2. 往网页中注入一个代理客户端 `node_modules/webpack-dev-server/client/index.js`，用于连接 DevServer 和 网页，使用Websocket进行通讯
    3. 当监听到文件修改时，发送ws消息给网页代理客户端，触发更新

- SourceMap 实现原理（Chrome开发者工具可设置开启关闭） 
    - 配置：
      - eval：JS 在 eval(...) 中，不生成 sourcemap
      - source-map：生成单独的 map 文件，并在 JS 最后指定
      - eval-source-map：JS在  eval(...) 中，sourcemap内嵌
      - inline-source-map：sourcemap 内嵌到 JS 中
      - cheap-source-map：sourcemap 中只有行信息，没有列信息
      - eval-cheap-source-map：同上，没有独立的 map 文件
    - 建议：
      - 开发环境：eval（速度快）
      - 生产环境：source-map（开源） / false（非开源）
    - [深入浅出之 Source Map](https://juejin.cn/post/7023537118454480904)

- hash设置

    > 如果使用了hash，并不是每次都会重新生成新的hash，需要看具体使用的哪种hash策略。

    - `hash`是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值。（粒度整个项目）
    - `chunkhash` 是根据不同的入口进行依赖文件解析，构建对应的chunk（模块），生成对应的hash值。只有被修改的chunk（模块）在重新构建之后才会生成新的hash值，不会影响其他的chunk。（粒度entry的每个入口文件）。
    - `contenthash`是跟每个生成的文件有关，每个文件都有一个唯一的hash值。当要构建的文件内容发生改变时，就会生成新的hash值，且该文件的改变并不会影响和它同一个模块下的其他文件。（粒度每个文件的内容）。

### 常见 loader（重要）

- babel-loader（处理js/jsx）
- less-loader/css-loader/style-loader（处理样式）
- url-loader（处理图片）
- vue-loader（处理vue）
- ts-loader（处理ts）

### 常见 plugin（重要）

- **HtmlWebpackPlugin** 生成 html 文件
- **CleanWebpackPlugin** 清理 dist 目录
- **DefinePlugin** 我们可以通过 DefinePlugin 定义一些全局的变量，我们可以在模块当中直接使用这些变量，无需作任何声明，DefinePlugin 是 webpack 自带的插件。
- **ProvidePlugin** 自动加载模块。 任何时候，当 identifier 被当作未赋值的变量时， module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值。这是 webpack 自带的插件。
- **MiniCssExtractPlugin**
- uglifyJsPlugin 是 vue-cli 默认使用的压缩代码方式，用来对 js 文件进行压缩，从而减小 js 文件的大小，加速 load 速度
- **ParallelUglifyPlugin** 开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。
- terser-webpack-plugin
- **HappyPack** 能让 webpack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
- copy-webpack-plugin 我们在 public/index.html 中引入了静态资源，但是打包的时候 webpack 并不会帮我们拷贝到 dist 目录，因此 copy-webpack-plugin 就可以很好地帮我做拷贝的工作了。
- IgnorePlugin 这是 webpack 内置插件，它的作用是：忽略第三方包指定目录，让这些指定目录不要被打包进去。

## 四、纯 webpack vs vue-cli

- TodoList项目

## 五、项目脚手架（待定）

> 每次新建项目都要配置一次，很麻烦，如何复用？ —— 项目脚手架工具（项目模板 + 各种配置）

- 类库项目

- Vue项目

- React项目

- Angular项目

- Remix项目脚手架

## 总结

- 前端发展历史：模块化、新框架、新语言
- 前端构建工具：npm script、grunt、gulp 、fis3、webpack、rollup、vite
- Webpack核心概念：entry output loader plugin mode ，基础配置演示
- Webpack实战： 纯webpack/vue-cli配置TodoList项目

## 参考资料

[webpack官网](https://webpack.docschina.org/)