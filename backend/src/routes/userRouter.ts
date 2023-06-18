import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";

import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", userController.createUser);

// @route    GET api/users/me
// @desc     Get current users profile
// @access   Private
router.get("/me", authController.authenticate, userController.getMyProfile);

export default router;
