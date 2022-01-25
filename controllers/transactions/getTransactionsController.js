const { Transaction } = require('../../models')
const { getDaysInterval } = require('../../utils')

const getTransactionsPerDay = async (req, res) => {
  const { _id: owner } = req.user
  const { type, period } = req.query

  const [minPeriod, maxPeriod] = getDaysInterval(period)

  const result = await Transaction
    .find({
      owner,
      type,
      completedAt: {
        $gte: new Date(minPeriod),
        $lt: new Date(maxPeriod)
      }
    })
    .select({ owner: 0, type: 0, createdAt: 0, updatedAt: 0 })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getTransactionsPerDay
