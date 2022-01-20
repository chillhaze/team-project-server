const express = require('express')
const router = express.Router()

const { addCategory, getCategories } = require('../../controllers')
const { controllerWrapper: wrapper, categoryValidation } = require('../../middlewares')

router.get('/', wrapper(getCategories))
router.post('/', wrapper(categoryValidation.add), wrapper(addCategory))

module.exports = router
