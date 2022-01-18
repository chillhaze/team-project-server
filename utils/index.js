const createUrl = require('./createUrl')
const makeSummary = require('./makeSummary')
const getDaysInterval = require('./getDaysInterval')
const getMonthOfYearInterval = require('./getMonthOfYearInterval')
const getYearsInterval = require('./getYearsInterval')
const makeDetailedReport = require('./makeDetailedReport')
const dataNormalizer = require('./dataNormalizer')
const detailedInfoUpdate = require('./detailedReportUpdate')

module.exports = {
  createUrl,
  makeSummary,
  getDaysInterval,
  getMonthOfYearInterval,
  getYearsInterval,
  makeDetailedReport,
  dataNormalizer,
  detailedInfoUpdate
}
