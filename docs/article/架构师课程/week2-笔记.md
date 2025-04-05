[TOC]
# Week2 脚手架架构设计和框架搭建

[前端架构师-电子书](https://www.imooc.com/wiki/weban/week1a.html)

## 本周导学

### 将收获什么
- 脚手架的实现原理
- Lerna的常见用法
- 架构设计技巧和架构图绘制方法

### 主要内容
- 学习如何以架构师的角度思考基础架构问题
- 多Package项目管理痛点和解决方案，基于Lerna脚手架框架搭建
- imooc-cli脚手架需求分析和架构设计、架构设计图

### 附赠内容
- 脚手架调试技巧
- Lerna源码分析（Node的module模块分析、yargs使用方法、剖析Lerna架构设计）

### 关键词
- 脚手架 - 掌握脚手架原理和开发全流程
- Lerna - 解决多Package项目管理痛点
- 架构设计 - 学习大厂基础基础架构设计思路

### 学习方法
- **架构三部曲：掌握原理 -> 独立思考 -> 总结反思**
- 深度剖析优秀开源项目，由表及里，由浅入深
- **视角切换：多切换到架构师视角，从全局思考问题**

### 注意事项
- 整体难度不高，不用担心学不会，坚持打卡写心得
- 优秀的程序猿不止能够实现功能，更多读懂别人的代码，读懂别人的想法
- 从知名的开源项目中汲取养分，为我所用，助我成长

### 前端脚手架imooc-cli核心功能演示

```bash
npm i -g @imooc-cli/core
```

## 1、站在前端研发的视角，分析开发脚手架的必要性

### 研发效能

**开发脚手架的核心目标是：提升前端研发效能**

大厂研发架构图：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E5%A4%A7%E5%8E%82%E7%A0%94%E5%8F%91%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

### 脚手架核心价值
将研发过程：

* 自动化：项目重复代码拷贝/git操作/发布上线操作
* 标准化：项目创建/git flow/发布流程/回滚流程
* 数据化：研发过程系统化、数据化，使得研发过程可量化

### 和自动化构建工具区别
> 问题：jenkins、travis等自动化构建工具已经比较成熟了，为什么还需要自研脚手架？

* 不满足需求：jenkins、travis通常在git hooks中触发，需要在服务端执行，无法覆盖研发人员本地的功能，如：创建项目自动化、本地git操作自动化等
* 定制复杂：jenkins、travis定制过程需要开发插件，其过程较为复杂，需要使用Java语言，对前端同学不够友好

## 2、从使用角度理解什么是脚手架？

### 脚手架简介
> 脚手架本质是一个操作系统的客户端，它通过命令行执行。

比如：

```bash
vue create vue-test-app
```

上面这条命令由 3 个部分组成：

* 主命令: vue
* command: create
* command 的 param: vue-test-app

它表示创建一个 vue 项目，项目的名称为 vue-test-app，以上是最一个较为简单的脚手架命令。

### 脚手架的执行原理

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E7%9A%84%E6%89%A7%E8%A1%8C%E5%8E%9F%E7%90%86.jpeg)

脚手架的执行原理如下：

* 在终端输入 vue create vue-test-app
* 终端解析出 vue 命令
* 终端在环境变量中找到 vue 命令
* 终端根据 vue 命令链接到实际文件 vue.js
* 终端利用 node 执行 vue.js
* vue.js 解析 command / options
* vue.js 执行 command
* 执行完毕，退出执行

## 3、脚手架的实现原理

问题：
1. 全局安装 `@vue/cli` 时发生了什么？
    - 将 `@vue/cli` 安装到 `node/lib/node_module` 中 
    - 创建软链 `vue` 链接到 `@vue/cli` 项目中的 `bin/vue.js` （在终端中使用 `which vue` 查看）
2. 在终端执行 `vue create vue-test-app` 时发生了什么？
    * 终端解析出 vue 命令
    * 终端在环境变量中找到 vue 命令
    * 终端根据 vue 命令链接到实际文件 vue.js
    * 终端利用 node 执行 vue.js

脚手架执行的全过程：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E5%8E%9F%E7%90%86%E8%BF%9B%E9%98%B6.png)

## 4、脚手架的开发流程

### 开发流程
1. 创建项目，并初始化 npm

```bash
mkdir jay-cli-demo # 创建项目目录
cd jay-cli-demo # 进入目录
npm init -y  # 初始化npm
code . # 使用vscode打开项目
```

2. 新建bin目录，并在目录下新增index.js文件，做为脚手架入口文件（注意要再最上方添加一行代码，用于查找当前使用环境下的node）：

```js
#!/usr/bin/env node

console.log('welcome to jay-cli-demo');
```

3. 配置 package.json，添加 bin 属性

```js
{
  "name": "jay-cli-demo",
  "version": "1.0.0",
  "description": "",
  "bin": {
    "jay-test": "bin/index.js"
  },
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

4. 将脚手架发布到 npm（发布过程中遇到问题请请参考网上的发布文章）

```bash
npm publish # 发布到npm
```

>  注意，因为npm不允许出现重复的包名，因此需要将上一步中 package.json 中的 name 从 `jay-cli-demo` 改为 [npmjs.com](https://www.npmjs.com/)  上未被占用的名字。

### 使用流程

1. 安装脚手架 

```bash
npm install -g jay-cli-demo
```



2. 使用脚手架

```bash
jay-test
# welcome to jay-cli-demo
```



### 开发难点
- 分包：将复杂的系统拆分成若干个模块
- 命令注册
- 参数解析

还有很多，比如：

* 命令行交互
* 日志打印
* 命令行文字变色
* 网络通信：HTTP/WebSocket
* 文件处理


### 本地调试
以 `jay-cli-test` 为例

**方法一：在项目目录下使用 `npm link`：**

- 在 `.nvm/versions/node/v14.15.4/lib/node_modules` 目录中，会创建一个 `jay-cli-test` 软链,链接到项目目录
- 运行 `jay-cli-test` 即运行项目目录中 `package.json` 中的 `bin` 配置命令

**方法二：在项目目录的父级下使用 `npm i jay-cli-test -g`**

- npm 会默认给我们创建一个软链，效果同上
- 如果希望删除这个软链，使用npm线上版本，可以在这个项目目录的非父级目录下，再来一次 `npm i jay-cli-test -g` 即可。 

分包情况：以 `jay-cli-test-lib` 为例。

### 本地link标准流程

链接本地脚手架：

```bash
cd your-cli-dir
npm link
```

链接本地库文件：

```bash
cd your-lib-dir
npm link
cd your-cli-dir
npm link your-lib
```

取消链接本地库文件：

```bash
# 删除主项目对库文件的软链
cd your-cli-dir
npm unlink your-lib

# 删除库文件的本地软链
cd your-lib-dir
npm unlink

# 删除主项目的软链
cd your-cli-dir
npm unlink

# 当遇到库文件link不存在的情况时，可尝试下面的方式解决
rm -rf node_modules
npm install -S your-lib
```

理解 `npm link`：
* `npm link your-lib`：将当前项目中 `node_modules` 下指定的库文件链接到 `node` 全局 `node_modules` 下的库文件
* `npm link`：将当前项目链接到 `node` 全局 `node_modules` 中作为一个库文件，并解析 `bin` 配置创建可执行文件

理解 `npm unlink`：
* `npm unlink`：将当前项目从 `node` 全局 `node_modules` 中移除
* `npm unlink your-lib`：将当前项目中的库文件依赖移除

注意，使用 `nvm` 管理 npm 后情况稍有不同：

* 全局 `node_modules` 目录为：`/Users/aaron/.nvm/versions/node/v14.15.4/lib/node_modules`
* bin 目录为：`/Users/aaron/.nvm/versions/node/v14.15.4/bin`
* bin 目录中的指令指向全局 `node_modules` 中的依赖


### 产出测试脚手架 — jay-test-cli
[代码地址](https://gitee.com/AaronKong/jay-test)

npm包：
- [jay-test-cli](https://www.npmjs.com/package/jay-test-cli)
- [jay-test-cli-lib](https://www.npmjs.com/package/jay-test-cli-lib)

使用方式：

1. 安装： `npm i jay-test-cli -g`
2. 运行： `jay-test-cli -V` 

## 5、Lerna简介

### 原生脚手架开发痛点分析
- 痛点一：重复操作
    * 多 Package 本地 link
    * 多 Package 依赖安装
    * 多 Package 单元测试
    * 多 Package 代码提交
    * 多 Package 代码发布

- 痛点二：版本一致性
    * 发布时版本一致性
    * 发布后相互依赖版本升级

> package 越多，管理复杂度越高

### Lerna简介
> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.
> 
> **Lerna 是一个优化基于 git+npm 的多 package 项目的管理工具**

**优势**

* 大幅减少重复操作
* 提升操作的标准化

> Lerna 是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标往往都是以效能为核心。

**官网**
[https://lerna.js.org/](https://lerna.js.org/)

**案例**
使用 Lerna 管理的大型项目：

* babel: [https://github.com/babel/babel](https://github.com/babel/babel)
* vue-cli: [https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* ~~create-react-app: [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)~~

**lerna 开发脚手架流程（划重点）**

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/lerna%20%E5%BC%80%E5%8F%91%E8%84%9A%E6%89%8B%E6%9E%B6%E6%B5%81%E7%A8%8B.png)

### Lerna 命令介绍

参考[官网](https://github.com/lerna/lerna)

- lerna init
  - 描述：初始化 lerna 项目，添加 `lerna.json` 和 `packages` 目录
  - 示例：`lerna init`
- lerna create
  - 描述：创建packages包
  - 示例：`lerna create core`
- lerna add
  - 描述：对所有packages包，安装依赖，也可单独给某个packages包安装依赖
  - 示例：`lerna add lodash `  `lerna add lodash packages/core/`
- lerna link
  - 描述：自动添加packages包之间的软链（如果有依赖关系的话）
  - 示例：`lerna link`
- lerna clean
  - 描述：对所有packages包，删除其中的 `node_modules`
  - 示例：`lerna clean`
- lerna bootstrap
  - 描述：给所有packages包，安装依赖，等同于cd 到每个包中，执行 `npm i`
  - 示例：`lerna bootstrap`
- lerna exec
  - 描述：对所有packages包，执行shell脚本，也可单独对某个包执行
  - 示例：
    - `lerna exec -- rm -rf node_modules`
    - `lerna exec --scope @jay-cli-dev/core -- rm -rf node_modules`
- lerna run
  - 描述：对所有packages包，运行某条命令
  - 示例：
    - `lerna run test `
    - `lerna run --scope @jay-cli-dev/utils test`
- lerna version
- lerna diff
- lerna publish


## 6、Lerna源码分析
### 【讨论题】谈一谈 Node和Web的事件循环（EventLoop）机制的异同

- 运行机制基本类似：
    - Web 的宏任务如 `setTimeout` 、`Ajax` ，主要交由对应的 Web API 处理，然后回调函数交由 V8 引擎处理
    - Node 的宏任务如 `setTimeout`、`fs.readFile` 等 Node API 则主要是由跨平台异步IO库 `libuv` 处理，然后回调函数交由 V8 引擎处理
- Node 中多了 process.nextTick 和 setImmediate，两者都提供的是异步能力
    - process.nextTick 是微任务
    - setImmediate 是宏任务
- Node.js的Event Loop跟浏览器的Event Loop不一样，他是分阶段的
- `setImmediate` 和 `setTimeout(fn, 0)` 哪个回调先执行，需要看他们本身在哪个阶段注册的，如果在定时器回调或者I/O回调里面，`setImmediate` 肯定先执行。如果在最外层或者 `setImmediate` 回调里面，哪个先执行取决于当时机器状况。
- `process.nextTick` 不在Event Loop的任何阶段，他是一个特殊API，他会立即执行，然后才会继续执行Event Loop

参考资料：

- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [setTimeout和setImmediate到底谁先执行，本文让你彻底理解Event Loop](https://juejin.cn/post/6844904100195205133)
- [Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
- [正确理解 Node.js 的 Event loop](https://zhuanlan.zhihu.com/p/80458653)


## 7、基于Lerna重新设计JL

JL中新增：
* 熟悉Yargs脚手架开发框架
* 熟悉多Package管理工具Lerna的使用方法和实现原理
* 深入理解Node.js模块路径解析流程

### yargs

- 脚手架构成
  - bin：package.json中配置bin属性，npm link 本地安装
  - command：命令
  - options：参数（boolean/string/number）
  - 文件顶部增加 `#!/usr/bin/env node`
- 脚手架-**初始化**流程
  - 构造函数：Yargs()
  - 常用方法：
    - **Yargs.options**
    - Yargs.option
    - **Yargs.group**
    - Yargs.demandCommand
    - Yargs.recommendCommands
    - Yargs.strict
    - **Yargs.fail**
    - Yargs.alias
    - Yargs.wrap
    - Yargs.epilogue
- 脚手架-**参数解析**方法
  - **hideBin**(process.argv) / Yargs.argv
  - **Yargs.parse(argv, options)**
- 脚手架-**命令注册**方法
  - **Yargs.command(command, describe, builder, handler)**
  - **Yargs.command({ command, describe, builder, handler })**

### Lerna

- Lerna 是基于 git+npm 的多package项目管理工具，提供了一系列的命令来降低多包项目的管理成本，如：
  - lerna init 初始化
  - lerna create 创建包
  - lerna add 安装依赖
  - lerna exec 执行脚本
  - lerna run 执行命令

- 实现原理
  - 通过 import-local 优先调用本地 lerna 命令
  - 通过 Yargs 生成脚手架，先注册全局属性，再注册命令，最后通过 parse 方法解析参数
  - lerna 命令注册时需要传入 builder 和 handler 两个方法，builder 方法用于注册命令专属的 options，handler 用来处理命令的业务逻辑
  - **lerna 通过配置 npm 本地依赖的方式来进行本地开发**，具体写法是在 package.json 的依赖中写入：`file:your-local-module-path` ，在 lerna publish 时会自动将该路径替换



### Node.js 模块路径解析流程

- Node.js 项目模块路径解析是通过 `require.resolve` 方法来实现的
- `require.resolve` 就是通过 `Module._resolveFileName` 方法实现的
- `require.resolve` 实现原理：
  - `Module._resolveFileName`方法核心流程有 3 点：
    - 判断是否为内置模块
    - 通过 `Module._resolveLookupPaths` 方法生成 node_modules 可能存在的路径
    - 通过 `Module._findPath` 查询模块的真实路径
  - `Module._findPath` 核心流程有 4 点：
    - 查询缓存（将 request 和 paths 通过 `\x00` 合并成 cacheKey）
    - 遍历 paths，将 path 与 request 组成文件路径 basePath
    - 如果 basePath 存在则调用 `fs.realPathSync` 获取文件真实路径
    - 将文件真实路径缓存到 `Module._pathCache`（key 就是前面生成的 cacheKey）
  - `fs.realPathSync` 核心流程有 3 点：
    - 查询缓存（缓存的 key 为 p，即 `Module._findPath` 中生成的文件路径）
    - 从左往右遍历路径字符串，查询到 `/` 时，拆分路径，判断该路径是否为软链接，如果是软链接则查询真实链接，并生成新路径 p，然后继续往后遍历，这里有 1 个细节需要特别注意：
      - 遍历过程中生成的子路径 base 会缓存在 knownHard 和 cache 中，避免重复查询
    - 遍历完成得到模块对应的真实路径，此时会将原始路径 original 作为 key，真实路径作为 value，保存到缓存中
- `require.resolve.paths` 等价于 `Module._resolveLookupPaths`，该方法用于获取所有 node_modules 可能存在的路径
- `require.resolve.paths` 实现原理：
  - 如果路径为 `/`（根目录），直接返回 `['/node_modules']`
  - 否则，将路径字符串从后往前遍历，查询到 `/` 时，拆分路径，在后面加上 node_modules，并传入一个 paths 数组，直至查询不到 `/` 后返回 paths 数组


## 本周作业
- 标准：
    - 理解脚手架的实现原理

    - 基于 `Lerna` 搭建自己的脚手架并发布到npm（功能不限）
- 进阶：
    - 理解 `Yargs` 常用API和开发流程
    - 理解 `Lerna` 实现原理
    - 理解 `import-local` 实现原理，理解 `require.resolve` 实现原理
- 本周打卡：
    - 作业地址：[https://github.com/imooc-lego/students-learn-task](https://github.com/imooc-lego/students-learn-task)
    - 学员学习任务，作业、打卡、分享，请看 [homework.imooc-lego.com](https://homework.imooc-lego.com)