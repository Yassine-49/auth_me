const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// eslint-disable-next-line
const User = require('../models').User;

passport.use(new LocalStrategy(
  (async (username, password, done) => {
    // debug
    console.log('[d] username:', username);
    console.log('[d] password:', password);
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
      console.log('[d] User:', user.dataValues);
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
