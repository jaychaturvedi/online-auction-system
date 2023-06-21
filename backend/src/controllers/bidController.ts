import catchAsync from "../utils/catchAsync";
import express, { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/helper";
import { BadRequestError, NotFoundError } from "../utils/appError";

// bidController.js
import models from "../models";

// Controller action for placing a bid
export const placeBid = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    let { itemId, amount } = req.body;
    const userId = req.user.id;
    // Check if the bid amount is higher than the current highest bid and starting price
    const item = await models.Item.findByPk(itemId);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    if (item.status != "open") {
      throw new BadRequestError(`Item is already ${item.status} in auction`);
    }
    if (item.sellerId == userId) {
      throw new BadRequestError("Owner of item cannot place bid");
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
    const user = await models.User.findByPk(userId);
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

export const getBidsByItemId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await models.Item.findOne({
      where: { id: req.params.itemId },
      include: [
        {
          model: models.User,
          required: false,
          attributes: ["id", "name", "balance"],
        },
        {
          model: models.Bid,
          required: false,
          order: [["id", "ASC"]],
          include: [
            {
              model: models.User,
              required: false,
              attributes: ["id", "name", "balance"],
            },
          ],
        },
      ],
    });
    res.status(200).json(createResponse("OK", item));
  }
);
