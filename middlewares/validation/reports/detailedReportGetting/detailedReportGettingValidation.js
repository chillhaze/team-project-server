const querySchema = require('./querySchema')
const reportValidation = require('../template')

const detailedReportGettingValidation = reportValidation(querySchema)

module.exports = detailedReportGettingValidation
