const network = require('../../utils/network.js')
const auth = require('../../utils/auth.js')

Page({
  data: {
    mobile: '',
    password: '',
    errLoginTips: false,
    errMsg: '您输入的用户名和密码与我们的记录不符。 请仔细检查，然后重试。'
  },
  bindMobileInput: function(e) {
    this.setData({
      mobile: e.detail.value,
      errLoginTips: false
    })
  },
  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value,
      errLoginTips: false
    })
  },
  bindLogin: function(){
    var that = this
    // 获取用户输入完的用户名和密码
    const params = {}
    params.mobile = that.data.mobile
    params.password = that.data.password

    // 联网发起请求
    network.requestLoading('/api/auth', 'POST', params, { 'Content-Type': 'application/x-www-form-urlencoded' }, '', (res) => {
      // 数据请求成功，res
      // 登录成功
      if (res.code === 1) {
        // 将Token安全令牌等信息存储在本机Wechat中
        wx.setStorageSync('token', res.result.token)
        wx.setStorageSync('_id', res.result._id)
        // 跳转到用户中心页面
        wx.switchTab({
          url: '../../pages/index/index',
        })
      }else{
        // 登录失败，错误提示
        that.setData({
          errLoginTips: true
        })
      }
    }, () => {
      wx.showToast({
        icon: 'loading',
        title: '服务器500错误，有人要扣奖金啦~',
      })
    })
  },
  onLoad: function () {
    // 检查是否已经登录
    auth.checkLogin((res) => {
      console.log(res)
      // 验证成功
      if (res.code === 1) {
        // 跳转到用户中心页面
        wx.switchTab({
          url: '../../pages/index/index',
        })
      } else {
        // 验证失败，错误提示
        this.setData({
          errLoginTips: true,
          errMsg: '您输入登录信息已过期，请重新登录。'
        })
      }
    }, () => {
      // 连接失败，错误提示
      wx.showToast({
        icon: 'loading',
        title: '服务器500错误，有人要扣奖金啦~',
      })
    })
  }
})