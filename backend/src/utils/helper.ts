import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  AppError,
  InternalServerError,
} from "./appError";

type TResponseStatus =
  | "ERROR"
  | "OK"
  | "NOT_FOUND"
  | "INVALID_REQUEST"
  | "UNKNOWN_ERROR"
  | "BAD_REQUEST_EROR"
  | "FORBIDDEN_ERROR"
  | "NOT_FOUND_ERROR"
  | "UNAUTHORIZED_ERROR"
  | "APP_ERROR"
  | "INTERNAL_SERVER_ERROR";

export function createResponse(
  message: TResponseStatus,
  body: any,
  error?: { code: number; message: string; name: string } | undefined | null
) {
  return {
    status: body !== undefined ? true : false,
    message: body !== undefined ? message : error?.message,
    body: body ? body : null,
    error:
      error !== undefined
        ? {
            code: error?.code,
            name: error?.name,
            message: error?.message,
          }
        : null,
    date: new Date(),
  };
}

export function expressErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status: TResponseStatus = "ERROR";
  let statusCode: number = 200;

  if (
    err instanceof BadRequestError ||
    err instanceof ForbiddenError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof InternalServerError
  ) {
    status = (err.name as TResponseStatus) || "UNKNOWN_ERROR";
    statusCode = err.errorCode;
  }
  const response = createResponse(status, undefined, {
    code: (err as AppError).errorCode,
    name: err.name,
    message: err.message,
  });
  res.status(statusCode);
  return res.json(response);
  // next();
}

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errlist = errors.array().map((err) => {
      return err.msg;
    });
    return res.status(422).json({ errors: errlist });
  }
  next();
}
