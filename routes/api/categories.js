const express = require('express')
const router = express.Router()

const { addCategory, getCategories } = require('../../controllers')
const { controllerWrapper: wrapper } = require('../../middlewares')

router.get('/', wrapper(getCategories))
router.post('/', wrapper(addCategory))

module.exports = router
