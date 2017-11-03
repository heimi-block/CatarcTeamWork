const network = require('./network.js')

const checkLogin = (success,fail) => {
  let token = wx.getStorageSync('token')
  if (token !== '') {
    network.requestLoading('http://localhost:7000/api/auth', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      success(res)
    }, () => {
      fail()
    })
  }
} 

module.exports = {
  checkLogin
}