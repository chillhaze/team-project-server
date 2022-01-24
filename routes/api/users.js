const express = require('express');
const {controllerWrapper, authorization, upload, validation} = require("../../middlewares/");
const {userUpdateNameJoiSchema} = require("../../models/users");
const {authControllers: control} = require("../../controllers/");

const router = express.Router()

// get current user
router.get("/current", authorization, controllerWrapper(control.AuthControllers.getCurrentUser));

// update current user's avatar
router.patch("/avatars", authorization, upload.single("avatar"), controllerWrapper(control.AuthControllers.updateAvatar));

//update currect user name
router.patch("/name", authorization, validation(userUpdateNameJoiSchema), controllerWrapper(control.AuthControllers.updateUserName));

module.exports = router