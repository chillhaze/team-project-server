const express = require('express')
const router = express.Router()
const { controllerWrapper: wrapper } = require('../../middlewares')
const authorization = require('../../middlewares/authorization')
const balanceController = require('../../controllers/balance/balanceController')

// тут ще має бути auth middleware з інформацією про користувача
router.get('/', authorization, wrapper(balanceController.get))
router.post('/', authorization, wrapper(balanceController.create))
module.exports = router
