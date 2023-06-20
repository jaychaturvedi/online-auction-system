import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import controllers from "../controllers";

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", controllers.userController.createUser);

// @route    GET api/users/me
// @desc     Get current users profile
// @access   Private
router.get(
  "/me",
  controllers.authController.authenticate,
  controllers.userController.getMyProfile
);

// @route    GET api/users/bids
// @desc     Get a users bidding history
// @access   Private
router.get(
  "/bids",
  controllers.authController.authenticate,
  controllers.userController.getUserBidHistory
);

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get("/", controllers.userController.getAllUsers);

// @route    GET api/users/:id
// @desc     Get user by Id
// @access   Public
router.get("/:id", controllers.userController.getUserById);

// @route    PUT api/users
// @desc     Update user by Id
// @access   Private
router.put(
  "/",
  controllers.authController.authenticate,
  controllers.userController.updateUserById
);

// @route    PUT api/users/balance
// @desc     Update user's balance by Id
// @access   Private
router.put(
  "/balance",
  controllers.authController.authenticate,
  controllers.userController.updateUserBalanceById
);

export default router;
