import { AppError } from './appError.js';
import { NextFunction, Request, Response } from 'express';

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
