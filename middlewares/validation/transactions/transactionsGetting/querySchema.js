const Joi = require('joi')

const { TRANSACTION_TYPES, ERROR_MESSAGES } = require('../../../../utils')

const querySchema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT, TRANSACTION_TYPES.ALL)
    .messages({
      'any.required': ERROR_MESSAGES.missingTypeQueryString,
      'any.only': ERROR_MESSAGES.invalidTypeQueryStringFormat
    }),
  period: Joi.date()
    .required()
    .iso()
    .messages({
      'any.required': ERROR_MESSAGES.missingPeriodQueryString,
      'date.format': ERROR_MESSAGES.invalidPeriodQueryStringFormat
    })
})

module.exports = querySchema
