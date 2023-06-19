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

    const payload = {
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json(createResponse("OK", { ...newUser.toJSON(), token }, null));
      }
    );
  }
);

export const getMyProfile = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const profile = await models.User.findByPk(req.user.id);
    if (!profile) {
      return next(new NotFoundError("There is no profile for this user"));
    }
    res.json(createResponse("OK", profile, null));
  }
);
