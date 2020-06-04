const bcrypt = require('bcrypt');
const passport = require('passport');

// eslint-disable-next-line
const User = require('../../models').User;

passport.serializeUser((id, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  if (!user) {
    const error = new Error('user not found!');
    return done(error, null);
  }
  return done(null, user);
});

module.exports = {
  // Register function
  register: async (req, res, next) => {
    try {
      // get data from the request
      const { email, username, password } = req.valid.body;
      // search the database for email
      const duplicateEmail = await User.findOne({
        where: { email },
      });
      // if email already exists return error
      if (duplicateEmail) {
        const error = new Error('Email already in use!');
        res.status(403);
        throw error;
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
      // insert the user in the database
      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      // eslint-disable-next-line
      console.log('[d] New user:', newUser.dataValues);
      // delete the user password from the object
      delete newUser.dataValues.password;
      // create a session
      req.login(newUser.dataValues.id, (error) => {
        if (error) throw error;
        // return the created user
        res.status(200).json(newUser.dataValues);
      });
    } catch (error) {
      next(error);
    }
  },
  // Login function
  login: async (req, res, next) => {
    try {
      // create a session
      req.login(req.user.dataValues.id, (error) => {
        if (error) throw error;
        // return success
        res.status(200).json({
          message: 'user logged in!',
        });
      });
    } catch (error) {
      next(error);
    }
  },
};
