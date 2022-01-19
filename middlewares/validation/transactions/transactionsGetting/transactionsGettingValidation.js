const createError = require('http-errors')
const querySchema = require('./querySchema')

const transactionsGettingValidation = async (req, _, next) => {
  const validated = querySchema.validate(req.query)

  if (validated.error) throw createError(400, validated.error.message)

  req.query = validated.value

  next()
}

module.exports = transactionsGettingValidation
