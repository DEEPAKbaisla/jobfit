import express from "express";
import userController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authController from "../controller/auth.controller.js";


const authRouter = express.Router();
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register',userController.registerUserController)
 
/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post('/login',userController.loginUserController)

/**
 * @route GET/api/auth/logout
 * @description clear token from user cookie and add token in blacklist
 * @access Public
 */

authRouter.get("/logout",userController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 *@access private
 */
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController)


export default authRouter;
