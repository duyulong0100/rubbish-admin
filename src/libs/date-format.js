const currentMonth = function () {
  let result = []
  let today = new Date()
  let nowTime = today.getTime()
  let oneMonthAgo = nowTime - 24 * 60 * 60 * 1000 * 30
  result.push(oneMonthAgo, nowTime)
  return  result
}

const timestampsToDate = function(timestamps) {
  let  date = new Date(timestamps)
  return new Date(date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + date.getDate())
}

const formateDate = function (time) {
  let  date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

export { currentMonth, timestampsToDate, formateDate }




