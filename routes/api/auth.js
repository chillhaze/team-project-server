const express = require('express')
const {validation, controllerWrapper} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");
const {userRegisterJoiSchema} = require("../../models/users");

const router = express.Router()

// Register user
router.post('/register', validation(userRegisterJoiSchema), controllerWrapper(control.AuthControllers.register));

// Login user
router.post('/login')

// Logout user
router.post('/logout')

// update verification
router.get('/verify/:verificationToken')

module.exports = router
