import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';
import { access } from 'fs';
import secrets from '../../config/secrets';
import User from '../../models/user';

passport.use('GithubGeneral', new GithubStrategy({
  clientID: secrets.github.clientID,
  clientSecret: secrets.github.clientSecret
}, handleGithubLogin))

export function handleGithubLogin(accessToken, refreshToken, profile, done) {
  const { id, provider = 'github' } = profile;

  console.log(profile._json);

  User.findOne({ providers: { provider, providerId: id }})
  .then(user => {

    if (user) return done(null, user);

    const newUser = new User({
      avatar: profile.avatar_url,
      name: profile.name,
      email: profile.email,
      providers: [{
        provider,
        providerId: id
      }]
    });

    return newUser.save()
    .then(user => done(null, user));
  });
}