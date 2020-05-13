## 1. 梳理项目结构

1. `npm i` 装包

2. 运行 `wepy build --watch` 开启实时编译

3. 解决 ESLint 两个报错的问题 `src -> app.wpy` 和 `src -> pages -> index.wpy`

4. 在 `.prettierrc` 中，新增如下的格式化代码的配置：

   ```json
   {
     "singleQuote": true,
     "semi": false
   }
   
   ```

5. 清空 `app.wpy` 中的代码如下：

   ```js
   <style lang="less"></style>
   
   <script>
   import wepy from 'wepy'
   import 'wepy-async-function'
   
   export default class extends wepy.app {
     // 全局的配置节点
     config = {
       pages: ['pages/index'],
       window: {
         backgroundTextStyle: 'light',
         navigationBarBackgroundColor: '#fff',
         navigationBarTitleText: 'WeChat',
         navigationBarTextStyle: 'black'
       }
     }
   
     // 全局共享数据的节点
     globalData = {}
   
     // 构造函数
     constructor() {
       super()
       this.use('requestfix')
     }
   
     // 全局生命周期函数
     onLaunch() {}
   }
   </script>
   
   ```

6. 清空 `index.wpy` 中的代码如下：

   ```js
   <template>
     <view>Index 页面</view>
   </template>
   
   <script>
   import wepy from 'wepy'
   export default class extends wepy.page {}
   </script>
   
   ```

7. 清空 `src -> mixins` 和  `src -> components` 目录



## 2. 全局配置导航条效果

1. 修改 `src -> app.wpy` 文件中的 `config -> window` 节点

2. 配置如下：

   ```js
     // 全局的配置节点
     config = {
       pages: ['pages/index'],
       window: {
         backgroundTextStyle: 'light',
         // 配置导航条的背景色
         navigationBarBackgroundColor: '#D81E06',
         // 修改导航条的文本
         navigationBarTitleText: '黑马优购',
         // 修改导航条文本的颜色
         navigationBarTextStyle: 'white'
       }
     }
   ```



## 3. 配置 tabBar

1. 新建 `src -> pages -> tabs`，并在此目录中，新建 5 个页面，分别是 `home.wpy`， `cates.wpy`， `search.wpy`, `cart.wpy`， `my.wpy`

2. 将这 5 个页面路径，记录到 `app.wpy -> config -> pages` 数组中

3. 在 `src` 目录下，新建 `assets` 目录，并且，把资料中的 `icons` 复制到 `assets` 目录中

4. 在 `app.wpy -> config` 新增 `tabBar` 节点如下：

   ```js
       // 全局配置tabbar效果
       tabBar: {
         // 设置tabbar被选中时文本的颜色
         selectedColor: '#D81E06',
         // 配置tabbar列表
         list: [
           {
             // 页面路径
             pagePath: 'pages/tabs/home',
             // 显示的文本
             text: '首页',
             // 默认图标
             iconPath: '/assets/icons/home.png',
             // 选中图标
             selectedIconPath: '/assets/icons/home-active.png'
           },
           {
             pagePath: 'pages/tabs/cates',
             text: '分类',
             iconPath: '/assets/icons/cates.png',
             selectedIconPath: '/assets/icons/cates-active.png'
           },
           {
             pagePath: 'pages/tabs/search',
             text: '搜索',
             iconPath: '/assets/icons/search.png',
             selectedIconPath: '/assets/icons/search-active.png'
           },
           {
             pagePath: 'pages/tabs/cart',
             text: '购物车',
             iconPath: '/assets/icons/cart.png',
             selectedIconPath: '/assets/icons/cart-active.png'
           },
           {
             pagePath: 'pages/tabs/my',
             text: '我的',
             iconPath: '/assets/icons/my.png',
             selectedIconPath: '/assets/icons/my-active.png'
           }
         ]
       }
   ```

   

## 4. 获取首页轮播图数据

0. 在 `src -> app.wpy` 的 `constructor` 中，开启 `promisify`:

   ```js
     // 构造函数
     constructor() {
       super()
       this.use('requestfix')
       this.use('promisify')
     }
   ```

1. 在 data 中定义轮播图数组：

   ```js
     data = {
       // 轮播图的数据
       swiperList: []
     }
   ```

2. 在 onLoad 生命周期函数中，预调用 `getSwiperList` 函数：

   ```js
     onLoad() {
       // 调用获取轮播图数据的方法
       this.getSwiperList()
     }
   ```

3. 封装 `getSwiperList` 函数如下：

   ```js
     // 获取轮播图的函数
     async getSwiperList() {
       // 发起请求，获取轮播图数据
       // 当拿到数据以后，从数据对象中，把 data 解构出来，并重命名为 res
       // 这个 res 就是服务器返回的真实的数据
       const { data: res } = await wepy.request({
         method: 'GET',
         url: 'https://uinav.com/api/public/v1/home/swiperdata'
       })
   
       // 判断请求是否成功了
       if (res.meta.status !== 200) {
         // 请求失败：弹框提示用户请求失败
          return wepy.showToast({
           // 提示的内容
           title: '数据获取失败！',
           // 不显示图标
           icon: 'none',
           // 多少秒以后自动隐藏
           duration: 1500
         })
       }
       // 请求成功
       this.swiperList = res.message
       this.$apply()
     }
   ```

   

## 5. 渲染首页轮播图UI结构

```html
<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper circular indicator-dots>
      <swiper-item wx:for="{{swiperList}}" wx:key="index">
        <navigator url="{{item.navigator_url}}" open-type="{{item.open_type}}" hover-class="none">
          <image src="{{item.image_src}}"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>
```



## 6. 获取首页导航区域的数据

1. 在data中定义数据节点：

   ```js
     data = {
       // 轮播图的数据
       swiperList: [],
       // 导航相关的数据
       navs: []
     }
   ```

2. 在 `onLoad` 预调用 `getNavs` 函数：

   ```js
     onLoad() {
       // 调用获取轮播图数据的方法
       this.getSwiperList()
       // 获取导航相关的数据
       this.getNavs()
     }
   ```

3. 定义 `getNavs` 函数：

   ```js
     // 获取导航相关的数据
     async getNavs() {
       const { data: res } = await wepy.request({
         method: 'GET',
         url: 'https://uinav.com/api/public/v1/home/catitems'
       })
   
       // 数据请求失败
       if (res.meta.status !== 200) {
         return wepy.showToast({
           title: '数据获取失败！',
           icon: 'none',
           duration: 1500
         })
       }
   
       // 数据请求成功
       this.navs = res.message
       this.$apply()
     }
   ```

   

## 7. 渲染首页导航区域的UI结构

```html
    <!-- 导航区域 -->
    <view class="nav-list">
      <!-- 改造： 外层负责循环，循环中，使用 wx:if 和 wx:else 来决定如何渲染这个图片 -->
      <block wx:for="{{navs}}" wx:key="index">
        <!-- 如果有 导航的 URL 地址，则外出包裹一个 navigator -->
        <navigator wx:if="{{item.navigator_url !== undefined}}" url="/pages/tabs/cates" open-type="{{item.open_type}}" hover-class="none">
          <image src="{{item.image_src}}"></image>
        </navigator>
        <!-- 如果没有导航的 URL 地址，则，直接渲染 image -->
        <image src="{{item.image_src}}" wx:else></image>
      </block>
    </view>
```



## 8. 将 home.wpy 中的 JavaScript 代码抽离为 mixin

1. 在 `src -> mixins -> tabs` 目录中，新建 `home.js` 文件，它的作用，就是把 页面的 JS 抽离出来。

2. 初始化 `home.js` 中的代码如下：

   ```js
   import wepy from 'wepy'
   
   // 创建一个 mixin 混入的类
   export default class extends wepy.mixin {}
   ```

3. 把 `home.wpy` 中的业务逻辑节点，剪切到 `home.js` 中：

   ```js
   import wepy from 'wepy'
   
   // 创建一个 mixin 混入的类
   export default class extends wepy.mixin {
     data = {
       // 轮播图的数据
       swiperList: [],
       // 导航相关的数据
       navs: []
     }
   
     onLoad() {
       // 调用获取轮播图数据的方法
       this.getSwiperList()
       // 获取导航相关的数据
       this.getNavs()
     }
   
     // 获取轮播图的函数
     async getSwiperList() {
       // 发起请求，获取轮播图数据
       // 当拿到数据以后，从数据对象中，把 data 解构出来，并重命名为 res
       // 这个 res 就是服务器返回的真实的数据
       const { data: res } = await wepy.request({
         method: 'GET',
         url: 'https://uinav.com/api/public/v1/home/swiperdata'
       })
   
       // 判断请求是否成功了
       if (res.meta.status !== 200) {
         // 请求失败：弹框提示用户请求失败
         return wepy.showToast({
           // 提示的内容
           title: '数据获取失败！',
           // 不显示图标
           icon: 'none',
           // 多少秒以后自动隐藏
           duration: 1500
         })
       }
       // 请求成功
       this.swiperList = res.message
       this.$apply()
     }
   
     // 获取导航相关的数据
     async getNavs() {
       const { data: res } = await wepy.request({
         method: 'GET',
         url: 'https://uinav.com/api/public/v1/home/catitems'
       })
   
       // 数据请求失败
       if (res.meta.status !== 200) {
         return wepy.showToast({
           title: '数据获取失败！',
           icon: 'none',
           duration: 1500
         })
       }
   
       // 数据请求成功
       this.navs = res.message
       this.$apply()
     }
   }
   ```

4. 在 `home.wpy` 中，导入，并挂载 mixin:

   ```js
   <script>
   import wepy from 'wepy'
   // 1. 导入需要的 mixin
   import mix from '../../mixins/tabs/home.js'
   
   export default class extends wepy.page {
     // 2. 通过 mixins 节点，把需要的代码挂载过来
     mixins = [mix]
   }
   </script>
   ```

   

## 9. 封装 wepy.baseToast() 函数

1. 在  `src` 目录下，新建 `baseAPI.js` 模块

2. 在 `baseAPI.js` 模块中，编写如下代码：

   ```js
   import wepy from 'wepy'
   
   /**
    * 自己封装的弹框函数
    */
   wepy.baseToast = function(str = '数据获取失败！') {
     wepy.showToast({
       title: str,
       icon: 'none',
       duration: 1500
     })
   }
   ```

3. 在 `app.wpy` 文件的 `script` 标签头部，导入自己封装的 `baseAPI.js` 模块：

   ```js
   <script>
   import wepy from 'wepy'
   import 'wepy-async-function'
   // 导入并执行自己的封装的 API 模块
   import './baseAPI.js'
   
   // ..........................
   </script>
   ```



## 10. 封装 wepy.get() 函数

1. 在 `src -> baseAPI.js` 模块中，封装如下的函数：

   ```js
   /**
    * 自己封装的 发起 GET 请求的函数
    *  await wepy.get('url')
    *  await wepy.get('url', { 请求参数对象 })
    */
   wepy.get = function(url, data = {}) {
     return wepy.request({
       method: 'GET',
       url: url,
       data
     })
   }
   ```

2. 接下来，我们可以在每个页面中，直接调用 `wepy.get()` 来发起请求，例如：

   ```js
     // 获取导航相关的数据
     async getNavs() {
       const { data: res } = await wepy.get('https://uinav.com/api/public/v1/home/catitems')
   
       // 数据请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 数据请求成功
       this.navs = res.message
       this.$apply()
     }
   ```

   

## 11. 封装 wepy.post() 函数

1. 在 `src -> baseAPI.js` 模块中，封装如下的函数：

   ```js
   /**
    * 自己封装的 发起 POST 请求的函数
    * await wepy.post('url')
    * await wepy.post('url', { 参数 })
    */
   wepy.post = function(url, data = {}) {
     return wepy.request({
       method: 'POST',
       url: url,
       data
     })
   }
   ```

2. 在每个页面中，可以直接调用 `wepy.post()` 发起 post 请求，例如：

   ```js
   async function regUser() {
       await wepy.post('/api/reguser', { username: 'zs', password: '123456' })
   }
   ```



## 12. 提取 baseURL 属性

1. 在 `src -> baseAPI.js` 中，定义一个常量如下：

   ```js
   // 请求的根路径
   const baseURL = 'https://uinav.com/api/public/v1'
   ```

2. 修改 `wepy.get()` 和 `wepy.post` 两个函数中的代码如下：

   ```js
   
   /**
    * 自己封装的 发起 GET 请求的函数
    *  await wepy.get('url')
    *  await wepy.get('url', { 请求参数对象 })
    */
   wepy.get = function(url, data = {}) {
     return wepy.request({
       method: 'GET',
       // 由于用户传递过来的 url 地址不完整，缺少请求的根路径，
       // 所以，我们在封装函数的时候，手动把根路径拼接上去
       url: baseURL + url,
       data
     })
   }
   
   /**
    * 自己封装的 发起 POST 请求的函数
    * await wepy.post('url')
    * await wepy.post('url', { 参数 })
    */
   wepy.post = function(url, data = {}) {
     return wepy.request({
       method: 'POST',
       url: baseURL + url,
       data
     })
   }
   ```



## 13. 获取首页楼层数据

1. 在 data 中，定义楼层数据：

   ```js
     data = {
       // 轮播图的数据
       swiperList: [],
       // 导航相关的数据
       navs: [],
       // 楼层数据
       floor: []
     }
   ```

2. 在 `onLoad` 中，预调用 `getFloor` 函数，获取楼层数据：

   ```js
     onLoad() {
       // 调用获取轮播图数据的方法
       this.getSwiperList()
       // 获取导航相关的数据
       this.getNavs()
       // 获取楼层数据
       this.getFloor()
     }
   ```

3. 封装 `getFloor` 函数：

   ```js
     // 获取楼层的数据
     async getFloor() {
       // 发起请求
       const { data: res } = await wepy.get('/home/floordata')
       // 数据获取失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
       // 数据获取成功
       this.floor = res.message
       this.$apply()
     }
   ```



## 14. 渲染你楼层的UI结构

1. 渲染UI结构

   ```html
       <!-- 楼层区域 -->
       <view class="floor-list">
         <!-- 循环创建每一个楼层 -->
         <block wx:for="{{floor}}" wx:key="index">
           <!-- 楼层的标题 -->
           <image src="{{item.floor_title.image_src}}" class="floor-title"></image>
           <!-- 楼层中的图片列表 -->
           <view class="prod-list">
             <!-- 左侧大图 -->
             <navigator url="{{item.product_list[0].navigator_url}}" open-type="{{item.product_list[0].open_type}}" hover-class="none">
               <image src="{{item.product_list[0].image_src}}" style="width: {{item.product_list[0].image_width}}rpx;" mode="widthFix"></image>
             </navigator>
             <!-- 右侧的小图们 -->
             <view class="riht-box">
               <block wx:for="{{item.product_list}}" wx:key="index">
                 <navigator wx:if="{{index > 0}}" url="{{item.navigator_url}}" open-type="{{item.open_type}}" hover-class="none">
                   <image src="{{item.image_src}}" style="width: {{item.image_width}}rpx;" mode="widthFix"></image>
                 </navigator>
               </block>
             </view>
           </view>
         </block>
       </view>
   ```

2. 美化样式

   ```css
   .prod-list {
     display: flex;
     padding-left: 12rpx;
     .riht-box {
       display: flex;
       flex-wrap: wrap;
       justify-content: space-around;
     }
   }
   ```



## 15. 实现分类页面的左右布局效果

1. 动态获取屏幕的可用高度：

   ```js
     data = {
       // 所有的分类数据
       cates: [],
       // 定义屏幕可使用高度的值
       wh: 0
     }
   
   
     onLoad() {
       // 获取所有的分类数据
       this.getCates()
       // 调用函数,获取屏幕可用的高度
       this.getWindowHeight()
     }
   
   
     // 获取屏幕可用高度的函数
     async getWindowHeight() {
       const sysInfo = await wepy.getSystemInfo()
       this.wh = sysInfo.windowHeight
       // 只要在异步操作之后,为 data 中数据重新赋值了,
       // 必须在赋值完成以后,调用一下 this.$apply()
       this.$apply()
     }
   ```

2. 使用 `<scroll-view>` 组件渲染UI结构：

   ```html
   <template>
     <view class="container">
       <!-- 左侧的滑动区域 -->
       <scroll-view style="height: {{wh}}px;" scroll-y class="left">
         <view>---Start----</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>AAAA</view>
         <view>---End----</view>
       </scroll-view>
       <!-- 右侧的滑动区域 -->
       <scroll-view style="height: {{wh}}px;" scroll-y class="right">
         <view>---Start----</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>OOO</view>
         <view>---End----</view>
       </scroll-view>
     </view>
   </template>
   ```

3. 美化 `<scroll-view>` 组件的布局样式：

   ```css
   <style lang="less">
   .container {
     display: flex;
     .left {
       width: 100px;
     }
     .right {
       flex: 1;
     }
   }
   </style>
   ```

   