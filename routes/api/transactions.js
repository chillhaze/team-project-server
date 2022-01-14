const express = require('express')
const router = express.Router()

const { addTransaction, getTransactionsPerDay } = require('../../controllers')
const { controllerWrapper: wrapper } = require('../../middlewares')

router.get('/', wrapper(getTransactionsPerDay))
router.post('/', wrapper(addTransaction))

module.exports = router
