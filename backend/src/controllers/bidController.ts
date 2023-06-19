import catchAsync from "../utils/catchAsync";
import express, { Request, Response, NextFunction } from "express";

// bidController.js
const { Bid, Item } = require("../models");

// Controller action for placing a bid
export const placeBid = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId, userId, amount } = req.body;

    // Check if the bid amount is higher than the current highest bid and starting price
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    if (amount <= item.startingPrice) {
      return res.status(400).json({
        success: false,
        error: "Bid amount should be higher than the starting price",
      });
    }

    if (item.highestBid && amount <= item.highestBid) {
      return res.status(400).json({
        success: false,
        error: "Bid amount should be higher than the current highest bid",
      });
    }

    // Place the bid
    const newBid = await Bid.create({ itemId, userId, amount });

    // Update the item's highest bid
    item.highestBid = amount;
    await item.save();

    res.status(201).json({ success: true, bid: newBid });
  }
);
