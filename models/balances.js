const { Schema, model, SchemaTypes } = require('mongoose')
// const Joi = require('joi')

const balanceSchema = Schema({
  deposit: {
    type: Number,
    default: 0
  },
  totalCost: Number,
  totalIncome: Number,
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

const Balance = model('balance', balanceSchema)

module.exports = { Balance }
