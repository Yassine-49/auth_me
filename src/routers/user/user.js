const router = require('express-promise-router')();
const passport = require('passport');

// eslint-disable-next-line
const passportConfig = require('../../passport');
const userController = require('../../controllers/user');
const { validateBody, schemas } = require('../../middlewares/validationHandler');

// authenitcation middleware
const localAuthMiddleware = (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) {
      res.status(403);
      return next(error);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// register: > validate schema > validate duplicate > insert
router.route('/register')
  .post(validateBody(schemas.register),
    userController.register);

// login: > validate schema > authenticate > login
router.route('/login')
  .post(validateBody(schemas.login),
    localAuthMiddleware,
    userController.login);

module.exports = router;
