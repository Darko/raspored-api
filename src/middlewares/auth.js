import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/environment';

export const COOKIE = 'sapp-token';

export function signToken(user) {
  return jwt.sign({ user }, 'supersecret', { issuer: 'ScheduleApp' });
}

const maxCookieAge = moment.duration(1, 'months').asMilliseconds();

export function tokenOptions(maxAge = maxCookieAge) {
  if (config.env !== 'development') {
    return {
      domain: config.frontEnd, maxAge, path: '/', secure: true
    };
  }

  return {
    domain: 'localhost', maxAge, path: '/', secure: false
  };
}

export function setCookie(req, res) {
  if (!req.user) {
    return res.boom.notFound('Something went wrong, please try again');
  }
  const { user } = req;
  const token = signToken(user);
  res.cookie(COOKIE, token, tokenOptions());
  return res.redirect(req.session.returnUrl);
}

export function isAuthenticated(req, res, next) {
  const header = req.headers.authorization;
  const [type, token] = header.split(' ');

  jwt.verify(token, 'supersecret', (error, user) => {
    if (error) {
      return res.boom.unAuthorized();
    }

    User.findOneAndUpdate({ _id: user._id }, { $set: { lastLogin: Date.now() } })
    .then(user => {
      if (!user) return res.boom.unauthorized();
      if (user.api_token !== result.token) return res.boom.unauthorized();

      req.user = user;
      next();
    });
  });
}