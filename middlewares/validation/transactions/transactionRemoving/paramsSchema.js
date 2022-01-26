const Joi = require('joi')

const { ERROR_MESSAGES } = require('../../../../utils')

const paramsSchema = Joi.object({
  transactionId: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-f0-9]{24}$/)
    .messages({
      'any.required': ERROR_MESSAGES.missingIdQueryString,
      'string.pattern.base': ERROR_MESSAGES.invalidIdQueryStringFormat
    })
})

module.exports = paramsSchema
