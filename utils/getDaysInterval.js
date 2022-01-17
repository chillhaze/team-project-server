const getDaysInterval = date => {
  const basicDate = new Date(date)
  const basicYear = basicDate.getFullYear()
  const basicMonth = basicDate.getMonth()
  const basicDay = basicDate.getDate()

  return (
    [
      new Date(basicYear, basicMonth, basicDay - 1, 23, 59, 59),
      new Date(basicYear, basicMonth, basicDay + 1, 0, 0, 0)
    ]
      .map(elem => elem.toISOString())
  )
}

module.exports = getDaysInterval
