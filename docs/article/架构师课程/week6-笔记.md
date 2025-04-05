[TOC]

# week6 - 脚手架项目和组件初始化开发


## 01-本周导学
### 将收获什么

- ejs模板渲染
- glob文件筛选
- 项目标准安装和自定义安装
- 组件库初始化和安装

### 主要内容

- 脚手架安装模板功能架构设计
- 脚手架模板安装核心实现：ejs库功能详解
- 脚手架项目模板安装功能开发
- 组件模板开发及脚手架组件初始化功能支持
- 脚手架自定义初始化项目模板功能开发

### 附赠内容

- 本周加餐：ejs库源码解析——彻底搞懂模板动态渲染原理
- 本阶段加餐：Node.js require源码解析——彻底搞懂npm模块加载原理

### 关键词

- ejs
- glob

### 学习方法

- 实践再实践

### 注意事项

- 知其然知其所以然
- 注重学习方法的总结
- 做好阶段总结

### 本周作业

- 完成脚手架创建项目和组件流程开发
- 进阶：
  - 分享ejs和require源码学习过程和感悟



## 02-脚手架安装模板功能架构设计

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BF%E5%AE%89%E8%A3%85%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1.jpeg)



## 03-ejs和glob用法详解

### ejs用法

#### ejs模板的三种用法

```js
let template = ejs.compile(str, options);
template(data);
// => 输出渲染后的 HTML 字符串

ejs.render(str, data, options);
// => 输出渲染后的 HTML 字符串

ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出渲染后的 HTML 字符串
});


代码块12345678910
```

#### 标签含义

```js
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除


代码块123456789
```

#### 包含

```js
<%- include('header', { header: 'header' }); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer', { footer: 'footer' }); -%>


代码块12345678
```

#### 自定义分隔符

```js
let ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];

// 单个模板文件
ejs.render('<?= users.join(" | "); ?>', {users: users},
    {delimiter: '?'});
// => 'geddy | neil | alex'

// 全局
ejs.delimiter = '$';
ejs.render('<$= users.join(" | "); $>', {users: users});
// => 'geddy | neil | alex'


代码块123456789101112
```

#### 自定义文件加载器

```js
let ejs = require('ejs');
let myFileLoader = function (filePath) {
  return 'myFileLoader: ' + fs.readFileSync(filePath);
};

ejs.fileLoader = myFileLoad;


代码块123456
```

### glob用法

#### glob简介

参考慕课手记：https://www.imooc.com/article/4053

#### glob用法

参考npm仓库：https://www.npmjs.com/package/glob

