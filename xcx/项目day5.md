## 0. 项目相关

请求根路径1  https://uinav.com/api/public/v1

请求根路径2  https://ugo.botue.com/api/public/v1

API文档地址  https://www.showdoc.cc/128719739414963



## 1. 在购物车页面提交订单时进行非法操作的判断

1. 为提交订单按钮绑定`submit`事件处理函数：

   ```html
       <!-- 提交订单栏 -->
       <van-submit-bar price="{{amount}}" button-text="提交订单" @submit="onSubmitOrder" tip="{{ true }}">
         <!-- 全选的复选框 -->
         <van-checkbox class="fullCheck" checked-color="#D81E06" value="{{isFullCheck}}" @change="onFullCheckChange">全选</van-checkbox>
       </van-submit-bar>
   ```

2. 定义事件处理函数，并进行非法操作的判断：

   ```js
       // 用户点击了提交订单按钮
       onSubmitOrder() {
         // 先判断用户的操作是否合法
         // 1. 必须有勾选的商品 2. 订单价格不能为 0
         const checkedLength = this.$parent.globalData.cart.filter(x => x.isCheck)
           .length
   
         if (checkedLength === 0 || this.amount === 0) {
           return wepy.baseToast('订单不能为空！')
         }
       }
   ```



## 2. 跳转到订单支付页面

1. 在 `src -> pages -> order` 目录下，新建一个订单支付页面，叫做 `order.wpy`，并初始化如下的页面结构：

   ```html
   <template>
     <view>
       订单支付页面
     </view>
   </template>
   
   <script>
   import wepy from 'wepy'
   import mix from '@/mixins/order/order.js'
   
   export default class extends wepy.page {
     mixins = [mix]
   }
   </script>
   
   ```

2. 在 `src -> mixins -> order` 目录下，创建订单支付页面对应的 mixin 脚本文件 `order.js` 如下：

   ```js
   import wepy from 'wepy'
   
   export default class extends wepy.mixin {
     data = {}
   }
   
   ```

3. 在 `src -> app.wpy` 的 `config -> pages` 数组中，注册订单支付页面的路径如下：

   ```js
       pages: [
         'pages/tabs/home',
         'pages/tabs/cates',
         'pages/tabs/search',
         'pages/tabs/cart',
         'pages/tabs/my',
         'pages/goods_detail/index',
         'pages/goods_list/index',
         'pages/order/order'
       ],
   ```

4. 在 购物车页面中，点击提交订单按钮后，可以通过编程式导航，跳转到订单支付页面：

   ```js
       // 用户点击了提交订单按钮
       onSubmitOrder() {
         // 先判断用户的操作是否合法
         // 1. 必须有勾选的商品 2. 订单价格不能为 0
         const checkedLength = this.$parent.globalData.cart.filter(x => x.isCheck)
           .length
   
         if (checkedLength === 0 || this.amount === 0) {
           return wepy.baseToast('订单不能为空！')
         }
   
         // 可以跳转到订单支付页面
         wepy.navigateTo({
           url: '/pages/order/order'
         })
       }
   ```

   

## 3. 渲染收货信息区域以及选择收货地址按钮，并实现按需展示

1. 渲染收货地址按钮区域的UI结构：

   ```html
       <view class="address-box2" wx:else>
         <!-- 本地存储中没有收货地址，显示 box2 -->
         <van-button type="default" size="small">+请选择收货地址</van-button>
       </view>
   ```

2. 美化选择收货地址按钮区域的样式：

   ```css
   .address-box2 {
     text-align: center;
     padding: 40rpx 0;
   }
   ```

3. 渲染收货信息区域的UI结构：

   ```html
       <!-- 收货地址区域 -->
       <view class="address-box1" wx:if="{{address !== null}}">
         <!-- 本地存储中有收货地址，显示 box1 -->
         <view class="row1">
           <text>收货人：{{address.user}}</text>
           <view>
             <text>联系电话：{{address.phone}}</text>
             <van-icon name="arrow" />
           </view>
         </view>
         <view class="row2">收货地址：{{address.addressStr}}</view>
       </view>
   ```

4. 美化收货信息区域的样式：

   ```css
   .address-box1 {
     font-size: 24rpx;
     padding: 15rpx;
     line-height: 65rpx;
     .row1 {
       display: flex;
       justify-content: space-between;
     }
   }
   ```

5. 定义一个计算属性，来控制上面两个区域的按需显示：

   ```js
     computed = {
       // 收货地址的计算属性
       address() {
         // 从全局，把收货地址对象映射到页面中
         const addressObj = this.$parent.globalData.address
         if (addressObj === null) {
           return null
         } else {
           return {
             user: addressObj.userName,
             phone: addressObj.telNumber,
             addressStr:
               addressObj.provinceName +
               addressObj.cityName +
               addressObj.countyName +
               addressObj.detailInfo
           }
         }
       }
     }
   ```



## 4. 选择收货地址

1. 为选择收货地址按钮，绑定 tap 事件处理函数：

   ```js
       // 选择收货地址
       async chooseAddress() {
         const res = await wepy.chooseAddress().catch(err => err)
   
         // 选取收货地址失败
         if (res.errMsg !== 'chooseAddress:ok') {
           return wepy.baseToast('选择收货地址失败！')
         }
   
         // 成功以后，直接把 收货地址信息对象，保存到全局
         this.$parent.setAddress(res)
       }
   ```

2. 在点击 联系电话 区域的时候，也调用 `chooseAddress` 这个函数即可。



## 5. 渲染确认订单页面中商品列表

1. 定义计算属性，把全局所有已勾选商品列表筛选出来：

   ```js
     computed = {   
   // 选中的商品列表
       selectedGoods() {
         return this.$parent.globalData.cart.filter(x => x.isCheck)
       }
     }
   ```

2. 循环渲染页面结构：

   ```html
       <!-- 分割线 -->
       <image src="/assets/cart_border@2x.png" class="sep"></image>
   
       <!-- 循环渲染商品列表 -->
       <view>
         <block wx:for="{{selectedGoods}}" wx:key="id">
           <van-card num="{{item.count}}" price="{{item.price}}" title="{{item.name}}" thumb="{{item.pic}}" />
         </block>
       </view>
   ```



## 6. 获取登录成功之后的 Token

1. 为登录后下单按钮，绑定 `open-type` 和 `bindgetuserinfo` 属性：

   ```html
   <!-- 登录后下单 -->
   <van-button type="primary" size="large" class="btnlogin" open-type="getUserInfo" bindgetuserinfo="userLogin">登录后下单</van-button>
   ```

2. 在 js 文件中，定义 `userLogin` 事件处理函数：

   ```js
       // 用户点击按钮后登录，获取登录成功之后的 Token
       async userLogin(e) {
         // 1. 先拿到用户的授权
         // 2. 根据用户的授权，拿到用户的隐私数据
         // 2.1 这里拿到的 e.detail 就是用户的隐私数据
         if (e.detail.errMsg !== 'getUserInfo:ok') {
           return wepy.baseToast('获取用户授权失败！')
         }
   
         // 3. 调用 wx.login 函数，获取 code
         const loginRes = await wepy.login().catch(err => err)
         if (loginRes.errMsg !== 'login:ok') {
           return wepy.baseToast('用户登录失败！')
         }
   
         // 组织出一个参数对象
         const params = {
           encryptedData: e.detail.encryptedData,
           rawData: e.detail.rawData,
           iv: e.detail.iv,
           signature: e.detail.signature,
           code: loginRes.code
         }
   
         // 4. 调用后台提供的 /users/wxlogin 接口，获取登录成功之后的 Token
         const { data: res } = await wepy.post('/users/wxlogin', params)
   
         this.$parent.setToken(res.message.token)
       }
   ```



## 7. 实现登录按钮和支付按钮的按需显示

1. 在页面中新增支付订单的区域：

   ```html
   <!-- 支付订单区域 -->
   <van-submit-bar price="{{ 3050 }}" button-text="支付订单" @submit="onPayOrder" wx:else></van-submit-bar>
   ```

2. 定义计算属性：

   ```js
     computed = {
       // 是否登录
       isLogin() {
         return !!this.$parent.globalData.token
       }
     }
   ```

3. 使用计算属性，结合 `wx:if` 和 `wx:else` 来控制它们的按需显示：

   ```html
   <!-- 登录后下单 -->
   <van-button type="primary" size="large" class="btnlogin" open-type="getUserInfo" bindgetuserinfo="userLogin" wx:if="{{!isLogin}}">登录后下单</van-button>
   
   <!-- 支付订单区域 -->
   <van-submit-bar price="{{ 3050 }}" button-text="支付订单" @submit="onPayOrder" wx:else></van-submit-bar>
   ```

4. 在 `userLogin` 函数的最后，当调用 `this.$parent.setToken(res.message.token)` 为全局的 token 重新赋值在以后，必须调用 `this.$apply()` 强制当前页面重新渲染：

   ```js
   // .... 省略不必要的代码
   
   // 4. 调用后台提供的 /users/wxlogin 接口，获取登录成功之后的 Token
   const { data: res } = await wepy.post('/users/wxlogin', params)
   
   this.$parent.setToken(res.message.token)
   
   // 强制当前 order 页面重新渲染一次
   this.$apply()
   ```



## 8. 通过计算属性动态得到订单的总价格

1. 定义计算属性：

   ```js
     computed = {
       // 已勾选的商品总价
       amount() {
         let amount = 0
         this.$parent.globalData.cart.forEach(x => {
           if(x.isCheck) {
             amount += x.price * x.count
           }
         })
   
         return amount * 100
       }
     }
   ```

2. 在页面上，使用计算属性：

   ```html
   <!-- 支付订单区域 -->
   <van-submit-bar price="{{amount}}" button-text="支付订单" @submit="onPayOrder" wx:else></van-submit-bar>
   ```



## 9. 订单支付 - 创建订单 - 组织创建订单的参数对象

1. 为支付订单区域，绑定 `submit` 事件：

   ```html
   <!-- 支付订单区域 -->
   <van-submit-bar price="{{amount}}" button-text="支付订单" @submit="onPayOrder" wx:else></van-submit-bar>
   ```

2. 定义 `onPayOrder` 事件处理函数：

   ```js
       // 点击支付订单
       onPayOrder() {
         // 1. 调用后台API接口，创建订单，会得到 【订单编号】
         // 1.1 判断用户是否指定了收货地址
         if (this.address === null) {
           return wepy.baseToast('请选择收货地址！')
         }
         // 1.2 判断订单总价是否为 0
         if (this.amount === 0) {
           return wepy.baseToast('商品总价不能为0！')
         }
         // 1.2 判断订单中商品的件数是否为 0
         if (this.selectedGoods.length === 0) {
           return wepy.baseToast('商品不能为空！')
         }
         // 1.4 组织出 请求参数对象
         const params = {
           // order_price: amount / 100
           order_price: 0.01,
           // 具体的收货地址
           consignee_addr: this.address.addressStr,
           goods: this.selectedGoods.map(x => {
             return {
               goods_id: x.id,
               goods_number: x.count,
               goods_price: x.price
             }
           })
         }
   
         console.log(params)
   
         // 2. 根据步骤1得到的【订单编号】，调用后台API接口，获取支付相关的参数，会得到【支付参数】
         // 3. 调用小程序官方提供的 wx.requestPayment() 函数，实现支付
       }
   ```

   

## 10. 在 Token 失效后清空本地存储中的 token 字符串

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

   

## 11. 在请求有权限的接口时，添加 Authorization 字段

1. 在 `src -> app.wpy` 文件中，找到 `constructor` 构造函数中的 `config` 拦截器，新增如下代码：

   ```js
         config(p) {
           // 展示 loading 效果
           wepy.showLoading({
             title: '数据加载中...'
           })
   
           // 只有在请求的路径中，包含这个字符串的时候，才需要添加Authorization
           if (p.url.includes('/api/public/v1/my/')) {
             // 为请求对象，添加请求头
             p.header = {
               Authorization: this.globalData.token
             }
           }
           // 必须返回OBJECT参数对象，否则无法发送请求到服务端
           return p
         },
   ```



## 12. 调用你支付接口

```js
    // 点击支付订单
    async onPayOrder() {
      // 1. 调用后台API接口，创建订单，会得到 【订单编号】
      // 1.1 判断用户是否指定了收货地址
      if (this.address === null) {
        return wepy.baseToast('请选择收货地址！')
      }
      // 1.2 判断订单总价是否为 0
      if (this.amount === 0) {
        return wepy.baseToast('商品总价不能为0！')
      }
      // 1.2 判断订单中商品的件数是否为 0
      if (this.selectedGoods.length === 0) {
        return wepy.baseToast('商品不能为空！')
      }
      // 1.4 组织出 请求参数对象
      const params = {
        // order_price: amount / 100
        order_price: 0.01,
        // 具体的收货地址
        consignee_addr: this.address.addressStr,
        goods: this.selectedGoods.map(x => {
          return {
            goods_id: x.id,
            goods_number: x.count,
            goods_price: x.price
          }
        })
      }
      // 1.5 发起创建订单的请求
      const { data: res } = await wepy.post('/my/orders/create', params)
      if (res.meta.status !== 200) {
        // 强制页面重新渲染
        this.$apply()
        return wepy.baseToast('创建订单失败！')
      }
      // 创建订单成功
      // 强制页面重新渲染
      this.$apply()

      console.log(res)

      // 2. 根据步骤1得到的【订单编号】，调用后台API接口，获取支付相关的参数，会得到【支付参数】
      const { data: payParams } = await wepy.post(
        '/my/orders/req_unifiedorder',
        {
          order_number: res.message.order_number
        }
      )

      if (payParams.meta.status !== 200) {
        return wepy.baseToast('生成订单失败！')
      }

      // 3. 调用小程序官方提供的 wx.requestPayment() 函数，实现支付
      const payRes = await wepy
        .requestPayment(payParams.message.pay)
        .catch(err => err)

      // console.log(payRes) // {errMsg: "requestPayment:ok"}
      if (payRes.errMsg !== 'requestPayment:ok') {
        return wepy.baseToast('订单支付失败！')
      }

      // 订单支付成功，倒计时3秒，跳转到订单列表页面
    }
```



## 13. 支付完成之后倒计时跳转到订单列表页面

1. 在全局注册 `van-toast` 组件：

   ```js
     config = {
         usingComponents: {
                // Toast 轻提示
         		'van-toast': './assets/vant/toast/index'
         }
     }
   ```

2. 在 `order.wpy` 页面中，放一个倒计时的组件：

   ```html
   <!-- 实现 Toast 倒计时的组件 -->
   <van-toast id="custom-selector" />
   ```

3. 在 `order.js` 中，导入 `Toast` 成员：

   ```js
   import Toast from '../../assets/vant/toast/toast'
   ```

4. 封装 `countDownToast` 函数，实现倒计时跳转功能：

   ```js
     // 测试倒计时功能
     countDownToast() {
       const toast = Toast.loading({
         duration: 0, // 持续展示 toast
         forbidClick: true, // 禁用背景点击
         message: '倒计时 3 秒',
         loadingType: 'spinner',
         selector: '#custom-selector'
       })
   
       let second = 3
       const timer = setInterval(() => {
         second--
         if (second) {
           toast.setData({
             message: `倒计时 ${second} 秒`
           })
         } else {
           clearInterval(timer)
           Toast.clear()
           // 导航到订单列表页面
           wepy.navigateTo({ url: '/pages/order/order_list' })
         }
       }, 1000)
     }
   ```

5. 在 `onPayOrder` 事件处理函数中，当支付完成以后，调用 `countDownToast` 函数，实现倒计时跳转：

   ```js
   // 订单支付成功，倒计时3秒，跳转到订单列表页面
   this.countDownToast()
   ```



## 14. 初步渲染订单列表页面的UI结构

1. 定义UI结构：

   ```html
   <template>
     <view>
       <van-tabs active="{{active}}" @change="onTabChange">
         <van-tab title="全部">内容 1</van-tab>
         <van-tab title="待付款">内容 2</van-tab>
         <van-tab title="待发货">内容 3</van-tab>
       </van-tabs>
     </view>
   </template>
   
   <script>
   import wepy from 'wepy'
   import mix from '@/mixins/order/order_list.js'
   
   export default class extends wepy.page {
     mixins = [mix]
   }
   </script>
   
   ```

2. 定义页面对应的 mixin 文件：

   ```js
   import wepy from 'wepy'
   
   export default class extends wepy.mixin {
     data = {
       active: 0
     }
   
     methods = {
       // tab 栏发生切换触发这个函数
       onTabChange(e) {
         this.active = e.detail.index
       }
     }
   }
   
   ```



## 15. 切换不同的 tab 页签发起不同的数据请求

1. 定义 `getOrderListByType` 函数，根据 `active` 发起对应的数据请求：

   ```js
     // 根据类型获取对应的订单列表
     async getOrderListByType() {
       // 发起请求获取订单列表数据
       const { data: res } = await wepy.get('/my/orders/all', {
         type: this.active + 1
       })
   
       // 请求失败
       if (res.meta.status !== 200) {
         return wepy.baseToast()
       }
   
       // 请求成功
       switch (this.active) {
         case 0:
           this.orderList1 = res.message.orders
           break
         case 1:
           this.orderList2 = res.message.orders
           break
         case 2:
           this.orderList3 = res.message.orders
           break
       }
   
       this.$apply()
     }
   ```

2. 在 onLoad 生命周期中，调用 `getOrderListByType` 函数：

   ```js
     onLoad() {
       this.getOrderListByType()
     }
   ```

3. 在 `onTabChange` 事件中，调用 `getOrderListByType` 函数：

   ```js
     methods = {
       // tab 栏发生切换触发这个函数
       onTabChange(e) {
         this.active = e.detail.index
         this.getOrderListByType()
       }
     }
   ```

4. 在 data 中定义对应的数据节点：

   ```js
     data = {
       // 激活项的索引
       active: 0,
       // 全部订单列表
       orderList1: [],
       // 待付款的订单列表
       orderList2: [],
       // 待发货的订单列表
       orderList3: []
     }
   ```



## 16. 自定义 WePY 组件

1. 在 `src -> components` 目录下，新建组件文件 `order_item.wpy`，并初始化代码如下：

   ```html
   <template>
     <view>OrderItem</view>
   </template>
   
   <script>
   import wepy from 'wepy'
   
   export default class extends wepy.component {}
   </script>
   
   <style lang="less">
   </style>
   
   ```

2. 在 `order_list.wpy` 页面中，导入并注册自定义的组件：

   ```js
   import wepy from 'wepy'
   import mix from '@/mixins/order/order_list.js'
   // 1. 导入自定义的组件
   import OrderItem from '../../components/order_item'
   
   export default class extends wepy.page {
     mixins = [mix]
   
     components = {
       // 2. 注册组件
       'order-item': OrderItem
     }
   }
   ```

3. 在页面中，把注册的组件名称，通过标签的形式进行使用：

   ```html
   <van-tab title="待付款">
       <!-- 使用自定义的组件 -->
       <order-item></order-item>
   </van-tab>
   ```



## 17. 动态为自定义组件绑定属性

1. 在循环中，通过 `:` 方式动态绑定数据：

   ```html
   <!-- 使用 WePY 指定的方式，循环创建自定义的组件 -->
   <repeat for="{{orderList2}}" key="index">
       <order-item :item="item"></order-item>
   </repeat>
   ```

2. 在组件中，使用 `props` 节点，接收外界传递过来的动态数据：

   ```js
   <script>
   import wepy from 'wepy'
   
   export default class extends wepy.component {
     props = {
       // 定义需要外界传递过来的属性，以及数据的类型
       item: Object
     }
   }
   </script>
   ```

3. 在组件的 `template` 中，渲染外界传递过来的数据：

   ```html
   <template>
     <view>
       <!-- 订单 Item 项 -->
       <van-panel title="{{'订单编号：' + item.order_number}}" use-footer-slot>
         <view>
           <van-card wx:for="{{item.goods}}" wx:key="index" num="{{item.goods_number}}" price="{{item.goods_price}}" title="{{item.goods_name}}" thumb="{{item.goods_small_logo}}" />
         </view>
         <view slot="footer" class="footer-box">
           <text>总数量：<text class="redFont">{{item.total_count}}件</text></text>
           <text>订单总价：<text class="redFont">{{item.total_price}}元</text></text>
         </view>
       </van-panel>
     </view>
   </template>
   ```

4. 美化组件的UI结构：

   ```css
   <style lang="less">
   .van-panel {
     border-bottom: 12rpx solid #efefef;
   }
   
   .van-card {
     border-top: 1rpx solid #efefef;
   }
   
   .footer-box {
     font-size: 24rpx;
     display: flex;
     justify-content: space-between;
     line-height: 60rpx;
     .redFont {
       color: red;
       font-weight: bold;
     }
   }
   </style>
   ```

   

