const network = require('./../../../utils/network.js')
const util = require('./../../../utils/util.js')

Page({
  data: {
    showTopTips: false,
    trackRecordId: '',
    wTrackMethod: '',
    trackMan: '',
    nextContactDate: '',
    currentTrackContent: '',
    ofProject: '',
    // 跟踪方式 wTrackMethod
    wTrackMethods_name: [],
    wTrackMethods_id: [],
    wTrackMethodIndex: 0,
  },
  bindNextContactDateChange: function (e) {
    this.setData({
      nextContactDate: e.detail.value
    })
  },
  // wTrackMethod 跟踪方式
  bindwTrackMethodChange: function (e) {
    console.log('picker wTrackMethod 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wTrackMethods_id[e.detail.value]);
    this.setData({
      wTrackMethodIndex: e.detail.value,
      wTrackMethod: this.data.wTrackMethods_id[e.detail.value]
    })
  },
  onLoad: function (options) {
    const trackRecordId = options.trackRecordId
    this.setData({
      trackRecordId: trackRecordId
    })
    this.getwTrackMethod()
    this.getTrackRecordDetail(trackRecordId)
  },
  getwTrackMethod: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wTrackMethod', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wTrackMethods_name = ['请选择跟踪方式']
      const wTrackMethods_id = ['']
      res.result.data.forEach(function (e) {
        wTrackMethods_name.push(e.name)
        wTrackMethods_id.push(e._id)
      })
      this.setData({
        wTrackMethods_name,
        wTrackMethods_id
      })
    }, () => {
      fail()
    })
  },
  // 更新项目，text-area微信6.3bug,需采用此方式
  bindFormSubmit: function (e) {
    // 如果负责人的ID不是当前用户ID，提示不能更新
    if (wx.getStorageSync('_id') !== this.data.trackMan) {
      wx.showModal({
        content: '您不可以更新其他人的项目，只可以对此项目进行跟踪记录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('权限不足')
          }
        }
      })
      return false
    }
    const params = {}
    params.ofProject = this.data.ofProject
    params.wTrackMethod = this.data.wTrackMethod
    params.nextContactDate = this.data.nextContactDate
    params.nextContactContent = e.detail.value.nextContactContent
    params.trackMan = this.data.trackMan
    params.currentTrackContent = e.detail.value.currentTrackContent

    // 检验比填写，您没有填写xx,是后续填写吗
    console.log(params)
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/trackRecord/' + this.data.trackRecordId, 'PUT', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {
        var that = this
        wx.showModal({
          content: '更新成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.getProjectDetail(that.data.ofProject)
            }
          }
        })
      }
    }, () => {
      console.log('error')
    })
  },
  getTrackRecordDetail: function (trackRecordId) {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/trackRecord/' + trackRecordId, 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {
        const crm = res.result
        this.setData({
          trackMan: crm.trackMan,
          nextContactDate: crm.nextContactDate,
          currentTrackContent: crm.currentTrackContent,
          nextContactContent: crm.nextContactContent,
          ofProject: crm.ofProject,
          wTrackMethod: (crm.wTrackMethod === undefined || crm.wTrackMethod === null) ? '' : crm.wTrackMethod._id,
          wTrackMethodIndex: util.pickerCurrentIndex(this.data.wTrackMethods_id, (crm.wTrackMethod === undefined || crm.wTrackMethod === null) ? '' : crm.wTrackMethod._id),
        })

      } else {
        // 重新请求
      }
      // 解决删除Modal里获取不到信息的bug
      wx.setStorageSync('projectId', this.data.ofProject)
      // 如果负责人的ID不是当前用户ID，提示不能更新
      if (wx.getStorageSync('_id') !== this.data.trackMan) {
        wx.showModal({
          content: '您正在浏览其他人的跟踪记录，如果您跟踪此记录(可以对此记录进行操作)',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('权限不足')
            }
          }
        })
      }
    }, () => {
      fail()
    })
  },
  bindDelTrackRecord: function () {
    // 如果负责人的ID不是当前用户ID，提示不能删除
    if (wx.getStorageSync('_id') !== this.data.trackMan) {
      wx.showModal({
        content: '您不可以删除其他人的跟踪记录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('权限不足')
          }
        }
      })
      return false
    }
    // 负责人可选中删除此项目, 弹出选项是否删除
    this.openDelConfirm(this.data.trackRecordId)
  },
  // 删除项目
  openDelConfirm: function (trackRecordId) {
    wx.showModal({
      title: '删除操作',
      content: '您确定要删除此跟踪记录吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          let token = wx.getStorageSync('token')
          network.requestLoading('/api/trackRecord/' + trackRecordId, 'DELETE', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
            if (res.code === 1) {
              wx.showModal({
                content: '删除成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    let token = wx.getStorageSync('token')
                    network.requestLoading('/api/project/' + wx.getStorageSync('projectId'), 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
                      // 数据请求成功，res
                      console.log(res)
                      var pages = getCurrentPages()
                      // var prevPage = pages[pages.length - 1]  //当前界面
                      var prevPage = pages[pages.length - 2]  //上一个页面
                      var that = this

                      if (res.code === 1) {
                        const crm = res.result
                        prevPage.setData({
                          wTrackRecords: crm.trackRecords.reverse().map(e => {
                            e.createdAt = e.createdAt.substr(0, 10)
                            return e
                          }),
                          projectCoding: crm.projectCoding,
                          customerName: crm.customerName,
                          projectName: crm.projectName,
                          competitor: crm.competitor,
                          bidEvaluationMethod: crm.bidEvaluationMethod,
                          bidPlanDate: crm.bidPlanDate,
                          forecastOrderMoney: crm.forecastOrderMoney,
                          contractSignDate: crm.contractSignDate,
                          actualSignMoney: crm.actualSignMoney,
                          wProjectManValue: crm.wProjectMan.realName,
                          wProjectMan: crm.wProjectMan._id,

                          wCustomerAgencyName: (crm.wCustomerAgencyName === undefined || crm.wCustomerAgencyName === null) ? '' : crm.wCustomerAgencyName._id,
                          wCustomerAgencyNameIndex: util.pickerCurrentIndex(prevPage.data.wCustomerAgencyNames_id, (crm.wCustomerAgencyName === undefined || crm.wCustomerAgencyName === null) ? '' : crm.wCustomerAgencyName._id),

                          wCustomerSource: (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id,
                          wCustomerSourceIndex: util.pickerCurrentIndex(prevPage.data.wCustomerSources_id, (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id),

                          wProjectKind: (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id,
                          wProjectKindIndex: util.pickerCurrentIndex(prevPage.data.wProjectKinds_id, (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id),

                          // wProjectState: (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id,
                          // wProjectStateIndex: util.pickerCurrentIndex(prevPage.data.wProjectStates_id, (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id),

                          wSaleStage: (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id,
                          wSaleStageIndex: util.pickerCurrentIndex(prevPage.data.wSaleStages_id, (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id),

                          wBiddingType: (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id,
                          wBiddingTypeIndex: util.pickerCurrentIndex(prevPage.data.wBiddingTypes_id, (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id),

                          wPreSaleMan: (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id,
                          wPreSaleManIndex: util.pickerCurrentIndex(prevPage.data.wPreSaleMans_id, (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id),

                        })

                      } else {
                        // 重新请求
                      }

                      wx.navigateBack()

                    }, () => {
                      fail()
                    })
                  }
                }
              })
            }
          }, () => {
            fail()
          })

        } else {
          console.log('用户点击辅助操作')
        }
      }
    });

  },
  getProjectDetail: function (projectId) {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/project/' + projectId, 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      console.log(res)
      var pages = getCurrentPages()
      // var prevPage = pages[pages.length - 1]  //当前界面
      var prevPage = pages[pages.length - 2]  //上一个页面
      var that = this

      if (res.code === 1) {
        const crm = res.result
        prevPage.setData({
          wTrackRecords: crm.trackRecords.reverse().map(e => {
            e.createdAt = e.createdAt.substr(0, 10)
            return e
          }),
          projectCoding: crm.projectCoding,
          customerName: crm.customerName,
          projectName: crm.projectName,
          competitor: crm.competitor,
          bidEvaluationMethod: crm.bidEvaluationMethod,
          bidPlanDate: crm.bidPlanDate,
          forecastOrderMoney: crm.forecastOrderMoney,
          contractSignDate: crm.contractSignDate,
          actualSignMoney: crm.actualSignMoney,
          wProjectManValue: crm.wProjectMan.realName,
          wProjectMan: crm.wProjectMan._id,

          wCustomerAgencyName: (crm.wCustomerAgencyName === undefined || crm.wCustomerAgencyName === null) ? '' : crm.wCustomerAgencyName._id,
          wCustomerAgencyNameIndex: util.pickerCurrentIndex(prevPage.data.wCustomerAgencyNames_id, (crm.wCustomerAgencyName === undefined || crm.wCustomerAgencyName === null) ? '' : crm.wCustomerAgencyName._id),

          wCustomerSource: (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id,
          wCustomerSourceIndex: util.pickerCurrentIndex(prevPage.data.wCustomerSources_id, (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id),

          wProjectKind: (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id,
          wProjectKindIndex: util.pickerCurrentIndex(prevPage.data.wProjectKinds_id, (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id),

          // wProjectState: (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id,
          // wProjectStateIndex: util.pickerCurrentIndex(prevPage.data.wProjectStates_id, (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id),

          wSaleStage: (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id,
          wSaleStageIndex: util.pickerCurrentIndex(prevPage.data.wSaleStages_id, (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id),

          wBiddingType: (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id,
          wBiddingTypeIndex: util.pickerCurrentIndex(prevPage.data.wBiddingTypes_id, (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id)

        })

      } else {
        // 重新请求
      }

      wx.navigateBack()

    }, () => {
      fail()
    })
  }



});