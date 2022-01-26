const { MONTHS } = require('./constants')

// make summary by months of setted year
const makeSummary = transactionsArr => {
  const summary = transactionsArr.reduce((acc, elem) => {
    const monthNumber = new Date(elem.completedAt).getMonth()
    const amountToUpdate = acc[monthNumber]?.amount
      ? acc[monthNumber].amount + elem.amount
      : elem.amount

    return {
      ...acc,
      [monthNumber]: {
        id: monthNumber,
        name: MONTHS[monthNumber],
        amount: amountToUpdate
      }
    }
  }, {})

  return {
    ids: Object.keys(summary),
    entities: summary
  }
}

module.exports = makeSummary
