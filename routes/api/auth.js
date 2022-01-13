const express = require('express')

const router = express.Router()

// Register user
router.post('/register')

// Login user
router.post('/login')

// Logout user
router.post('/logout')

// update verification
router.get('/verify/:verificationToken')

module.exports = router
