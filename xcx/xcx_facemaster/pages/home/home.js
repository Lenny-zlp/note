// pages/home/home.js

// 在页面中，可以调用 getApp() 函数，获取到全局的一些数据
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 整个屏幕的高度
    screenHeight: 0,
    // 摄像头的朝向  可选值有  back 和 front
    devicePosition: 'back',
    // 照片的路径
    src: '',
    // 人脸信息对象
    faceinfo: {},
    // 映射关系
    map: {
      gender: {
        male: '男性',
        female: '女性'
      },
      expression: {
        none: '不笑',
        smile: '微笑',
        laugh: '大笑'
      },
      glasses: {
        none: '无眼镜',
        common: '普通眼镜',
        sun: '墨镜'
      },
      emotion: {
        angry: '愤怒',
        disgust: '厌恶',
        fear: '恐惧',
        happy: '高兴',
        sad: '伤心',
        surprise: '惊讶',
        neutral: '无表情',
        pouty: '撅嘴',
        grimace: '鬼脸'
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用微信API，获取设备相关的信息
    const sysInfo = wx.getSystemInfoSync()
    // 为 data 中的 屏幕高度，重新赋值
    this.setData({
      screenHeight: sysInfo.screenHeight
    })
  },

  /**
   * 点击按钮，切换摄像头的朝向
   */
  reverseCamera() {
    this.setData({
      devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back'
    })
  },

  /**
   * 点击拍照
   */
  takePhoto() {
    // 1. 创建摄像头的 Jvascript 实例对象
    const ctx = wx.createCameraContext()
    // 2. 调用 摄像头实例 的 takePhoto 函数，进行拍照
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          // 把拍照获取到的照片，存储到 data 中
          src: res.tempImagePath
        }, () => {
          // 调用检测人脸信息的函数
          this.getFaceInfo()
        })
      }
    })
  },

  /**
   * 从手机相册中选择照片
   */
  chooseImage() {
    wx.chooseImage({
      // 只允许用户选择1张照片
      count: 1,
      // 选择原图
      sizeType: ['original'],
      // 图片的来源
      sourceType: ['album'],
      success: (res) => {
        if (res.tempFilePaths.length > 0) {
          this.setData({
            src: res.tempFilePaths[0]
          }, () => {
            // 调用检测人脸信息的函数
            this.getFaceInfo()
          })
        }
      }
    })
  },

  /**
   * 重选照片
   */
  reChoose() {
    // 清空数据
    this.setData({
      src: ''
    })
  },

  /**
   * 调用颜值检测的 API，获取人脸的信息
   */
  getFaceInfo() {
    wx.showLoading({
      title: '颜值检测中...'
    })
    // 1. 获取到全局保存的 token 值
    const token = app.globalData.token
    // 2. 把图片读取为 base64 格式
    const fileManager = wx.getFileSystemManager()
    const base64Img = fileManager.readFileSync(this.data.src, 'base64')

    // 3. 发起网络数据请求
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + token,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        image_type: 'BASE64',
        image: base64Img,
        // 年龄,性别,颜值分数,表情,是否戴眼镜,情绪
        face_field: 'age,gender,beauty,expression,glasses,emotion'
      },
      success: (res) => {
        console.log(res)
        if (res.data.result && res.data.result.face_list.length > 0) {
          this.setData({
            faceinfo: res.data.result.face_list[0]
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})