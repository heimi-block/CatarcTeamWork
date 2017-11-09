const network = require('./../../../utils/network.js')

Page({
  data: {
    showTopTips: false,
    customerName: '',
    wCustomerAgencyName: '',
    wCustomerSource: '',
    projectName: '',
    wProjectKind: '',
    wProjectState: '',
    wSaleStage: '',
    wBiddingType: '',
    competitor: '',
    bidEvaluationMethod: '',
    bidPlanDate: '',
    forecastOrderMoney: '',
    contractSignDate: '',
    actualSignMoney: '',
    // 客户名称 wCustomerAgencyName
    wCustomerAgencyNames_name: [],
    wCustomerAgencyNames_id: [],
    wCustomerAgencyNameIndex: 0,
    // 客户来源 wCustomerSource
    wCustomerSources_name: [],
    wCustomerSources_id: [],
    wCustomerSourceIndex: 0,
    // 项目类型 wProjectKind
    wProjectKinds_name: [],
    wProjectKinds_id: [],
    wProjectKindIndex: 0,
    // 项目状态 wProjectState
    wProjectStates_name: [],
    wProjectStates_id: [],
    wProjectStateIndex: 0,
    // 销售阶段 wSaleStage
    wSaleStages_name: [],
    wSaleStages_id: [],
    wSaleStageIndex: 0,
    // 招标方式 wBiddingType
    wBiddingTypes_name: [],
    wBiddingTypes_id: [],
    wBiddingTypeIndex: 0
  },
  bindBidPlanDateChange: function (e) {
    this.setData({
      bidPlanDate: e.detail.value
    })
  },
  bindContractSignDateChange: function (e) {
    this.setData({
      contractSignDate: e.detail.value
    })
  },
  // wCustomerAgencyName
  bindwCustomerAgencyNameChange: function (e) {
    console.log('picker wCustomerAgencyName 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wCustomerAgencyNames_id[e.detail.value]);
    this.setData({
      wCustomerAgencyNameIndex: e.detail.value,
      wCustomerAgencyName: this.data.wCustomerAgencyNames_id[e.detail.value]
    })
  },
  // wCustomerSource 
  bindwCustomerSourceChange: function (e) {
    console.log('picker wCustomerSource 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wCustomerSources_id[e.detail.value]);
    this.setData({
      wCustomerSourceIndex: e.detail.value,
      wCustomerSource: this.data.wCustomerSources_id[e.detail.value]
    })
  },
  // wProjectKind 项目类型
  bindwProjectKindChange: function (e) {
    console.log('picker wProjectKind 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wProjectKinds_id[e.detail.value]);
    this.setData({
      wProjectKindIndex: e.detail.value,
      wProjectKind: this.data.wProjectKinds_id[e.detail.value]
    })
  },
  // wProjectState 
  bindwProjectStateChange: function (e) {
    console.log('picker wProjectState 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wProjectStates_id[e.detail.value]);
    this.setData({
      wProjectStateIndex: e.detail.value,
      wProjectState: this.data.wProjectStates_id[e.detail.value]
    })
  },
  // wSaleStage 
  bindwSaleStageChange: function (e) {
    console.log('picker wSaleStage 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wSaleStages_id[e.detail.value]);
    this.setData({
      wSaleStageIndex: e.detail.value,
      wSaleStage: this.data.wSaleStages_id[e.detail.value]
    })
  },
  // wBiddingType 
  bindwBiddingTypeChange: function (e) {
    console.log('picker wBiddingType 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wBiddingTypes_id[e.detail.value]);
    this.setData({
      wBiddingTypeIndex: e.detail.value,
      wBiddingType: this.data.wBiddingTypes_id[e.detail.value]
    })
  },
  bindCustomerNameInput: function (e) {
    this.setData({
      customerName: e.detail.value
    })
  },
  bindProjectNameInput: function (e) {
    this.setData({
      projectName: e.detail.value
    })
  },
  bindCompetitorBlur: function (e) {
    this.setData({
      competitor: e.detail.value
    })
  },
  bindBidEvaluationMethodInput: function (e) {
    this.setData({
      bidEvaluationMethod: e.detail.value
    })
  },
  bindForecastOrderMoneyInput: function (e) {
    this.setData({
      forecastOrderMoney: e.detail.value
    })
  },
  bindActualSignMoneyInput: function (e) {
    this.setData({
      actualSignMoney: e.detail.value
    })
  },
  onShow: function () {
    this.getwCustomerAgencyName()
    this.getwCustomerSource()
    this.getwProjectKind()
    this.getwProjectState()
    this.getwSaleStage()
    this.getwBiddingType()
  },
  // 获取动态维护的w属性
  getwCustomerSource: function () {
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
  },
  getwProjectKind: function () {
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
  },
  getwProjectState: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wProjectState', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wProjectStates_name = ['请选择项目状态']
      const wProjectStates_id = ['']
      res.result.data.forEach(function (e) {
        wProjectStates_name.push(e.name)
        wProjectStates_id.push(e._id)
      })
      this.setData({
        wProjectStates_name,
        wProjectStates_id
      })
    }, () => {
      fail()
    })
  },
  getwCustomerAgencyName: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wCustomerAgencyName', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wCustomerAgencyNames_name = ['请选择客户名称']
      const wCustomerAgencyNames_id = ['']
      res.result.data.forEach(function (e) {
        wCustomerAgencyNames_name.push(e.name)
        wCustomerAgencyNames_id.push(e._id)
      })
      this.setData({
        wCustomerAgencyNames_name,
        wCustomerAgencyNames_id
      })
    }, () => {
      fail()
    })
  },
  getwSaleStage: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wSaleStage', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wSaleStages_name = ['请选择销售阶段']
      const wSaleStages_id = ['']
      res.result.data.forEach(function (e) {
        wSaleStages_name.push(e.name)
        wSaleStages_id.push(e._id)
      })
      this.setData({
        wSaleStages_name,
        wSaleStages_id
      })
    }, () => {
      fail()
    })
  },
  getwBiddingType: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wBiddingType', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wBiddingTypes_name = ['请选择招标方式']
      const wBiddingTypes_id = ['']
      res.result.data.forEach(function (e) {
        wBiddingTypes_name.push(e.name)
        wBiddingTypes_id.push(e._id)
      })
      this.setData({
        wBiddingTypes_name,
        wBiddingTypes_id
      })
    }, () => {
      fail()
    })
  },
  showTopTips: function () {
    var that = this;
    const params = {}
    params.wProjectMan = wx.getStorageSync('_id')
    params.customerName = this.data.customerName
    params.wCustomerAgencyName = this.data.wCustomerAgencyName
    params.wCustomerSource = this.data.wCustomerSource
    params.projectName = this.data.projectName
    params.wProjectKind = this.data.wProjectKind
    params.wProjectState = this.data.wProjectState
    params.wSaleStage = this.data.wSaleStage
    params.wBiddingType = this.data.wBiddingType
    params.competitor = this.data.competitor
    params.bidEvaluationMethod = this.data.bidEvaluationMethod
    params.bidPlanDate = this.data.bidPlanDate
    params.forecastOrderMoney = this.data.forecastOrderMoney
    params.contractSignDate = this.data.contractSignDate
    params.actualSignMoney = this.data.actualSignMoney
    // 检验比填写，您没有填写xx,是后续填写吗
    // console.log(params)
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/project', 'POST', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {
        wx.showModal({
          content: '项目添加成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../../../pages/project/list/list',
              })
            }
          }
        })
      }
    }, () => {
      console.log('error')
    })
  }
});