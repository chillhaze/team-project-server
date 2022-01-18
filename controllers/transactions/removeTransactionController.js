const { Types: { ObjectId } } = require('mongoose')
const createError = require('http-errors')

const { Transaction } = require('../../models')

const removeTransaction = async (req, res) => {
  // const { _id: owner } = req.user
  const _id = ObjectId(req.params.transactionId)

  // const result = await Transaction
  //   .findOneAndRemove({ _id, owner })
  //   .select({ owner: 0, type: 0, createdAt: 0, updatedAt: 0 })

  const result = await Transaction
    .findOneAndRemove({ _id })
    .select({ owner: 0, type: 0, createdAt: 0, updatedAt: 0 })

  if (!result) throw createError(404, 'Not found')

  const balance = null // получение баланса реализую попозже..

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'transaction deleted',
    data: {
      balance
    }
  })
}

module.exports = removeTransaction
