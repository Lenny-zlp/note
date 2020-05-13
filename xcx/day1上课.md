

小程序 非常类似 vue

微信开发：在微信开发 为什么可以？因为腾讯 提供了很多功能让你可以在微信上面操作

### 微信开放平台

微信登录------在其他网站  会有这个选择 你可以选择登录

微信支付...---在其他网站 支付



和后台关系很大 

### 微信公众平台

账号分类

​    1 服务号   ---常见 10086 114等运行商

​    2 订阅号--- 个人 自媒体使用 常见的 各种公众号  关注

   3  小程序--- 我们要写的  

   4  企业微信---  很少用  一般是大企业里面 会使用

和前端关系比较大

### 小程序-

功能更丰富

app

```
 手机app软件 
 支付宝 抖音 ...
 需要下载安装 
 app的好处：用户体验好   每次更新都需要重新下载
```

移动端网页

```
打开 手机浏览器  输入网址 打开
不需要下载安装----每次打开都是最新的
```

小程序

```
类似于app  
必须打开微信 在微信里面打开小程序
不需要下载  即用即走
```

### 注册小程序

先注册 --登录   需要微信扫码

### 小程序成员管理

1 一般公司  先注册申请一个 小程序账号

2 开发用这个账号----有可能有多个人开发

3 老大 就 把所有人员 加到 成员管理里面  大家就可以使用这个账号开发了

### 安装微信开发者工具

微信相关的  都需要下载这个工具

百度  微信开发者工具   下载对应版本 

双击exe  一直下一步  在桌面就看见  了

 ### 微信网页 -- 公众号网页

说白了 就是写 html css  移动端页面

了解微信网页-- 就是写移动端html css <https://mp.weixin.qq.com/s/S6QEwNg9AiRF88ee3zvffQ>

### 新建小程序项目

1  打开开发者工具

2  点击+

3 项目名称 随便写

   目录 选择一个 空的文件夹

   appID 你注册了 就去网站 开发 --》 开发设置  复制 AppID(小程序ID)  wx05335c652ba3c1a0

​    如果没有 就直接点击 测试号 

```
注意 如果有云服务 就选  不适用
```

### 新建小程序注意点

1  首先文件夹 第一次 建空的

2 腾讯建完 就生成了 一些初始化 文件

### 微信开发者工具

有 手机  控制台  编辑器 集合在一起

代码在什么编辑器 都可以写  写完 一定在微信开发者工具 看效果



### 小程序 页面目录

  文件夹

​        pages  所有页面写在里面

​              index  一个文件夹 就是一个页面

​                   index.js  页面的js

​                  index.json  页面配置

 		 index.wxml   就是html 只是标签名字换了 div就是view ...

​                 index.wxss  就是css  你以前怎么写 现在就怎么写

​         utils 文件夹  公共的一些函数 写不写都行

​         app.js  整个小程序的入口js

​         app.json  整个配置 全局的

​         app.wxss  全局样式

​       project.config.json  小程序appid等等  不重要

### 新建页面

注意：1 在pages文件夹 新建 目录 home  在home目录 新建四个文件

​           2 必须去 app.json里面的pages 再加上整个文件路径

​      app.json里面的pages   谁在第一个 就默认显示谁s

### app.wxss-是全局的

这个文件里面的样式 是全局的 

每个页面都有自己的wxss  他是局部的  可以覆盖全局的

### view与text标签

view 就是类似 div  

text  类似span

```
<!--  view 类似 div-->
<!-- hover-class 点击时候 会生效的类名 -->
<!-- hover-start-time="1000"  点击 1 秒后生效 -->
<!--  hover-stay-time="1000"  松开 1秒后消失 -->
```

```
text 类似span 
  selectable="true"  长按选择文字
  space="nbsp"   显示空格 ensp 半角空格 emsp全角空格 nbsp正常空格
  decode="true"  解析&nbsp;&lt;
```

### button标签 按钮与input

```
 button按钮
  size="mini"  小按钮
  type  primary  绿色 warn 红色
  disabled="true" 是否禁用
  loading="true" 按钮里面带上 loading 效果
  ...
```

```
input
type 默认text  number 数字键盘  idcard 身份证键盘
value 文本框值
placeholder 占位
```

### image标签

1 在根目录 新建 assets文件夹  在里面放上images图片

```
图片 image 
image src 支持 http 也支持 本地图片  

mode="aspectFit" 长边 占满 就不动了
mode="aspectFill" 短的占满  超出就剪切
```

### import导入外联样式

1 新建 一个 其他的 xx.wxss

2 在要使用的 页面wxss里面  @import '路径样式'

### rpx尺寸单位的使用

px   平时 

rem 适应手机

rpx



像素：1 手机像素 2 css像素

dpr ==2  

​        1手机像素=2个css像素

dpr==3

​        1 手机像素==3个css像素

1 手机像素=  2个   rpx

### 小程序 设计图 都是 750px

量出 750 宽度  写多少？   750rpx

量出多少 写多少

量出 200  就写 200rpx

### 小程序项目

1  把原来的 备份一份

2  删掉 pages里面的所有文件

3 删除app.json pages数组里面的数据

4 在pages文件夹 新建home 新建 index四个文件

### app.json配置小程序外观

app.json

 {

​	pages:[]  是所有页面的数据 谁在第一个默认显示他

​        window:{}  配置顶部 区域

​       tabbar:{} 就是 底部导航栏

 }



### window配置

```
"window": {
     // 下拉部分
    "backgroundColor":"#ccc",
    "backgroundTextStyle": "dark",
    "enablePullDownRefresh": true,
	//标题部分
    "navigationBarBackgroundColor": "#3a4861",
    "navigationBarTitleText": "本地生活",
    "navigationBarTextStyle": "white"
  },
```

### app.json中tabbar配置底部导航

复制 我给你们的资料文件夹 里面的 icons到 你们自己的 assets里面

1 app.json 继续写上 tabBar

 ```
"tabBar": {
    "color":"#2f0", //文字未选择颜色
    "selectedColor":"#f20", // 选择后的文字颜色
    "position":"bottom", //tabbar位置  到了top 图标就不在了 一般不写默认就行
    
    "list": [ 
      // 每一个对象就是一个tabbar标签
      {
        "pagePath": "pages/home/index", // 页面路径 保持一致
        "text": "首页", //文字
        "iconPath": "./assets/icons/home.png",// 未选择的图标
        "selectedIconPath": "./assets/icons/home-active.png" //选择的图标
      },
      ......
  },
 ```

2 在pages文件夹 写上对应的页面

 carts   my 页面

### 在页面的json里面 配置当前页面

```
{
  "usingComponents": {},
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示", // 配置每个页面的文字
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```



### 生命周期

从开始 到结束  过程 里面会调用 很多函数

```
vue
beforeCreate
created 一般在这 发生ajax
beforemount 页面挂载前 还没渲染
mounted  页面挂载 渲染了 页面已经有div了
beforeupdate  更新前
updated  更新
beforedestory 销毁 之前
destoryed  销毁了
```

### 小程序生命周期--在js文件

#### 1 整个小程序的生命周期 app.js

```
//app.js
App({
  // 小程序 刚刚打开
  onLaunch: function () {
    console.log("小程序onLaunch")
  },
  // 小程序显示了 挂断了 又回来
  onShow:function(){
    console.log("小程序onshow")
  },
  // 小程序隐藏了  电话来了 小程序就隐藏到后面了
  onHide:function(){
    console.log("小程序onHide")
  },
  // 小程序出错了
  onError:function(){

  },
  globalData: {//全局数据
    userInfo: null
  }
})
```



#### 2 页面的生命周期 页面js

```
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载--类似created 一般发生ajax
   * 一次
   */
  onLoad: function (options) {
    console.log("页面 onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成--
   * 一次
   */
  onReady: function () {
    console.log("页面 onReady")
  },

  /**
   * 生命周期函数--监听页面显示--切换页面
   * 多次
   */
  onShow: function () {
    console.log("页面 onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏--切换页面
   * 多次
   */
  onHide: function () {
    console.log("页面 onHide")
  },

  /**
   * 生命周期函数--监听页面卸载-删掉页面
   */
  onUnload: function () {
    console.log("页面 onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
```



### swiper轮播图

```
<swiper indicator-dots>
  <swiper-item>
    <image src="/assets/images/banner-01.png"></image>
  </swiper-item>
  <swiper-item>
     <image src="/assets/images/banner-02.png"></image>
  </swiper-item>
</swiper>
```



### 数据

1  在js的  data里面写上数据

2  在wxml页面  去 {{  数据 }}  渲染

小程序

onLaunch

onShow

onHide

页面

onLoad

onReady

onShow

onHide

onUnload







































