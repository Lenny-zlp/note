//app.js
App({
  onLaunch: function () {
    // 在小程序刚启动的那一刻，获取 Access Token
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=rqD2ZQ46ci5uMUEAUHRhPhC2&client_secret=0r4M2sz9HwfmX33lX74UoGTNbBjEopN0',
      success: (res) => {
        this.globalData.token = res.data.access_token
        console.log(this.globalData)
      }
    })
  },
  globalData: {
    token: null
  }
})