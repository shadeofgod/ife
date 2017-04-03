export default {
  dateFormat (date) {
    if (date) {
      let fmtDate = new Date(date)
      let year = fmtDate.getFullYear()
      let month = fmtDate.getMonth() + 1 < 10 ? '0' + (fmtDate.getMonth() + 1) : fmtDate.getMonth() + 1
      let day = fmtDate.getDate() < 10 ? '0' + fmtDate.getDate() : fmtDate.getDate()
      return `${year}-${month}-${day}`
    }
  }
}
