const { Transaction } = require('../models')
const { groupByUniqueDescriptions, generalIndicatorsCounting, REPORTS_CATEGORY_TYPES } = require('../utils')

const getDetailedReport = async (owner, minPeriod, maxPeriod) => {
  // At the numerous requests of workers (c)
  // the formation of a detailed report is implemented by MongoDB resources
  const report = await Transaction.aggregate([
    { $match: { owner, completedAt: { $gte: new Date(minPeriod), $lt: new Date(maxPeriod) } } },
    {
      $lookup: {
        from: 'categories',
        let: { category: '$category' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$category'] } } },
          { $project: { iconUrl: 1, name: 1 } }
        ],
        as: 'categoryInfo'
      }
    },
    { $project: { owner: 0, completedAt: 0, createdAt: 0, updatedAt: 0 } },
    {
      $group: {
        _id: '$category',
        type: { $last: '$type' },
        total: { $sum: '$amount' },
        nameArr: { $last: '$categoryInfo.name' },
        iconUrlArr: { $last: '$categoryInfo.iconUrl' },
        subcategories: { $push: { name: '$description', total: '$amount' } }
      }
    },
    {
      $project: {
        _id: 1,
        type: 1,
        total: 1,
        name: { $arrayElemAt: ['$nameArr', 0] },
        iconUrl: { $arrayElemAt: ['$iconUrlArr', 0] },
        subcategories: 1
      }
    }
  ])

  if (report.length === 0) return null

  // updates report by grouping its not unique detailed info
  const updatedReport = report.map(elem => {
    elem.subcategories = groupByUniqueDescriptions(elem.subcategories)
    elem.type = elem.type === 'credit' ? REPORTS_CATEGORY_TYPES.COST : REPORTS_CATEGORY_TYPES.INCOME
    return elem
  })

  // counts total income & total costs
  const [totalIncome, totalCosts] = generalIndicatorsCounting(updatedReport)

  return { report: updatedReport, totalIncome, totalCosts }
}

module.exports = getDetailedReport
