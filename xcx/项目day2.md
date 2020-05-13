## 0. 项目相关

请求根路径  https://uinav.com/api/public/v1

API文档地址  https://www.showdoc.cc/128719739414963



## 1. 在 WePY 项目中安装 vant 组件库

1. 先新建一个空白的文件夹，然后运行 `npm init -y` 命令
2. 在空白文件夹中，运行 `npm i @vant/weapp -S --production` 安装 vant 组件
3. 找到 `node_modules -> @vant -> weapp -> lib` 目录，把它拷贝到桌面
4. 将拷贝到桌面的 `lib` 目录，重命名为 `vant` 文件夹
5. 将重命名成功之后的 `vant` 文件夹，拷贝到 wepy 项目的 `src -> assets` 下
6. 重新运行 `wepy build --watch` 命令编译即可

> 注意：在第 3 步中，一定要拷贝 lib 目录，而不是 dist 目录； 因为 dist 目录中的组件，是通过 TypeScript 编写出来的，在 WePY 项目中无法正常运行； lib 目录下的组件是通过 Javascript 编写的，可以正常在 WePY 中使用！！！



## 2. 在全局注册 vant 组件

1. 打开 `app.wpy` ，找到 `config` 节点，在里面新增一个 `usingComponents`如下：

   ```js
       // 在全局配置 vant 组件
       // 只要是在全局配置的组件，每个页面中，都可以直接使用
       usingComponents: {
         // 在注册组件的时候，需要使用键值对形式
         // 键 就是注册的组件名称
         // 值 就是组件的具体存放路径（注意：在组件文件夹之后，应该写组件的名字即可，不要带任何后缀名）
         'van-button': './assets/vant/button/index'
       }
   ```

2. 然后，就能在每个页面中，来使用刚才注册的 `van-button` 组件了



## 3. 渲染分类的UI结构

1. `app.wpy` 中全局注册 `van-sidebar` 和 `van-sidebar-item` 组件：

   ```js
       // 在全局配置 vant 组件
       // 只要是在全局配置的组件，每个页面中，都可以直接使用
       usingComponents: {
         // 在注册组件的时候，需要使用键值对形式
         // 键 就是注册的组件名称
         // 值 就是组件的具体存放路径（注意：在组件文件夹之后，应该写组件的名字即可，不要带任何后缀名）
         'van-button': './assets/vant/button/index',
         // Sidebar 侧边导航
         'van-sidebar': './assets/vant/sidebar/index',
         'van-sidebar-item': './assets/vant/sidebar-item/index'
       }
   ```

2. 渲染左侧一级分类的UI结构：

   ```html
   <!-- 左侧的侧边栏 -->
         <van-sidebar activeKey="{{activeKey}}" @change="onChange">
           <block wx:for="{{cates}}" wx:key="cat_id">
             <van-sidebar-item title="{{item.cat_name}}" />
           </block>
         </van-sidebar>
   ```

3. 在 行为中 定义对应的属性和事件处理函数：

   ```js
     data = {
       // 所有的分类数据
       cates: [],
       // 定义屏幕可使用高度的值
       wh: 0,
       // 左侧一级分类默认选中项的索引
       activeKey: 0,
       // 被选中的一级分类下的二级分类
       cateLevel2: []
     }
   
   // -------------------------------------------------------------
   
     // 所有的事件处理函数
     methods = {
       // 一级分类切换时候，触发这个事件
       onChange(e) {
         // 将点击项下的二级分类，赋值给 cateLevel2
         this.cateLevel2 = this.cates[e.detail].children
       }
     }
   ```

4. 渲染二级和三级分类：

   ```html
       <!-- 右侧的滑动区域 -->
       <scroll-view style="height: {{wh}}px;" scroll-y class="right">
         <block wx:for="{{cateLevel2}}" wx:key="cat_id">
           <!-- 二级分类 -->
           <view class="cate-level2">
             <!-- 下面的代码是完全正确的，只是 WePY 框架不识别 实体字符 -->
             <!-- <text space="emsp" decode>/&emsp;&emsp;{{item.cat_name}}&emsp;&emsp;/</text> -->
   
             <text>/<text class="level2-title">{{item.cat_name}}</text>/</text>
           </view>
           <!-- 三级分类区域 -->
           <view class="cate-level3">
             <view class="cate-level3-item" wx:for="{{item.children}}" wx:key="cat_id">
               <image src="{{item.cat_icon}}"></image>
               <text>{{item.cat_name}}</text>
             </view>
           </view>
         </block>
       </scroll-view>
   ```

5. 美化二、三级分类的样式：

   ```css
   
   .cate-level2 {
     font-size: 28rpx;
     font-weight: bold;
     text-align: center;
     padding-top: 30rpx;
     .level2-title {
       margin: 0 50rpx;
     }
   }
   
   .cate-level3 {
     display: flex;
     flex-wrap: wrap;
     .cate-level3-item {
       width: 33.33%;
       height: 200rpx;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       image {
         width: 100rpx;
         height: 100rpx;
       }
       text {
         font-size: 24rpx;
       }
     }
   }
   ```



## 4. 每次切换一级分类都重置右侧滚动条的位置

1. 为右侧的 `scroll-view` 添加 `scroll-top` 属性如下：

   ```html
       <!-- 右侧的滑动区域 -->
       <scroll-view style="height: {{wh}}px;" scroll-y class="right" scroll-top="{{scrollTop}}">
           <!--省略不必要的代码若干-->
       </scroll-view>
   ```

2. 在 data 中要定义一个动态的 top 值：

   ```js
     data = {
       // ... 省略不必要的代码
         
       // 右侧滚动区域 - 滚动条的位置
       scrollTop: 0
     }
   ```

3. 在切换一级分类的同时，重置滚动条的位置：

   ```js
     // 所有的事件处理函数
     methods = {
       // 一级分类切换时候，触发这个事件
       onChange(e) {
         // 将点击项下的二级分类，赋值给 cateLevel2
         this.cateLevel2 = this.cates[e.detail].children
         // 每次一级分类发生切换，都重置右侧滚动条的位置
         // 注意：如果 旧值 和 新值 相同，则滚动条的位置不会被重置
         this.scrollTop = this.scrollTop - 1
       }
     }
   ```

   

## 5. 在 WePY 中通过拦截器显示和隐藏loading效果

1. 打开 `app.wpy` 文件，找到 `constructor` 构造函数，在构造函数中，新增如下代码即可：

   ```js
       // 拦截request请求
       this.intercept('request', {
         // 发出请求时的回调函数
         config(p) {
           // 展示 loading 效果
           wepy.showLoading({
             title: '数据加载中...'
           })
           // 必须返回OBJECT参数对象，否则无法发送请求到服务端
           return p
         },
   
         // 请求成功后的回调函数
         success(p) {
           // 必须返回响应数据对象，否则后续无法对响应数据进行处理
           return p
         },
   
         // 请求失败后的回调函数
         fail(p) {
           // 必须返回响应数据对象，否则后续无法对响应数据进行处理
           return p
         },
   
         // 请求完成时的回调函数(请求成功或失败都会被执行)
         complete(p) {
           // 隐藏 loading 效果
           wepy.hideLoading()
         }
       })
   ```



## 6. 处理参数 - 商品列表

1. 在 `data` 中定义 `queryObj` 对象：

   ```js
     // 页面中的数据
     data = {
       // 请求列表数据时候，需要的参数，都在 queryObj 身上存着
       queryObj: {
         // 当前的页码值
         pagenum: 1,
         // 每页显示多少天数据
         pagesize: 10
       }
     }
   ```

2. 在 `onLoad` 生命周期函数中，把页面跳转时，传递的参数，转存到 `queryObj` 中：

   ```js
     // 在 onLoad 生命周期函数的形参中，可以接收页面跳转传递过来的参数
     onLoad(params) {
       console.log(params)
       this.queryObj = { ...this.queryObj, ...params }
       console.log(this.queryObj)
     }
   ```

   

## 7. 发起请求获取商品列表数据

1. 在 `onLoad` 生命周期函数中，预调用获取商品列表的函数：

   ```js
     onLoad(params) {
       this.queryObj = { ...this.queryObj, ...params }
       // 获取商品的列表数据
       this.getGoodsList()
     }
   ```

2. 定义获取商品列表的函数：

   ```js
     // 获取商品列表数据
     async getGoodsList() {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/search', this.queryObj)
   
       // 请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 请求成功
       this.goods = res.message.goods
       this.total = res.message.total
       this.$apply()
     }
   ```

3. 在 data 中定义数据节点：

   ```js
     // 页面中的数据
     data = {
       // 请求列表数据时候，需要的参数，都在 queryObj 身上存着
       queryObj: {
         // 当前的页码值
         pagenum: 1,
         // 每页显示多少天数据
         pagesize: 10
       },
       // 商品列表数据
       goods: [],
       // 总商品数量
       total: 0
     }
   ```

   

## 8. 渲染商品列表的UI结构

1. 在 `app.wpy` 中，找到 `config -> usingComponents` 节点，新增一个组件的注册如下：

   ```js
       usingComponents: {
         // Card 商品卡片
         'van-card': './assets/vant/card/index'
       }
   ```

2. 在页面中，循环渲染商品卡片如下：

   ```html
   <template>
     <view>
       <!-- 循环渲染商品列表数据 -->
       <block wx:for="{{goods}}" wx:key="goods_id">
         <van-card num="{{item.goods_number}}" price="{{item.goods_price}}" title="{{item.goods_name}}" thumb="{{item.goods_small_logo}}" />
       </block>
     </view>
   </template>
   ```



## 9. 初步实现上拉加载更多的效果

1. 在页面的类中，配置上拉触底的距离：

   ```js
   <script>
   import wepy from 'wepy'
   // 引用 mixin 文件
   import mix from '@/mixins/goods_list/index.js'
   
   export default class extends wepy.page {
     mixins = [mix]
   
     // 注意：页面级别的 config 节点，不能抽离到 mixin 中，只能在页面的 class 类中进行配置
     config = {
       // 配置导航条的文本内容
       navigationBarTitleText: '商品列表',
       // 上拉加载更多时候的触底距离
       onReachBottomDistance: 100
     }
   }
   </script>
   ```

2. 监听上拉触底的事件：

   ```js
     // 监听页面的触底事件
     onReachBottom() {
       // 让页码值 +1
       this.queryObj.pagenum += 1
       // 发请求拿数据
       this.getGoodsList()
     }
   ```

3. 修改获取商品列表数据的函数，将覆盖的操作，改造成拼接的操作：

   ```js
     // 获取商品列表数据
     async getGoodsList() {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/search', this.queryObj)
   
       // 请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 请求成功
       this.goods = [...this.goods, ...res.message.goods]
       this.total = res.message.total
       this.$apply()
     }
   ```



## 10. 通过节流防止频繁触底从而发起额外的请求

1. 在 `data` 中，定义一个 `节流阀`如下：

   ```js
     data = {
       // 当前是否正在请求数据
       isloading: false
     }
   ```

2. 在触底的时候，打开节流阀：

   ```js
     // 监听页面的触底事件
     onReachBottom() {
       // 打开节流阀
       this.isloading = true
       // 让页码值 +1
       this.queryObj.pagenum += 1
       // 发请求拿数据
       this.getGoodsList()
     }
   ```

3. 当数据请求成功以后，关闭节流阀：

   ```js
     // 获取商品列表数据
     async getGoodsList() {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/search', this.queryObj)
   
       // 请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 请求成功
       this.goods = [...this.goods, ...res.message.goods]
       this.total = res.message.total
       // 关闭节流阀
       this.isloading = false
       this.$apply()
     }
   ```

4. 在每次触底的时候，先判断节流阀的状态：

   ```js
     // 监听页面的触底事件
     onReachBottom() {
       // 在每次触底的时候，先判断是否有别的请求，如果有，则不发起额外的数据请求
       if (this.isloading) {
         return
       }
       this.isloading = true
       // 让页码值 +1
       this.queryObj.pagenum += 1
       // 发请求拿数据
       this.getGoodsList()
     }
   ```



## 11. 根据公式，判断是否还有下一页

1. 公式：

   ```
   总数据条数 <= 当前页码值 * 每页显示多少条数据
   ```

2. 具体的代码：

   ```js
     // 监听页面的触底事件
     onReachBottom() {
       // 根据公式，判断是否还有下一页数据
       // 总数据条数 <= 当前页码值 * 每页显示多少条数据
       if (this.total <= this.queryObj.pagenum * this.queryObj.pagesize) {
         // 没有下一页数据了！
         return
       }
   
       // 在每次触底的时候，先判断是否有别的请求，如果有，则不发起额外的数据请求
       if (this.isloading) {
         return
       }
       this.isloading = true
       // 让页码值 +1
       this.queryObj.pagenum += 1
       // 发请求拿数据
       this.getGoodsList()
     }
   ```

   

## 12. 实现下拉刷新效果

1. 在页面的 `config` 节点中，配置并开启下拉刷新效果：

   ```js
   <script>
   import wepy from 'wepy'
   // 引用 mixin 文件
   import mix from '@/mixins/goods_list/index.js'
   
   export default class extends wepy.page {
     mixins = [mix]
   
     // 注意：页面级别的 config 节点，不能抽离到 mixin 中，只能在页面的 class 类中进行配置
     config = {
       // 配置导航条的文本内容
       navigationBarTitleText: '商品列表',
       // 上拉加载更多时候的触底距离
       onReachBottomDistance: 100,
       // 为当前页面开启下拉刷新
       enablePullDownRefresh: true,
       // 下拉刷新窗口的背景色
       backgroundColor: '#eee',
       // 下拉刷新 loading 图标的颜色
       backgroundTextStyle: 'dark'
     }
   }
   </script>
   ```

2. 监听下拉刷新的事件，并重置一些必要的参数，之后，再发起数据请求：

   ```js
     // 监听下拉刷新的事件
     onPullDownRefresh() {
       // 重置一些必要的数据
       this.queryObj.pagenum = 1
       this.goods = []
       this.total = 0
       this.isloading = false
       this.getGoodsList(() => {
         wepy.stopPullDownRefresh()
       })
     }
   ```

3. 修改 `getGoodsList` 函数如下：

   ```js
   // 获取商品列表数据
     async getGoodsList(cb) {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/search', this.queryObj)
   
       // 请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 请求成功
       this.goods = [...this.goods, ...res.message.goods]
       this.total = res.message.total
       this.isloading = false
       this.$apply()
       cb && cb()
     }
   ```



## 13 补充：单线程与多线程&&同步与异步

### 单线程

概念：无法通过写代码的方式，主动开启新线程的语言，就是单线程的！



### 多线程

概念：程序员可以写代码，主动创建干活的线程。

var td = new Thread()



### 单线程的问题