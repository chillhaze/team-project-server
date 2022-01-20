const Joi = require('joi')

const ERROR_MESSAGES = require('../../validationErrorMessages')

const querySchema = Joi.object({
  year: Joi.number()
    .required()
    .integer()
    .min(1900)
    .max(9999)
    .messages({
      'any.required': ERROR_MESSAGES.missingYearQueryString,
      'number.base': ERROR_MESSAGES.invalidYearQueryStringFormat,
      'number.min': ERROR_MESSAGES.outOfRangeYearQueryString,
      'number.max': ERROR_MESSAGES.outOfRangeYearQueryString
    }),
  month: Joi.number()
    .required()
    .integer()
    .min(0)
    .max(11)
    .messages({
      'any.required': ERROR_MESSAGES.missingMonthQueryString,
      'number.base': ERROR_MESSAGES.invalidMonthQueryStringFormat,
      'number.min': ERROR_MESSAGES.outOfRangeMonthQueryString,
      'number.max': ERROR_MESSAGES.outOfRangeMonthQueryString
    })
})

module.exports = querySchema
