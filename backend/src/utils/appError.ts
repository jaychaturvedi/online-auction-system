export abstract class AppError extends Error {
  public errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "APP_ERROR";
    this.errorCode = errorCode;
  }
}
export class ApiError extends AppError {
  constructor(m: string, errorCode: number) {
    super(m, errorCode);
    this.name = "API_EROR";
  }
}

export class BadRequestError extends AppError {
  constructor(m: string) {
    super(m, 400);
    this.name = "BAD_REQUEST_EROR";
  }
}

export class UnauthorizedError extends AppError {
  constructor(m: string) {
    super(m, 401);
    this.name = "UNAUTHORIZED_ERROR";
  }
}

export class ForbiddenError extends AppError {
  constructor(m: string) {
    super(m, 403);
    this.name = "FORBIDDEN_ERROR";
  }
}

export class NotFoundError extends AppError {
  constructor(m: string) {
    super(m, 404);
    this.name = "NOT_FOUND_ERROR";
  }
}

export class InternalServerError extends AppError {
  constructor(m: string) {
    super(m, 500);
    this.name = "INTERNAL_SERVER_ERROR";
  }
}

export default AppError;
