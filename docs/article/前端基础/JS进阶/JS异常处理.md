# JS异常处理

## 异常分类
ECMA-262 中定义了下列7种错误类型：
- Error：错误的基类，其他错误都继承自该类型
- EvalError：Eval函数执行异常
- RangError: 数组越界
- ReferenceError：尝试引用一个未被定义的变量时，将会抛出此异常
- SyntaxError：语法解析不合理
- TypeError：类型错误，用来表示值的类型非预期类型时发生的错误
- URIError：以一种错误的方式使用全局URI处理函数而产生的错误

## 异常处理
- try-catch

需根据不同的业务场景采用不同的处理策略
## 异常捕获
- `try-catch`
- `window.onerror`
- `window.addEventListener('error', e => {})`
- `window.addEventListener('unhandledrejection', e => {})`
- `vue.config.errorHandler = () => {}`
- `react errorBoundry错误边界组件包裹`

[codepen-异常捕获示例](https://codepen.io/RealAaron/pen/MWvrWGW?editors=1010)
## 总结
- 可疑区域增加 `try-catch`
- 全局监控 JS 异常 `window.onerror`
- 全局监控静态资源异常 `window.addEventListener('error')`
- 捕获没有 catch 的 Promise 异常用 `window.addEventListener('unhandledrejection')`
- `Vue.configerrorHandler` 和 React errorBoundry错误边界组件 `componentDidCatch`
- Axios 请求统一异常处理用拦截器 interceptors
- 使用日志监控服务收集用户错误信息


## 参考
- [从 0 到 1 搭建前端异常监控系统](https://segmentfault.com/a/1190000022607559)
- [前端异常的捕获与处理](https://segmentfault.com/a/1190000039264963)
- [你不知道的前端异常处理（万字长文，建议收藏）](https://segmentfault.com/a/1190000022977773)