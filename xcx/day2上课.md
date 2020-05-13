### 反馈与复习

1 微信小程序开发--基于微信 做小程序 （必须微信打开）

2 app--application 应用程序     移动端app (手机) 与 pc端app(电脑)

3 view text--微信小程序特有

​    div span  原生html有的

view 类似 div  text 类似span 。。。  image 类似 img

4 讲解 

   view  text button  input  image  swiper

  看看 文档的 其他标签  

很多属性 了解就行

5 按钮样式不一样  （版本有问题  右上角详情--》本地设置--》切换成最新的）



#### 复习

1 介绍小程序

2 注册一个小程序账号  ---开发--开发设置 --小程序appid

3 安装微信开发者工具

4 创建小程序项目  ---有appid  就选 不需要云服务   没有 就点 测试号就行

5 介绍项目结构 

​       app文件 全局

​      pages

​               一个文件夹 算一个页面  一个页面 有四个文件组成

6 view  text button  input  image  swiper

7  头导航 和底部导航 都是配置的

 app. json 里面配置

​       pages:[]  页面路径数组

​       window:  配置头导航

​      tabBar 配置底部导航

### 生命周期

#### 1 小程序生命周期 app.js

onLaunch  小程序第一次打开

onShow   小程序显示  --电话又挂断 显示

onHide  小程序隐藏--电话来了 小程序被隐藏到后面

#### 2 页面生命周期 页面js

onLoad  页面创建 类似created 发送请求

onShow  页面显示

onReady  第一次 渲染

onHide  页面隐藏

onUnload  页面卸载



### 绑定手指点击事件



1 在wxml 写上 按钮  绑定事件

```
<!-- bindtap="函数" -->
<button bindtap="handletap">点我</button>
```

2 在js里面 和data  平级 写上函数

```
// 自己的函数 和 data 生命周期函数 都是平级的
  handletap:function(){
    console.log("来了 老弟")
  },
```

### 有哪些事件

文档：指南 --小程序框架 ---事件系统

https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

事件：bindxx  xx就是事件名称

bindtap  手指点击

bindlongpress  长按

input标签

   bindfocus 获取焦点事件

   bindblur  失去焦点事件

   bindinput 输入值触发

### 事件传参数

1 绑定事件后 需要 写上data-xx 传参

```
<button bindtap="handletap" data-id="1" data-name="赵四">点我</button>
```

2 在js函数的 e里面 就可以拿到

```
e.target.dataset.xx
```

### 类似v-model的效果

小程序里面没有 这个类似的指令 只能自己模拟

1 wxml页面给input 绑定value  bindinput事件

```
<view>
  msg值：{{msg}}
  <input value="{{msg}}" bindinput="inputHanlde"></input>
</view>
```

2 在js的inputHanlde函数 获取文本框值 去修改数据

```
// 文本框 输入值改变 触发
  inputHanlde:function(e){
    // 接受获取新的文本框的值 
    console.log(e.detail.value);//e.detail.value 文本框值
    //  修改 data的msg数据
    // this.data.msg = e.detail.value;// 只是数据改了 页面不会更新
    this.setData({
      // 键：值
      msg: e.detail.value
    })
  }
```

重点：以后小程序改值 必须用 this.setData()

总结：1 绑定事件 bindtap=“函数”

​             2 事件传参  在标签 上 写 data-xx="参数"

​            3 在页面wxml 只要绑定数据   用 {{  msg }}

​            4 修改数据 必须用 this.setData()

### wxs

wxs是小程序特有  注意：他是为了 简化{{}}  写法

wxs 和js  是不一样的

wxs 是CommonJs规范  ---nodejs也是这个

​            导出 用 module.exports

​            导入  用require

  es6：导入 import  导出 export    export default

### wxs要求 计算 1-10的和

1 在wxml  写上标签 wxs

2    取一个module="名字"

3 在wxs里面 要module.exports={   }

4 就可以在 {{ 名字.函数()。。 }}

```
<!-- 使用wxs 来做一些复杂计算  1-10的和 -->
<wxs module="m1">
    module.exports={
      add:function(){
         var sum=0;
         for(var i=1;i<=10;i++){
          sum+=i
         }
        return sum
      }
  } 
</wxs>
使用
{{ m1.add() }}
```

### wxs注意点

1 不能使用 es6的高级语法  let  简写 都不行

2  基础的js语法 是正常使用的

### 外联的wxs

1 直接在 wxml里面 创建 wsx标签写代码  内联的wsx

2 外联的wxs

2.1  在assets新建  tools.wxs 

2.2  在 tools.wxs 里面 写上 module.exports={}

```
module.exports = {
  add: function () {
    var sum = 0;
    for (var i = 1; i <= 10; i++) {
      sum += i
    }
    return sum
  }
} 
```

2.3  在wxml里面 直接 wxs  src=路径 module='名字'

```
<wxs src="../../assets/tools.wxs" module="m2"></wxs>
```

2.4  直接 {{  名字.函数()  }}

### 条件渲染wx:if

vue   v-if 

小程序 wx:if   true显示  false隐藏

1 在js data 写上 score:40 

```
data: {
     msg:"我是msg值",
     num:10,
     score:40
  },
```

2 在wxml 里面 使用wx:if  wx:elif  wx:else 判断

### 条件渲染hidden

 hidden  true隐藏  false 显示

### wx:if与hidden的区别

类似 vue中 v-if  v-show

```
<!--
 hidden  true隐藏  false 显示  
 wx:if   true显示  false隐藏

 区别：  hidden 元素本身在 只是 不显示
        wx:if  删除元素  与 创建元素
         
 -->
 <view  hidden="{{isshow}}">
   我要不要显示hidden
 </view>

  <view  wx:if="{{isshow}}">
   我要不要显示ififif
 </view>

```

### 循环列表

vue v-for

小程序 wx:for

1 在js 的data写上数组arr

```
   arr:[
       {name:"尼古拉斯赵四",age:48},
       { name: "本山", age: 68 },
       { name: "小损样", age: 38 }
     ]
```

2 在wxml里面循环 数组

```
 <!-- 循环数组 生成 页面
 wx:for="{{数组}}"  只要循环 默认就有 item 代表每一项 index代表 索引
 wx:key="index" 直接写名字 字符串  数字 唯一的
  -->
<view>
    <view wx:for="{{arr}}" wx:key="index">
      姓名：{{item.name}}  年龄：{{item.age}}---索引  {{index}}
    </view>
</view>
<!-- 不想叫item index了 改名 -->
<view>
    <view wx:for="{{arr}}" wx:for-item="a" wx:for-index="forindex" wx:key="forindex">
      姓名：{{a.name}}  年龄：{{a.age}}---索引  {{forindex}}
    </view>
</view>
```



点击按钮 发送一个 get请求

### 发送请求

```
 wx.request({
      url: "https://www.liulongbin.top:8081/api/post",//地址
      method:"post",// 请求方式  get  post  默认不写就是get  大小写都可以
      data: {
        username: "admin",
        password: "123"
      },//参数
      success: function (res) {
        console.log("成功的结果", res)
      }
})
```



注意：直接发送报错

  ```
小程序要求：1 必须在你注册的账号后台配置这个地址 

    在    小程序后台-开发-开发设置-服务器域名

   点击 修改  扫码 配置你的域名

 特殊点： 只能是https  如果有端口写上  如果端口是443就可以省略

2 右上角 详情 勾选 不校验合法域名 这样就可以先不配置

  ```

### 注意 小程序是没有跨域概念

跨域 一般 只是 平时页面 发送ajax  有跨域问题

    ```
同源策略  --- 协议域名端口 一样
不同源   任何  协议域名端口不 一样  

浏览器 会阻止 给你结果

解决跨域：
jsonp
cors  让后台 写上header头 允许跨域
    ```



小程序 根本没有跨域问题

php  java 这些后台 都没有跨域问题



### 上拉加载 下拉刷新

#### 上拉加载-默认50

1  在json 配置 "onReachBottomDistance":50      距离底部50px 就触发

2  在页面js 里面有一个事件onReachBottom 监听到底部

```
/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉到底了  发送请求加载更多啦")
  },
```

注意： 1 在 app.json 的 window配置 是所有页面会生效的

​             2 在页面 的json 里面 单独配置 只影响当前页面

          ```
{
  "usingComponents": {},
  "onReachBottomDistance": 200
}
          ```

#### 下拉刷新

1 必须先配置  "enablePullDownRefresh":true,

  ```
  "enablePullDownRefresh":true, //开启下拉刷新
   "backgroundColor":"#ccc",// 背景色
   "backgroundTextStyle":"dark" //三个点的 样式
  ```

注意：1 在app.json 的window配置 是 所有页面都生效

​            2 在页面的 json  配置  当前页面生效

 ```
{
  "usingComponents": {},
  "onReachBottomDistance": 200,// 上拉加载
  "enablePullDownRefresh":true //下拉刷新
}
 ```

2 在每个 页面 js 有一个事件onPullDownRefresh

```
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     console.log("home 下拉刷新 重新发送请求 渲染最新数据")
      
  },
```

### 停止下拉刷新注意 ：

如果下拉刷新 完成 请求了  需要 手动调用  wx.stopPullDownRefresh() 停止

 否则 会一直 在 ...





### 复习

1 事件绑定  bindxx  xx 事件名  bindtap  bindlongtap  bindinput bindfocus bindblur

2 事件传参  data-xx="值"

```
<button bindtap="handletap" data-id="1" data-name="赵四">点我</button>
在e里面 
```

3  input value=“{{msg}}”  bindinput="函数"

4 修改值 

```
 this.setData({
    //键:新值
    msg:"123",
    ...
 })
```

5 wxs  小程序脚本 特有的  因为{{}} 写的简单表达式 如果比较复杂 我们建议写在 wxs

6 wx:if  true显示  false隐藏

   hidden  true隐藏 false显示

wx:if  创建和删除元素

hidden 是 元素在 只是 隐藏或者显示

7 循环 wx:for="{{数组}}"  默认item是每一项  index 是索引

一般循环 加上 wx:key  

8  发送请求

wx.request({ 

   url:"地址",

   method:"get或者post",

   data:{ //参数

   },

  success:function(res){//res 就是成功的返回值

   }

})

9 上拉加载 下拉刷新

在 app.json 的window 配置  是全局所有页面都生效

在页面的 json  配置  是当前页面生效 一般推荐

1 上拉加载

"onReachBottomDistance":50

触发 js里面  onReachBottom

2 下拉刷新

enablePullDownRefresh:true

触发js的  onPullDownRefresh

注意：下拉刷新 需要手动关掉  wx.stopPullDownRefresh()













