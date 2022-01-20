const createError = require('http-errors')
const transactionSchema = require('./transactionSchema')

const transactionAddingValidation = async (req, _, next) => {
  const isBody = Object.keys(req.body).length !== 0

  if (!isBody) throw createError(400, 'missing fields')

  const validated = transactionSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = transactionAddingValidation
