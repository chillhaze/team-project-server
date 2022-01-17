const express = require('express');
const {controllerWrapper, authorization} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");

const router = express.Router()

// Register user
router.post('/register')

// Login user
router.post('/login')

// Logout user
router.post('/logout', authorization, controllerWrapper(control.AuthControllers.logout));

// update verification
router.get('/verify/:verificationToken')

module.exports = router
