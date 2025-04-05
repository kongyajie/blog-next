[TOC]

# week3 - 脚手架核心流程开发

## 本周导学

### 将收获什么

* 架构设计和技术方案设计全过程
* 脚手架执行核心流程和commander框架
* 如何让Node项目支持ES Module

### 主要内容

* 脚手架需求分析和架构设计
* 脚手架模块拆分策略和core模块技术方案
* 脚手架执行准备过程实现
* 脚手架命令注册实现（基于commander）

## 01-imooc-cli 脚手架需求分析

### 大厂标准项目流程

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E5%A4%A7%E5%8E%82%E5%81%9A%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%B5%81%E7%A8%8B.jpeg)

### 脚手架需求分析

从这张图看起，分析研发过程的痛点：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E8%A6%81%E8%A7%A3%E5%86%B3%E7%9A%84%E7%97%9B%E7%82%B9.png)

#### 痛点分析

- **创建项目/组件时，存在大量重复代码拷贝**：快速复用已有沉淀
- **协同开发时，由于git操作不规范**，导致分支混乱，操作耗时：制定标准的git操作规范并集成到脚手架
- **发布上线耗时，而且容易出现各种错误**：制定标准的上线流程和规范并集成到脚手架

#### 需求分析

>  通用的研发脚手架

- 通用的项目/组件创建能力
  - 模板支持定制，定制后能够快速生效
  - 模板支持快速接入，极低的接入成本
- 通用的项目/组件发布能力
  - 发布过程自动完成标准的git操作
  - 发布成功后自动删除开发分支并创建tag
  - 发布后自动完成云构建、OSS上传、CDN上传、域名绑定
  - 发布过程支持测试/正式两种模式

### 加餐：大厂是如何做 git 操作的？

- Git Flow

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E5%A4%A7%E5%8E%82%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A%20git%20%E6%93%8D%E4%BD%9C%E7%9A%84.jpeg)



## 02-imooc-cli 脚手架架构设计

### 绘制架构设计图

参考：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%9B%BE.jpeg)



我的绘制：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%9B%BE-%E8%87%AA%E5%88%B6.jpg)

### 核心模块

- 脚手架
  - 脚手架核心框架
  - 初始化体系
  - 标准git操作体系
  - 发布体系
- 服务
  - OPEN API
  - WebSocket
- 支撑体系
  - 本地缓存
  - 模板库
  - 数据体系
  - 代码仓库
  - 资源体系
  - 远程缓存

## 03-脚手架模块拆分策略和core模块技术方案

### 拆分策略

- **核心模块：core**
- **命令模块：commands**
  - 初始化
  - 发布
  - 清除缓存
- **模型模块：models**
  - Command 命令
  - Project 项目
  - Component 组件
  - Npm 模块
  - Git 仓库
- **工具模块：utils**
  - Git 操作
  - 云构建
  - 工具方法
  - API 请求
  - Git API

### core模块技术方案

命令执行流程：

- 准备阶段（本周开发）
- 命令注册（下周开发）
- 命令执行（下周开发）

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6core%E6%A8%A1%E5%9D%97%E6%8A%80%E6%9C%AF%E6%96%B9%E6%A1%88.jpeg)

### 涉及技术点

核心库

- import-local
- commander

工具库

- npmlog
- fs-extra
- semver
- colors
- user-home
- dotenv
- root-check



## 04-脚手架执行准备实现

### 主要内容：

- 拆包
- 检查版本号
- 检查node版本
- 检查root启动
- 检查用户主目录
- 检查入参
- 检查环境变量
- 检查是否为最新版本（如有，则提示更新）

### 调试技巧

- 如何调试 `jay-cli-dev` ？
  - 查找 `jay-cli-dev` bin文件地址： `which jay-cli-dev`
  - 新建 `lanch.json` 文件，并设置其中的 `"program": "/Users/aaron/.nvm/versions/node/v14.15.4/bin/jay-cli-dev"`
  - 打断点，然后点击运行
- 如何快速进入第三方依赖包的源码？
  - 貌似提供了ts文件的包就不能直接进入了
  - 可以通过 node_modules 直接查看源码
- 如何快速折叠所有代码？
  - vscode快捷键 `ctrl+k+0` 折叠所有代码
  - vscode快捷键 `ctrl+k+j` 展开所有代码

### Command使用

```js
#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

// 获取commander的单例
// const { program } = commander.program;

// 手动实例化一个Command实例
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --env <envName>', '获取环境变量名称');

// command 注册命令
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f, --force', '是否强制拷贝')
  .action((source, destination, comObj) => {
    console.log('do clone', source, destination, comObj.force);
  })

// addCommand 注册命令
const service = new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log('do service start', port);
  });
service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log('stop service')
  })

program.addCommand(service);

// jay-test-cli install init -> jay-cli init
// program
//   .command('install [name]', 'install package', {
//     executableFile: 'jay-cli', // 可还用来实现脚手架串联
//     // isDefault: true // 将此命令作为默认的执行命令
//     hidden: true // 隐藏command
//   })
//   .alias('i');

// program
//   .arguments('<cmd> [options]') // 类似 Yargs.demandCommand，强制参数必须传递
//   .description('test command', {
//     cmd: 'command to run',
//     options: 'options for command'
//   })
//   .action((cmd, options) => {
//     console.log(cmd, options);
//   });

// 高级定制1：自定义help信息
// console.log(program.helpInformation()); // 展示帮助信息
// program.helpInformation = function() {  // 直接修改帮助信息
//   return '' 
// } 

// program.on('--help', () => { // 监听参数
//   console.log('your help information\n');
// })

// 高级定制2：实现debug模式
// program.on('option.debug', () => {
//   if (program.debug) {
//     process.env.LOG_LEVEL = 'verbose';
//   }
//   console.log(process.env.LOG_LEVEL);
// })

// 高级定制3：对未知命令监听
program.on('command:*', (obj) => {
  console.error('未知的命令：', obj[0]);
  const availableCommands = program.commands.map(cmd => cmd.name());
  console.log('可用命令：' + availableCommands.join(','));
})

program
  .parse(process.argv);


```



### 源码分析：

#### Require处理文件的方式

> require 支持 .js/.json/.node 三种格式的文件

- 处理 `.js` 时 -> 使用js引擎解析，要求该 `.js` 文件使用 `module.exports/exports` 输出，否则会报错
- 处理 `.json` 时 -> 使用 JSON.parse 解析，并返回json，如 `const pkg = require('./package.json')`
- 处理 `.node` (是一个C++ Addon插件)时 -> 使用 process.dlopen 打开
- 处理其他格式文件时 -> 会当成 `.js` 文件处理，比如 `require('./file.txt')` 或 `require('./readme.md')`

#### npmlog 定制

```js
const log = require('npmlog');

// 自定义log
log.addLevel('a', 2000, { fg: 'green' })
log.addLevel('success', 2500, { fg: 'green', bold: true })
log.level = 'verbose';
```





## 06-Node项目如何支持ESModule

- webpack 配置 `babel-loader`
- node 最新功能 `.mjs`


## 本周作业
- 标准
    - 绘制 imooc-cli 脚手架架构设计图
    - 实现 imooc-cli 脚手架准备过程代码
    - 通过 commander 框架实现一个脚手架，包含自定义 option 和 command 功能
- 进阶
    - 通过 webpack 和 原生两种方式实现 Node 对 ESModule 的支持

