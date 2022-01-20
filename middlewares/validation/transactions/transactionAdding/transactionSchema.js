const Joi = require('joi')

const ERROR_MESSAGES = require('../../validationErrorMessages')

const TRANSACTION_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const transactionSchema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT)
    .messages({
      'any.required': ERROR_MESSAGES.missingTypeField,
      'any.only': ERROR_MESSAGES.invalidTypeValue
    }),
  period: Joi.date()
    .required()
    .iso()
    .messages({
      'any.required': ERROR_MESSAGES.missingDateField,
      'date.format': ERROR_MESSAGES.invalidDateFormat
    }),
  description: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9_\s]{2,20}$/)
    .messages({
      'any.required': ERROR_MESSAGES.missingDescriptionField,
      'string.pattern.base': ERROR_MESSAGES.invalidDescriptionValue
    }),
  category: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-f0-9]{24}$/)
    .messages({
      'any.required': ERROR_MESSAGES.missingCategoryField,
      'string.pattern.base': ERROR_MESSAGES.invalidCategoryFormat
    }),
  amount: Joi.number()
    .required()
    .messages({
      'any.required': ERROR_MESSAGES.missingAmountField,
      'number.base': ERROR_MESSAGES.invalidAmountFormat
    })
})

module.exports = transactionSchema
