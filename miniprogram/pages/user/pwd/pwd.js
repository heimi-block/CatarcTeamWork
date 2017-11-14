const network = require('./../../../utils/network.js')
const util = require('./../../../utils/util.js')

Page({
  data: {
    showTopTips: false,
    oldPwd: '',
    newPwdOne: '',
    newPwdTwo: ''
  },
  bindOldPwdInput: function (e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },
  bindNewPwdOneInput: function (e) {
    this.setData({
      newPwdOne: e.detail.value
    })
  },
  bindNewPwdTwoInput: function (e) {
    this.setData({
      newPwdTwo: e.detail.value
    })
  },
  onLoad: function (options) {
    this.setData({
      ofProject: options.projectId
    })
  },
  bindFormSubmit: function (e) {
    var that = this;
    const params = {}
    params.oldPassword = that.data.oldPwd
    params.password = that.data.newPwdOne
    params.repassword = that.data.newPwdTwo

    if (params.oldPassword === '') {
      wx.showModal({
        content: '请输入您的旧密码',
        showCancel: false
      })
      return false
    }

    if (params.password === '') {
      wx.showModal({
        content: '请输入您的新密码',
        showCancel: false
      })
      return false
    }

    if (params.repassword === '') {
      wx.showModal({
        content: '请再次输入您的新密码',
        showCancel: false
      })
      return false
    }
    
    if (params.repassword !== params.password) {
      wx.showModal({
        content: '两次输入的新密码不一致',
        showCancel: false
      })
      return false
    }

    let token = wx.getStorageSync('token')
    network.requestLoading('/api/user/' + wx.getStorageSync('_id'), 'PUT', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {
        wx.showModal({
          content: res.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }
    }, () => {
      console.log('error')
    })
  }
});