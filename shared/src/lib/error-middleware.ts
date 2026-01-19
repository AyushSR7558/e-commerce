import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = false,
    details?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

// Validation Error
export class ValidationError extends AppError {
  constructor(message = 'Invalid request data', details?: any) {
    super(message, 400, true, details);
  }
}

// Authentication Error
export class AuthError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// Not Found Error
export class NotFound extends AppError {
    constructor(message = "Resource not Found") {
        super(message, 404);
    }
}

// Authentication Error
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden Error") {
        super(message, 403);
    }
}

// Database Error 
export class DatabaseError extends AppError {
    constructor(message = "Database error", details?:any) {
        super(message, 500, true, details);
    }
}

// Rate Limit Error
export class RateLimitError extends AppError {
  constructor(message = "Too many request, please try again later") {
    super(message, 429);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) => {
  if (err instanceof AppError) {
    console.log(`Error${req.method} ${req.url}-${err.message}`);

    return res.status(err.statusCode).json({
      status: err.statusCode,
      messsage: err.message,
      ...(err.details && { details: err.details }),
    });
  }
  console.log('UnHandled Error!!!', err);
  return res.status(500).send({
    message: 'Something went wrong, Try again later',
  });
};
