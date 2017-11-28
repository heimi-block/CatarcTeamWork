const network = require('./../../../utils/network.js')
const util = require('./../../../utils/util.js')

Page({
  data: {
    showTopTips: false,
    projectId: '',
    projectCoding: '',
    createdAtDate: '',
    customerName: '',
    wCustomerAgencyName: '',
    wCustomerSource: '',
    projectName: '',
    wProjectKind: '',
    // wProjectState: '',
    wSaleStage: '',
    wBiddingType: '',
    competitor: '',
    bidEvaluationMethod: '',
    bidPlanDate: '',
    wPreSaleMan: '',
    forecastOrderMoney: '',
    contractSignDate: '',
    actualSignMoney: '',
    wProjectManValue: '',
    wTrackRecords: [], // 项目记录
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
    // wProjectStates_name: [],
    // wProjectStates_id: [],
    // wProjectStateIndex: 0,
    // 销售阶段 wSaleStage
    wSaleStages_name: [],
    wSaleStages_id: [],
    wSaleStageIndex: 0,
    // 招标方式 wBiddingType
    wBiddingTypes_name: [],
    wBiddingTypes_id: [],
    wBiddingTypeIndex: 0,
    // 售前人员 wPreSaleMan
    wPreSaleMans_name: [],
    wPreSaleMans_id: [],
    wPreSaleManIndex: 0
  },
  bindBidPlanDateChange: function (e) {
    this.setData({
      bidPlanDate: e.detail.value
    })
  },
  bindCreatedAtDateChange: function (e) {
    this.setData({
      createdAtDate: e.detail.value
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
  // bindwProjectStateChange: function (e) {
  //   console.log('picker wProjectState 发生选择改变，携带值为', e.detail.value);
  //   console.log('当前选中的值为', this.data.wProjectStates_id[e.detail.value]);
  //   this.setData({
  //     wProjectStateIndex: e.detail.value,
  //     wProjectState: this.data.wProjectStates_id[e.detail.value]
  //   })
  // },
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
  // wPreSaleMan
  bindwPreSaleManChange: function (e) {
    console.log('picker wPreSaleMan 发生选择改变，携带值为', e.detail.value);
    console.log('当前选中的值为', this.data.wPreSaleMans_id[e.detail.value]);
    this.setData({
      wPreSaleManIndex: e.detail.value,
      wPreSaleMan: this.data.wPreSaleMans_id[e.detail.value]
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
  onLoad: function (options) {
    this.getwCustomerAgencyName()
    this.getwCustomerSource()
    this.getwProjectKind()
    // this.getwProjectState()
    this.getwSaleStage()
    this.getwBiddingType()
    this.getwPreSaleMan()
    console.log(options.projectId)
    const projectId = options.projectId
    this.setData({
      projectId: projectId
    })
    this.getProjectDetail(projectId)
  },
  // 获取动态维护的w属性
  getwCustomerSource: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wCustomerSource?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wCustomerSources_name = ['请选择项目渠道']
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
    network.requestLoading('/api/wProjectKind?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
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
  // getwProjectState: function () {
  //   let token = wx.getStorageSync('token')
  //   network.requestLoading('/api/wProjectState', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
  //     // 数据请求成功，res
  //     const wProjectStates_name = ['请选择项目状态']
  //     const wProjectStates_id = ['']
  //     res.result.data.forEach(function (e) {
  //       wProjectStates_name.push(e.name)
  //       wProjectStates_id.push(e._id)
  //     })
  //     this.setData({
  //       wProjectStates_name,
  //       wProjectStates_id
  //     })
  //   }, () => {
  //     fail()
  //   })
  // },
  getwCustomerAgencyName: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wCustomerAgencyName?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
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
    network.requestLoading('/api/wSaleStage?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
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
    network.requestLoading('/api/wBiddingType?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
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
  getwPreSaleMan: function () {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/wPreSaleMan?isPaging=false', 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      const wPreSaleMans_name = ['请选择售前人员']
      const wPreSaleMans_id = ['']
      res.result.data.forEach(function (e) {
        wPreSaleMans_name.push(e.name)
        wPreSaleMans_id.push(e._id)
      })
      this.setData({
        wPreSaleMans_name,
        wPreSaleMans_id
      })
    }, () => {
      fail()
    })
  },
  // 更新项目，text-area微信6.3bug,需采用此方式
  bindFormSubmit: function (e) {
    // 如果负责人的ID不是当前用户ID，提示不能更新
    if (wx.getStorageSync('_id') !== this.data.wProjectMan) {
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
    params.wProjectMan = wx.getStorageSync('_id')
    params.customerName = this.data.customerName
    params.wCustomerAgencyName = this.data.wCustomerAgencyName
    params.wCustomerSource = this.data.wCustomerSource
    params.projectName = this.data.projectName
    params.wProjectKind = this.data.wProjectKind
    // params.wProjectState = this.data.wProjectState
    params.wSaleStage = this.data.wSaleStage
    params.wBiddingType = this.data.wBiddingType
    params.wPreSaleMan = this.data.wPreSaleMan
    params.competitor = e.detail.value.competitor
    params.bidEvaluationMethod = this.data.bidEvaluationMethod
    params.createdAt = this.data.createdAtDate
    params.bidPlanDate = this.data.bidPlanDate
    params.forecastOrderMoney = this.data.forecastOrderMoney
    params.contractSignDate = this.data.contractSignDate
    params.actualSignMoney = this.data.actualSignMoney
    // 检验比填写，您没有填写xx,是后续填写吗

    let token = wx.getStorageSync('token')
    network.requestLoading('/api/project/' + this.data.projectId, 'PUT', params, { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res
      if (res.code === 1) {
        let that = this
        that.setData({
          projectCoding: res.result.projectCoding,
          showTopTips: true
        });
        setTimeout(function () {
          that.setData({
            showTopTips: false
          });
        }, 3000);
      }
    }, () => {
      console.log('error')
    })
  },
  getProjectDetail: function (projectId) {
    let token = wx.getStorageSync('token')
    network.requestLoading('/api/project/' + projectId, 'GET', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
      // 数据请求成功，res

      if (res.code === 1) {
        const crm = res.result
        this.setData({
          wTrackRecords: crm.trackRecords.map(e => {
            e.createdAt = e.createdAt.substr(0, 10)
            return e
          }),
          projectCoding: crm.projectCoding,
          createdAtDate: crm.createdAt.substr(0, 10),
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
          wCustomerAgencyNameIndex: util.pickerCurrentIndex(this.data.wCustomerAgencyNames_id, (crm.wCustomerAgencyName === undefined || crm.wCustomerAgencyName === null) ? '' : crm.wCustomerAgencyName._id),

          wCustomerSource: (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id,
          wCustomerSourceIndex: util.pickerCurrentIndex(this.data.wCustomerSources_id, (crm.wCustomerSource === undefined || crm.wCustomerSource === null) ? '' : crm.wCustomerSource._id),

          wProjectKind: (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id,
          wProjectKindIndex: util.pickerCurrentIndex(this.data.wProjectKinds_id, (crm.wProjectKind === undefined || crm.wProjectKind === null) ? '' : crm.wProjectKind._id),

          // wProjectState: (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id,
          // wProjectStateIndex: util.pickerCurrentIndex(this.data.wProjectStates_id, (crm.wProjectState === undefined || crm.wProjectState === null) ? '' : crm.wProjectState._id),

          wSaleStage: (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id,
          wSaleStageIndex: util.pickerCurrentIndex(this.data.wSaleStages_id, (crm.wSaleStage === undefined || crm.wSaleStage === null) ? '' : crm.wSaleStage._id),

          wBiddingType: (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id,
          wBiddingTypeIndex: util.pickerCurrentIndex(this.data.wBiddingTypes_id, (crm.wBiddingType === undefined || crm.wBiddingType === null) ? '' : crm.wBiddingType._id),

          wPreSaleMan: (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id,
          wPreSaleManIndex: util.pickerCurrentIndex(this.data.wPreSaleMans_id, (crm.wPreSaleMan === undefined || crm.wPreSaleMan === null) ? '' : crm.wPreSaleMan._id)

        })

      } else {
        // 重新请求
      }
      // 如果负责人的ID不是当前用户ID，提示不能更新
      if (wx.getStorageSync('_id') !== this.data.wProjectMan) {
        wx.showModal({
          content: '您正在浏览其他人的项目，如果您负责跟踪此项目(可以对此项目进行跟踪记录)',
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
  // 删除项目
  openDelConfirm: function (projectId) {
    wx.showModal({
      title: '删除操作',
      content: '您确定要删除此项目吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作' + projectId)
          let token = wx.getStorageSync('token')
          network.requestLoading('/api/project/' + projectId, 'DELETE', '', { 'Content-Type': 'application/x-www-form-urlencoded', 'X-MC-TOKEN': 'Bearer ' + token }, '', (res) => {
            if (res.code === 1) {
              wx.showModal({
                content: '删除成功',
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
            fail()
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  bindDelProject: function () {
    // 如果负责人的ID不是当前用户ID，提示不能删除
    if (wx.getStorageSync('_id') !== this.data.wProjectMan) {
      wx.showModal({
        content: '您不可以删除其他人的项目',
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
    this.openDelConfirm(this.data.projectId)
  }



});