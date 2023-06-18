import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", authController.authenticate, userController.getMyProfile);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/", authController.loginUser);

// @route    POST api/auth/update-password
// @desc     Update user password
// @access   Private
router.patch(
  "/update-password",
  authController.authenticate,
  authController.updatePassword
);

export default router;
