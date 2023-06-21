import express from "express";
const router = express.Router();

import controllers from "../controllers";

// @route    POST api/item/:itemId
// @desc     Get item details by id
// @access   Private
router.get(
  "/:itemId",
  controllers.authController.authenticate,
  controllers.itemController.getItemById
);

// @route    POST api/item/:itemId
// @desc     Get All items
// @access   Private
router.get(
  "/",
  controllers.authController.authenticate,
  controllers.itemController.getAllItems
);

// @route    POST api/item/:itemId
// @desc     Create item for bidding
// @access   Private
router.post(
  "/",
  controllers.authController.authenticate,
  controllers.itemController.createItem
);

export default router;
