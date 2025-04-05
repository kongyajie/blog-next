# Vue系列之2-使用

## 前言

本章主要内容：
- 安装
- 基础使用
- 组件
- 可复用性&组合
- 一些API

## 一、安装
vue提供了14种不同的构建版本，我们可以根据`是否需要编译器`，`vue代码用在什么场景`来选择使用的版本，详细说明请参照[官网](https://cn.vuejs.org/v2/guide/installation.html)

另外，有三种安装方式可供选择：
1. 直接`<script>`引用，index.html中添加如下代码
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

  <div id="app">
    {{message}}
  </div>

  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello World'
      }
    })
  </script>
```

2. npm配合打包工具使用
在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 `webpack` 或 `Browserify` 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```bash
# 最新稳定版
$ npm install vue
```

3. 命令行工具（CLI）
Vue 提供了一个官方的 [CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本

```bash
$ vue create vue2-demo 
```

## 二、基本使用
### 模板语法

> Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

- 插值

```html
<!-- 文本 -->
<p>{{msg}}</p>

<!-- 原始HTML -->
<p>using mustaches: {{rawHtml}}</p>
<p>using v-html directive: <span v-html="rawHtml">123</span></p>

<!-- Attribute -->
<div v-bind:id="dynamicId">dynamicId</div>

<!-- 使用JS表达式 -->
<p>{{ num + 1 }}</p>
<p>{{ b ? 'Yes' : 'NO' }}</p>
<p>{{ msg.split('').reverse().join('')}}</p>

<!-- 不能是语句，模板表达式被放在沙盒中，只能访问全局变量的一个白名单，如Math、Date等 -->
<!-- https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9 -->
<!-- <p>{{ var a = 1 }}</p> -->
<!-- <p>{{ if (1) return 1 }}</p> -->
```

- 指令

```html
<!-- 指令是带有 `v-` 前缀的特殊 attribute，指令attribute的值预期是单个JavaScript表达式（v-for例外） -->
<!-- 指令的职责是，当表达式的值变化时，将其产生的连带影响，响应式地作用于DOM -->
<p v-if="show">v-if指令</p>

<!-- 参数 -->
<!-- 指令能够接收一个参数，在指令之后以冒号表示 -->
<p><a v-bind:[attrName]="url">百度</a></p>
<p v-on:click="clickHandler">Click me!</p>

<!-- 修饰符 -->
<!-- 修饰符用于指出一个指令应该以特殊方式绑定 -->
<!-- 例如 .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault() -->
<a v-bind:href="url" v-on:click.prevent="onSubmit">url</a>
```

- 缩写

```html
<p><a :[attrName]="url">百度-缩写</a></p>
<p @click="clickHandler">Click me!缩写</p>
```

### computed和watch

#### 计算属性 computed

1. 计算属性的初衷是让将复杂的计算逻辑从模板中抽离出来，增强可维护性的
2. 计算属性是基于它们的响应式依赖进行缓存的，**只在相关响应式依赖发生变化时重新求值**，这是计算属性和函数的最大区别
3. 计算属性默认使用get方法，也可设置set方法

```html
<p>ComputedDemo </p>
{{num}}
{{doubleNum1}}
<input type="text" v-model="doubleNum2">
```

```js
data() {
    return {
      num: 1
    }
},
computed: {
    doubleNum1() {
      return this.num * 2;
    },
    doubleNum2: {
      get() {
        return this.num * 2;
      },
      set(val) {
        this.num = val/2;
      }
    }
}
```

#### watch侦听器
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。**当需要在数据变化时执行异步或开销较大的操作时**，这个方式是最有用的。

```html
<input type="text" v-model="name">
<input type="text" v-model="info.city">
```

```js
data() {
    return {
      name: 'JS',
      info: {
        name: 'Aaron',
        city: 'ShangHai'
      }
    }
},
watch: {
    name(oldValue, value) {
      console.log('watch name', oldValue, value); // 值类型，可正常拿到 oldValue, value
    },
    info: {
      handler(oldValue, value) {
        console.log('watch info', oldValue, value); // 对象类型，由于指向同一指针，因此oldValue和value是一样的
      },
      deep: true // 深度监听
    },
    'info.city': {
      handler(oldValue, value) {
        console.log('watch info.city', oldValue, value); // 键路径
      },
      immediate: true
    }
},
```

### class和style

#### class
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 **v-bind** 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 **v-bind** 用于 **class** 和 **style** 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

```html
<!-- 纯class -->
<div>Name: <span class="red font-big">Aaron</span></div>

<!-- 字符串 -->
<div>Name: <span :class="true ? 'red font-big' : ''">Aaron</span></div>

<!-- 对象 {cls1: true, cls2: false} -->
<div>Name: <span :class="{'red': isRed, 'font-big': isBig}">Aaron</span></div>

<!-- 数组 [cls1, cls2] -->
<div>Name: <span :class="['red', 'font-big']">Aaron</span></div>

<!-- 数组中包裹对象（终极方案） [{cls1: activeClass}, cls2}] -->
<div>Name: <span :class="[{'red': isRed, 'font-big': isBig}]">Aaron</span></div>
```

#### style
**v-bind:style** 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<!-- 纯style -->
<p style="color:red;font-size:30px;"></p>

<!-- 对象 {color: xxx, fontSize: xx} 转换为驼峰式 --> 
<p :style="styleData">Shanghai</p>

<!-- 数组 [styleData1, styleData2] 转换为驼峰式 --> 
<!-- 适合多个样式对象 -->
<p :style="[styleData, styleData2]">Shanghai</p>
```

### 条件
* v-if
* v-else-if
* v-else
* v-show

```html
<p v-if="type === 'a'">a</p>
<p v-else-if="type === 'b'">b</p>
<p v-else>other</p>

<p v-show="type === 'a'">a</p>
<p v-show="type === 'b'">b</p>
```

### 循环
我们可以用 **v-for** 指令基于一个数组来渲染一个列表。v-for 指令需要使用 **item in items** 形式的特殊语法，其中 **items** 是源数据数组，而 **item** 则是被迭代的数组元素的别名。

#### 遍历数组

```html
<ul>
  <li v-for="(item, index) in listArr" :key="item.id">
    {{index}} - {{item.id}} - {{item.name}}
  </li>
</ul>

<script>
export default {
  data() {
    return {
      listArr: [
        { id: 1, name: 'Aaron1' },
        { id: 2, name: 'Aaron2' },
        { id: 3, name: 'Aaron3' }
      ]
    }
  }
}
</script>
```

#### 遍历对象

```html
<ul>
  <li v-for="(item, key, index) in listObj" :key="key">
    {{index}} - {{key}} - {{item.id}} - {{item.name}}
  </li>
</ul>
<script>
export default {
  data() {
    return {
      listObj: {
        a: { id: 1, name: 'Aaron1' },
        b: { id: 2, name: 'Aaron2' },
        c: { id: 3, name: 'Aaron3' }
      }
    }
  }
}
</script>
```

**你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法，效果完全一样**

```html
<div v-for="item of listArr"></div>
<div v-for="item of listObj"></div>
```

#### 数组更新检测
由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)中有相关的讨论

**非纯方法**
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

**纯方法**
变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

### 事件
可以用 **v-on** 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

```html
<template>
  <div>
    <p>{{count}}</p>
    <!-- 绑定js语句 -->
    <button @click="count++">+1</button>

    <!-- 绑定事件处理方法 -->
    <button @click="add1">+1</button>
    <button @click="add2(2,$event)">+2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add1(event) {
      this.count ++;
      console.log('event', event, event.__proto__.constructor) // 是原生的 event 对象
    },
    add2(val, event) {
      this.count += val;
      console.log(event);
    },
    loadHandler() {
      // do something
    }
  },
  mounted() {
    window.addEventListener('myEvent', this.loadHandler)
  },
  beforeDestroy() {
    //【注意】用 vue 绑定的事件，组建销毁时会自动被解绑
    // 自己绑定的事件，需要自己销毁！！！
    window.removeEventListener('myEvent', this.loadHandler)
  }
}
</script>
```

#### 修饰符
- 事件修饰符
- 按键修复符
- 系统修饰键
- 鼠标按钮修饰符

详见 [Vue官网](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

### 表单

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。**它会根据控件类型自动选取正确的方法来更新元素**。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` `attribute` 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
* text 和 textarea 元素使用 `value` property 和 `input` 事件；
* checkbox 和 radio 使用 `checked` property 和 `change` 事件；
* select 将 `value` 作为 prop 并将 `change` 作为事件。

```html
<template>
  <div>
    <!-- v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。 -->

    <p>输入框 {{name}}</p>
    <input type="text" v-model="name">

    <p>多行文本 {{desc}}</p>
    <textarea v-model="desc"></textarea>

    <p>单选 {{gender}}</p>
    <input type="radio" id="male" value="Male" v-model="gender">
    <label for="male">male</label>
    <input type="radio" id="female" value="Female" v-model="gender">
    <label for="female">female</label>

    <p>复选框 {{checked}}</p>
    <input type="checkbox" v-model="checked">like

    <p>多复选框 {{checkedNames}}</p>
    <input type="checkbox" id="aaron" value="Aaron" v-model="checkedNames">
    <label for="aaron">Aaron</label>
    <input type="checkbox" id="vera" value="Vera" v-model="checkedNames">
    <label for="vera">Vera</label>

    <p>下拉列表 {{selected}}</p>
    <select name="" id="" v-model="selected">
      <option disabled value="">请选择</option>
      <option value="苹果">苹果</option>
      <option value="梨子">梨子</option>
      <option value="西瓜">西瓜</option>
    </select>

    <p>下拉多选列表 {{selectedList}}</p>
    <select multiple name="" id="" v-model="selectedList">
      <option disabled value="">请选择</option>
      <option value="苹果">苹果</option>
      <option value="梨子">梨子</option>
      <option value="西瓜">西瓜</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      desc: '',
      gender: '',
      checked: false,
      checkedNames: [],
      selected: '',
      selectedList: []
    }
  }
}
</script>
```

## 三、组件
组件是可复用的 Vue 实例。

它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

### 组件基础
#### 全局注册
> 使用 **Vue.component** 注册全局组件。
> 注册后，任何通过 `new Vue` 新创建的Vue根实例和其组件树中的子组件，均可全局使用。

```js
// options模式
Vue.component('button-counter', {
    // ...options...
    data() {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

// 组件模式
import ButtonCounter from 'xxx/button-counter'
Vue.component('button-counter', ButtonCounter)
```

**值得注意的是：一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。**

#### 局部注册
全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```

然后在 `components` 选项中定义你想要使用的组件：

```js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

**事实上，任何一个vue文件都是一个组件，可以被其他组件作为局部组件引用。**

因此，如果你通过 Babel 和 webpack 使用 ES2015 模块，推荐这么引用局部组件：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA // ES6简写，实际为ComponentA: ComponentA
  },
  // ...
}
```

#### 父子组件通讯
父子组件通常需要数据的通讯，从vue的单向数据流设计来说，有下面两种方式：
- 父组件通过 props 传值给子组件
- 子组件通过 emit('myEvent') 通知父组件

**我们先来看 `props`**：

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

type 可以是下列原生构造函数中的一个：
* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

**单向数据流**
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. `这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。` 在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. `这个 prop 以一种原始的值传入且需要进行转换。` 在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

> **注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态**。

**传入一个对象的所有 property**
如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

`每个组件必须只有一个根元素`
可以参考这个[讨论](https://github.com/vuejs/vue/issues/7088)

**下面，我们在子组件中通过 `$emit` 发送自定义事件给父组件：**

```html
<!--父组件-->
<FatherComponent v-on:refresh="refreshList"></FatherComponent>
```

```html
<!--子组件-->
<button @click="$emit('refresh', otherData)"></button>
```

**自定义组件上使用v-model**
> 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于不同的目的。`model` 选项可以用来避免这样的冲突


自定义v-model
- 作用：定义可使用v-model做双向绑定的组件
- 原理：
  * 1、组件内部自动管理值和事件；
  * 2、组件内定义model的prop和event，prop的值是承载外部v-model传入的值，event是内部value变化时触发的事件名

```html
<template>
  <div>
    <input type="color" 
      :value="value2"
      @input="$emit('change2', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value2',
    event: 'change2'
  },
  props: ["value2"],
  data() {
    return {
      
    }
  }
}
</script>
```

使用自定义v-model的组件：

```html
<CustomVModel v-model="color"/>

<script>
export default {
    data() {
        return {
          color: '#FF0000'
        }
    }
}
</script>
```

这里的 `color` 的值将会传入这个名为 `value2` 的 prop。同时当 `<CustomVModel>` 触发一个 `change2` 事件并附带一个新的值的时候，这个 `color` 的 property 将会被更新。

**.sync 修饰符**

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

#### 组件生命周期

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### 组件高级特性
#### 插槽slot

> Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 `Web Components` 规范草案，将 `<slot>` 元素作为承载分发内容的出口。

具体做法是：在子组件声明插槽，在父组件中传入插槽内容，**以达到和props类似的效果，但它比props更灵活。props有点像枚举，而slot则无此限制**

```html
<!-- 页面模板 -->
<navigator-link :url="'/user'">
  <template v-slot:start>
    (start content)
  </template>
  <template v-slot:default>
    aaaaaa
  </template>
  <template v-slot:end>
    (end content)
  </template>
</navigator-link>
```

```html
<!-- navigator-link -->
<a :href="url">
  <slot name="start"></slot>
  <slot>default name Aaron</slot>
  <slot name="end"></slot>
</a>
```

#### 动态组件&keep-alive
```html
<template>
    <div>
        <!-- 动态组件-->
        <!-- 场景：未知组件时 -->

        <!-- keep-alive -->
        <!-- 场景：tab切换时，不需要重复渲染的组件，可以优化性能 -->
        <!-- 使用：需配合动态组件使用 -->
        <!-- 实际效果：切换时，DOM会消失，失活的组件将会被缓存！再次显示时，不会重走声明周期，不过提供了 activated 和 deactivated钩子 -->
        <button @click="changeState('A')">A</button>
        <button @click="changeState('B')">B</button>
        <button @click="changeState('C')">C</button>

        <keep-alive>
            <!-- <KeepAliveStageA v-if="state === 'A'"/>
            <KeepAliveStageB v-if="state === 'B'"/>
            <KeepAliveStageC v-if="state === 'C'"/> -->
            <component :is="`KeepAliveStage${state}`"></component>
        </keep-alive>
    </div>
</template>

<script>
import KeepAliveStageA from './KeepAliveStateA'
import KeepAliveStageB from './KeepAliveStateB'
import KeepAliveStageC from './KeepAliveStateC'

export default {
    components: {
        KeepAliveStageA,
        KeepAliveStageB,
        KeepAliveStageC
    },
    data() {
        return {
            state: 'A'
        }
    },
    methods: {
        changeState(state) {
            this.state = state
        }
    }
}
</script>
```

#### 异步组件
> 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。

将异步组件和 webpack 的 code-splitting 功能一起配合使用：

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

你也可以在工厂函数中返回一个 `Promise`，所以把 `webpack 2 和 ES2015 语法`加在一起，我们可以这样使用动态导入：

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

当使用**局部注册**的时候，你也可以直接提供一个返回 `Promise` 的函数：

```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

## 四、可复用性&组合
### 混入mixin
1. 作用是分发组件的可复用功能
2. 组件内使用混入发生冲突时，除钩子函数保留两者之外（优先调用混入的），其他都是保留组件中的值，如data、methods方法等
3. 全局混入会影响每一个之后创建的Vue实例，需十分谨慎！！！Vue-router就是利用Vue.mixin混入了组件选项

示例如下：
```html
<template>
  <div>
    MixinDemo {{name}} {{age}} {{city}}
    <button @click="showName">Show name</button>
  </div>
</template>

<script>

import mixin from './mixin';

export default {
  data() {
    return {
      name: 'Aaron',
      age: '20',
      city: 'Hanchuan'
    }
  },
  mixins: [mixin],
  methods: {
  },
  mounted() {
    console.log('mixinDemo mounted');
  }
}
</script>
```

mixin.js：

```js
export default {
  data() {
    return {
      age: 30,
      name: 'Aaron2'
    }
  },
  methods: {
    showName() {
      console.log(this.name);
    }
  }
}
```


### vue.extends
> vue.extends 用来创建一个vue实例，创建模板

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

### 自定义指令
除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，**有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令**。

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 注册局部指令
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

```html
<input v-focus>
```

#### 钩子函数
- **bind**：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- **inserted**：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- **update**：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- **componentUpdated**：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- **unbind**：只调用一次，指令与元素解绑时调用。

#### 钩子函数参数
- **el**
- **binding**
    - **name**：指令名，不包括 `v-` 前缀。
    - **value**：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    - **oldValue**：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    - **expression**：字符串形式的指令表达式。例如 `v-my-directive="1 + 1" `中，表达式为 `"1 + 1"`。
    - **arg**：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    - **modifiers**：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- **vnode**：Vue 编译生成的虚拟节点
- **oldVnode**：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

#### 函数简写
在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写：

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```
### 渲染函数&JSX
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

渲染函数语法 vs 模板语法
```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

```html
<h1>{{ blogTitle }}</h1>
```

- 优化：在渲染函数中使用JSX
有一个 [Babel](https://github.com/vuejs/jsx) 插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。

```js
new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <h1>{ this.blogTitle }</h1>
    )
  }
})
```

### 过滤器
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。

过滤器可以用在两个地方：
- 双花括号插值
- v-bind 表达式 (从 2.1.0+ 开始支持)。

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

你可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

当全局过滤器和局部过滤器重名时，会采用局部过滤器。

### 插件
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者 property。如：vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等。如 vue-touch
3. 通过全局混入来添加一些组件选项。如 vue-router
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

**使用插件**

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：
```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin, { someOption: true })

new Vue({
  // ...组件选项
})
```

**开发插件**

Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

[插件](https://cn.vuejs.org/v2/guide/plugins.html)
## 五、API

### $nextTick
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})
```

### refs 访问子组件实例或子元素

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 ref 这个 attribute 为子组件赋予一个 ID 引用。例如：

```html
<base-input ref="usernameInput"></base-input>
```

现在在你已经定义了这个 ref 的组件里，你可以使用：

```js
this.$refs.usernameInput
```

## 总结
本章的代码库 [learn-framework-project](https://gitee.com/AaronKong/learn-framework-project) 

## 参考资料
- [vue.js官网](https://cn.vuejs.org/v2/guide/)