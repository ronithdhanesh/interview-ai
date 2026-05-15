const express = require("express")

const authRouter = express.Router();
const {registerUserController, loginUserController} = require("../controller/auth.controller")

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access PUBLIC
 */

authRouter.post("/register", registerUserController)

/**
 * @route POST api/auth/login
 * @description Login a user with email and password
 * @access PUBLIC
 */

authRouter.post("/login", loginUserController)

module.exports = authRouter;