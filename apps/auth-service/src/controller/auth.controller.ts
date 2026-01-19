import { NextFunction, Request, Response } from 'express';
import { validateRegistrationData } from '../middleware/auth.helper';
import { prisma, ValidationError } from '@e-commerce/shared';

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateRegistrationData(req.body, 'user');
  const { user, email } = req.body;

  const existingUser = await prisma.user.users.findUnique({ where: email });

  if (existingUser) {
    return next(new ValidationError(`User already exits with this email`));
  };

  
};
