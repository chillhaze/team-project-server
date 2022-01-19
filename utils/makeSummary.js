const MONTHS = {
  0: 'Январь',
  1: 'Февраль',
  2: 'Март',
  3: 'Апрель',
  4: 'Май',
  5: 'Июнь',
  6: 'Июль',
  7: 'Август',
  8: 'Сентябрь',
  9: 'Октябрь',
  10: 'Ноябрь',
  11: 'Декабрь'
}

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
