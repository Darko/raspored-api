import express from 'express';
import passport from 'passport';
import session from 'express-session';
import * as Auth from './service';
import './github';

const app = express.Router();
const options = {
  secret: 'verysecret',
};

app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());

app.get('/github', passport.authenticate('GithubGeneral', {
  failureRedirect: '/api/v1/faculties',
  session: false
}));
app.get('/github/callback', passport.authenticate('GithubGeneral', { failureRedirect: '/api/v1/faculties', session: false }), Auth.login);

export default app;
