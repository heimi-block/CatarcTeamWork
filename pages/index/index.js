//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  bindCreateCustomer: function() {
    wx.navigateTo({
      url: '../customer/customer',
    })
  },
  onLoad: function () {
    wx.request({
      method: 'GET',
      url: 'https://api.4-m.cn/api/city', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
