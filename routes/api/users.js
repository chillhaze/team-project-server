const express = require('express');
const {controllerWrapper, authorization, upload} = require("../../middlewares/");
const {authControllers: control} = require("../../controllers/");

const router = express.Router()

// get current user
router.get("/current", authorization, controllerWrapper(control.AuthControllers.getCurrentUser));

// update current user's avatar
router.patch("/avatars", authorization, upload.single("avatar"), controllerWrapper(control.AuthControllers.updateAvatar));

module.exports = router