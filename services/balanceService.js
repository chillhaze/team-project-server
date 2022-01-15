// сервіс для роботи з балансом

const Balance = require('../models/balances')

class balanceService {
  async create(userId, balance) {
    if (!userId) throw new Error('no user id')
    if (!balance) throw new Error('no balance')

    // перевіримо чи вже є баланс з таким користувачем
    const b = this.get(userId)
    if (b) throw new Error('user with id ' + userId + ' exists')
    const result = await Balance.create({ ...balance, owner: _id })
    return result
  }
  // отримати баланс. див. models.balances
  async get(userId) {
    if (!userId) throw new Error('no user id')
    const userBalance = await Balance.findOne({ owner: userId })
    return userBalance // null, якщо не знайдено
  }
  // додати до балансу число
  async add(userId, value) {
    const balance = this.get(userId)
    balance.totalCost += value
    this.update(balance)
    return balance
  }
  //відняти від балансу число
  async sub(userId, value) {
    const balance = this.get(userId)
    balance.totalCost -= value
    this.update(balance)
  }
  // одновити баланс
  async update(newBalance) {
    if (!newBalance) throw new Error('no balance')
    Balance.updateOne(newBalance)
  }
}
module.exports = new balanceService()
