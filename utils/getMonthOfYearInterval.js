const getMonthOfYearInterval = date => {
  const incomeDate = new Date(date)
  const baseYear = incomeDate.getFullYear()
  const baseMonth = incomeDate.getMonth()

  return (
    [
      new Date(baseYear, baseMonth, 0, 23, 59, 59),
      new Date(baseYear, baseMonth + 1, 1, 0, 0, 0)
    ]
      .map(elem => elem.toISOString())
  )
}

module.exports = getMonthOfYearInterval
