// const financeControllers = require('./finance')
const authControllers = require('./auth')
const categoriesControllers = require('./category')

module.exports = {
  ...categoriesControllers,
  // financeControllers,

  authControllers

}
