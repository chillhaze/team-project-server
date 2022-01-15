const express = require('express')
const router = express.Router()
const { controllerWrapper: wrapper } = require('../../middlewares')
const balanceController = require('../../controllers/balance/balanceController')

router.get('/', wrapper(balanceController.get))
router.post('/', wrapper(balanceController.create))
module.exports = router
