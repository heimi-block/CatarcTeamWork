const network = require('./../../../utils/network.js')
const util = require('./../../../utils/util.js')

Page({
  data: {
    showTopTips: false,
    wTrackMethod: '',
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
    this.setData({
      ofProject: options.projectId
    })
    this.getwTrackMethod()
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
  bindFormSubmit: function (e) {
    var that = this;
    const params = {}
    params.ofProject = this.data.ofProject
    params.wTrackMethod = this.data.wTrackMethod
    params.nextContactDate = this.data.nextContactDate
    params.nextContactContent = e.detail.value.nextContactContent
    params.trackMan = wx.getStorageSync('_id')
    params.currentTrackContent = e.detail.value.currentTrackContent

    if (params.currentTrackContent === '') {
      wx.showModal({
        content: '请填写本次跟踪内容',
        showCancel: false
      })
      return false
    }

    if (params.wTrackMethod === '') {
      wx.showModal({
        content: '请选择跟踪方式',
        showCancel: false
      })
      return false
    }

    if (params.nextContactDate === '') {
      wx.showModal({
        content: '请选择下次联系时间',
        showCancel: false
      })
      return false
    }

    if (params.nextContactContent === '') {
      wx.showModal({
        content: '请选择下次联系内容',
        showCancel: false
      })
      return false
    }

    let token = wx.getStorageSync('token')
    network.requestLoading('/api/trackRecord', 'POST', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {

        wx.showModal({
          content: '项目记录跟踪成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.getProjectDetail(params.ofProject)
            }
          }
        })
      }
    }, () => {
      console.log('error')
    })
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
          wBiddingTypeIndex: util.pickerCurrentIndex(prevPage.data.wBiddingTypes_id, (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id),

          wPreSaleMan: (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id,
          wPreSaleManIndex: util.pickerCurrentIndex(prevPage.data.wPreSaleMans_id, (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id)

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