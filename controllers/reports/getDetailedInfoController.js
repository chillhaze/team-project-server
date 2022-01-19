const createError = require('http-errors')

const { Transaction } = require('../../models')
const { getMonthOfYearInterval, makeDetailedReport, detailedInfoUpdate } = require('../../utils')

const getDetailedInfo = async (req, res) => {
  const { _id: owner } = req.user
  const { year, month } = req.query

  const [minPeriod, maxPeriod] = getMonthOfYearInterval(year, month)

  const transactions = await Transaction
    .find({
      owner,
      completedAt: {
        $gte: minPeriod,
        $lt: maxPeriod
      }
    })
    .select({ owner: 0, completedAt: 0, createdAt: 0, updatedAt: 0 })

  // const transactions = await Transaction // удалиться как заработает логинизация пользователя
  //   .find({
  //     completedAt: {
  //       $gte: minPeriod,
  //       $lt: maxPeriod
  //     }
  //   })
  //   .select({ owner: 0, createdAt: 0, updatedAt: 0 })

  if (transactions.length === 0) throw createError(404, 'Not found')

  const { totalIncome, totalCosts, normalizedData: data } = makeDetailedReport(transactions)
  const updatedData = await detailedInfoUpdate(data, req)

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: {
        totalIncome,
        totalCosts,
        caregoriesByTypes: updatedData
      }
    }
  })
}

module.exports = getDetailedInfo
