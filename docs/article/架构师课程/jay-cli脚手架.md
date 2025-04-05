# jay-cli脚手架

## 前言

- 猎萝⼘平台是公司核⼼项⽬，包含toC端和crm等多个中后台系统，多个系统间有许多可复用的部分，如eslint配置、网络请求模块、埋点模块等，而新系统的开发往往采用代码拷贝的方式，开发效率较低；
- 为了提高团队整体研发效率，本人作为前端负责人，搭建了公司内部的通用脚手架jay-cli。架构上使用commander 实现脚手架，lerna进行多包管理，性能上使用node多进程和本地缓存提高执行效率；
- 通过脚手架结合项目模板，只需简单的命令行即可完成项目的初始化工作，达到项目模板快速复用的目的，团队整体研发效率得到有效提升，同时技术栈更统一，也更易于维护。

## 一、需求

- 使用脚手架进行标准的项目初始化
  - **jay init test-project**
- 需要支持的项目模板：
  - ~~**C端项目模板：project-template-vue**~~
  - **中后台管理系统项目模板：project-template-hey-admin**
  - **H5项目模板：project-template-h5**
  - ~~**小程序项目模板：project-template-miniapp-remax**~~
  - ~~Node服务端项目模板：project-template-express / project-template-koa2~~

## 二、设计

### 架构设计图

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%9B%BE-%E8%87%AA%E5%88%B6.jpg)

主要实现：

- 多包拆分，使用Lerna进行管理
- 1、`core` 脚手架核心模块（**执行准备、命令注册、命令执行**）
- 2、`init` 项目初始化模块（**项目模板下载**、*动态渲染*、*项目模板数据管理*）

## 三、实现流程

- 实现拆包： 

  - core （cli、exec）

  - commands（init）

  - models（command）

  - utils（log、request）

- 脚手架核心开发
  - 执行准备（检查Root、检查脚手架版本、提示脚手架新版本更新）
  - 命令注册（设置帮助提示信息、注册init命令）
  - 命令执行（生成缓存路径、**node多进程**执行本地代码入口文件）
- init初始化开发
  - 准备阶段（获取模板列表、用户选择项目模板）
  - 模板下载（download-git-repo下载项目模板）
  - 模板安装（复制文件、安装依赖）

## 四、难点

脚手架核心模块

- lerna使用和原理
- command使用和原理
- 动态命令调用
- Node多进程命令执行
- 本地缓存

项目初始化模块

- inquiry使用和原理
- 项目模板初始化
- **项目模板下载**（npm vs git）（**download-git-repo**）
- 动态渲染 ejs/glob

## 五、话术

【Situation 背景】

猎萝⼘平台是公司核⼼项⽬，致力于提升招聘过程中的效率和体验。平台包含toC端和crm等多个中后台系统，多个系统间有许多可复用的部分，如eslint配置、网络请求、埋点等，而新系统的开发往往采用代码拷贝后删减的方式，开发效率较低；

【Target 目标】

为了提高团队整体研发效率

【Action 行动】

本人作为前端负责人，搭建了公司内部的脚手架jay-cli，具有**可扩展**、**高性能**等特点。架构上使用lerna进行多包管理，commander 库来实现脚手架，并使用node多进程和本地缓存等技术提高执行效率；

【Result 结果】

通过脚手架与项目模板相结合，只需简单的命令行即可完成项目的初始化工作，达到项目模板快速复用的目的，团队整体研发效率得到有效提升，同时技术栈更统一，也更易于维护。



- jay-cli脚手架属于工程化的一部分，它可以在项目初始化阶段帮助我们快速的复用已有的项目模板。

- 设计之初考虑到未来的可扩展性，参考 vue-cli 对功能模块进行了拆分，并采用了lerna进行管理，主要分为3个部分：
  - `core`，脚手架核心模块，主要负责脚手架初始化、命令注册、命令执行（ `npminstall` 、`require('@jay-cli/init')` 、child_process.spawn）等
  - `commands`  命令，比如 init
  - `utils` 工具方法，比如 `npmlog` 打印、获取npm包信息等
- 性能这部分呢也有做一些优化，比如：
  - 命令执行时使用node多进程 child_process.spawn，提升执行效率
  - 命令包下载后保存，在本地缓存中，无需每次都下载

## 六、Q&A

### 脚手架的原理

### Lerna的使用和原理

- 多包框架要解决的问题

### 遇到的问题和收获

- 本地调试方法： `npm link` => ` file:../../`
- 如何支持 `--debug` 打印信息 ： 命令行 => 环境变量 =>  `npmlog` 设置 level
- 许多有用的小工具库
  - **npmlog**
  - fs-extra
  - **semver**
  - colors
  - user-home
  - dotenv
  - **root-check**

## 参考

项目地址：https://gitee.com/AaronKong/jay-cli

