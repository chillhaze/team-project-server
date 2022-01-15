const { Transaction } = require('../../models')
const { getTimeInterval } = require('../../utils')

const getTransactionsPerDay = async (req, res) => {
  // const { _id: owner } = req.user
  const { type, period } = req.query

  const [minPeriod, maxPeriod] = getTimeInterval(period)

  // const result = await Transaction
  //   .find({
  //     owner,
  //     type,
  //     completedAt: {
  //       $gte: minPeriod,
  //       $lt: maxPeriod
  //     }
  //   })
  //   .select({ owner: 0, completedAt: 0, type: 0, createdAt: 0, updatedAt: 0 })

  const result = await Transaction // удалиться как заработает логинизация пользователя
    .find({
      type,
      completedAt: {
        $gte: minPeriod,
        $lt: maxPeriod
      }
    })
    .select({ owner: 0, type: 0, createdAt: 0, updatedAt: 0 })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      total: result.length,
      result
    }
  })
}

module.exports = getTransactionsPerDay