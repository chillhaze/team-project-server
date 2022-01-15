const getDaysInterval = date => {
  return Array(2).fill(new Date(date)).map((elem, i) => {
    const newDate = new Date(elem)
    newDate.setDate(newDate.getDate() + (i === 0 ? -1 : 1))

    return newDate.toISOString()
  })
}

const getYearsInterval = date => {
  const baseYear = new Date(date).getFullYear()
  const yearsInterval = [baseYear - 1, baseYear + 1]

  return yearsInterval.map((elem, i) => (
    i === 0
      ? new Date(`12.31.${elem}`).toISOString()
      : new Date(`01.01.${elem}`).toISOString()
  ))
}

module.exports = {
  getDaysInterval,
  getYearsInterval
}
