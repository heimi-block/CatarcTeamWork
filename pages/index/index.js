//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  bindCreateCustomer: function() {
    wx.navigateTo({
      url: '../../pages/project/create/create',
    })
  },
  onLoad: function () {
    // 网络请求获取待跟踪的项目列表数据
  }
})
