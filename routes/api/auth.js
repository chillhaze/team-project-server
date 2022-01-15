const express = require('express');
const {validation, controllerWrapper} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");
const {userLoginJoiSchema} = require("../../models/users");

const router = express.Router()

// Register user
router.post('/register')

// Login user
router.post('/login', validation(userLoginJoiSchema), controllerWrapper(control.AuthControllers.login));

// Logout user
router.post('/logout')

// update verification
router.get('/verify/:verificationToken')

module.exports = router
