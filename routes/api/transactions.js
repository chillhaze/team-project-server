const express = require('express')
const router = express.Router()

const { addTransaction, getTransactionsPerDay, removeTransaction } = require('../../controllers')
const { controllerWrapper: wrapper, authorization, transactionsValidation } = require('../../middlewares')

router.get('/', authorization, wrapper(transactionsValidation.get), wrapper(getTransactionsPerDay))
router.post('/', authorization, wrapper(transactionsValidation.add), wrapper(addTransaction))
router.delete('/:transactionId', authorization, wrapper(transactionsValidation.remove), wrapper(removeTransaction))

module.exports = router
