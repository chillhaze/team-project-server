const Joi = require('joi')

const ERROR_MESSAGES = require('../../validationErrorMessages')

const TRANSACTION_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const querySchema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT)
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
