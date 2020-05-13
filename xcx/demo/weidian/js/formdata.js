$(function() {
  $("#imga").change(function() {
    // console.log(this.files[0].name);
    var str = `<div>
                <label><img src="" alt=""></label>
                <i class="del"></i>
              </div>`
   $(this).parent().before(str)
  //  $(this).parent().prev().find('img').attr("src", url)
    // 图片预览
    var fileObj = this.files[0]
    var url = URL.createObjectURL(fileObj)
    $(this).parent().prev().find('img').attr("src", url)


    // if(this.value != '') {
    //   var fd = new FormData()
    //   fd.append("Filedata", this.files[0])
      
    // }
  })
  $('.pic').on('click', ".del", function() {
      $(this).parent().remove()
  })
  // $("#submit").click(function() {
  //   // var fm = $('#fm')
  //   var fd = new FormData()
  //   var fileObj = $('#imga')[0].files[0]
  //   fd.append("Filedata", fileObj)
  //   console.log('12',fd);
  // })

})