import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    vh: 0,
    cates: [],
    cateselect: [],
    activeKey: 0,
    scrollTop: 0
  }
  onLoad() {
    // 获取窗口可用高度
    this.getwindowheight()
    // 获取商品数据
    this.getcates()
  }

  // 获取商品数据
  async getcates() {
    const { data: res } = await wepy.get('/categories')
    // 请求失败
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    wepy.baseToast('请求成功')
    // 请求成功
    this.cates = res.message
    this.cateselect = res.message[0].children
    console.log(res)
    this.$apply()
  }

  // 获取窗口可用高度
  async getwindowheight() {
    const res = await wepy.getSystemInfo()
    console.log(res)
    this.vh = res.windowHeight
  }

  methods = {
    // 点击切换导航栏
    onchange(e) {
      this.cateselect = this.cates[e.detail].children
      // 重置顶部位置
      // 如果 新值和旧值一样 则不会呗重置
      this.scrollTop = this.scrollTop - 1
    },
    // 跳转shoplist
    ongoshoplist(id) {
      wepy.navigateTo({
        url: '/pages/goods_list/index?id=' + id
      })
    }
  }
}
