$(function() {
  var docEl = document.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    if (document.body.clientWidth > 750) {
      docEl.style.fontSize = (parseFloat(750) / parseFloat(120)) * 100 + "%";
    }
    else {
      docEl.style.fontSize = (parseFloat(document.body.clientWidth) / parseFloat(120)) * 100 + "%";
    }
  };
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);

function autoH() {
  var mylistW = $('.picList').width();
  $('.picList').each(function () {
    $(this).find('img').eq(1).css({
      'width': mylistW / 5 + 'px'
    }).show();
  });
} autoH();
// $(function () {
  $('.topic-list-1 .product-price').css('opacity', '1')
  $('.picList-image').each(function (index, item) {
    $(item).css('height', $(item).height())
  });
  $('.listProd').each(function (index, item) {
    var _li = $(item).find('.picList')
    _li.each(function (i, v) {
      if (i == 0 || i == 1) {
        $(v).css('borderRadius', '0 0 10px 10px')
      }
    })

  })
// })

var mySwiper;
var mySwiper1;
var mySwiper2;

// $(document).ready(function(){
	 mySwiper = new Swiper('.swiper-container3', {
		pagination : '.pagination',
		paginationClickable : true
	});
	mySwiper1 = new Swiper('.swiper-container1', {
		pagination : '.pagination',
		paginationClickable : true,
		slidesPerView : 6.5
	});
	mySwiper2 = new Swiper('.swiper-container4', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 3000,
		loop: true,
		//on: {
		//    touchStart: function (swiper) {
		//        loop: false;
		//    },
		//    touchEnd: function (swiper) {
		//        loop: true
		//    }
		//}
	});

    //热点图片
	//$(window).load(function () {
	    //$('.hotImgWrap').each(function (i,item) {
	       // var imageSrc = $(item).css('backgroundImage').replace("url(\"", "").replace("\")", "");;
	        //var image = new Image();
	        //image.src = '' + imageSrc + '';
	       // var imageH = (image.height * $(window).width()) / image.width;
	       // $(item).css('height', imageH);
	   // });
	//});
//滑到下一个页面	
	mySwiper.params.onSlideNext = function () {
       
	var index = mySwiper.activeIndex;
	mySwiper1.swipeTo(index, 300, function () {
			});
    //滑动恢复滚动条
    $('.myscroll').each(function () {
	    $(this).scrollTop(0);
    });
    setClass(index);
	    //alert(slidleft);  

	}
//划到上一个页面
mySwiper.params.onSlidePrev = function() {
	var index = mySwiper.activeIndex;
	mySwiper1.swipeTo(index, 300, function() {
	});
	var slidleft = $("#slide" + index).offset().left;
	$(".bar").offset({
				left : slidleft
	});
	setClass(index);/////////////////////
}
    //点击导航跳转相应页面
  $("div[name='title']").each(function(index, el) {
		$(el).click(function(){
		    goLocation(index);
			var slidleft = $("#slide" + index).offset().left;
			$(".bar").offset({
						left : slidleft
					});
		});
	});
// });
// $(function() {


//点击导航跳转相应页面
function goLocation(i) {
    mySwiper.swipeTo(i, 300, function () {});
    setClass(i);
    // alert(i);
}
// })
$('.myscroll').scroll(function () {
    var myScrollTop = $('.myscroll').scrollTop();
})

function goto(url) {
	window.location.href = url;
}
function setClass(i) {
	$("div[name='title']").each(function(index, el) {
    // console.log(index,el);
				if (index != i) {
					if ($(el).hasClass("cuurent")) {
						$(el).removeClass("cuurent");
					}
				} else {
					$(el).addClass("cuurent");
				}
			});

}

    
function LsazyLoadImg_funtion() {
    // 延迟加载所有图片
    var isHttp = (location.protocol === "http:");
    $(".lazyload").each(function () {
        var self = $(this);
        if (self.filter(":above-the-fold").length > 0) {
            var originUrl = self.attr("data-original");
            self.attr("src", originUrl);
        }
    });
}
// $(function () {
    var lazyLoadTimerId = null;
  LsazyLoadImg_funtion();
    /// 智能加载事件
    $('.myscroll').each(function (i, item) {
        $(item).bind("scroll", function () {
         
            var wW = $(item).scrollTop();
            if (wW >= 100) {
                $('.loadApp').hide();
                container()
            } else {
                $('.loadApp').show();
                container()
            }
           
          
            clearTimeout(lazyLoadTimerId);
            lazyLoadTimerId = setTimeout("LsazyLoadImg_funtion()", 50);
        })
    });
// });


//alert(document.cookie)

function container(){
var sclideH = document.documentElement.clientHeight || document.body.clientHeight;
var headH = $('.headerTop').height();
$('.swiper-container3,.swiper3,.myscroll').css('height', sclideH - headH - 25);
}
container();
//var w_width =( $('.SearchW').width() - $('.SearchW dl').width() -50)/100;
//$('.SearchW a').css('width', w_width + 'rem');

$(window).load(function () {
    $('.hotProList').each(function (i, item) {
        var _dd = $(item).find('dd');

        _dd.css('marginTop', -((_dd.height()) / 2));
    });
    var windW = $(window).width();
    $('.hotImgWrap').each(function (i, item) {
        $(item).css({
            'height': $(item).find('img').height(),
            'background': 'url(' + $(item).find('img').attr('src') + ') no-repeat center center',
            'backgroundSize': '100% 100%',
            'verticalAlign':'bottom'
        })
    })
    $.each([".topic-list-2 li", ".product-mesg", ".product-mesg dt", ".topic-list-2 a>img", '.product-mesg>img'], function (i, item) {
        $(item).css('width', Math.round($(item).width()))
    });

    if ($('.picList a>img').length > 0 && $('.picList .aHref>img').css('display') == 'block' && $('.picList a>img') < 320) {
        $.each(['.topic-list-2 a>img', '.product-mesg>img'], function (i, item) {
            $(item).css('width', $('.aHref>img').width())
        })
    }
    $('.topic-list-2 figure>img').each(function (i, item) {
        $(item).css('height', $(item).width())
    })
    $('.topic-list-1').each(function (i, item) {
        var imgH = $(item).find('dt').width(), ddW = $(item).width() - $(item).find('dt>img').width() - 11;
        $(item).find('dt,dd').css('height', imgH + 10)
        $(item).find('dd').css('width', ddW)
    });
    $(".product-other-name").each(function (i, item) {
        var pHeight = $(item).height(), _parA = $(item).parents('.product-mesg'), _text = $(item).html().substr(0, 30);
        if (pHeight > 44 && $(window).width() < 750) {
            $(item).html(_text + '...')
            //_parA.find('.product-price').css({ 'bottom': '15px' });
            //_parA.find('i').css({ 'bottom': '15px' });
            //_parA.find('em').css({ 'paddingTop': '15px' });

        }
    })
    $('.recomPic').each(function (i, item) {
        var recomPicDdH = $(item).find('dd img').height()/2;
        $(item).find('dt a').css('height', recomPicDdH)
    })
})


// $(function () {
  var hrefUrl = window.location.href;
  $('#tog a').each(function (i,item) {
      var aUrl = $(item).attr('href').replace("http://myshop.shajibao.com/", "");
      if (hrefUrl.indexOf(aUrl) > -1) {
          $(item).addClass('act');
          $(item).parent().siblings().find('a').removeClass('act')
      }
  })
  var cookietime = new Date();
  cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));//coockie保存一小时 
  $('.loadApp span').click(function () {
      $.cookie('appload', 'loadAPP', {  expires: cookietime,path: '/' })
      $('.loadApp').remove();            
  })
  // if ($.cookie('appload') == 'loadAPP') {
  //     $('.loadApp').remove();
  // } else {
  //     $('.loadApp').show();
  // }
  //$('.loadApp span').click(function () {
  //    document.cookie = "loadApp=";
  //    $('.loadApp').remove();            
  //})
 
  //$(window).load(function () {
  //    var c = document.cookie;
  //    var cook = c.split(';');

  //    for (var i = 0; i <= cook.length; i++) {
  //        if (cook[i] == "loadApp=") {
  //            $('.loadApp').remove();
  //        }
  //        break;
  //    }
  //})
  $('.loadApp a').click(function () {
      $.ajax({
          type: "post",
          url: "/Common/GetInvitationCode_0sEcsdNG.html",
          async: false,
          success: function (data) {
              if (data.status==1) {
                  location.href = "https://shop.jiangxinxiaozhen.com/Account/NewUserToWeiXin_0sEcsdNG.html";
              }
          }
      });
      
  })
// })

})