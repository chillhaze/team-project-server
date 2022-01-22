const createUrl = require('./createUrl')
const makeSummary = require('./makeSummary')
const getDaysInterval = require('./getDaysInterval')
const getMonthOfYearInterval = require('./getMonthOfYearInterval')
const getYearsInterval = require('./getYearsInterval')
const dataNormalizer = require('./dataNormalizer')
const groupByUniqueDescriptions = require('./groupByUniqueDescriptions')
const generalIndicatorsCounting = require('./generalIndicatorsCounting')

module.exports = {
  createUrl,
  makeSummary,
  getDaysInterval,
  getMonthOfYearInterval,
  getYearsInterval,
  dataNormalizer,
  groupByUniqueDescriptions,
  generalIndicatorsCounting
}
