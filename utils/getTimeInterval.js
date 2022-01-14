const getTimeInterval = date => {
  return Array(2).fill(new Date(date)).map((elem, i) => {
    const newDate = new Date(elem)
    newDate.setDate(newDate.getDate() + (i === 0 ? -1 : 1))

    return newDate.toISOString()
  })
}

module.exports = getTimeInterval
