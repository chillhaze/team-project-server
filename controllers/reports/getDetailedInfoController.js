const createError = require('http-errors')

const { getDetailedReport } = require('../../services')
const { getMonthOfYearInterval, createUrl } = require('../../utils')

const getDetailedInfo = async (req, res) => {
  const { _id: owner } = req.user
  const { year, month } = req.query

  const [minPeriod, maxPeriod] = getMonthOfYearInterval(year, month)

  const detailedReport = await getDetailedReport(owner, minPeriod, maxPeriod)

  if (!detailedReport) {
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result: {
          totalIncome: 0,
          totalCosts: 0,
          categories: []
        }
      }
    })
  }

  const { report, totalIncome, totalCosts } = detailedReport

  // make icon Url for each category
  report.forEach((elem, i) => {
    report[i].iconUrl = createUrl({ req, urlCombinedPath: elem.iconUrl })
  })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: {
        totalIncome,
        totalCosts,
        categories: report
      }
    }
  })
}

module.exports = getDetailedInfo
