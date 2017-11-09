const network = require('./../../../utils/network.js')

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["我的项目", "全部项目"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    projectListMe: [],
    projectListAll: []
  },
  onShow: function () {
    this.getProjectAll()
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getProjectAll: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/project', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      console.log(res)
      if (res.code === 1) {
        this.setData({
          projectListAll: res.result.data,
          projectListMe: res.result.data.filter(e => {
            return e.wProjectMan._id === wx.getStorageSync('_id')
          })
        })
      } else {
        // 重新请求
      }
    }, () => {
      fail()
    })
  }
});