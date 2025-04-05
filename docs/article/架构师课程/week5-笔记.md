[TOC]

# week5 - 脚手架创建项目流程设计和开发


## 01-本周导学
### 将收获什么

- 命令行交互方法
- 服务端框架egg.js的应用和API开发方法
- egg.js集成云mongodb

### 主要内容

- 脚手架项目创建功能架构设计
- 通过命令行交互获取项目基本信息
- egg.js+云mongodb的集成
- 开发前端项目模板
- egg.js获取项目模板API开发
- 项目模板下载功能开发

### 附赠内容

- inquirer源码解析——彻底搞懂命令行交互
  - 实现一个可交互的命令行列表
    - readline
    - events
    - mute-stream
    - rxjs
    - ansi-escapes

### 关键词

- 命令行交互
- egg.js
- mongodb

### 学习方法

- 保持OPEN：本章知识量巨大，认知上限将不断被冲破，需要保持OPEN心态不断吸收新知识

### 注意事项

- 本章难度与上周相似，但是新的知识点非常多，需要大家保持耐心，循序渐进
- 实践，实践，再实践！
- 参与作业打卡，这是自我复盘、相互交流的有效手段，地址：https://github.com/imooc-lego/students-learn-task

### 本周作业

- 基本：参考视频，实现脚手架创建项目功能
- 进阶：
  - 自主完成readline核心源码分析
  - 自主完成命令行可交互列表组件开发

## 02-脚手架创建项目功能架构设计

架构背后的思考

1. 可扩展：能够快速复用到不同团队，适应不同团队之间的差异
2. 低成本：在不改动脚手架源码的情况下，能够新增模板，且新增模板的成本很低
3. 高性能：控制存储空间，安装时充分利用 Node 多进程提升安装性能

### 架构设计图

脚手架项目创建功能架构设计图：

![图片描述](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BF%E5%AE%89%E8%A3%85%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1.jpeg)

整体过程可以分为三个阶段：

- 准备阶段
- 下载模板
- 安装模板

### 准备阶段

准备阶段的核心工作是：

1. 确保项目的安装环境
2. 确认项目的基本信息

> 项目的基本信息应该预先确认，否则安装过程中中断会非常影响用户体验

此阶段需要借助命令行交互库 inquirer 来完成项目信息的收集

### 下载模板

下载模板是利用已经封装 Package 类快速实现相关功能

### 安装模板

安装模板分为标准模式和自定义模式：

1. 标准模式下，将通过 ejs 实现模板渲染，并自动安装依赖并启动项目
2. 自定义模式下，将允许用户主动去实现模板的安装过程和后续启动流程

## 03-egg.js+云mongodb快速入门

### egg.js

#### 官网

官网地址：https://eggjs.org/zh-cn/

#### 初始化

初始化和项目启动方法：

```bash
# 初始化
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
# 项目启动
$ npm run dev
$ open http://localhost:7001
```

大家可以试试：`npm init imooc-cli` 有惊喜

> 思考：为什么 npm init egg 可以初始化 egg 项目？（实际调用npm包：create-egg）

### 云mongodb

#### 云mongodb开通

地址：https://mongodb.console.aliyun.com/，创建实例并付款即可

#### 本地mongodb安装

地址：https://www.runoob.com/mongodb/mongodb-tutorial.html

#### mongodb使用方法

地址：https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html