const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');

// eslint-disable-next-line
const User = require('../models').User;

// Local strategy
passport.use(new LocalStrategy(
  (async (username, password, done) => {
    // debug
    try {
      // find the user
      const user = await User.findOne({
        where: { username },
      });
      // if user not found return error
      if (!user) {
        const error = new Error('User not found!');
        return done(error, false);
      }
      // eslint-disable-next-line
      // check if password is valid
      const validPassword = await bcrypt.compare(password, user.dataValues.password);
      // if password is incorrect return error
      if (!validPassword) {
        const error = new Error('Incorrect password!');
        return done(error, false);
      }
      // return the user
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
));

// Google strategy
passport.use(new GoogleStrategy({
  callbackURL: '/user/google/redirect',
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  try {
    return done(null, profile);
  } catch (error) {
    return done(error, false);
  }
}));

// Github strategy
passport.use(new GithubStrategy({
  callbackUrl: '/user/github/redirect',
  clientID: process.env.GITHUB_AUTH_CLIENT_ID,
  clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  try {
    return done(null, profile);
  } catch (error) {
    return done(error, false);
  }
}));

// Facebook strategy
passport.use(new FacebookStrategy({
  callbackURL: '/user/facebook/redirect',
  clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  try {
    return done(null, profile);
  } catch (error) {
    return done(error, null);
  }
}));
