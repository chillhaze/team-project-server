const express = require('express')
const router = express.Router()

const { getSummary, getDetailedInfo } = require('../../controllers')
const { controllerWrapper: wrapper, authorization } = require('../../middlewares')

router.get('/summary', authorization, wrapper(getSummary))
router.get('/detailed', authorization, wrapper(getDetailedInfo))

module.exports = router
