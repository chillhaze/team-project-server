const createError = require('http-errors')

const reportValidation = (schema) => {
  return async (req, _, next) => {
    const validated = schema.validate(req.query)

    if (validated.error) throw createError(400, validated.error.message)

    req.query = validated.value

    next()
  }
}

module.exports = reportValidation
