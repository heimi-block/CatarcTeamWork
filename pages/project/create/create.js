const network = require('./../../../utils/network.js')

Page({
  data: {
    showTopTips: false,
    bidPlanDate: '',
    contractSignDate: '',
    customerName: '',
    customerAgencyName: '',
    customerSource: '',
    projectName: '',
    projectKind: '',
    projectState: '',
    createdAt: '',
    saleStage: '',
    bidEvaluationMethod: '',
    bidPlanDate: '',
    forecastOrderMoney: '',
    biddingType: '',
    competitor: '',
    contractSignDate: '',
    actualSignMoney: '',
    // 客户名称 wCustomerAgencyName
    wCustomerAgencyNames_name: [],
    wCustomerAgencyNames_id: [],
    wCustomerAgencyName_value: '',
    wCustomerAgencyNameIndex: 0,
    // 客户来源 wCustomerSource
    wCustomerSources_name: [],
    wCustomerSources_id: [],
    wCustomerSource_value: '',
    wCustomerSourceIndex: 0,
    // 项目类型 wProjectKind
    wProjectKinds_name: [],
    wProjectKinds_id: [],
    wProjectKind_value: '',
    wProjectKindIndex: 0,
    // 项目状态 wProjectState
    wProjectStates_name: [],
    wProjectStates_id: [],
    wProjectState_value: '',
    wProjectStateIndex: 0,
    // 销售阶段 wSaleStage
    wSaleStages_name: [],
    wSaleStages_id: [],
    wSaleStagee_value: '',
    wSaleStageIndex: 0,
    // 招标方式 wBiddingType
    wBiddingTypes_name: [],
    wBiddingTypes_id: [],
    wBiddingType_value: '',
    wBiddingTypeIndex: 0
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
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
      wCustomerAgencyName_value: this.data.wCustomerAgencyNames_id[e.detail.value]
    })
  },
  // wCustomerSource 
  bindwCustomerSourceChange: function (e) {
    console.log('picker wCustomerSource 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wCustomerSources_id[e.detail.value]);
    this.setData({
      wCustomerSourceIndex: e.detail.value,
      wCustomerSource_value: this.data.wCustomerSources_id[e.detail.value]
    })
  },
  // wProjectKind 项目类型
  bindwProjectKindChange: function (e) {
    console.log('picker wProjectKind 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wProjectKinds_id[e.detail.value]);
    this.setData({
      wProjectKindIndex: e.detail.value,
      wProjectKind_value: this.data.wProjectKinds_id[e.detail.value]
    })
  },
  // wProjectState 
  bindwProjectStateChange: function (e) {
    console.log('picker wProjectState 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wProjectStates_id[e.detail.value]);
    this.setData({
      wProjectStateIndex: e.detail.value,
      wProjectState_value: this.data.wProjectStates_id[e.detail.value]
    })
  },
  // wSaleStage 
  bindwSaleStageChange: function (e) {
    console.log('picker wSaleStage 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wSaleStages_id[e.detail.value]);
    this.setData({
      wSaleStageIndex: e.detail.value,
      wSaleStage_value: this.data.wSaleStages_id[e.detail.value]
    })
  },
  // wBiddingType 
  bindwBiddingTypeChange: function (e) {
    console.log('picker wBiddingType 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wBiddingTypes_id[e.detail.value]);
    this.setData({
      wBiddingTypeIndex: e.detail.value,
      wBiddingType_value: this.data.wBiddingTypes_id[e.detail.value]
    })
  },
  onLoad: function(){
    this.getwCustomerAgencyName()
    this.getwCustomerSource()
    this.getwProjectKind()
    this.getwProjectState()
    this.getwSaleStage()
    this.getwBiddingType()
  },
  
  // 获取动态维护的w属性
  getwCustomerSource: function() {
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
  }
  });