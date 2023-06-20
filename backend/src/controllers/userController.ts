import catchAsync from "../utils/catchAsync";
import { BadRequestError, NotFoundError } from "../utils/appError";
import { Request, Response, NextFunction } from "express";

import models from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createResponse } from "../utils/helper";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return next(new BadRequestError("Missing required fields"));
    }

    let user = await models.User.findOne({ where: { email } });

    if (user) {
      return next(new BadRequestError("Email is already in use"));
    }
    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await models.User.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.json(createResponse("OK", { ...newUser.toJSON() }));
  }
);

export const getMyProfile = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const profile = await models.User.findByPk(req.user.id);
    if (!profile) {
      return next(new NotFoundError("There is no profile for this user"));
    }
    res.json(createResponse("OK", profile));
  }
);
export const getAllUsers = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const users = await models.User.findAll();
    if (!users) {
      throw new NotFoundError("There is no users for this user");
    }
    res.json(createResponse("OK", users));
  }
);

export const getUserBidHistory = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const bids = await models.Bid.findAll({
      where: { userId: req.user.id },
      include: {
        model: models.User,
        required: false,
        attributes: ["id", "name", "balance"],
      },
    });
    res
      .status(200)
      .json(createResponse("OK", { totalBids: bids.length, bids }));
  }
);

export const getUserById = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const user = await models.User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return next(new NotFoundError("No user found"));
    }
    res.status(200).json(createResponse("OK", { user }));
  }
);
export const updateUserBalanceById = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const [[user], isUpdated] = await models.User.increment(
      { balance: req.body.balance },
      {
        where: { id: req.user.id },
      }
    );
    if (!user) {
      return next(new NotFoundError("No user found"));
    }
    res
      .status(200)
      .json(createResponse("Balance Update Successfully" as any, user));
  }
);
export const updateUserById = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const [isUpdated, [user]] = await models.User.update(req.body.user, {
      where: { id: req.user.id },
      returning: true,
    });
    if (!user) {
      return next(new NotFoundError("No user found"));
    }
    res.status(200).json(createResponse("OK", { user }));
  }
);
