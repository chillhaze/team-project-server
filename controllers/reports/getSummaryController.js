const createError = require('http-errors')

const { Transaction } = require('../../models')
const { getSummaryTimeInterval, makeSummary } = require('../../utils')

const getSummary = async (req, res) => {
  const { _id: owner } = req.user
  const { type, period } = req.query

  const [minPeriod, maxPeriod] = getSummaryTimeInterval(period)

  const transactions = await Transaction
    .find({
      owner,
      type,
      completedAt: {
        $gte: new Date(minPeriod),
        $lt: new Date(maxPeriod)
      }
    })
    .select({ owner: 0, type: 0, createdAt: 0, updatedAt: 0 })

  if (transactions.length === 0) throw createError(404, 'Not found')

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: makeSummary(transactions)
    }
  })
}

module.exports = getSummary
