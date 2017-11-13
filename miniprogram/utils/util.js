const pickerCurrentIndex = (pageData, resData) => {
  // console.log('pageData:' + pageData)
  // console.log('resData:' + resData)
  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i] === resData) {
      return i
    }
  }
}

module.exports = {
  pickerCurrentIndex
}