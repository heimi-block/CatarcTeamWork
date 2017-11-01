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
    var mobile = that.data.mobile
    var password = that.data.password
    // 联网发起请求
    if (mobile === '13132528820' && password === '123456'){
      // 将信息存储在本机Wechat中
      try {
        wx.setStorageSync('mobile', mobile)
        wx.setStorageSync('password', password)
      } catch (e) {
        console.log(e)
      }
      // 跳转到用户中心页面
      wx.navigateTo({
        url: '../../pages/index/index'
      })
    }else{
      // 登录失败，错误提示
      this.setData({
        errLoginTips: true
      })
    }
  },
  onLoad: function () {
    // 检查是否登录
    try {
      var mobile = wx.getStorageSync('mobile')
      var password = wx.getStorageSync('password')
      // 当用户名或密码不为空，则登录过
      if (mobile !== '' && password!== '') {
        // 发起Request请求验证，如果不匹配则提示错误信息
        if (mobile === '13132528820' && password === '123456') {
          // Do something with return value
          // 跳转到用户中心页面
          wx.navigateTo({
            url: '../../pages/index/index'
          })
        } else {
          this.setData({
            errLoginTips: true,
            errMsg: '您输入登录信息已过期，请重新登录。'
          })
        }
      }
    } catch (e) {
      // Do something when catch error
    }
  }
})