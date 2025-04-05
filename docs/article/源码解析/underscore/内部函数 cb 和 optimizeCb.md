# 内部函数 cb 和 optimizeCb

cb

```js
var cb = function(value, context, argCount) {
    
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);

    if (value == null) return _.identity;

    if (_.isFunction(value)) return optimizeCb(value, context, argCount);

    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);

    return _.property(value);
};
```

optimizeCb

```js
var optimizeCb = function(func, context, argCount) {
    // 如果没有传入 context，就返回 func 函数
    if (context === void 0) return func;
    switch (argCount) {
        case 1:
            return function(value) {
                return func.call(context, value);
            };
        case null:
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function() {
        return func.apply(context, arguments);
    };
};
```