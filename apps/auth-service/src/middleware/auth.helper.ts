import { ValidationError } from '@e-commerce/shared';

const emailRegex: RegExp = /^[^@]+@[^@]+\.[^@]+$/;

export const validateRegistrationData = (
  data: any,
  role: 'user' | 'seller',
) => {
  const { name, email, password, country, phoneNumber } = data.body;

  if (
    !name ||
    !email ||
    !password ||
    (role === 'user' && !phoneNumber && !country)
  ) {
    throw new ValidationError('Insufficient Credentials');
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError(`Invalid Email ID`);
  }
};
