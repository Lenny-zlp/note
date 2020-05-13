import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 搜索框中的内容
    value: '',
    // 搜索建议列表
    suggestList: [],
    // 防抖的 timer
    timer: null
  }

  onHide() {
    this.value = ''
    this.suggestList = []
  }

  methods = {
    // 每当搜索框内容变化,都会触发这个函数
    onChange(e) {
      this.value = e.detail
      // 每次开启延时器之前,都把上次的 timer 清掉
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // 获取搜索建议
        this.getSuggestList()
      }, 500)
    },
    // 跳转到详情页面
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/index?goods_id=' + id
      })
    },
    // 点击搜索,导航到商品列表页面
    onSearch() {
      if (this.value.trim().length === 0) {
        return
      }

      this.$parent.addHistory(this.value.trim())
      wepy.navigateTo({
        url: '/pages/goods_list/index?query=' + this.value.trim()
      })
    },
    // 点击搜索历史记录,跳转到商品列表页面
    goGoodsList(q) {
      wepy.navigateTo({
        url: '/pages/goods_list/index?query=' + q
      })
    },
    // 清除搜索历史记录
    clearHistory() {
      this.$parent.clearHistory()
    }
  }

  computed = {
    historyList() {
      return this.$parent.globalData.history
    },
    // 是否展示搜索历史记录
    isShowHistiry() {
      // 如果搜索框中的内容长度为0,则展示历史记录
      return this.value.trim().length === 0
    }
  }

  // 获取搜索建议列表
  async getSuggestList() {
    // 判断搜索内容是否为空
    const val = this.value.trim()
    if (val.length === 0) {
      // 只要搜索内容为空,则清空搜索建议
      this.suggestList = []
      this.$apply()
      return
    }

    // 发起请求
    const { data: res } = await wepy.get('/goods/qsearch', { query: val })

    // 获取数据失败!
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }

    // 获取搜索建议列表成功
    this.suggestList = res.message
    this.$apply()
  }
}
