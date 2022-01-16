const express = require('express')
const router = express.Router()

const { getSummary } = require('../../controllers')
const { controllerWrapper: wrapper } = require('../../middlewares')

router.get('/summary', wrapper(getSummary))

module.exports = router
