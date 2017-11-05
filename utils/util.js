const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const pickerCurrentIndex = (pageData, resData) => {
  console.log('pageData:'+ pageData)
  console.log('resData:'+ resData)
  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i] === resData) {
      return i
    }
  }
}

module.exports = {
  formatTime: formatTime,
  pickerCurrentIndex: pickerCurrentIndex
}
