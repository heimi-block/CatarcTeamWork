const config = require('./config.js')

function request(url, method, params, headers, success, fail) {
  this.requestLoading(url, method, params, headers, "", success, fail)
}

// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调

function requestLoading(url, method, params, headers, message, success, fail) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: config.Server.local + url,
    data: params,
    header: headers,
    method: method,
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}

module.exports = {
  request: request,
  requestLoading: requestLoading
}

// 'Bearer '
// 'X-MC-TOKEN': token