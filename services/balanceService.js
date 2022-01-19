// сервіс для роботи з балансом

const Balance = require('../models/balances')

class balanceService {
  async create(userId, balance) {
    if (!userId) throw new Error('no user id')
    if (!balance) throw new Error('no balance')
    console.log('balanceService.create.balance', balance)
    console.log('checking user id')
    // перевіримо чи вже є баланс з таким користувачем
    const b = await this.get(userId)

    if (b) throw new Error('user with id ' + userId + ' exists')
    const result = await Balance.create({ ...balance, owner: userId })
    console.log('balanceService.create.result', result)
    return result
  }
  // отримати баланс. див. models.balances
  async get(userId) {
    if (!userId) throw new Error('no user id')
    console.log('get.userId:', userId)
    const userBalance = await Balance.findOne({ owner: userId })
    console.log('get.userBalance:', userBalance)
    return userBalance // null, якщо не знайдено
  }
  // додати до балансу число
  async add(userId, value) {
    const balance = await this.get(userId)
    balance.value += value
    await this.update(balance)
    return balance
  }
  //відняти від балансу число
  async sub(userId, value) {
    const balance = await this.get(userId)
    balance.value -= value
    await this.update(balance)
    return balance
  }
  // одновити баланс
  async update(newBalance) {
    if (!newBalance) throw new Error('no balance')
    Balance.updateOne(newBalance)
  }
}
module.exports = new balanceService()
