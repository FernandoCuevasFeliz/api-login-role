/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import { BAD_REQUEST } from 'http-status-codes';
import ErrorHandler from '../../errors/ErrorHandler';
import JWT from '../../utils/JWT';

export const auth: THandler = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token) {
    next(new ErrorHandler(BAD_REQUEST, 'Token is required'));
    return;
  }

  try {
    token = token.split(' ')[1];
    const payload = JWT.verifyToken(token);
    req.user = payload.user;
    next();
  } catch (err) {
    next(new ErrorHandler(BAD_REQUEST, 'Token invalid'));
  }
};

export const isAdmin: THandler = (req, res, next) => {};
