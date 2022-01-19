const { nanoid } = require('nanoid')

const TRANSACTION_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const makeDetailedReport = transactionsArr => {
  // counts total income & total costs
  const [totalIncome, totalCosts] = transactionsArr.reduce((acc, elem) => {
    const tmp = [...acc]

    elem.type === TRANSACTION_TYPES.DEBIT
      ? tmp[0] += elem.amount
      : tmp[1] += elem.amount

    return tmp
  }, [0, 0])

  // create statistics for each category of transactions
  const categoryEntities = transactionsArr.reduce((acc, elem) => {
    const amountByCategoryToUpdate = acc[elem.category]?.amount
      ? acc[elem.category].amount + elem.amount
      : elem.amount

    return {
      ...acc,
      [elem.category]: {
        id: nanoid(11),
        type: elem.type,
        name: '',
        amount: amountByCategoryToUpdate,
        iconUrl: '',
        catalog: {
          ids: [],
          entities: {}
        }
      }
    }
  }, {})

  // modifies existing general statistics by adding detailed
  // revenue/expenditure statistics for each category
  const catalogEntities = transactionsArr.reduce((acc, elem) => {
    const catalog = acc[elem.category].catalog
    const isCatalogItemExist = catalog.ids.includes(elem.description)

    if (!isCatalogItemExist) {
      catalog.ids.push(elem.description)
      catalog.entities[elem.description] = {
        id: nanoid(11),
        groupName: elem.description,
        amount: elem.amount,
        totalCount: 1
      }

      return acc
    }

    catalog.entities[elem.description].amount += elem.amount
    catalog.entities[elem.description].totalCount += 1

    return acc
  }, categoryEntities)

  const normalizedData = {
    ids: Object.keys(categoryEntities),
    entities: catalogEntities
  }

  return { totalIncome, totalCosts, normalizedData }
}

module.exports = makeDetailedReport
