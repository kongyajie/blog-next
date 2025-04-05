[TOC]

# week4 - 脚手架命令注册和执行过程开发


## 01-本周导学
### 将收获什么

* 如何设计高性能脚手架
* Node多进程开发
* javascript面向对象的实战技巧

### 主要内容

* 图解**高性能**脚手架架构设计方法
* 封装通用的Package和Command类
* 基于**缓存+Node多进程**实现动态命令加载和执行
* 将业务逻辑和脚手架框架彻底解耦

### 附赠内容

- Node多进程开发进阶——child_process源码分析
  - 深入Node源码看清spawn/exec/execFile/fork的本质区别，彻底搞懂Node多进程原理

### 关键词

- **高性能/可扩展**的脚手架 - **利用缓存提升脚手架性能并解耦业务逻辑**
- 面向对象 - 利用Class完成javascript面向对象编程
- **Node多进程** - 深入Node多进程原理

### 学习方法

- 学以致用：将前两周中学到的知识进行实际应用（commander / Lerna 命令执行原理）
- 知识储备：面向对象、ES6新特性Class、shell脚本（macOS）、bat批处理文件等概念需要预先储备
- 充分实践：Node多进程是一门较为复杂的技术，需要同学们充分实践和思考

### 注意事项

- 整体难度处于中上等，如果感觉有难度，一定要多看几遍视频，可以多暂停下来思考，必要的时候可以多画一些流程图、架构图理清思路
- Node多进程高能预警

### 本周作业

- 根据课程讲解内容完成imooc-cli脚手架动态命令执行代码编写
- 进阶：尝试分析Node多进程execSync/execFileSync/spawnSync源码



## 02-imooc-cli脚手架命令注册

- 脚手架初始化 + 全局参数注册
- 脚手架命令注册



## 03-高性能脚手架架构设计和缓存结构设计

### 痛点分析

当前脚手架架构如下图：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E5%BD%93%E5%89%8D%E6%9E%B6%E6%9E%84%E7%97%9B%E7%82%B9%E5%88%86%E6%9E%90.jpeg)

这样的架构设计已经可以满足一般脚手架需求，但是有以下两个问题：

1. **cli 安装速度慢**：所有 package 都集成在 cli 里，因此当命令较多时，会减慢 cli 的安装速度
2. **灵活性差**：init 命令只能使用 @imooc-cli-dev/init 包，对于集团公司而言，每个 bu 的 init 命令可能都各不相同，可能需要实现 init 命令动态化，如：
   - 团队 A 使用 @imooc-cli-dev/init 作为初始化模块
   - 团队 B 使用自己开发的 @imooc-cli-dev/my-init 作为初始化模块
   - 团队 C 使用自己开发的 @imooc-cli-dev/your-init 作为初始化模块

这时对我们的架构设计就提出挑战，要求我们能够动态加载 init 模块，这将增加架构的复杂度，但大大提升脚手架的可扩展性，将脚手架框架和业务逻辑解耦

### 脚手架架构优化

优化结果如下：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E6%9E%B6%E6%9E%84%E4%BC%98%E5%8C%96.jpeg)

### 脚手架命令动态加载功能架构设计

架构设计图如下：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E5%91%BD%E4%BB%A4%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E5%8A%9F%E8%83%BD%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1.jpeg)

### 缓存目录

缓存目录位于用户主目录下的 `.imooc-cli`，如果没有生成该目录时，我们可以手动创建，或者通过如下代码生成：

```js
const userHome = require('user-home');
const fse = require('fs-extra');
const path = require('path');

const cachePath = path.resolve(userHome, '.imooc-cli'); // 生成缓存目录路径

fse.mkdirpSync(cachePath); // 生成缓存目录
```



## 04-通用npm模块类Package封装

- exists
- install
- update

## 05-预备知识：Node多进程入门

### 官方文档

中文版：http://nodejs.cn/api/child_process.html



### 什么是进程

> 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是[操作系统](https://baike.baidu.com/item/操作系统)结构的基础。

进程的概念主要有两点：

- 第一，进程是一个实体。每一个进程都有它自己的地址空间。
- 第二，进程是一个“执行中的程序”，存在嵌套关系。

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/Node%E5%A4%9A%E8%BF%9B%E7%A8%8B-%E8%BF%9B%E7%A8%8B.jpeg)

我们在 child_process 中创建的进程就是 Node.js 的子进程

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/Node%E5%A4%9A%E8%BF%9B%E7%A8%8B-%E5%AD%90%E8%BF%9B%E7%A8%8B.jpeg)

### child_process 用法

Node.js基于事件驱动来处理并发，它本身是以单线程模式运行的。Node.js通过[child_process](https://link.zhihu.com/?target=https%3A//iojs.org/api/child_process.html)开启子进程执行指定程序。主要包括4个异步进程函数(spawn,exec,execFile,fork)和3个同步进程函数(spawnSync,execFileSync,execSync)。一般我们比较常用的是spawn和exec这两个方法。

**spawn只能运行指定的程序，参数需要在列表中给出，而exec可以直接运行复杂的命令。其中异步进程函数spawn是最基本的创建子进程的函数，其他三个异步函数都是对spawn不同程度的封装。**

spawn适合耗时任务的分布输出，exec则适合输出较少的情况，同步执行

#### 异步

- exec：执行shell脚本（**一次性输出**）
- execFile：执行shell文件
- fork：使用node执行命令（和 require 效果类似，不同点在于 fork 的文件中 pid 是新的 node 进程 id，和主进程 id 互相独立）
- spawn `child_process.spawn(command[, args][, options])` 流式处理，持续输出，适合执行**耗时任务**，比如 `npm install`

#### 同步

- execSync
- execFileSync
- spawnSync



代码演示

```js
const cp = require('child_process');
const path = require('path');

cp.exec('ls -al', function(err, stdout, stderr)) {
	console.log(err);
	console.log(stdout);
	console.log(stderr);
}

cp.execFile(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], function(err, stdout, stderr)) {
  console.log(err);
	console.log(stdout);
	console.log(stderr);
}

let child = cp.spawn(path.resolve(__dirname, 'test.shell'), {
  
})

cp.fork(path.resolve(__dirname, 'child.js'));
```





## 06-基于Node多进程构建高性能脚手架



## 07-Node进阶：child_process源码分析

### 疑问和收获

- exec 和 execFile 到底有什么区别？
- 为什么 exec/execFile/fork 都是通过 spawn 实现的，spawn 的作用到底是什么？
- 为什么 spawn 调用后没有回调，而 exec 和 execFile 能够回调？
- 为什么 spawn 调用后需要手动调用 child.stdout.on(‘data’, callback)，这里的 child.stdout / child.stderr 到底是什么？
- 为什么有 data/error/exit/close 这么多种回调，它们的执行顺序到底是怎样的？

### Node 多进程源码总结

- exec/execFile/spawn/fork的区别
  - exec：原理是调用 /bin/sh -c 执行我们传入的 shell 脚本，底层调用了 execFile
  - execFile：原理是直接执行我们传入的 file 和 args，底层调用 spawn 创建和执行子进程，并建立了回调，一次性将所有的 stdout 和 stderr 结果返回
  - spawn：原理是调用了 internal/child_process，实例化了 ChildProcess 子进程对象，再调用 child.spawn 创建子进程并执行命令，底层是调用了 child._handle.spawn 执行 process_wrap 中的 spawn 方法，执行过程是异步的，执行完毕后通过 PIPE 进行单向数据通信，通信结束后会子进程发起 onexit 回调，同时 Socket 会执行 close 回调
  - fork：原理是通过 spawn 创建子进程和执行命令，采用 node 执行命令，通过 setupchannel 创建 IPC 用于子进程和父进程之间的双向通信
- data/error/exit/close回调的区别
  - data：主进程读取数据过程中通过 onStreamRead 发起的回调
  - error：命令执行失败后发起的回调
  - exit：子进程关闭完成后发起的回调
  - close：子进程所有 Socket 通信端口全部关闭后发起的回调
  - stdout close/stderr close：特定的 PIPE 读取完成后调用 onReadableStreamEnd 关闭 Socket 时发起的回调

### exec 源码深入分析

- child_process
  - exec
  - execFile
  - spawn
- internal/child_process
  - ChildProcess
  - spawn

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/Node%E5%A4%9A%E8%BF%9B%E7%A8%8B-child_process%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.jpeg)

### Node 多进程回调流程

- spawn
- Pipe
- onexit
- kill
- Socket
- close
- exit

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/Node%E5%A4%9A%E8%BF%9B%E7%A8%8B-%E5%9B%9E%E8%B0%83%E6%B5%81%E7%A8%8B.jpeg)

### Node 多进程执行阶段总结

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/Node%E5%A4%9A%E8%BF%9B%E7%A8%8B-%E6%89%A7%E8%A1%8C%E9%98%B6%E6%AE%B5%E6%80%BB%E7%BB%93.jpeg)

### Fork 执行流程分析

核心区别是创建 IPC Channel 取代 [stdin, stdout, stderr]



### 同步方法源码分析

核心是调用 Process.spawnSync



### 知识储备

#### shell的使用

方法一：直接执行shell文件

```bash
/bin/sh test.shell
```

方法二：直接执行shell语句

```bash
/bin/sh -c "ls -al|grep node_modules"
```



