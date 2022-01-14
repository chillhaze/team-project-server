const authControllers = require('./auth')
const categoriesControllers = require('./category')
const transactionsControllers = require('./transactions')

module.exports = {
  ...categoriesControllers,
  ...transactionsControllers,
  authControllers
}
