import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    swiperList: [],
    navs: [],
    floors: []
  }
  onLoad() {
    // 调用获取轮播图
    this.getswiperList()
    // 调用获取导航数据
    this.getnavs()
    // 调用获取楼层数据
    this.getfloor()
  }

  // 获取轮播图列表
  async getswiperList() {
    // const {data: res} = await wepy.request({
    //   url: 'https://uinav.com/api/public/v1/home/swiperdata',
    //   method: 'GET'
    // })
    const {data: res} = await wepy.get('/home/swiperdata')
    // 优化
    // 先做失败的情况 return 出去 在做成功的情况
    // 可以少一层嵌套
    // 请求失败
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    wepy.baseToast('请求成功')
    // 请求成功
    this.swiperList = res.message
    this.$apply()
  }

  // 获取导航列表
  async getnavs() {
    const {data: res} = await wepy.get('/home/catitems')
    // 请求失败
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    wepy.baseToast('请求成功')
    // 请求成功
    this.navs = res.message
    this.$apply()
  }

  // 获取楼层列表
  async getfloor() {
    const {data: res} = await wepy.get('/home/floordata')
    // 请求失败
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    wepy.baseToast('请求成功')
    // 请求成功
    this.floors = res.message
    this.$apply()
  }
}
