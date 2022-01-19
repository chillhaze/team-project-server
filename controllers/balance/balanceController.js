const { is } = require('express/lib/request')
const balanceService = require('../../services/balanceService')

class balanceController {
  async get(req, res) {
    const { _id } = req.user
    const balance = (await balanceService.get(_id)) ?? { balance: 0 }

    return res.status(200).json({
      status: 'success',
      code: 200,
      result: balance.value,
    })
  }

  async create(req, res) {
    const { _id } = req.user
    const balance = await balanceService.create(_id, req.body)

    return res.status(201).json({
      status: 'success',
      code: 201,
      result: balance.value,
    })
  }
}

module.exports = new balanceController()
