import catchAsync from "../utils/catchAsync";
import express, { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/helper";
import { BadRequestError, NotFoundError } from "../utils/appError";

// bidController.js
import models from "../models";

// Controller action for placing a bid
export const placeBid = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { itemId, userId, amount } = req.body;
    // Check if the bid amount is higher than the current highest bid and starting price
    const item = await models.Item.findByPk(itemId);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    if (amount <= item.startingPrice) {
      throw new BadRequestError(
        "Bid amount should be higher than the starting price"
      );
    }
    if (item.currentPrice && amount <= item.currentPrice) {
      throw new BadRequestError(
        "Bid amount should be higher than the current highest bid"
      );
    }
    const user = await models.User.findByPk(req.user.id);
    if (user?.balance! < amount) {
      throw new BadRequestError("User does not have enough balance to bid");
    }

    // Place the bid
    const newBid = await models.Bid.create({ itemId, userId, amount });

    // Update the item's highest bid
    item.currentPrice = amount;
    user!.balance = user!.balance! - amount;
    await item.save();
    await user!.save();

    res.status(201).json(createResponse("OK", newBid));
  }
);
