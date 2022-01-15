const { is } = require('express/lib/request')
const balanceService = require('../../services/balanceService')

class balanceController {
  async get(req, res) {
    const { _id } = req.user
    const balance = await balanceService.get(_id)
    return res.status(200).json({
      status: 'success',
      code: 200,
      result: balance.totalCost,
    })
  }

  async create(req, res) {
    const { _id } = req.user
    const balance = await balanceService.create(_id, req.body)
    return res.status(200).json({
      status: 'success',
      code: 200,
      result: balance.totalCost,
    })
  }
}

module.exports = new balanceController()
