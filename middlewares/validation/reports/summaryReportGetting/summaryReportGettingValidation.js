const querySchema = require('./querySchema')
const reportValidation = require('../template')

const summaryGettingValidation = reportValidation(querySchema)

module.exports = summaryGettingValidation
