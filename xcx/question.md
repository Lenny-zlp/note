# 问题收集

#### 一. js 计算浮点bug

```js
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return (r1/r2)*pow(10,t2-t1);
  }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg){
  return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2)
{
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
  return accMul(arg, this);
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
  return accAdd(arg,this);
}



function Subtr(arg1,arg2){
     var r1,r2,m,n;
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
     m=Math.pow(10,Math.max(r1,r2));
     //last modify by deeka
     //动态控制精度长度
     n=(r1>=r2)?r1:r2;
     return ((arg1*m-arg2*m)/m).toFixed(n);
}



　　在你要用的地方包含这些函数，然后调用它来计算就可以了。
　　比如你要计算：7*0.8 ，则改成 (7).mul(8)  

　　其它运算类似，就可以得到比较精确的结果。
```

#### 二 . js自动触发点击事件

```js
// 三秒后模拟点击
setTimeout(function() {
    // IE浏览器
    if(document.all) {
        document.getElementById("clickMe").click();
    }
    // 其它浏览器
    else {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        document.getElementById("btn").dispatchEvent(e);
    }
}, 3000);
```

#### 三 . 移动端长按事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<script src="./js/jQuery.min.js"></script>
<style>
    * {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    li{
        width: 100%;
        height: 100px;
        background: black;
        margin-bottom:10px;
    }
</style>
<body id="body_id">
  <div style="width:100%;">  
    <div style="width:100%; height:100px; background-color:#CCC;" ontouchstart="gtouchstart()" ontouchmove="gtouchmove()" ontouchend="gtouchend()">长按我</div>   
  </div> 
    <script>  
      var timeOutEvent=0;//定时器   
      //开始按   
      function gtouchstart(){   
          timeOutEvent = setTimeout("longPress()",500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
          return false;   
      };   
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件   
      function gtouchend(){   
          clearTimeout(timeOutEvent);//清除定时器   
          if(timeOutEvent!=0){   
              //这里写要执行的内容（尤如onclick事件）   
              alert("你这是点击，不是长按");   
          }   
          return false;   
      };   
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按   
      function gtouchmove(){   
          clearTimeout(timeOutEvent);//清除定时器   
          timeOutEvent = 0;   
            
      };   
         
      //真正长按后应该执行的内容   
      function longPress(){   
          timeOutEvent = 0;   
          //执行长按要执行的内容，如弹出菜单   
          alert("长按事件触发发");   
      }   
        
      </script>  
</body>
</html>
```

#### 四. 图片缝隙

```js
1. 将图片转换为块级对象即，设置img为：display:block;
2. 给父盒子设置 :　font-size:0;
3. 设置图片的垂直对齐方式  设置图片的vertical-align属性为“top，text-top，bottom，text-bottom”也可以解决
```



