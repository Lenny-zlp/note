import wepy from 'wepy'

// 封装弹框函数
wepy.baseToast = function(str = '获取失败') {
  wepy.showToast({
    title: str,
    icon: 'none',
    duration: 1500
  })
}

// 基地址
const baseURL = 'https://ugo.botue.com/api/public/v1'
// 封装 GET 请求函数
wepy.get = function(url, data = {}) {
  return wepy.request({
    method: 'GET',
    url: baseURL + url,
    data
  })
}

// 封装 POST 请求函数
wepy.post = function(url, data = {}) {
  return wepy.request({
    method: 'POST',
    url: baseURL + url,
    data
  })
}
