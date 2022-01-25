const express = require('express');
const {controllerWrapper, validation, authorization} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");
const {userLoginJoiSchema, userRegisterJoiSchema} = require("../../models/users");


const router = express.Router()

// Register user
router.post('/register', validation(userRegisterJoiSchema), controllerWrapper(control.AuthControllers.register));

// Login user
router.post('/login', validation(userLoginJoiSchema), controllerWrapper(control.AuthControllers.login));

// Logout user
router.post('/logout', authorization, controllerWrapper(control.AuthControllers.logout));

// update verification
router.get('/verify/:verificationToken')

// redirect to google authorisation
router.get("/google", controllerWrapper(control.AuthControllers.googleAuth));

// redirect to the frontend
router.get("/google-redirect", controllerWrapper(control.AuthControllers.googleRedirect));

//verification of token
router.get("/verify/:verifyToken", controllerWrapper(control.AuthControllers.verification));

module.exports = router
