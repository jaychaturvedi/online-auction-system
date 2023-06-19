import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/appError";
import models from "../models";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createResponse } from "../utils/helper";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError("Please provide email and password"));
    }

    let user = await models.User.findOne({ where: { email } });

    if (!user) {
      return next(new UnauthorizedError("Incorrect email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new UnauthorizedError("Incorrect email or password"));
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json(createResponse("OK", { token }, null));
      }
    );
  }
);

export const authenticate = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
      throw new UnauthorizedError("No token, authorization denied");
    }

    // Verify token
    await jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (error: any, decoded: any) => {
        if (error) {
          throw new UnauthorizedError("Token is not valid");
        } else {
          req.user = decoded.user;
          next();
        }
      }
    );
  }
);

export const updatePassword = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    let user = await models.User.findByPk(req.user.id);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }
    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      throw new BadRequestError("Invalid Credentials");
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    await user.save();
    res.status(201).json(createResponse("OK", req.user, null));
  }
);
