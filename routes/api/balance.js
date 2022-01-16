const express = require('express')
const router = express.Router()
const { controllerWrapper: wrapper } = require('../../middlewares')
const balanceController = require('../../controllers/balance/balanceController')

// тут ще має бути auth middleware з інформацією про користувача
router.get('/', wrapper(balanceController.get))
router.post('/', wrapper(balanceController.create))
module.exports = router
