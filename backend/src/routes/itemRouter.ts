import express from "express";
const router = express.Router();

import controllers from "../controllers";

router.get(
  "/:itemId",
  controllers.authController.authenticate,
  controllers.itemController.getItemById
);

router.get(
  "/",
  controllers.authController.authenticate,
  controllers.itemController.getAllItems
);

router.post(
  "/",
  controllers.authController.authenticate,
  controllers.itemController.createItem
);

export default router;
