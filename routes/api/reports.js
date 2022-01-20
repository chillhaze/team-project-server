const express = require('express')
const router = express.Router()

const { getSummary, getDetailedInfo } = require('../../controllers')
const { controllerWrapper: wrapper, authorization, reportsValidation } = require('../../middlewares')

router.get('/summary', authorization, wrapper(reportsValidation.summary), wrapper(getSummary))
router.get('/detailed', authorization, wrapper(reportsValidation.detailed), wrapper(getDetailedInfo))

module.exports = router
