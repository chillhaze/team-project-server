const makeSummary = transactionsArr => {
  const entities = transactionsArr.reduce((acc, elem) => {
    const monthNumber = new Date(elem.completedAt).getMonth()
    const amountToUpdate = acc[monthNumber]?.amount
      ? acc[monthNumber].amount + elem.amount
      : elem.amount

    return {
      ...acc,
      [monthNumber]: {
        id: monthNumber,
        amount: amountToUpdate
      }
    }
  }, {})

  const normalizedData = {
    months: Object.keys(entities),
    entities
  }

  return normalizedData
}

module.exports = makeSummary
