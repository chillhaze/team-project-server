const express = require('express')
const router = express.Router()

const { addTransaction, getTransactionsPerDay, removeTransaction } = require('../../controllers')
const { controllerWrapper: wrapper } = require('../../middlewares')

router.get('/', wrapper(getTransactionsPerDay))
router.post('/', wrapper(addTransaction))
router.delete('/:transactionId', wrapper(removeTransaction))

module.exports = router
