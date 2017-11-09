//index.js
//获取应用实例
const network = require('../../utils/network.js')
const auth = require('../../utils/auth.js')

const app = getApp()

Page({
  data: {
    todoProjects: [],
    todoCount: 0
  },
  //事件处理函数
  bindCreateCustomer: function() {
    wx.navigateTo({
      url: '../../pages/project/create/create',
    })
  },
  onShow: function () {
    this.getTodoProjects()
  },
  onLoad: function () {
    // 网络请求获取待跟踪的项目列表数据
    this.getTodoProjects()
  },
  getTodoProjects: function() {
    // http://localhost:7000/api/project_todo?wProjectMan=59fbbaeb67bef50644a02844
    let token = wx.getStorageSync('token')
    const params = {}
    params.wProjectMan = wx.getStorageSync('_id')
    network.requestLoading('/api/project_todo', 'GET', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1){
        this.setData({
          todoProjects: res.result.data.map(e=>{
          e.trackRecords.map(j=>{
             j.createdAt = j.createdAt.substr(0, 10)
             console.log(j.createdAt)
              return j
            })
            return e
          }),
          todoCount: res.result.count
        })
      }
    }, () => {
      fail()
    })
  }
})
