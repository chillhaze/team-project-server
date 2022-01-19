const express = require('express')
const router = express.Router()

const { addTransaction, getTransactionsPerDay, removeTransaction } = require('../../controllers')
const { controllerWrapper: wrapper, authorization } = require('../../middlewares')

router.get('/', authorization, wrapper(getTransactionsPerDay))
router.post('/', authorization, wrapper(addTransaction))
router.delete('/:transactionId', authorization, wrapper(removeTransaction))

module.exports = router
