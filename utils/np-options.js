// 获取动态维护的w属性
function getwCustomerSource() {
  let token = wx.getStorageSync('token')
  network.requestLoading('/api/wCustomerSource', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
    // 数据请求成功，res
    const wCustomerSources_name = ['请选择客户来源']
    const wCustomerSources_id = ['']
    res.result.data.forEach(function (e) {
      wCustomerSources_name.push(e.name)
      wCustomerSources_id.push(e._id)
    })
    this.setData({
      wCustomerSources_name,
      wCustomerSources_id
    })
  }, () => {
    fail()
  })
}

function getwProjectKind() {
  let token = wx.getStorageSync('token')
  network.requestLoading('/api/wProjectKind', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
    // 数据请求成功，res
    const wProjectKinds_name = ['请选择项目类型']
    const wProjectKinds_id = ['']
    res.result.data.forEach(function (e) {
      wProjectKinds_name.push(e.name)
      wProjectKinds_id.push(e._id)
    })
    this.setData({
      wProjectKinds_name,
      wProjectKinds_id
    })
  }, () => {
    fail()
  })
}

module.exports = {
  getwCustomerSource,
  getwProjectKind
}