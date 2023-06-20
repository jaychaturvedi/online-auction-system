import catchAsync from "../utils/catchAsync";
import express, { Request, Response, NextFunction } from "express";
import moment from "moment";
// bidController.js
import models from "../models";
import { createResponse } from "../utils/helper";
import { BadRequestError } from "../utils/appError";

export const createItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("createItem", req);
    const { name, startingPrice, sellerId, time, timeFrameType } = req.body;
    if (!["minutes", "hours", "days"].some(timeFrameType)) {
      throw new BadRequestError(
        `Invalid time frame. Please provide a valid time frame type in 'minutes', 'hours','days'`
      );
    }
    const newItem = await models.Item.create({
      name,
      sellerId,
      startingPrice: startingPrice * 100,
      auctionStartTime: moment().valueOf(),
      auctionEndTime: moment().add(timeFrameType, time).valueOf(),
    });
    res.json(newItem);
  }
);

export const getItemById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.body;
    const item = await models.Item.findByPk(itemId);
    console.log("createItem", req);
    res.json(item);
  }
);
export const getUsersItemById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.body;
    const item = await models.Item.findByPk(itemId);
    console.log("createItem", req);
    res.json(item);
  }
);

export const getAllItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("createItem", req);
    const items = await models.Item.findAll();
    console.log("createItem", req);
    res.json(createResponse("OK", items, null));
  }
);

// export const getUsersAllItems = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("createItem", req);
//     const { itemId } = req.body;
//     const item = await models.Item.findAll({where:{itemId, sellerId: userId}});
//     console.log("createItem", req);
//     res.json(item);
//   }
// );
