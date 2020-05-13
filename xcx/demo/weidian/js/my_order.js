$(function() {

  // 点击待评价
    $('.comment_d').click(function() {
      $(this).addClass('red').siblings('.comment_y').removeClass('red')
      $(this).find('i').addClass('line').removeClass('lin')
      $(this).siblings('.comment_y').find('i').removeClass('line').addClass('lin')
      $(this).parents('.comment_nav').find('.d_cont').removeClass('hid')
      $(this).parents('.comment_nav').find('.y_cont').addClass('hid')
    })
  
    // 点击已评价
    $('.comment_y').click(function() {
      $(this).addClass('red').siblings('.comment_d').removeClass('red')
      $(this).find('i').addClass('line').removeClass('lin')
      $(this).siblings('.comment_d').find('i').removeClass('line').addClass('lin')
      $(this).parents('.comment_nav').find('.d_cont').addClass('hid')
      $(this).parents('.comment_nav').find('.y_cont').removeClass('hid')
    })
  
  $('.gocomment span').click(function() {
    
  })
  
  
  
  })