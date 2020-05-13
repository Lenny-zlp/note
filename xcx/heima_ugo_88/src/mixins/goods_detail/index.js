import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    goods_id: null,
    goods: {}
  }
  onLoad(parmas) {
    this.goods_id = parmas.goods_id
    this.getgoodsinfo()
  }

  // 获取详情数据
  async getgoodsinfo() {
    const { data: res } = await wepy.get('/goods/detail', {
      goods_id: this.goods_id
    })
    // 获取失败
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    // 获取成功
    // 把所有 .webp 后缀名结尾的图片,替换为 .jpg
    res.message.goods_introduce = res.message.goods_introduce.replace(
      /\.webp/g,
      '.jpg'
    )
    this.goods = res.message
    this.$apply()
  }

  methods = {
    preview(current) {
      wepy.previewImage({
        urls: this.goods.pics.map(item => item.pics_big_url),
        current
      })
    },
    // 选择收货地址
    async chooseAddress() {
      // 调用 API 获取收货地址
      const res = await wepy.chooseAddress().catch(err => err)
      // 选择收货地址失败
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.baseToast('选取收货地址失败！')
      }

      // 选取收货地址成功
      this.$parent.setAddress(res)
    }
  }
  // 计算属性
  computed = {
    // 完整的收货地址字符串
    addressStr() {
      // 从全局,把收货地址映射过来
      const addressObj = this.$parent.globalData.address
      // 判断收货地址是否为空,来决定渲染什么的字符串
      return addressObj
        ? addressObj.provinceName +
            addressObj.cityName +
            addressObj.countyName +
            addressObj.detailInfo
        : '请选择收货地址'
    }
  }
}
