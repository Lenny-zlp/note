import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 参数
    query: {
      // 当前页
      pagenum: 1,
      pagesize: 10
    },
    goods: [],
    total: 0,
    isloading: false
  }
  onLoad(parmas) {
    this.query = { ...this.query, ...parmas }
    console.log(this.query)
    this.getgoodslist()
  }
// 获取列表商品数据
  async getgoodslist(cb) {
    const { data: res } = await wepy.get('/goods/search', this.query)
    console.log('haha', res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.goods = [...this.goods, ...res.message.goods]
    this.total = res.message.total
    this.isloading = false
    this.$apply()
    cb && cb()
  }

  onReachBottom () {
    // 节流
    // 总条数 小于等于 当前页数值 * 每页的数量
    if (this.total <= this.query.pagenum * this.query.pagesize) {
      // 成立 没有下一页数据
      return
    }
    // 防抖
    if (this.isloading) {
      return
    }
    this.isloading = true
    this.query.pagenum += 1
    this.getgoodslist()
  }
  onPullDownRefresh () {
    this.query.pagenum = 1
    this.goods = []
    this.total = 0
    this.isloading = false
    this.getgoodslist(() => {
      wepy.stopPullDownRefresh()
    })
  }

  methods = {
    gogoodsdetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/index?goods_id=' + id
      })
    }
  }
}
