## 0. 项目相关

请求根路径1  https://uinav.com/api/public/v1

请求根路径2  https://ugo.botue.com/api/public/v1

API文档地址  https://www.showdoc.cc/128719739414963



## 1. 点击商品列表项导航到商品详情页面

1. 为列表项绑定点击事件处理函数，同时把商品Id传入到处理函数中：

   ```html
    <van-card num="{{item.goods_number}}" price="{{item.goods_price}}" title="{{item.goods_name}}" thumb="{{item.goods_small_logo}}" @tap="goGoodsDetail({{item.goods_id}})" />
   ```

2. 在页面的 js 文件中，声明点击事件处理函数如下：

   ```js
     methods = {
       // 点击列表项，跳转到商品详情页面
       goGoodsDetail(goods_id) {
         wepy.navigateTo({
           url: '/pages/goods_detail/index?goods_id=' + goods_id
         })
       }
     }
   ```



## 2. 获取商品详情的数据

1. 将导航传递过来的参数，转存到 data 中：

   ```js
     data = {
       // 商品的Id
       goods_id: null
     }
   
     onLoad(params) {
       // 将导航传递过来的参数，转存到 data 中
       this.goods_id = params.goods_id
     }
   ```

2. 在 `onLoad` 生命周期函数中，发起数据请求：

   ```js
     onLoad(params) {
       // 将导航传递过来的参数，转存到 data 中
       this.goods_id = params.goods_id
       // 获取商品详情的数据
       this.getGoodsInfo()
     }
   ```

3. 定义获取商品详情数据的函数：

   ```js
     // 获取商品详情的数据
     async getGoodsInfo() {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/detail', {
         goods_id: this.goods_id
       })
   
       // 数据获取失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 数据获取成功
       this.goods = res.message
       this.$apply()
     }
   ```

4. 将获取到的商品数据，转存到 data 中：

   ```js
     data = {
       // 商品的Id
       goods_id: null,
       // 商品详情数据
       goods: {}
     }
   ```



## 3. 实现图片预览效果

1. 为每个图片循环绑定点击事件处理函数：

   ```html
       <!-- 轮播图区域 -->
       <swiper indicator-dots circular>
         <swiper-item wx:for="{{goods.pics}}" wx:key="pics_id">
           <image src="{{item.pics_big_url}}" @tap="preview({{item.pics_big_url}})"></image>
         </swiper-item>
       </swiper>
   ```

2. 定义预览的事件处理函数：

   ```js
     methods = {
       // 预览图片
       preview(current) {
         /* const urls = []
         this.goods.pics.forEach(item => {
           urls.push(item.pics_big_url)
         }) */
         wepy.previewImage({
           // 所有图片的 URL 地址的数组
           urls: this.goods.pics.map(item => item.pics_big_url),
           // 用户点击了哪张图片，就把这张图片的URL，赋值给 current
           current
         })
       }
     }
   ```

   

## 4. 绘制商品信息区域

1. 绘制UI结构：

   ```html
   
       <!-- 商品信息区域 -->
       <view class="box1">
         <view class="price">￥{{goods.goods_price}}</view>
         <view class="info">
           <view>{{goods.goods_name}}</view>
           <view class="collect">
             <van-icon name="star-o" size="20px" />
             <text>收藏</text>
           </view>
         </view>
         <view class="fare">运费：免运费</view>
       </view>
   
       <!-- 促销、已选 -->
       <view class="box2">
         <view class="row">
           <text class="left">促销</text>
           <text>满300元减30元</text>
         </view>
         <view class="row">
           <text class="left">已选</text>
           <text>黑色/S/1件</text>
         </view>
       </view>
   
       <!-- 收货地址 -->
       <view class="box3">
         <view class="left">
           <text class="send">送至</text>
           <text>***********</text>
         </view>
         <van-icon name="arrow" />
       </view>
   ```

2. 美化样式

   ```css
   
   .box1 {
     padding: 15rpx;
     border-bottom: 12rpx solid #efefef;
     .price {
       color: red;
       font-size: 50rpx;
       line-height: 60rpx;
     }
     .info {
       font-size: 24rpx;
       display: flex;
       .collect {
         width: 150rpx;
         display: flex;
         flex-direction: column;
         align-items: center;
         border-left: 1rpx solid #efefef;
         margin-left: 30rpx;
       }
     }
     .fare {
       font-size: 26rpx;
       color: #666;
     }
   }
   
   .box2 {
     font-size: 24rpx;
     padding: 5rpx 15rpx;
     color: #666;
     border-bottom: 12rpx solid #efefef;
     .row {
       padding: 15rpx;
       .left {
         margin-right: 15rpx;
         color: #000;
       }
     }
   }
   
   .box3 {
     display: flex;
     justify-content: space-between;
     padding: 15rpx;
     font-size: 24rpx;
     line-height: 45rpx;
     border-bottom: 12rpx solid #efefef;
     .send {
       margin-right: 15rpx;
     }
   }
   ```

   

## 5. 选择收货地址

1. 为选择收货地址的区域绑定点击事件：

   ```html
       <!-- 收货地址 -->
       <view class="box3" @tap="chooseAddress">
         <view class="left">
           <text class="send">送至</text>
           <text>***********</text>
         </view>
         <van-icon name="arrow" />
       </view>
   ```

2. 定义事件处理函数：

   ```js
       // 选择收货地址
       async chooseAddress() {
         // 调用 API 获取收货地址
         const res = await wepy.chooseAddress().catch(err => err)
         // 选择收货地址失败
         if (res.errMsg !== 'chooseAddress:ok') {
           return wepy.baseToast('选取收货地址失败！')
         }
   
         // 选取收货地址成功
         console.log(res)
       }
   ```



## 6. 将用户选择的收货地址存储到全局

1. 在 `app.wpy` 中，全局定义收货地址：

   ```js
     // 全局共享数据的节点
     globalData = {
       // 收货地址
       address: null
     }
   ```

2. 在 `app.wpy` 中，定义修改收货地址的函数：

   ```js
     // 设置收货地址
     setAddress(address) {
       // 把页面传递过来的 address 收货地址，
       // 保存到 全局 globalData 中
       this.globalData.address = address
     }
   ```

3. 在页面中，调用全局的 `setAddress` 函数，来修改收货地址：

   ```js
   // 选择收货地址
       async chooseAddress() {
         // 调用 API 获取收货地址
         const res = await wepy.chooseAddress().catch(err => err)
         // 选择收货地址失败
         if (res.errMsg !== 'chooseAddress:ok') {
           return wepy.baseToast('选取收货地址失败！')
         }
   
         // 选取收货地址成功
         this.$parent.setAddress(res)
       }
   ```



## 7. 从全局访问收货地址

1. 在页面中，定义计算属性节点：

   ```js
     // 计算属性
     computed = {
       // 完整的收货地址字符串
       addressStr() {
         // 从全局,把收货地址映射过来
         const addressObj = this.$parent.globalData.address
         // 判断收货地址是否为空,来决定渲染什么的字符串
         return addressObj
           ? addressObj.provinceName +
               addressObj.cityName +
               addressObj.countyName +
               addressObj.detailInfo
           : '请选择收货地址'
       }
     }
   ```

2. 在页面上，使用计算属性，渲染收货地址：

   ```html
    <!-- 收货地址 -->
       <view class="box3" @tap="chooseAddress">
         <view class="left">
           <text class="send">送至</text>
           <text>{{addressStr}}</text>
         </view>
         <van-icon name="arrow" />
       </view>
   ```



## 8. 每次小程序重启都加载 storage 中的数据

1. 在 `onLaunch` 全局生命周期中，读取  storage 中的数据：

   ```js
     // 全局生命周期函数
     onLaunch() {
       // 加载 storage 中的数据
       this.initGlobalData()
     }
   ```

2. 封装 `initGlobalData` 这个函数如下：

   ```js
     // 初始化全局的数据
     async initGlobalData() {
       const res = await wepy
         .getStorage({
           key: 'globalData'
         })
         .catch(err => err)
   
       // 数据读取成功
       if (res.errMsg === 'getStorage:ok') {
         this.globalData = res.data
       }
     }
   ```

   

## 9. 绘制图文详情以及规格参数区域

1. 在全局注册 tabs 组件：

   ```js
       usingComponents: {
         // 在注册组件的时候，需要使用键值对形式
         // 键 就是注册的组件名称
         // 值 就是组件的具体存放路径（注意：在组件文件夹之后，应该写组件的名字即可，不要带任何后缀名）
         'van-button': './assets/vant/button/index',
         // Sidebar 侧边导航
         'van-sidebar': './assets/vant/sidebar/index',
         'van-sidebar-item': './assets/vant/sidebar-item/index',
         // Card 商品卡片
         'van-card': './assets/vant/card/index',
         // Icon 图标
         'van-icon': './assets/vant/icon/index',
         //Tab 标签页
         'van-tab': './assets/vant/tab/index',
         'van-tabs': './assets/vant/tabs/index'
       }
   ```

2. 绘制图文详情和规格参数的UI结构：

   ```html
       <!-- 图文详情区域 -->
       <van-tabs>
         <van-tab title="图文详情">
           <rich-text nodes="{{goods.goods_introduce}}"></rich-text>
         </van-tab>
         <van-tab title="规格参数">
           <view class="attr-row" wx:for="{{goods.attrs}}" wx:key="attr_id">
             <view class="attr-name">{{item.attr_name}}</view>
             <view class="attr-value">{{item.attr_value}}</view>
           </view>
         </van-tab>
       </van-tabs>
   ```

3. 美化样式：

   ```css
   
   .attr-row {
     display: flex;
     line-height: 80rpx;
     border-top: 1rpx solid #efefef;
     font-size: 24rpx;
     .attr-name {
       border-right: 1rpx solid #efefef;
       text-align: center;
       width: 40%;
     }
     .attr-value {
       padding-left: 15rpx;
     }
   }
   ```

4. 处理 `.webp` 图片在 IOS 设备上不显示的问题：

   ```js
   // 获取商品详情的数据
     async getGoodsInfo() {
       // 发起数据请求
       const { data: res } = await wepy.get('/goods/detail', {
         goods_id: this.goods_id
       })
   
       // 数据获取失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 数据获取成功
       // 把所有 .webp 后缀名结尾的图片,替换为 .jpg
       res.message.goods_introduce = res.message.goods_introduce.replace(
         /\.webp/g,
         '.jpg'
       )
       this.goods = res.message
       this.$apply()
     }
   ```



## 10. 渲染底部的商品导航

1. 注册全局组件：

   ```js
       usingComponents: {
         // 在注册组件的时候，需要使用键值对形式
         // 键 就是注册的组件名称
         // 值 就是组件的具体存放路径（注意：在组件文件夹之后，应该写组件的名字即可，不要带任何后缀名）
         'van-button': './assets/vant/button/index',
         // Sidebar 侧边导航
         'van-sidebar': './assets/vant/sidebar/index',
         'van-sidebar-item': './assets/vant/sidebar-item/index',
         // Card 商品卡片
         'van-card': './assets/vant/card/index',
         // Icon 图标
         'van-icon': './assets/vant/icon/index',
         //Tab 标签页
         'van-tab': './assets/vant/tab/index',
         'van-tabs': './assets/vant/tabs/index',
         // GoodsAction 商品导航
         'van-goods-action': './assets/vant/goods-action/index',
         'van-goods-action-icon': './assets/vant/goods-action-icon/index',
         'van-goods-action-button': './assets/vant/goods-action-button/index'
       }
   ```

2. 渲染UI结构：

   ```html
       <!-- 商品导航 -->
       <van-goods-action>
         <van-goods-action-icon icon="chat-o" text="客服" bind:click="onClickIcon" />
         <van-goods-action-icon icon="cart-o" text="购物车" bind:click="onClickIcon" />
         <van-goods-action-button text="加入购物车" type="warning" bind:click="onClickButton" />
         <van-goods-action-button text="立即购买" bind:click="onClickButton" />
       </van-goods-action>
   ```

3. 美化样式：

   ```css
   
   .van-goods-action {
     z-index: 999;
   }
   
   .container {
     padding-bottom: 40px;
   }
   ```



## 11. 实现客服功能以及跳转到购物车页面

```html
    <!-- 商品导航 -->
    <van-goods-action>
      <!-- 客服聊天按钮 -->
      <van-goods-action-icon icon="chat-o" text="客服" open-type="contact" />
      <van-goods-action-icon icon="cart-o" text="购物车" url="/pages/tabs/cart" link-type="switchTab" />
      <van-goods-action-button text="加入购物车" type="warning" bind:click="onClickButton" />
      <van-goods-action-button text="立即购买" bind:click="onClickButton" />
    </van-goods-action>
```



## 12. 搜索页面-获取用户在搜索框输入的内容

1. 在全局注册搜索组件：

   ```js
   usingComponents: {
         // 在注册组件的时候，需要使用键值对形式
         // 键 就是注册的组件名称
         // 值 就是组件的具体存放路径（注意：在组件文件夹之后，应该写组件的名字即可，不要带任何后缀名）
         'van-button': './assets/vant/button/index',
         // Sidebar 侧边导航
         'van-sidebar': './assets/vant/sidebar/index',
         'van-sidebar-item': './assets/vant/sidebar-item/index',
         // Card 商品卡片
         'van-card': './assets/vant/card/index',
         // Icon 图标
         'van-icon': './assets/vant/icon/index',
         //Tab 标签页
         'van-tab': './assets/vant/tab/index',
         'van-tabs': './assets/vant/tabs/index',
         // GoodsAction 商品导航
         'van-goods-action': './assets/vant/goods-action/index',
         'van-goods-action-icon': './assets/vant/goods-action-icon/index',
         'van-goods-action-button': './assets/vant/goods-action-button/index',
         // Search 搜索
         'van-search': './assets/vant/search/index'
       }
   ```

2. 在页面中渲染对应的组件结构：

   ```html
   <template>
     <view>
       <!-- 搜索框 -->
       <van-search value="{{value}}" placeholder="请输入搜索关键词" show-action @change="onChange" bind:search="onSearch" bind:cancel="onCancel" />
     </view>
   </template>
   
   <script>
   import wepy from 'wepy'
   import mix from '@/mixins/tabs/search.js'
   
   export default class extends wepy.page {
     mixins = [mix]
   }
   </script>
   
   ```

3. 定义 mixin 如下：

   ```js
   import wepy from 'wepy'
   
   export default class extends wepy.mixin {
     data = {
       // 搜索框中的内容
       value: ''
     }
   
     methods = {
       // 每当搜索框内容变化,都会触发这个函数
       onChange(e) {
         this.value = e.detail
       }
     }
   }
   
   ```



## 13. 实现输入框的防抖

1. 在 data 中定义 防抖的 `timer` 

   ```js
     data = {
       // 搜索框中的内容
       value: '',
       // 搜索建议列表
       suggestList: [],
       // 防抖的 timer
       timer: null
     }
   ```

2. 在频繁触发输入框 `onChange` 事件处理函数的时候，通过延时器进行防抖：

   ```js
       // 每当搜索框内容变化,都会触发这个函数
       onChange(e) {
         this.value = e.detail
         // 每次开启延时器之前,都把上次的 timer 清掉
         clearTimeout(this.timer)
         this.timer = setTimeout(() => {
           // 获取搜索建议
           this.getSuggestList()
         }, 500)
       }
   ```



## 14. 渲染搜索建议列表

1. 绘制页面结构：

   ```html
       <!-- 搜索建议列表 -->
       <view class="suggest-list">
         <view class="suggest-item van-ellipsis" wx:for="{{suggestList}}" wx:key="goods_id">{{item.goods_name}}</view>
       </view>
   ```

2. 美化样式：

   ```css
   .suggest-list {
     .suggest-item {
       line-height: 80rpx;
       font-size: 24rpx;
       padding: 0 15rpx;
       border-top: 1rpx solid #efefef;
     }
   }
   ```

3. 省略多余的字符：

   ```html
   // 步骤1，在 app.wpy 的  <style>  标签中，引入公共的类样式：
   <style lang="less">
   // 导入公共样式,使它在全局生效
   @import './assets/vant/common/index.wxss';
   </style>
   
   
   // 步骤2，为搜索建议项，添加   van-ellipsis    类名即可。
   ```

4. 清空搜索建议：

   ```js
     // 获取搜索建议列表
     async getSuggestList() {
       // 判断搜索内容是否为空
       const val = this.value.trim()
       if (val.length === 0) {
         // 只要搜索内容为空,则清空搜索建议
         this.suggestList = []
         // 在异步的延时器中，也需要调用  this.$apply() 
         this.$apply()
         return
       }
   
       // 发起请求
       const { data: res } = await wepy.get('/goods/qsearch', { query: val })
   
       // 获取数据失败!
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 获取搜索建议列表成功
       this.suggestList = res.message
       this.$apply()
     }
   ```



## 15. 点击搜索建议跳转到详情页面

1. 为搜索建议项绑定 tap 事件处理函数：

   ```html
       <!-- 搜索建议列表 -->
       <view class="suggest-list">
         <view class="suggest-item van-ellipsis" wx:for="{{suggestList}}" wx:key="goods_id" @tap="goGoodsDetail({{item.goods_id}})">{{item.goods_name}}</view>
       </view>
   ```

2. 定义事件处理函数：

   ```js
       // 跳转到详情页面
       goGoodsDetail(goods_id) {
         wepy.navigateTo({
           url: '/pages/goods_detail/index?goods_id=' + goods_id
         })
       }
   ```



## 16. 点击搜索按钮，跳转到商品列表页面

1. 为搜索框组件，绑定 `search` 事件：

   ```html
   <!-- 搜索框 -->
       <van-search value="{{value}}" placeholder="请输入搜索关键词" show-action @change="onChange" @search="onSearch"/>
   ```

2. 定义 `onSearch` 事件处理函数：

   ```js
       // 点击搜索,导航到商品列表页面
       onSearch() {
         if (this.value.trim().length === 0) {
           return
         }
         wepy.navigateTo({
           url: '/pages/goods_list/index?query=' + this.value
         })
       }
   ```

   