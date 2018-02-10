import jwt from 'jsonwebtoken';
import config from '../config/environment';
import User from '../models/user';
import secrets from '../config/secrets';

export function isAuthenticated(req, res, next) {
  if (!req.headers.authorization) return res.boom.unauthorized();

  const [type, token] = req.headers.authorization.split(' ');

  jwt.verify(token, secrets.app.secret, (error, payload) => {
    if (error) {
      return res.boom.unauthorized(error.message);
    }

    const { userId, role } = payload;

    return User.findOne({ _id: userId }, '_id role')
    .then(user => {
      if (!user) {
        return res.boom.unauthorized();
      }

      req.user = user.toObject();
      req.authenticated = true;
      
      user.lastLogin = Date.now();
      user.save();

      return next();
    })
    .catch(next);
  });
}

export function isAdmin(req, res, next) {
  if (!req.user) return res.boom.unauthorized();

  return User.findOne({ _id: req.user._id })
  .then(user => {
    if (!user) return res.boom.unauthorized();
    if (!user.role || user.role !== 'admin') return res.boom.forbidden();

    return next();
  })
  .catch(() => res.boom.forbidden());
}