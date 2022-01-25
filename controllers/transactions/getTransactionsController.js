const { Transaction } = require('../../models')
const { getDaysInterval } = require('../../utils')

const TRANSACTION_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit',
  ALL: 'all'
}

const getTransactionsPerDay = async (req, res) => {
  const { _id: owner } = req.user
  const { type, period } = req.query
  const [minPeriod, maxPeriod] = getDaysInterval(period)
  const types = type === TRANSACTION_TYPES.ALL
    ? [TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT]
    : [type]

  const result = await Transaction
    .find({
      owner,
      type: { $in: types },
      completedAt: {
        $gte: new Date(minPeriod),
        $lt: new Date(maxPeriod)
      }
    })
    .select({ owner: 0, createdAt: 0, updatedAt: 0 })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getTransactionsPerDay
