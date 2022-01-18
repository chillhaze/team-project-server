const { Schema, model, SchemaTypes } = require('mongoose')
// const Joi = require('joi')

const MODELS = {
  BALANCE: 'balance',
  TRANSACTIONS: 'transaction'
}

const TRANSACTION_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

// transaction schema
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
  category: {
    type: SchemaTypes.ObjectId,
    ref: 'category'
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

// pre-hook for changing balance before adding transaction
transactionSchema.pre('save', { document: true }, async function (next) {
  const { owner, type, amount } = this

  const balance = await model(MODELS.BALANCE)
    .findOne({ owner: '61e71b5895d023fab1ba76e8' }) // убрать тестового пользователя

  if (!balance) {
    throw new Error('Balance not set')
  }

  balance.totalCost += type === TRANSACTION_TYPES.DEBIT ? amount : -1 * amount
  balance.save()
  next()
})

// pre-hook for changing balance before removing transaction
transactionSchema.pre('findOneAndRemove', { document: false, query: true }, async function (next) {
  const transactionId = this.getQuery()._id

  const transaction = await model(MODELS.TRANSACTIONS)
    .findOne({ _id: transactionId })

  if (!transaction) {
    next()
  }

  const { owner, type, amount } = transaction

  const balance = await model(MODELS.BALANCE)
    .findOne({ owner: '61e71b5895d023fab1ba76e8' }) // убрать тестового пользователя

  if (!balance) {
    throw new Error('Balance not set')
  }

  balance.totalCost += type === TRANSACTION_TYPES.DEBIT ? -1 * amount : amount
  balance.save()
  next()
})

const Transaction = model(MODELS.TRANSACTIONS, transactionSchema)

module.exports = { Transaction }
