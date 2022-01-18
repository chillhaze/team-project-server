const { Transaction, Balance } = require('../../models')

const addTransaction = async (req, res) => {
  // const { _id: owner } = req.user
  const newTransaction = {
    type: req.body.type,
    completedAt: new Date(req.body.period).toISOString(),
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount
  }

  const owner = '61e1793bb8d7c55e164155bd' // удалиться как заработает логинизация пользователя

  const { _id, type, completedAt, description, category, amount } = await Transaction
    .create({ ...newTransaction, owner })

  const { value: balance } = await Balance.findOne({ owner }) // убрать тестового owner-а

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: {
        transaction: {
          _id,
          type,
          completedAt,
          description,
          category,
          amount
        },
        balance
      }
    }
  })
}

module.exports = addTransaction
