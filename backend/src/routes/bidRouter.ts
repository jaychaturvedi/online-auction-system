import express from "express";
const router = express.Router();

import controllers from "../controllers";

// @route    POST api/bid
// @desc     Authenticate user & place bid
// @access   Private
router.post(
  "/",
  controllers.authController.authenticate,
  controllers.bidController.placeBid
);

export default router;
