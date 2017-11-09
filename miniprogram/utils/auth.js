const network = require('./network')

const checkLogin = (success,fail) => {
  let token = wx.getStorageSync('token')
  if (token !== '') {
    network.requestLoading('/api/auth', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
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