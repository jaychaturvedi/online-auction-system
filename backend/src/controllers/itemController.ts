import catchAsync from "../utils/catchAsync";
import express, { Request, Response, NextFunction } from "express";
import moment from "moment";
// bidController.js
import models from "../models";
import { createResponse } from "../utils/helper";
import { BadRequestError } from "../utils/appError";
import { Op } from "sequelize";

export const createItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, startingPrice, sellerId, time, timeFrameType } = req.body;
    if (!["minutes", "hours", "days"].includes(timeFrameType)) {
      throw new BadRequestError(
        `Invalid time frame. Please provide a valid time frame type in 'minutes', 'hours','days'`
      );
    }
    const newItem = await models.Item.create({
      name,
      sellerId,
      startingPrice: startingPrice,
      auctionStartTime: moment().valueOf(),
      auctionEndTime: moment().add(time, timeFrameType).valueOf(),
    });
    res.status(200).json(createResponse("New Item Created" as any, newItem));
  }
);

export const getItemById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.params;
    const item = await models.Item.findByPk(itemId, {
      include: [
        {
          model: models.Bid,
          required: false,
          order: [["createdAt", "DESC"]],
        },
        {
          model: models.User,
          required: false,
          attributes: ["id", "name", "balance"],
        },
      ],
    });
    res.status(200).json(createResponse("OK", item));
  }
);
export const getUsersItemById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.body;
    const item = await models.Item.findByPk(itemId);
    res.status(200).json(createResponse("OK", item));
  }
);

export const getAllItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.query;
    const condition: any = {
      order: [["createdAt", "DESC"]],
      include: {
        model: models.Bid,
        required: false,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: models.User,
            required: false,
            attributes: ["id", "name", "balance"],
          },
        ],
      },
    };
    if (status && status === "open") {
      Object.assign(condition, { where: { status: { [Op.eq]: status } } });
    }
    if (status && status !== "open") {
      Object.assign(condition, { where: { status: { [Op.ne]: "open" } } });
    }
    console.log(condition);
    const items = await models.Item.findAll(condition);
    res.status(200).json(createResponse("OK", items));
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
