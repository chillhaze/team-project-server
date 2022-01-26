const getSummaryTimeInterval = date => {
  const currentDate = new Date(date)

  return (
    [
      new Date(currentDate.getFullYear(), 0, 0, 23, 59, 59),
      new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0)
    ]
      .map(elem => elem.toISOString())
  )
}

module.exports = getSummaryTimeInterval
