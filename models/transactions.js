const { Schema, model, SchemaTypes } = require('mongoose')
// const Joi = require('joi')

const transactionSchema = Schema({
  type: {
    type: String,
    required: [true, 'Unknown transaction type'],
    trim: true
  },
  completedAt: {
    type: Date,
    required: [true, 'Unset transaction date']
  },
  description: {
    type: String,
    required: [true, 'Unset transaction description']
  },
  cathegory: {
    type: SchemaTypes.ObjectId,
    ref: 'cathegory'
  },
  amount: {
    type: Number,
    required: [true, 'Unset transaction amount']
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

const Transaction = model('transaction', transactionSchema)

module.exports = { Transaction }
