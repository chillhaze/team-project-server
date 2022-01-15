const getYearsInterval = date => {
  const baseYear = new Date(date).getFullYear()

  return (
    [
      new Date(baseYear, 0, 0, 23, 59, 59),
      new Date(baseYear + 1, 0, 1, 0, 0, 0)
    ]
      .map(elem => elem.toISOString())
  )
}

module.exports = getYearsInterval
