##          面试小知识

## 1.跨域

## 2.promise

## 3.传值

## 4.封装组件

## 5.路由传参

## 6.小程序授权

用户点击登录按钮 获取登录成功后的token

1. 先拿到用户的授权

2. 根据用户的授权拿到用户的隐私数据

3. 调用 wx.login （）获取code

4. 调用后台接口拿到成功后的token

   注意 登录ID要用公司的ID

wx.getuserinfo() 获取 其他数据 IV 啥的 未授权 则获取不到

###### 授权

根据button按钮中的open-type的属性设置合法值 获取用户信息

通过getuserinfo  从bindgetuserinfo获取用户信息

![](D:\01笔记\小小面试题\面试知识\assets\snipaste_20200302_170914.png)

通过e.detal.userinfo 获取用户信息

### 7.支付

1. 调用后台api接口创建订单  得到订单编号

   ​	1.1判断用户是否指定了收货地址

   ​	1.2判断订单总价是否为0

   ​	1.3判断订单中商品的件数是否为0

   ​	1.4组织出订单中商品的数组（请求对象的参数）

   ​	1.5发起创建订单的请求

2. 根据得到的订单编号 调用后台api接口获取支相关的参数‘  得到支付参数

3. 调用小程序官方提供的WX.requestPayment()函数 实现支付

### 8. token   在 Token 失效后清空本地存储中的 token 字符串

​	

1. 在 `app.wpy` 中，找到 `constructor` 构造函数，并且定义清空token的代码：

   ```js
         complete(p) {
           // 隐藏 loading 效果
           wepy.hideLoading()
           console.log(p.data.meta)
           // 在这里清除 storage 中无效的 token
           if (p.data.meta.msg === '无效token' && p.data.meta.status === 401) {
             // 如果同时满足这两个条件，证明 storage 中的 token 已经过期了
             this.globalData.token = null
             this.saveToStorage()
           }
         }
   ```

2. 在页面中，请求那些有权限的接口：

   ```js
         // 1.5 发起创建订单的请求
         const { data: res } = await wepy.post('/my/orders/create', params)
         console.log(res)
   
         // 强制页面重新渲染
         this.$apply()
   ```

   

## vue

#### 什么是生命周期

- ###### Vue实例从创建到销毁的过程，就是生命周期。

- ###### 从开始创建、初始化数据、到编译模板、挂载DOM->渲染、更新->渲染、销毁等一系列过程，称之为Vue的生命周期

1. beforeCreate  创建前   =>  在数据观测和初始化事件还未开始，可以在这加个loading事件
2. created            创建后   =>   获取data里面数据，没有DOM，在这结束loading，还做一些初始数据的获取，实现函数自执行
3. beforeMount  载入前    =>  相关的render首次被调用，把data里面的数据和模板生成HTML，但并没有挂在到页面上
4. mounted          载入后    =>   用上面编译好的html内容替换掉el所指向的DOM对象，此过程中进行ajax操作，在这发起后端请求，拿回数据，配合路由钩子做一些事情
5. beforeUpdate   更新前    =>  在数据更新之前调用，发生虚拟DOM渲染之前
6. uodated              更新后   =>  组件DOM已经更新，可以执行依赖于DOM的操作
7. beforeDestroy    销毁前   =>   在实例销毁之前调用
8. destroyed            销毁后   =>   所有的事件监听都会被移出，当前组件已被删除，清空相关内容

#### 组件传值

- 父传子

  - 子元素通过props方法接受数据

- 子传父

  - $emit方法传递参数

- 兄弟

  - 创建一个new Vue 实例，用它来传递和接受数据

  - 在需要传值的组件中用bus.$emit触发一个自定义事件，并传递参数

    在需要接收数据的组件中用bus.$on监听自定义事件，并在回调函数中处理传递过来的参数

1. 组件间的父子之间的传值
    思路：父组件调用子组件dom位置声明一个名称，然后在子组件接收这名称，便可直接调用

  ###### 父组件

![](D:\01笔记\小小面试题\面试知识\assets\1.png)

###### 子组件

![](D:\01笔记\小小面试题\面试知识\assets\2.png)

###### 2.组件间的子父之间的传值

思路：在子组件通过触发一个事件带值，让父组件接受这个事件，解析这个值
子组件

![](D:\01笔记\小小面试题\面试知识\assets\3.png)

###### 父组件 

![](D:\01笔记\小小面试题\面试知识\assets\4.png)

3.非组件间的组件间的传值（简称：EventBus）
先用例子来解释下组件间的关联：组件A比作一个路由，通过中继器(eventBus.js)让其他房子接收到信号（组件B）
思路：首先在src目录下创建一个eventBus.js文件，复制这行代码进去

```js
import Vue from 'vue'
let connect = new Vue()    // 实例
export default connect
```



组件A

![](D:\01笔记\小小面试题\面试知识\assets\5.png)


组件B 

![](D:\01笔记\小小面试题\面试知识\assets\6.png)
原文链接：https://blog.csdn.net/weihaifeng163/article/details/88338822

# vue路由传参的三种基本方式.

先有如下场景 点击当前页的某个按钮跳转到另外一个页面去，并将某个值带过去

```csharp
<div class="examine" @click="insurance(2)">查看详情</div>
```

##### 第一种方法     页面刷新数据不会丢失



```jsx
methods：{
  insurance(id) {
       //直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/particulars/${id}`,
        })
}
```

需要对应路由配置如下：



```css
{
     path: '/particulars/:id',
     name: 'particulars',
     component: particulars
   }
```

可以看出需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值
 另外页面获取参数如下



```csharp
this.$route.params.id
```

##### 第二种方法  页面刷新数据会丢失

通过路由属性中的name来确定匹配的路由，通过params来传递参数。



```csharp
methods：{
  insurance(id) {
       this.$router.push({
          name: 'particulars',
          params: {
            id: id
          }
        })
  }
```

对应路由配置: 注意这里不能使用:/id来传递参数了，因为组件中，已经使用params来携带参数了。



```css
 {
     path: '/particulars',
     name: 'particulars',
     component: particulars
   }
```

子组件中: 这样来获取参数



```csharp
this.$route.params.id
```

##### 第三种方法

 使用path来匹配路由，然后通过query来传递参数
 这种情况下 query传递的参数会显示在url后面?id=？



```kotlin
methods：{
  insurance(id) {
        this.$router.push({
          path: '/particulars',
          query: {
            id: id
          }
        })
  }
```

对应路由配置：



```css
{
     path: '/particulars',
     name: 'particulars',
     component: particulars
   }
```

对应子组件: 这样来获取参数



```kotlin
this.$route.query.id
```



作者：w夏了夏天
链接：https://www.jianshu.com/p/d276dcde6656
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### v-if /v-show区别

- ###### v-if

  - 是否渲染这个标签
  - v-if是动态的向DOM树内添加或者删除DOM元素
  - v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件
  - v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；，v-if有更高的切换消耗，不适合做频繁的切换

- ###### v-show

  - display控制node/block
  - v-show是通过设置DOM元素的display样式属性控制显隐，v-show只是简单的基于css切换；
  - v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素始终被保留；v-show有更高的初始渲染消耗，适合做频繁的切换

#### vue怎么封装组件

-   建立组件的模板，先把架子搭起来，写写样式，考虑好组件的基本逻辑。
- 准备好组件的数据输入。即分析好逻辑，定好 props 里面的数据、类型
  - props 中接收数据，注意props对象里面 键值 是对数据 数据类型 的规定
  - 传过来的数据只做展示，不得修改，如果想修改，再新写一个data中的变量承接做数据的再处理
- 准备好组件的数据输出。即根据组件逻辑，做好要暴露出来的方法
  - 父组件将 对象 数据传递给子组件，子组件直接通过$emit修改props过来的对象的值,利用事件和传递的参数修改
- 封装完毕了，直接调用即可

- 组件思想        组件思想，是封装一个独立的、可复用的功能模块

#### vue里ref获取DOM节点

- ref 就是直接获取了你的dom节点，如果是div一类的基本dom和js的document.getElementsByTagName()效果一样的，而且这样节省开销。你可以在父组件中直接 this.$refs.refTest3.selectValue.data。直接获取子组件data中的数据，或者别的数据都可以获取。但是，这个不是我们封装组件会用的东西，因为这个用在父组件。组件的思想是 独立的

#### 路由守卫

- 当路由发生变化的时候，我们想要做的事情
  - 全局守卫      全局前置守卫 router.beforeEach(fn)
  - 组件内局部
  - 路由独享的守卫

#### 解释一下vue的双向数据绑定

- 表单控件上添加v-model，视图改变驱动数据改变

#### vue的双向数据绑定的原理

- VUE实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的。
- vue 双向数据绑定是通过 数据劫持 结合 发布订阅模式的方式来实现的， 也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变；

#### 你对mvvm开发模式的理解

- 在mvvm架构下，view和model并没有直接联系，而是通过ViewModel进行交互，Model和ViewModel之间的交互是双向的，因此view和model的数据变化会同步
  - M   model,数据模型，可以定义数据修改和操作的业务逻辑
  - V    view，UI组件，视图区域
  - VM  监听模型数据的改变和控制试图区域的行为，是一个同步view和model的对象

#### 说下你对mvvm的理解？双向绑定的理解？

- mvvm就是vm框架视图、m模型就是用来定义驱动的数据、v经过数据改变后的html、vm就是用来实现双向绑定
- 双向绑定:一个变了另外一个跟着变了，例如：视图一个绑定了模型的节点有变化，模型对应的值会跟着变

#### 请说下具体使用vue的理解？

- 1、使用vue不必担心布局更改和类名重复导致的js重写，因为它是靠数据驱动双向绑定，底层是通过Object.defineProperty() 定义的数据 set、get 函数原理实现。

- 2、组件化开发，让项目的可拓展性、移植性更好，代码重用性更高，就好像农民工建房子，拿起自己的工具包就可以开工。项目经理坐等收楼就好。

- 3、单页应用的体验零距离接触安卓原生应用，局部组件更新界面，让用户体验更快速省时。

- 4、js的代码无形的规范，团队合作开发代码可阅读性更高。

#### vue-router怎么配置路由

   1 .引入vue-router 

2. 定义导航

3. 定义容器
4. 实例化一个VueRouter
5.  配置路由表
6.  挂载路由

- router-link制作导航
- 设置容器 router-view
- js提供要渲染的组件选项对象
- js实例化路由new VueRouter（{}）
- js配置路由routes：[{}]
- 就是路由挂载到new vue  里面

### 怎么添加子路由

- childre:[{}]

#### 怎么获取动态路由参数

- $route.params

#### 怎么解决spa首屏加载慢的问题

- 懒加载
  - 这种优化，就是将每个组件的js代码独立出来，在使用到这个组件时，才向服务器请求文件，并且请求过一次后就会缓存下来，再次使用到这个组件时，就会使用缓存，不再发送请求
- CDN 
  - CDN引入依赖文件
- 使用服务端渲染的方式
  - 最好不说，解释太麻烦

#### 用vue-cli初始化项目的命令是什么

- vue init webpack 项目名

#### vue-cli启动项目的命令是什么

- npm run dev

#### 配置路由没有问题，但是组件没有渲染出来有几种原因

- router-view 容器没写
- template没有一个根标签
- 路由未挂载

#### vue全家桶是什么

- Vue-cli  项目构建工具
- vue-router  路由
- vuex  状态管理
- axios  http请求工具
- webpack

#### vue和jquery有什么区别

- jquery

  - jQuery是使用选择器（$）选取DOM对象，对其进行赋值、取值、事件绑定等操作，其实和原生的HTML的区别只在于可以更方便的选取和操作DOM对象

- vue

  - Vue对象将数据和View完全分离开来了。对数据进行操作不再需要引用相应的DOM对象，可以说数据和View是分离的，他们通过Vue对象这个vm实现相互的绑定。这就是传说中的MVVM

  - 核心特性

    - 双向数据绑定

    - 通过 指令 扩展了 HTML，通过 表达式 绑定数据到 HTML

    - 解耦视图与数据

      - js->只能看到数据

        view（视图）里面只有标签

    - 可复用组件

      - 组件：封装html/css/js 三部分  以前只封装了js

    - 虚拟DOM 

      - 操作DOM（真实DOM）-> attr/classname等
      - 虚拟DOM->js对象-重量要比真实DOM轻很多
      - M-V-vM    M(model数据)-V（view视图）-VM（视图模型）

    - 数据驱动视图

      - 视图使用数据-》{{数据}}->数据变化->视图自己变化

#### 路由之间怎么进行跳转

- 声明式
- 编程式
  - this.$router.push({name:'组件名')};

#### 你是怎么认识vuex的     大型项目   页面大于45页 接口大于200个

- vueX本质上是一个数据状态管理仓库，当同一个数据需要在多个视图上使用时，传统的组件通信较为复杂，不便于维护，就需要vuex集中管理这些数据

   1、vuex可以理解为一种开发模式或框架。比如PHP有thinkphp，java有spring等。

  2、通过状态（数据源）集中管理驱动组件的变化（好比spring的IOC容器对bean进行集中管理）。

  3、应用级的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。

#### vuex有哪几种属性

- state       声明定义数据
- getters     存放有依赖关系的数据，类似于computed计算属性
- mutations  同步的修改state中数据
- actions   异步修改数据
- modules   让每一个模块都拥有自己的state、getters、mutations、actions，方便管理

#### 说一下你的vue项目为什么使用axios不使用jquery的$ajax 和原生ajax

- vue是虚拟DOM操作的   jquery.ajax 和ajax都需要操作DOM  官方不推荐，而且axios本身就可以解决 回调地狱的问题

#### 说一下computed和methods以及watch的区别

- computed    computed是在HTML DOM加载后马上执行的，如赋值；
- methods    methods则必须要有一定的触发条件才能执行，如点击事件
- watch    检测一个数据的变化
- 执行顺序  先computed再watch，不执行methods；等触发某一事件后，则是：先methods再watch。

#### 你在项目中axios是怎么样配置路径的

- 入口文件中（main.js）

  - 1导入axios组件

    2配置信息

    3挂载vue原型中

#### 你是怎么考虑vue不利于seo**优化问题的**

- 问题看待
  - 用vue不一定要做成SPA 可以直接拿Vue代替jQuery做常见的交互增强
  - 对于真正适合做SPA的项目，seo反而通常不是问题，app本身需要登录才能用，SEO没意义
- 也可以这么回答：就说我做的项目是后台管理系统，是内部用的，没考虑SEO优化的问题，但是之前我也了解到可以用服务端渲染 
- 解决方法（不会就不要说）
  - 页面预渲染
  - 服务端渲染
  - 路由采用h5 history模式

#### 你用vue里面的过滤器实现了什么功能

- 时间处理
- 金额（价格）处理

#### vue为什么在new实例化的时候data是一个对象，在组件中是一个函数

- 每一个vue组件都是一个vue实例，通过new Vue()实例化，引用同一个对象，如果data直接是一个对象的话，那么一旦修改其中一个组件的数据，其他组件相同数据就会被改变
- 而data是函数的话，每个vue组件的data都因为函数有了自己的作用域，互不干扰。

#### 说一下mvvm和mvc的区别

- MVVM实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变

#### 谈谈你对webpack配置的理解

- 一个模块打包工具 它能够很好地管理、打包Web开发中所用到的 HTML、JavaScript、CSS

  以及各种静态文件（图片、字体等），让开发过程更加高效。对于不同类型的资源， webpack有对应的模块加载器，去安装一些loader去解析

#### vue-router路由的两种实现模式，但是vue-router默认的是hash模式

- hash模式

  - 符号#以及#后面的字符被称为hash 用windows.location.hash获取
  - hash模式的工作原理是hashchange事件，可以在window监听hash的变化

- history模式

  - 采用h5新特性，且提供了两个新方法，可以对浏览器的历史记录栈进行修改

    - pushState（）
    - replaceState（）

  - 这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面，这种模式需要后台配置支持

    - const router = new VueRouter({

        mode: 'history',

        routes: [...]

#### vue怎么实现组件缓存

- 组件缓存用的用在来回切换组件的时候

  - 1、可以在router中设置router的元信息meta

    ```js
    列如：routes: [
        {
          path: '/',
          name: 'Hello',
          component: Hello,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
    ```

  - 、在页面中判断是否有$route.meta.keepAlive是否是true，如果是true，则进行缓存

    - 给组件添加<keep-alive></keep-alive>

#### axios怎么实现同步的请求

- 这个是通过async配合await的

#### vue-router是干什么的，原理是什么？

vue-router是Vue.js框架的路由插件  更新视图但不重新请求页面 

（1）利用URL中的hash("#");

（2）利用History interface在HTML5中新增的方法;

## js

#### 谈谈你对原型/原型链的理解

- 每个构造函数一旦创建都有prototype指针指向它的原型对象（构造函数.prototype）。而原型对象（构造函数.prototype）会默认生成一个constructor指针又指向构造函数。
- 原型的作用
  - 资源共享，节约空间，实现继承
  - 任何一个构造函数都有一个prototype属性，是一个对象，都有一个construction属性指向prototype所对的函数
  - 通过构造函数得到的实例对象内部会包含一个指向构造函数的 prototype 对象的指针 __proto__
  - 所有实例都间接或直接继承了原型对象的成员
- 原型链
  - 首先从对象实例本身开始
  - 如果在实例中找到了具有给定名字的属性，则返回该属性的值
  - 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
  - 如果在原型对象中找到了这个属性，则返回该属性的值

#### 什么是闭包，在哪用过闭包，闭包的使用场景是什么

- 闭包是什么
  -  闭包就是能够读取其他函数内部变量的函数。
- 在哪用过闭包
  - 需要获取函数内部变量时
- 闭包的使用场景是什么
  - 闭包可以用在许多地方。它的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，
- 闭包的优点
  - （1）逻辑连续，当闭包作为另一个函数调用参数时，避免脱离当前逻辑而单独编写额外逻辑。
  - （2）方便调用上下文的局部变量。
  - （3）加强封装性，是第2点的延伸，可以达到对变量的保护作用。
- 使用闭包的注意点（缺点）
  - （1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
  - （2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
- 面试叙述
  - 说起闭包就不得不说一下作用域，作用域分为全局作用域和局部作用域，在js里面，函数内部可以访问全局作用域里面的变量，但是外部却不可以访问函数内部里面的变量，所以为了外部可以使用函数内部的变量，就产生了闭包，延伸函数内部变量的作用范围，即使函数销毁了，也会让变量的值保存在内存里，方便了上下文调用局部变量，但使用的同时也消耗了内存，如果不小心的话，可能在使用闭包的同时，改变了原有函数内部的值
- 怎么实现继承
  - 原型链继承
    - 将父类的实例作为子类的原型  继承父类方法
  - 构造继承
    - 利用call或者apply把父类中通过this指定的属性和方法复制（借用）到子类创建的实例中
  - 组合继承
    - 通过调用父类构造，继承父类的属性并保留传参的优点，然后再通过将父类实例作为子类原型，实现函数复用

#### 栈和堆的区别

- 栈
  - 栈的特性：先进后出，主要为一个线程独享，为这个线程的函数的调用服务的。用于存放返回地址，零时变量个参数而用
  - 一般是由系统分配变量内存，只有2M大小，Linux有8M，相对来说不是太大，空间由高地址向低地址分配
  - 由系统自己分配，速度较快，但是程序员无法掌握。
- 特点
  - 堆的大小相对于操作虚拟空间，所有操作空间比较灵活，但相对来说速度也变慢了
  - 栈虽说分配的内存比较少，但速度也快了很多
- 堆
  - 堆的分配和释放是由程序员来分配和释放。在windows系统里面一般是小于2G的。因为系统是用链表来实现空闲地址空间的，
  - 堆的空间分配一般是由低地址向高地址分配
  - 一般有两种方法来申请内存，new、和malloc，new是一种运算符而malloc是函数。由程序员申请出来的内存一般速度比较慢，而却容易产生内存碎片，不过用起来比较方便。 

#### 浏览器兼容问题

- 1，浏览器兼容问题一：不同浏览器的标签默认的margin和padding不同

​			问题症状：随便写几个标签，不加样式控制的情况下，各自的margin 和padding差异较大。

​			碰到频率:100%

​			解决方案：

​			可以使用Normalize来清除默认样式

- 2，浏览器兼容问题二：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大

  ​     问题症状:常见症状是IE6中后面的一块被顶到下一行

  ​    碰到频率：90%（稍微复杂点的页面都会碰到，float布局最常见的浏览器兼容问题）

  ​    解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性 

  ​    备注：我们最常用的就是div+CSS布局了，而div就是一个典型的块属性标签，横向布局的时候我们通常都是             用div float实现的，横向的间距设置如果用margin实现，这就是一个必然会碰到的兼容性问题。

- 3，浏览器兼容问题三：设置较小高度标签（一般小于10px），在IE6，IE7，遨游中高度超出自己设置高度

  ​      问题症状：IE6、7和遨游里这个标签的高度不受控制，超出自己设置的高度

  ​     碰到频率：60%

  ​     解决方案：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

  ​     备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是IE8之前的浏览器都会给      标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。

#### 常见的兼容性问题：

- 1、不同浏览器的标签默认的外补丁( margin )和内补丁(padding)不同
  - 解决方案： css 里增加通配符 * { margin: 0; padding: 0; }
- 2、IE6双边距问题；在 IE6中设置了float , 同时又设置margin , 就会出现边距问题
  - 解决方案：设置display:inline;
- 3、当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度
  - 解决方案：超出高度的标签设置overflow:hidden,或者设置line-height的值小于你的设置高度
- 4、图片默认有间距
  - 解决方案：使用float 为img 布局
- 5、IE9一下浏览器不能使用opacity
  - 解决方案：opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
- 6、边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值；
  - 解决方案：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为overflow:hidden；
- 7、cursor:hand 显示手型在safari 上不支持
  - 解决方案：统一使用 cursor:pointer
- 8、两个块级元素，父元素设置了overflow:auto；子元素设置了position:relative ;且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；
  - 解决方案：父级元素设置position:relative

#### 前端性能优化

- 1、减少http请求，合理浏览器缓存
- 2、启用压缩：HTML、CSS、javascript文件启用GZip压缩可达到较好的效果
- 3、CSS Sprites：合并 CSS图片，减少请求数的又一个好办法。
- 4、LazyLoad Images：在页面刚加载的时候可以只加载第一屏，当用户继续往后滚屏的时候才加载后续的图片
- 5、CSS放在页面最上部，javascript放在页面最下面：让浏览器尽快下载CSS渲染页面
- 6、异步请求Callback（就是将一些行为样式提取出来，慢慢的加载信息的内容）
- 7.路由懒加载
- 8.减少cookie传输

#### HTTPS相比于http协议的优缺点

- 优点
  - 相对于http，HTTPS可以提供更加优质的保密信息，保证用户数据的安全性，此外HTTPS也在一定程度上保护了服务端，让使用恶意的攻击和伪装的成本大大提高
- 缺点
  - 缺点也同样明显，那就是HTTPS的技术门槛很高，个人和私人网站难以支撑，而且还收费，对于服务端来说也是有负担的，因为他需要更多的资源来支撑，相对来说，http网站还是在大量使用的

## jsonp原理（面试会碰到）

> 虽然这个方案现在用的越来越少，但是面试还是挺爱问的

1. script标签的src属性，可以发送请求，没有`同源限制`
2. 和`Ajax`一点关系都木有：
   1. `network`中选到`xhr`分类，什么都看不到
3. 本质是动态创建了一个`script`标签添加到页面顶部
   1. src设置的:`接口地址`+`发送的数据`+`callback=xxx`
4. 请求成功之后会被自动移除
5. 服务器返回了:函数的调用`函数名({对象})`
6. 内容返回到浏览器之后会被解析为`js`，调用定义好的函数，传入了一个参数

jQuery的jsonp

![1572228409990](D:/A就业知识/08--Node.js/Node.js-Day04/01-教学资料/assets/1572228409990.png)

自己写jsonp

![1572228673181](D:/A就业知识/08--Node.js/Node.js-Day04/01-教学资料/assets/1572228673181.png)

注意：

1. 工作中肯定是用jQ的
2. 自己写需要
   1. 创建标签
   2. 声明函数
   3. 可能还需要自行移除标签
   4. 这些`jQ`都帮你干好了
3. 虽然是民间的解决方案，但是很好用，广大程序员就做好了约定
4. 你必须发送`callback`
5. 后端也是通过`callback`去获取方法名字
6. 缺点:
   1. 不支持`post`请求
   2. 数据大的话，搞不定，文件上传搞不定
7. 流行的原因:
   1. `兼容性`好到令人发指

## 一、jsonp跨域原理

利用script标签的异步加载特性实现给服务端传一个回调函数，服务器返回一个传递过去的回调函数名称的JS代码。即：利用script标签的src属性，通过动态创建一个script标签，指定src属性为跨域的api，那么html会把返回的字符创当作javascript代码来进行解析，如果我们在返回的字符串中使用自定义函数形式包装起来，然后在html中调用自定义函数，即可拿到返回的字符串。

## 二、优点

能够直接访问响应文本，可用于浏览器与服务器间的双向通信。

## 三、缺点

JSONP从其他域中加载代码执行，其他域可能不安全；难以确定JSONP请求是否失败。

## 四、手动实现jsonp

1、 挂载回调函数

2、 将data转化成url字符串的形式

3、 处理url地址中的回调参数

4、 创建一个script的标签

5、 将script标签放到页面中

#####     // 手动实现jsonp跨域

   ```js
 ;(function(window, name){
        var jsonp = function(url, param, callback){
            var callbackSuffix = Math.random().toString().replace('.', '');
            // console.log(callbackSuffix);  // 07626840955849186
            var callbackName = "callback_function" + callbackSuffix;
            // console.log(callbackName); // callback_function07626840955849186
            window[callbackName] = callback;
            var queryString = url.indexOf('?') == -1 ? "?" : '&';
            // console.log(queryString); // ?
            for(var key in param){
                queryString += key + '=' + param[key] + '&';
            }
            // console.log(queryString); // ?count=10&start=15&
            queryString += 'callback=' + callbackName;
            // console.log(queryString); // ?count=10&start=15&callback=callback_function07626840955849186
            var scriptElement = document.createElement('script');
            scriptElement.src = url + queryString;
            document.body.appendChild(scriptElement);
        };
        window.$jsonp = jsonp; 
    })(window, document);
   ```



###### 测试例子：

```js
<div id="result"></div>

// 使用
(function(){
    $jsonp('http://api.douban.com/v2/movie/in_theaters', {count:10, start:15}, function(data){
        document.getElementById('result').innerHTML = JSON.stringify(data);
    });
})();
```
## 五、使用：jquery+ajax+jsonp

```js
$.ajax({
      type : "get",
      async: false,
      url : "ajax.ashx",
      dataType : "jsonp", // 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断
      jsonp: "callbackparam",  //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
      jsonpCallback:"success_jsonpCallback",  //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
      success : function(json){
          alert(json);
          alert(json[0].name);
      },
      error:function(){
           alert('fail');
      }
 });
```



原文链接：https://blog.csdn.net/ganyingxie123456/article/details/78142171

## 跨域方案 - CORS(目前最为流行的方案)

> 需要后端配合
>
> 目前最为常用的一种跨域解决方案

传送门: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS 

1. CORS:
   1. cross:跨
   2. origin：域
   3. resource：资源
   4. sharing：共享
2. 目前用的最多的
3. `HTML5`中推出的新标准，低版本浏览器不支持`ie`

用起来简单到令人发指：

1. 前端：什么事不不用干
2. 后端：设置允许跨域
   1. express中：
      1. 响应数据之前：设置一个允许的header
      2. ` response.header('Access-Control-Allow-Origin', '*');`
   2. 无论用什么开发的后端：都需要设置上面类似的内容，才可以允许前端访问



注意：

1. CORS原理：
   1. 浏览器能够识别` ('Access-Control-Allow-Origin', '*');`这个header
   2. 请求发给服务器之后
   3. 服务器返回的响应头中有一个允许的标记
   4. 浏览器就认为服务器允许跨域访问，没有了跨域的错误
2. 缺点：
   1. 兼容性比`jsonp`差一些
   2. 微软已经放弃`xp` `ie5,ie6`基本没人用
3. 优点:
   1. get和post都支持
   2. 前端什么都不用干
4. 无论是jsonp还是`cors`一定需要后端配合
5. 纯前端在`正常情况下无法跨域`

# 				JSON Server

- JSON Server 是一个提供测试环境接口的工具，它可以帮我们快速生成一套接口服务，专门用于学习测试。
- 它是免费开源的命令行工具

# 			axios

- [axios](https://github.com/axios/axios) 是一个基于 Promise 的第三方 HTTP 客户端请求库，可以用于浏览器或者 Node.js。
  axios 本身和 Vue 没有一毛钱关系，只是简单纯粹的封装了 HTTP 请求功能。可以运行在任何支持 JavaScript 环境的平台。

#### 单页应用-SPA的特点

> **`目标`**  掌握SPA的特点 single  page  application
>
> - 传统模式 每个页面及其内容都需要从服务器一次次请求  如果网络差, 体验则会感觉很慢
> - spa模式, **`第一次`**加载 会将所有的资源都请求到页面 **`模块之间切换`**不会再请求服务器
>
> SPA优点

1. 用户体验好,因为前段操作几乎感受不到网络的延迟
2. 完全组件化开发 ,由于只有一个页面,所以原来属于一个个页面的工作被归类为一个个**`组件`**.

> 缺点

1. **`首屏`**加载慢->**`按需加载`** 不刷新页面 只请求js模块
2. 不利于SEO->**`服务端渲染`**(node->自己写路由->express-art-template+res.render())
3. **`开发难度高`**(框架) 相对于传统模式,有一些学习成本和应用成本

> vue适合开发SPA->什么是SPA+SPA特点
>
> SPA不利于SEO->搜索引擎排名靠前->搜素引擎机制->搜索引擎不能去找到局部刷新的网站内容

## 基础-单页应用-SPA-实现原理

> **`目标`** 掌握前段SPA的实现原理
>
> - SPA要实现 能够在前端自由切换模块 
> - SPA要能记忆当前切换的模块,并且刷新页面模块依然还在当前视图
> - SPA要实现在前端切换模块时,不能引起页面刷新,否则页面内容会被重置
>
> **`结论`**
>
> - 可以通过页面地址的锚链接来实现spa
> - hash(锚链接)位于链接地址 **`#`**之后
> - hash值的改变**`不会触发`**页面刷新
> - hash值是url地址的一部分,会存储在页面地址上 我们可以获取到
> - 可以通过**`事件监听`**hash值得改变
> - 拿到了hash值,就可以根据不同的hash值进行不同的**`模块切换`**

## 路由-vue-router-文档

> **`目标`**  了解vue-router是什么
>
> - Vue-Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建**单页面**应用变得易如反掌   它是一个插件
> - Vuejs中不包含vue-router
> - 实现根据不同的请求地址 而**`显示不同的组件`**
> - 如果要使用 vue开发项目,前端路由功能**`必须使用`**vue-router来实现
>
> #### -路由-vue-router-体验及使用步骤
>
>  <!-- 1 引入vue-router -->
>
>  <!-- 2. 定义导航 -->
>
>  <!-- 3. 定义容器 -->
>
>  <!-- 4 实例化一个VueRouter -->
>
>  <!-- 5 配置路由表  一个地址 => 一个组件(模块) -->
>
>  <!-- 6 挂载路由 -->

#### **路由-vue-router-编程式导航`**

- 跳转不同的组件 不仅仅可以用router-link 还可以采用**`代码行为`**
- (Vue实例/组件实例)**`this.$router`** 可以拿到当前路由对象的实例
- 路由对象的实例方法 有 push  replace, go()  
- push 方法 相当于往历史记录里推了一条记录 如果点击返回 会回到上一次的地址
- replace方法 想相当于替换了当前的记录  历史记录并没有多 但是地址会变
- go(数字) 代表希望是前进还是回退,当数字大于0 时 就是前进 n(数字)次,小于0时,就是后退n(数字)次
- 可以通过vue实例 获取当前的路由实例 $router 

### 面试题

```js
// 封装一个自己的 Promise 函数，
// 在这个函数中，3秒之后，生成一个随机数，
// 如果生成的随机数大于 0.5，则执行成功的回调。
// 否则，执行失败的回调。

function getRandomNumber() {
  return new Promise(function(resolve, reject) {
    // 异步生成随机数的过程
    setTimeout(function() {
      // 生成随机数
      const n = Math.random()
      if (n > 0.5) {
        // 成功了，执行成功的回调
        resolve(n)
      } else {
        // 失败了，执行失败的回调
        reject(n)
      }
    }, 0)
  })
}

/* getRandomNumber().then(
  n => {
    console.log('生成的随机数大于 0.5，具体的值是：' + n)
  },
  n => {
    console.log('生成的随机数小于 0.5，具体的值是：' + n)
  }
) */

setInterval(function() {
  getRandomNumber().then(
    n => {
      console.log('生成的随机数大于 0.5，具体的值是：' + n)
    },
    n => {
      console.log('生成的随机数小于 0.5，具体的值是：' + n)
    }
  )
}, 3000)

```

一、vue父子组件之间的传值：

简单来说，子组件通过props方法接受父组件传来的值，子组件通过$emit方法来向父组件发送数据。（具体案例可以看我之前写的博客）。

二、vue生命周期函数：

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
ajax操作是在monted生命周期中完成的。

三、vue自定义指令：

 

1.创建局部指令

```js
var app = new Vue({
    el: '#app',
    data: {    
    },
    // 创建指令(可以多个)
    directives: {
        // 指令名称
        dir1: {
            inserted(el) {
                // 指令中第一个参数是当前使用指令的DOM
                console.log(el);
                console.log(arguments);
                // 对DOM进行操作
                el.style.width = '200px';
                el.style.height = '200px';
                el.style.background = '#000';
            }
        }
    }
})
```





2.全局指令

```js
Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})
```



3.指令的使用
<div id="app">
    <div v-dir1></div>
    <div v-dir2></div>
</div>
四、vue动态路由传值：

vue动态路由配置，vue路由传参动态路由：
　　当我们很多个页面或者组件都要被很多次重复利用的时候，我们的路由都指向同一个组件，这时候从不同组件进入一个"共用"的组件，并且还要传参数，渲染不同的数据
　　这就要用到动态路由跟路由传参了！
首先我们来了解下router-link这个组件：
　　简单来说，它是个导航器，利用to属性导航到目标组件，并且在渲染的时候会自动生成一个a标签，当然官方也有说明，加个tag标签属性就可以渲染不同的标签，可以浏览器端查看到
　　并且当一个导航器被激活的时候，会自动加上一个css的激活样式，可以全局在路由配置中设置linkActiveClass属性，属性名就是样式css名，一般写为active
　　现在基本了解了router-link，先讲一下动态路由配置吧
我们在配置路由的时候，将目标组件的路径先配置好，如：



比如多个路由都要进入List组件，这时候在配置路由路径后加个:id(id可随便取名，标识),这个属性id可以在$route.params.id中获取，例如：



当前这个child组件要进入，以上配置的id就等于on；这时候在List组件中打印出$route.params.id就可以得到这个属性值on



这个时候，不同组件进入同一目标组件时就可以得到标识跟备注了，也可以利用这个来传递一些正常的参数
接着往下看，带参数的路由，跟获取传来的参数值
当router-link被激活点击时，会将当前的to的值push到router对象当中(路由栈),所以这个值可以是string也可以是obj
传参数的时候，我们就写成对象的形式，用到v-bind的js表达式



此时整个的理解可以为：我是child组件过来的，而且我还带来了我的名字，我叫child
在List组件当中去获取这个参数值跟id的值



  

如果是不同的组件过来的，可以设置不同的id值，只要在目标组件获取属性id的值就可以了，参数就利用query.属性值来获取 

五、axios和ajax的区别：

1.区别 axios是通过promise实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。 简单来说： ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。 axios是ajax ajax不止axios。

Ajax：
Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。
Ajax = 异步 JavaScript 和 XML（标准通用标记语言的子集）。
Ajax 是一种用于创建快速动态网页的技术。
Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。

```js
$.ajax({
            url: 'http://jsonplaceholder.typicode.com/users',
            type: 'get',
            dataType: 'json',
            data: {
                //'a': 1,
                //'b': 2,
            },
            success: function (response) {
                console.log(response)；
            }
        })
```



axios：
用于浏览器和node.js的基于Promise的HTTP客户端
1. 从浏览器制作XMLHttpRequests
2. 让HTTP从node.js的请求
3. 支持Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 取消请求
7. 自动转换为JSON数据
8. 客户端支持防止XSRF

```js
axios({
            url: 'http://jsonplaceholder.typicode.com/users',
            method: 'get',
            responseType: 'json', // 默认的
            data: {
                //'a': 1,
                //'b': 2,
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        })
```




2.优缺点： ajax： 本身是针对MVC的编程,不符合现在前端MVVM的浪潮 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案 JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务 axios： 从 node.js 创建 http 请求 支持 Promise API 客户端支持防止CSRF。

六、vuex实现购物车原理：

https://blog.csdn.net/qq_37481512/article/details/92831940

七、vue路由钩子函数：


路由的钩子函数总结有6个

全局的路由钩子函数：beforeEach、afterEach

单个的路由钩子函数：beforeEnter

组件内的路由钩子函数：beforeRouteEnter、beforeRouteLeave、beforeRouteUpdate

 

模块一：全局导航钩子函数

1、vue router.beforeEach（全局前置守卫）

beforeEach的钩子函数，它是一个全局的before 钩子函数，

（beforeEach）意思是在 每次每一个路由改变的时候都得执行一遍。

它的三个参数：

to: (Route路由对象) 即将要进入的目标 路由对象 to对象下面的属性： path params query hash fullPath matched name meta（在matched下，但是本例可以直接用）

from: (Route路由对象) 当前导航正要离开的路由

next: (Function函数) 一定要调用该方法来 resolve 这个钩子。 调用方法：next(参数或者空) ***必须调用

next(无参数的时候): 进行管道中的下一个钩子，如果走到最后一个钩子函数，那么 导航的状态就是 confirmed （确认的）

next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

应用场景：可进行一些页面跳转前处理，例如判断需要登录的页面进行拦截，做登录跳转！！

```js
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        //判断该路由是否需要登录权限
        if (cookies('token')) {
            //通过封装好的cookies读取token，如果存在，name接下一步如果不存在，那跳转回登录页
            next()//不要在next里面加"path:/",会陷入死循环
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}//将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next()
    }
})

 
```



2、vue router.afterEach（全局后置守卫）

router.beforeEach 是页面加载之前，相反router.afterEach是页面加载之后

模块二：路由独享的守卫(路由内钩子)

你可以在路由配置上直接定义 beforeEnter 守卫：

 

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```



这些守卫与全局前置守卫的方法参数是一样的。

模块三：组件内的守卫(组件内钩子)

```js
1、beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

 

const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`

  }
```



八、vue解决跨域问题的方法：

https://www.cnblogs.com/ldlx-mars/p/7816316.html 

九、什么方法可以替换v-model?



 



 

 

<template>
  <div id="listBox">
    <p>v-model动态监听输入的值{{value1}} <br /></p> 
    <p>使用v-model实现的监听：<input type="text" v-model="value1" ><br/></p>
    <p>v-bind:value和v-on:input动态监听输入的值{{value2}} <br /></p>
    <p>模拟v-model的方法：
      <input type="text" v-bind:value="value2" v-on:input="value2 = $event.target.value" >
    </p>
  </div>
</template>

<script>
export default {
  name: "listBox",
  data() {
    return {
      value1:'1111',
      value2:'2222',
    };
  },
  methods: {

  },
  mounted () {

  }
};
</script>
<style>
#listBox {
  width: 900px;
  margin: 0 auto;

}
 p{
   text-align: left;
    line-height:30px;
    font-weight: bold;
    font-size: 18px;
  }
  p input{
    border:solid 1px #ddd;
    line-height:30px
  }
</style>
十、如何给vue自定义组件添加点击事件？

需要在@click后面加上.native,官方对于native的解释为：

.native -——监听组件根元素的原生事件

正确写法：

<my-button  @click.native="alert1()" names="删除" v-bind:item2="btdata"></my-button>
————————————————
版权声明：本文为CSDN博主「缘飞梦」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_37481512/article/details/94400698

# React

单例模式

```js
/**
 * 单例模式
 * 定义：一个页面里边一个js类只初始化一次
 */

class Parent {
  constructor() {
    this.name = '小明';
    this.instance = null;
  }

  getName() {
    console.log(this.name)
  }
}

// 单例模式       Parent.singel() 方法
// 工厂函数：创建单例模式
Parent.singel = function () {
  debugger;
  if (!this.instance) {
    this.instance = new Parent()
  }
  return this.instance
}

```

### ES5创建类

```js
/**
 * 使用es5 创建类
 */
/**
 * 类的静态属性：不需要new，直接可以从类名上获取的属性
 * @param {*} name 
 */
function Parent(name) {
  this.name = name
}

// 原型上定义方法
Parent.prototype.getName = function () {
  console.log(this.name);
}

// 继承
function Child(name) {
  // 继承父类实例上的属性
  Parent.call(this, name)
}

// 定义静态属性
Child.sta = 100;
//  Object.create() 继承原属性的方法
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child
  }
});

var chi1 = new Child('小红');
console.log(chi1);


// Object.create() 继承原属性的方法
// 
// 

```

### ES6创建类

```js

/**
 * es6 class关键字创建类
 */

class Par {
  constructor(name) {
    this.name = name
  }

  getName() {
    console.log(this.name);
  }
}

// es6 继承：extends关键字

class Chi extends Par {
  constructor(name) {
    super(name);
    this.age = 10;
    this.setAge = function () {
      this.age = 100;
    }
  }

  // 定义属性
  other = 10;

  // 定义方法
  handler() {
    console.log(this.other);
  }

  // 定义静态属性：static关键字
  static sta = 10000;
}

let Chi2 = new Chi('小明');
console.log('es6:', Chi2);

```

###### jsx语法   背后是啥？ 创建React元素

```js
const divs = React.createElement('div', null, 100)
通过 babel 来编译转化
```



#### 有状态组件（类组件）    无状态组件（函数组件）

#### 事件绑定注意 this问题

1. 用bind()
2. 使用箭头函数

#### 表单处理  获取值  受控组件 （自己实现双向绑定）

#### 受控组件

##### react 表单里怎么获取用户输入的数据？

1.使用到受控组件 （react 知识点）

2.input => value

### React 项目中遇到的问题（小bug）

1. 轮播图中自动播放（diff 补丁）    autoplay 的值 必须是状态数据 
   - 第一次 autoplay => true
   - 第二次 有数据 --> 真数据 -->
2. 无法手动滑动
   
   - 别的元素（tabbar ）高度太高  点的并不是图片
   
3. 滑动时谷歌浏览器控制台会报错  这是浏览器自己设置的 

   1、注册处理函数时，用如下方式，明确声明为不是被动的
   window.addEventListener('touchmove', func, { passive: false })

   2、应用 CSS 属性 touch-action: none; 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
   ————————————————
   版权声明：本文为CSDN博主「花儿为何那样红」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
   原文链接：https://blog.csdn.net/csdnXiaoZou/article/details/87276026

### 合成事件（看文档）

React 提供的  合成事件

1. 不能通过返回false的方式阻止默认行为

### 登录  



## 小程序

### 1. 简单描述下微信小程序的相关文件类型

> 微信小程序项目结构主要有四个文件类型

- `WXML`（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统，可以构建出页面的结构。内部主要是微信自己定义的一套组件
- `WXSS` (WeiXin Style Sheets)是一套样式语言，用于描述 `WXML` 的组件样式
- `js` 逻辑处理，网络请求
- `json` 小程序设置，如页面注册，页面标题及`tabBar`

> 主要文件

- `app.json` 必须要有这个文件，如果没有这个文件，项目无法运行，因为微信框架把这个作为配置文件入口，整个小程序的全局配置。包括页面注册，网络设置，以及小程序的 `window` 背景色，配置导航条样式，配置默认标题
- `app.js` 必须要有这个文件，没有也是会报错！但是这个文件创建一下就行 什么都不需要写以后我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量
- `app.wxss` 可选

### 2. 简述微信小程序原理

> 微信小程序采用
>
>  
>
> ```
> JavaScript
> ```
>
> 、
>
> ```
> WXML
> ```
>
> 、
>
> ```
> WXSS
> ```
>
>  
>
> 三种技术进行开发,本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口
>
> 微信的架构，是数据驱动的架构模式，它的 `UI` 和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现
>
> 小程序分为两个部分 `webview` 和 `appService` 。其中 `webview` 主要用来展现 `UI `，`appService` 有来处理业务逻辑、数据及接口调用。它们在两个进程中运行，通过系统层 `JSBridge` 实现通信，实现 `UI` 的渲染、事件的处理

### 3. 小程序的双向绑定和vue哪里不一样

小程序直接 `this.data` 的属性是不可以同步到视图的，必须调用：

```
this.setData({
    // 这里设置
})
```

### 4. 小程序的wxss和css有哪些不一样的地方

> `WXSS` 和 `CSS` 类似，不过在 `CSS` 的基础上做了一些补充和修改

- 尺寸单位 `rpx`

`rpx` 是响应式像素,可以根据屏幕宽度进行自适应。规定屏幕宽为 `750rpx`。如在 `iPhone6` 上，屏幕宽度为 `375px`，共有 `750` 个物理像素，则 `750rpx = 375px = 750` 物理像素

- 使用 `@import` 标识符来导入外联样式。`@import` 后跟需要导入的外联样式表的相对路径，用;表示语句结束

```
/** index.wxss **/
@import './base.wxss';

.container{
    color: red;
}
```

### 5. 小程序页面间有哪些传递数据的方法

- 使用全局变量实现数据传递

在 `app.js` 文件中定义全局变量 `globalData`， 将需要存储的信息存放在里面

```
// app.js

App({
     // 全局变量
  globalData: {
    userInfo: null
  }
})
```

使用的时候，直接使用 `getApp()` 拿到存储的信息

- 使用 `wx.navigateTo` 与 `wx.redirectTo` 的时候，可以将部分数据放在 `url` 里面，并在新页面 `onLoad` 的时候初始化

```
//pageA.js

// Navigate
wx.navigateTo({
  url: '../pageD/pageD?name=raymond&gender=male',
})

// Redirect
wx.redirectTo({
  url: '../pageD/pageD?name=raymond&gender=male',
})


// pageB.js
...
Page({
  onLoad: function(option){
    console.log(option.name + 'is' + option.gender)
    this.setData({
      option: option
    })
  }
})
```

需要注意的问题：

`wx.navigateTo` 和 `wx.redirectTo` 不允许跳转到 `tab` 所包含的页面

`onLoad` 只执行一次

- 使用本地缓存 `Storage` 相关

### 6. 小程序的生命周期函数

- `onLoad` 页面加载时触发。一个页面只会调用一次，可以在 `onLoad` 的参数中获取打开当前页面路径中的参数
- `onShow()` 页面显示/切入前台时触发
- `onReady()` 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
- `onHide()` 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等
- `onUnload()` 页面卸载时触发。如 `redirectTo` 或 `navigateBack` 到其他页面时

详见 [生命周期回调函数](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#生命周期回调函数)

### 7. 怎么封装微信小程序的数据请求

参考 [这里](https://segmentfault.com/a/1190000014789969)

### 8. 哪些方法可以用来提高微信小程序的应用速度

1、提高页面加载速度

2、用户行为预测

3、减少默认 `data` 的大小

4、组件化方案

### 9. 微信小程序的优劣势

> 优势

- 即用即走，不用安装，省流量，省安装时间，不占用桌面
- 依托微信流量，天生推广传播优势
- 开发成本比 `App` 低

> 缺点

- 用户留存，即用即走是优势，也存在一些问题
- 入口相对传统 `App` 要深很多
- 限制较多,页面大小不能超过2M。不能打开超过10个层级的页面

### 10. 怎么解决小程序的异步请求问题

> 小程序支持大部分 `ES6` 语法

- 在返回成功的回调里面处理逻辑
- `Promise` 异步

### 11. 小程序关联微信公众号如何确定用户的唯一性

> 如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 `unionid `来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 `unionid` 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，`unionid` 是相同的

### 12. 如何实现下拉刷新

- 首先在全局 `config` 中的 `window` 配置 `enablePullDownRefresh`
- 在 `Page` 中定义 `onPullDownRefresh` 钩子函数,到达下拉刷新条件后，该钩子函数执行，发起请求方法
- 请求返回后，调用 `wx.stopPullDownRefresh` 停止下拉刷新

参考 [这里](https://juejin.im/post/5a781c756fb9a063606eb742)

### 13. bindtap和catchtap的区别是什么

相同点：首先他们都是作为点击事件函数，就是点击时触发。在这个作用上他们是一样的，可以不做区分

不同点：他们的不同点主要是bindtap是不会阻止冒泡事件的，catchtap是阻值冒泡的

### 14. 简述下 `wx.navigateTo()`, `wx.redirectTo()`, `wx.switchTab()`, `wx.navigateBack()`, `wx.reLaunch()`的区别</h5>

- wx.navigateTo()：保留当前页面，跳转到应用内的某个页面。但是不能跳到 `tabbar` 页面
- wx.redirectTo()：关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 `tabbar` 页面
- wx.switchTab()：跳转到 `abBar` 页面，并关闭其他所有非 `tabBar` 页面
- wx.navigateBack()关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层
- wx.reLaunch()：关闭所有页面，打开到应用内的某个页面

#### 15 .微信小程序与H5的区别？

答：

第一条是运行环境的不同

传统的HTML5的运行环境是浏览器，包括webview，而微信小程序的运行环境并非完整的浏览器，是微信开发团队基于浏览器内核完全重构的一个内置解析器，针对小程序专门做了优化，配合自己定义的开发语言标准，提升了小程序的性能。

第二条是开发成本的不同

只在微信中运行，所以不用再去顾虑浏览器兼容性，不用担心生产环境中出现不可预料的奇妙BUG

第三条是获取系统级权限的不同

系统级权限都可以和微信小程序无缝衔接

第四条便是应用在生产环境的运行流畅度

长久以来，当HTML5应用面对复杂的业务逻辑或者丰富的页面交互时，它的体验总是不尽人意，需要不断的对项目优化来提升用户体验。但是由于微信小程序运行环境独立



#### 16、怎么解决小程序的异步请求问题？

答：

在回调函数中调用下一个组件的函数：

app.js



![img](https:////upload-images.jianshu.io/upload_images/12653633-824c8667df375dd0?imageMogr2/auto-orient/strip|imageView2/2/w/575/format/webp)

index.js

![img](https:////upload-images.jianshu.io/upload_images/12653633-209a538c28820c60?imageMogr2/auto-orient/strip|imageView2/2/w/469/format/webp)

#### 17、小程序的双向绑定和vue哪里不一样？

答：

小程序直接this.data的属性是不可以同步到视图的，必须调用：

![img](https:////upload-images.jianshu.io/upload_images/12653633-a83617530c4261e9?imageMogr2/auto-orient/strip|imageView2/2/w/300/format/webp)



