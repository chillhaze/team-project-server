const authControllers = require('./auth')
const categoriesControllers = require('./category')
const transactionsControllers = require('./transactions')
const reportsControllers = require('./reports')

module.exports = {
  ...categoriesControllers,
  ...transactionsControllers,
  ...reportsControllers,
  authControllers
}
