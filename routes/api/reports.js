const express = require('express')
const router = express.Router()

const { getSummary, getDetailedInfo } = require('../../controllers')
const { controllerWrapper: wrapper } = require('../../middlewares')

router.get('/summary', wrapper(getSummary))
router.get('/detailed', wrapper(getDetailedInfo))

module.exports = router
