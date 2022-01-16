const createUrl = require('./createUrl')
const getDateIntervals = require('./getTimeInterval')
const makeSummary = require('./makeSummary')

module.exports = {
  createUrl,
  ...getDateIntervals,
  makeSummary
}
