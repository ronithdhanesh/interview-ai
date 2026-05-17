const express = require("express")

const authRouter = express.Router();
const {registerUserController, loginUserController,logoutUserController,getMeController} = require("../controller/auth.controller")
const authUser = require("../middlewares/auth.middleware")
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

/**
 * @route GET api/auth/logout
 * @description clear token from user cookie and add to blacklist token
 * @access PUBLIC
 */

authRouter.get("/logout", logoutUserController)

/**
 * @route GET api/auth/get-me
 * @description get current logged in user details
 * @access private
 */

authRouter.get('/get-me', authUser, getMeController)
module.exports = authRouter;