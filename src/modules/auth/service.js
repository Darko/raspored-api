import moment from 'moment';
import jwt from 'jsonwebtoken';
import constants from '../../constants';
import secrets from '../../config/secrets';
import User from '../../models/user';

const appConstants = constants.app;

export function signToken(userId, role) {
  return jwt.sign({
    userId,
    role
  }, secrets.app.secret);
}

export function login(req, res) {
  const cookieMaxAge = moment.duration(1, 'months').asMilliseconds();
  const token = signToken(req.user._id, req.user.role);

  res.cookie(constants.app.cookie, token, { maxAge: cookieMaxAge });

  return res.json(token);
}