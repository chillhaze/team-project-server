const Joi = require('joi')

const ERROR_MESSAGES = require('../../validationErrorMessages')

const CATEGORY_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const categorySchema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(CATEGORY_TYPES.DEBIT, CATEGORY_TYPES.CREDIT)
    .messages({
      'any.required': ERROR_MESSAGES.missingTypeField,
      'any.only': ERROR_MESSAGES.invalidTypeValue
    }),
  name: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я,\s]{2,20}$/)
    .messages({
      'any.required': ERROR_MESSAGES.missingNameField,
      'string.pattern.base': ERROR_MESSAGES.invalidNameValue
    })
})

module.exports = categorySchema
