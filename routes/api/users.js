const express = require('express');
const {controllerWrapper, authorization} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");

const router = express.Router()

// get current user
router.get("/current", authorization, controllerWrapper(control.AuthControllers.getCurrentUser));

module.exports = router