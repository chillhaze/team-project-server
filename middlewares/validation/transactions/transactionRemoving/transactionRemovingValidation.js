const createError = require('http-errors')
const paramsSchema = require('./paramsSchema')

const transactionRemovingValidation = async (req, _, next) => {
  const validated = paramsSchema.validate(req.params)

  if (validated.error) throw createError(400, validated.error.message)

  req.params = validated.value

  next()
}

module.exports = transactionRemovingValidation
