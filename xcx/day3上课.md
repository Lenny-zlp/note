整个小程序onLaunch    onShow   onHide

页面  onLoad 初始化创建  可以发送请求

​         onShow 显示 还没有渲染完成

​         onReady  第一次渲染完成

​         onHide  隐藏

​          onUnload  页面销毁 删除掉了

### 1 页面的滚动事件与页面的转发分享

 #### 页面的js 写  onPageScroll  页面滚动触发

```
onPageScroll: function (e) {
    console.log(e);//e 有页面滚动出去的距离 scrollTop
  }
```

#### 页面js的转发分享

   1  点击 右上角的 三个...  转发       

   2 点击 button按钮  open-type="share"  也可以

在onShareAppMessage里面 可以不写 默认截图当前页面 
也可以 自己return一个对象 定义你要转发的样式

 ```

onShareAppMessage: function (res) {
    console.log("转发分享了",res);//不写任何东西 也会有一个提示 图片是当前页面的截图
    // res: form menu代表 点击右上角 "button" 点击按钮
         //  target 代表按钮 如果点的右上角 值是undefined
    // 我们也可以自定义 图片和标题
    return {
      title:"草哥小程序",
      path:"/pages/home/index",
      imageUrl:"/assets/images/daye.jpg"
    }
  }
 ```



### 2 导航链接--页面跳转

   1 声明式导航---自己写标签跳转到 list页面

   ```
<!-- 声明式导航-直接标签  navigator 
  区分  tabbar配置的页面  和 没有配置的页面
  tabbar配置的页面：默认不可以跳转去  如果要去 加上  open-type="switchTab"
-->
<navigator url="/pages/list/list?id=1&name=zs">去list页面</navigator>
<navigator url="/pages/my/index" open-type="switchTab">去my页面</navigator>
   ```

   2 编程式导航-- 写js去跳转

  ```
在carts的wxml 点击按钮 跳转
<!-- 编程式导航--写js跳转 -->
<!-- 点击按钮跳转 -->
<button bindtap="goList">点击跳转 去 list页面</button>
<button bindtap="goMy">点击跳转 去 my页面</button>

------------
在carts的js写上 跳转
 goList:function(){
    // 点击 跳转去list页面
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  goMy: function () {
    // 点击 跳转tabbar去my页面
    wx.switchTab({
      url: '/pages/my/index'
    })
  },
  
  -----跳转的参数
  1 在地址后 url?id=1&name=zs 
  2 在 对应的页面js  onLoad
  onLoad: function (options) {
      // 1 可以发送请求 初始数据  2 接受跳转来的参数
    console.log("options", options)
  },
  ```

**注意：** tabbar页面 跳转时候 不能传参数 



### 导航 返回

  1 声明式  

   ```
delta 1代表上一页  2 上上一页  一般就上一页就行
<navigator open-type="navigateBack" delta="2">返回上一页</navigator>
   ```

2  编程式

```
goback:function(){
    wx.navigateBack({
      delta: 2
    })
  },
```

### 3 自定义组件

  1  怎么创建 

​    一个文件夹 就是 一个组件  组件里面有四个文件组成 js  json  wxml wxss

  2 js 是调用Component()   页面  Page()

####  创建一个components文件夹  在里面 创建 test 组件

根目录新建 components文件夹  

在components文件夹 新建 test文件夹

在test文件夹 右键 新建Component



#### 配置打开开发的页面

- 导航栏自定义编译模式快速传参--**测试my页码面**
  - 小程序每次修改代码并编译后，会默认从首页进入，但是在开发阶段，我们经常会针对特定的页面进行开发，为了方便编译后直接进入对应的页面，可以配置自定义编译模式，步骤如下：
  - 单击工具栏上的“普通编译”下拉菜单
  - 单击下拉菜单中的“添加编译模式”选项
  - 在弹出的“自定义编译条件窗口”，按需添加模式名称、启用页面、启动参数、进入场景等。

 ![](./images/4chuanc1.png)

![](./images/4chuanc2.png)

#### 把编辑工作在vscode  微信开发者工具 只是用来看效果和调试

#### 在页面导入组件使用

 0 先创建 test 文件夹  新建Component  test组件

 1 在 页面的 json  配置 usingComponents 导入组件

```
{
  "usingComponents": {
    // 组件的标签名字:"组件的路径"
     "my-test":"/components/test/test"
  }
}
```

2 在wxml页面 使用 组件名字标签

```
<!-- 使用 组件的标签名字 即可 -->
<my-test></my-test>
```

#### 组件的数据和事件绑定

 1  组件写data

 2 事件函数 写在组件的 methods里面

3 组件获取值和设置值 

   ```
// 获取值 this.data.money 
// 设置值 this.setData({})

   ```

#### 组件的生命周期

```
// 组件生命周期
  lifetimes:{
    // 生命周期函数
    created:function(){// 数据刚刚初始化 但是还不能用setData
      console.log("created")
    },
    attached:function(){//节点在内存里面生成 可以使用setData
      console.log("attached")
    },
    ready:function(){//渲染出了组件
      console.log("ready")
    },
    moved:function(){//组件被移动到其他地方--小程序没有比较常见的场景
      console.log("moved")
    },
    detached:function(){// 组件被删除了
      console.log("detached")
    },
    error:function(){//组成出错的时候
      console.log("error")
    }
  }
```

### 组件 插槽

#### 组件单个slot插槽简单使用

1 在组件标签之间 写上内容

2 在组件内部 使用<slot></slot> 接受 

#### 组件中多个slot插件使用--具名插槽

1 必须在组件js 配置 开启

 ```
Component({
  // 开启多个slot
  options:{
    multipleSlots:true //开启
  },
 ```

2 页面wxml    在组件标签之间的内容  取上对应的slot名字

```
<view slot="header">
      我是header
  </view>
```

3 在组件内部 wxml 里面 接受对应的 名字

```
 <slot name="header"></slot>
```

#### 组件传值通信

vue   父-》子  子-》父  

##### 小程序 父传子

1 在组件标签 身上  写上 属性

```
<my-test name='zs'></my-test>
```

2 在组件 js里面 使用properties接受

```
 properties: {
     name:{
       type:String,//类型
       value:"默认值啊"//默认值
     }
  },
```

3 在组件页面就可以直接使用了

```
页面的话  {{name}}
js的话   this.data.name
```

##### 小程序自定义组件 子 传 父

1 在父组件my 写上 一个函数 使用自定义事件 传到 子组件

```
js写函数 
   fatherHanshu:function(e){
     console.log("父亲my里面的函数",e)
  },
wxml  使用自定义事件 传到 子组件
  <my-test bindmyEvent="fatherHanshu" ></my-test>
```

2 在子组件内部  使用 this.triggerEvent

 ```
 在 点击的时候 触发 父亲传来的 事件 并且可以 传参数 给父亲
 test的  wxml 
 	<!-- 点击 test组件的按钮 传值给 父组件 -->
       <button bindtap="getfather">点击 传值给 父亲my</button>

 test的  js
    // 点击按钮 执行函数  传值给 父亲
    getfather:function(){
     /*  this.triggerEvent("传来的事件",{
        // 参数名:值
      }) */
      this.triggerEvent("myEvent",{
        a:123
      })
    }
 ```

##### 直接获取组件---类似ref 可以获取到

1 给组件 去一个 id 或者class名字

```
<my-test id="testid" ></my-test>
```

2 直接使用 this.selectComponent("#testid")

```

     console.log("获取的组件",this.selectComponent("#testid"))
```

##### 自定义组件引入也可以 全局

在 app.json 里面 配置

```
"usingComponents":{
     "my-test":"/components/test/test"
  },
  所有页面都能用 推荐大家这样
```



### 4 原生小程序语法  做一个小程序

### 使用原生小程序语法 简单完成 本地生活项目

1  get   https://locally.uieee.com/categories  九宫格接口

2 分类 list页面

```
get   https://locally.uieee.com/categories/分类id/shops

其他参数
   _page: 1   页码
   _limit: 20  显示的条数
```

3 详情页面 

```
get  https://locally.uieee.com/shops/参数id

```

###### 结构

首页

![](./images/首页.png)

列表list页面  wx.showLoading 

![](./images/列表list.png)

详情页面

![](./images/详情页面.png)



### 5 小程序框架

