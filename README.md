# Vue2学习

# 1 Vue2原理

## 数据代理

    使用Object.definePropty进行数据代理

## 数据监测实现响应式

    1 利用数据代理，在修改数据的时候在setter里面进行对比监测
    
    2 data里面数组数据直接修改的话，监测不到，丢失响应式，通过数组的api来修改数据则可以检测到

## Key

    1 用index作为key遍历数组，在数组前插入数据会出现问题
    
    2 遍历生成虚拟dom的时候，会根据key来做虚拟dom的diff，如果数据放在错误的位子则可能会出现数据
    问题，特别是新加的数据项破坏原数据项顺序的时候，可能会让之前的对比以后觉得不需要修改的数
    据直接拿过来用
    
    3 用唯一标识可以避免问题

# 2 模板语法

## 指令

### v-html

### 自定义指令

#### 函数式

#### 生命周期式

## Attribute

    1 注意区分常量传参和变量传参的区别
    2 动态传参
    	<a v-on:[eventName]="doSomething"> ... </a>

## 条件渲染

### v-if

    通过挂载和卸载来完成

### v-show

    通过display来完成

## 列表渲染

### 过滤

    通过计算属性或者侦听器去判断一个过滤值是否发生变化，然后过滤出来一个数据，拿去遍历渲染

### 注意

    不推荐v-if 和 v-for 一起使用

# 生命周期

## beforeCreated

    数据还没代理 data和methods都无法使用

## created

    可以调用data和methods   在这把常量数据定义会比在mounted定义性能更好

## beforeMount

    还没有被Vue编译解析的Dom，所有对DOM的操作最终都不生效

## mounted

    对Dom生效，尽量避免
    
    一般在此进行网页的操作

## beforeUpdate

    数据是新的  页面是旧的

## updated

    页面和数据都是新的

## beforeDestory

    data methods 都还可以用  但是不会触发更新
    一般在这里清除定时器和释放资源

## destory

# 3 事件

## 事件对象

    触发事件的参数，如果不传参数 第一个是事件对象   传参的话需要用$event进行占位

## 事件修饰符

    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>
    
    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>
    
    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>
    
    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>
    
    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>
    
    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
    
    <!-- 点击事件将只会触发一次 -->
    <a v-on:click.once="doThis"></a>
    
    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
    
    <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
    <input v-on:keyup.enter="submit">

## 键盘事件

## 自定义事件

### 事件绑定

    1 父组件通过v-on定义传递
    2 父组件通过ref定义传递

### 事件解绑

# 表单绑定

## 基础用法

    1 输入框
    2 多行文本
    3 复选框          绑定到数组
    4 单选		    绑定到字符串
    5 下拉框		   绑定到字符串 可以多选时绑定到数组

## 修饰符

    <!-- 在“change”时而非“input”时更新 -->
    <input v-model.lazy="msg">
    
    如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
    <input v-model.number="age" type="number">
    
    如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：
    <input v-model.trim="msg">

# 4 计算属性

## 计算属性VS方法调用

    计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。也就是页面其他地方触发的渲染，如果计算属性没有变化，那么直接访问缓存，不会重新执行计算。
    相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

## setter

    计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
    设置setter以后可以反向操作数据

# 5 监视

## 参数

    1 newValue
    2 oldValue

## 深度监视

    对象的监视直接监视，默认监视的是对象地址值
    如果需要监视对象具有多级数据的，需要配置deep属性

## 即刻监视

    在挂载的时候执行一次

## 注意

    1 计算属性也能被监视
    2 编程式也能实现，用$watch

# 6 样式

    Vue的样式绑定支持直接绑定和动态绑定
    1 class直接绑定
    2 v-bind:class 动态绑定 
    	{ active: isActive, 'text-danger': hasError }（可以直接定义成一个对象传入）
    	[isActive ? activeClass : '', errorClass]
    	[{ active: isActive }, errorClass]
    
    内联样式也支持直接绑定和动态绑定

# 组件

## 注册

    1 组件名
        W3C 规范中的自定义组件名是kebab-case的格式，组件在命名的时候使用PascalCase 或者
    kebab-case的格式都可以，但是组件在引用的时候，如果用PascalCase进行命名但是使用的时候
    <my-component-name> 和 <MyComponentName> 都是可接受的。
        统一都用PascalCase就好了
        注意：elint默认会检测组件命名是否是multi-word的形式，解开这个限制就可以正常单个单词命
    名了。
    
    2 全局注册
        Vue.component()
    3 局部注册
        引入使用即可

## Props

### 定义方式

    // 不规定类型
    props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
    
    // 指定类型
    props: {
      title: String,
      likes: Number,
      isPublished: Boolean,
      commentIds: Array,
      author: Object,
      callback: Function,
      contactsPromise: Promise // or any other constructor
    }

### 传值方式

    1 注意传变量和常量的区别
    
    2 注意v-for的使用以及没办法直接解构
    
    3 传入
    	静态值
    	动态值
    	数字：传入数字可以直接用动态传值，这样识别的就是数字
    	布尔值：有特殊写法
    	数组
    	对象：有特殊写法
      
    4 类型检查
    	控制台会报错

### Props验证

    // props 变量可以写成对象的格式 通过字段去定义规则
    	{
    		type：类型1 | 类型2 | 也可以是自定义的构造函数，
    		required：ture | false，
    		defalut：'value' | 对象或者数组需要通过函数的形式返回
    		validator：fuction（）{
    		   ...
    		}
    	}
    	
    // 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告
    // 注意那些 prop 会在一个组件实例创建之前进行验证,所以组件实例对象上的值在default和validator上是无法访问的

### 非Props的属性

    1 attribute 就会自动添加到组件的根元素上
    
    2 这个特性在给组件传递attribute需要注意
        绝大多数 attribute 来说属性组件传过去以后会破坏
    	class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值
    
    3 也可以进行禁用 inheritAttrs: false，可以配合$attrs 属性使用，通过attrs获取传过来的
    attribute，那就可以随意的进行使用了，不用担心根元素影响了


## 子父通信

    父组件先通过v-on 传一个函数变量给子组件，然后子组件通过$emit触发
        父组件定义一个处理函数
        父组件通过v-on:事件="处理函数"
        子组件通过$emit('事件名去触发'，可写参数)

## 动态组件

    <!-- 失活的组件将会被缓存！-->
    <keep-alive>组件</keep-alive>
    
    还有两个钩子在vue-router  组件失活和组件激活

## 异步加载

    1 这个动态导入会返回一个 `Promise` 对象。下面的方式是组件懒加载，在调用的时候才会加载，相对
    优化
      components: {
        TestCom:()=>import ('./components/TestCom.vue')
      },
    
    2 可以直接通过API实现加载的处理，实现组件的Lodging或者加载失败的处理
    const AsyncComponent = () => ({
      // 需要加载的组件 (应该是一个 `Promise` 对象)
      component: import('./components/TestCom'),
      // 异步组件加载时使用的组件
      loading: LoadingCom,
      // 加载失败时使用的组件
      error: ErrorCom,
      // 就是如果延迟超过这个时间，则显示加载组件
      delay: 100,
      // 如果提供了超时时间且组件加载也超时了，注意不能太短
      timeout: 300
    })
    一般用这个来写一个高阶的组件加载函数

# 插槽

## 默认值

```
可以在插槽中包一个值，如果没有对于的内容传入的话，则这个值会变成默认值
```

# Vue 实例配置

# Vuex

## 安装

    npm i vuex@3

## 基本使用

## Getters

## mapState & mapGetters

    批量获取数据的简写

## mapActions & mapMutations

## 模块化

# VueRouter

## 1 安装

    // 安装3版本
    npm i vue-router@3

## 2 基础使用

### 2.1 调用

    // 可以在main.js里面调用   也可以在路由器对象创建的文件中调用
    Vue.use(VueRouter)

### 2.2 路由组件的状态

    当路由进入的时候，组件被挂载，当离开的时候，组件被卸载

### 2.3 路由和路由器

    路由和路由器对象都会被挂到组件实例上，可以直接在组件中操作路由
    	路由参数信息都可以在路由对象上获取

### 2.4 路径匹配的方式

    通配符的路由应该放在最后。路由 { path: '*' } 通常用于客户端 404 错误，路由的优先级是根据路由定义的顺序
    
    path: '/user-*'会匹配以 `/user-` 开头的任意路径,支持这种写法
    
    还可以正则匹配

## 3 router-link属性

### 3.1 to

### 3.2 active-class

### 3.3 replace

## 4 routes配置

### 4.1 path

### 4.2 component

    component: () => import('../pages/MessageComponent')
    或者
    component：MessageComponent

### 4.3 children 路由嵌套

    [router,....]

### 4.4 name

    使用
    :to={name:'name'}

### 4.5 redirect

    path、路径和函数都可以

### 4.6 alias

    /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样

## 5 路由传参

### 5.1 query参数的模板字符串写法

    <router-link :to="`/home/message/detail?id${message.id}&message=${message.message}`" activbe-class="active">
              {{ message.message }}
    </router-link>		

### 5.2 query参数的对象写法

    <router-link :to='{
              path:"/home/message/detail",
              query: {
                id: message.id,
                message: message.message
              }}'>
              {{ message.message }}
    </router-link>

### 5.3 params参数的模板字符串写法

    <router-link :to="`/home/message/detail/${message.id}/${message.message}`" activbe-class="active">
              {{ message.message }}
    </router-link>

### 5.4 params参数的对象写法

    to只能填写name

### 5.5 路由的props

    目的：直接简化参数的调用，{{ $route.params.id }} 简化成{{ id }}
    
    三种写法：
    1 对象写法
    	只能传入固定值？？？
    2 布尔写法 只能对于params参数
    	只要为真就会以props形式传递给组件
    3 函数写法 可以在参数里面传入路由$route
    	返回值写法

## router属性

## 缓存路由组件

    <keep-alive include="组件名字">
    </keep-alive>

## 组件加载卸载钩子

主要是针对比如说缓存的路由组件在切走的时候需要用钩子去处理

* activated


  路由组件呈现的时候调用

* deactivated


  路由切走的时候调用

## 路由守卫

*   全局前置守卫

*   全局解析守卫

*   全局后置守卫

*   路由守卫

*   组件内的守卫

    *   `beforeRouteEnter`

    *   beforeRouteUpdate

    *   `beforeRouteLeave`

## 路由守卫进程

    导航被触发。
    在失活的组件里调用 beforeRouteLeave 守卫。
    调用全局的 beforeEach 守卫。
    在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    在路由配置里调用 beforeEnter。
    解析异步路由组件。
    在被激活的组件里调用 beforeRouteEnter。
    调用全局的 beforeResolve 守卫 (2.5+)。
    导航被确认。
    调用全局的 afterEach 钩子。
    触发 DOM 更新。
    调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 路由元数据

## 路由切换动效

## 路由懒加载
