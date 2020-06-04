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
  data: async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'Data 🍻',
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
};
