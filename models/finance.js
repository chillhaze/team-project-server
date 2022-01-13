const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const financeSchema = Schema(
  {
    createdAt: {
      type: String,
    },
    income: {
      type: String,
    },
    expences: {
      type: String,
    },
    ballance: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

// Vallidation schema
const joiSchema = Joi.object({})

const Finance = model('finance', financeSchema)

module.exports = {
  Finance,
}
