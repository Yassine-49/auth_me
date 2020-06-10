const router = require('express-promise-router')();
const passport = require('passport');

// eslint-disable-next-line
const passportConfig = require('../../passport');
const userController = require('../../controllers/user');
const { validateBody, schemas } = require('../../middlewares/validationHandler');

// ==== Middlewares ====

// local authenitcation middleware
const localAuthMiddleware = (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) {
      res.status(403);
      const newError = error || new Error('Unauthorized!');
      return next(newError);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// google authentication middleware
const googleAuthMiddleware = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile'],
  }, (error, user) => {
    if (error || !user) {
      res.status(403);
      const newError = error || new Error('Unauthorized!');
      return next(newError);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// github authentication middlware
const githubAuthMiddleware = (req, res, next) => {
  passport.authenticate('github', {
    scope: ['read:user'],
  }, (error, user) => {
    if (error || !user) {
      res.status(403);
      const newError = error || new Error('Unauthorized!');
      return next(newError);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// facebook authenitcation middleware
const facebookAuthMiddleware = (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['todo'],
  }, (error, user) => {
    if (error || !user) {
      res.status(403);
      const newError = error || new Error('Unauthorized!');
      return next(newError);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// ==== Routes ====

// Register
// register: > validate schema  > controller
router.route('/register')
  .post(validateBody(schemas.register),
    userController.register);

// LocalStrategy: login
// login: > validate schema > authenticate > controller
router.route('/login')
  .post(validateBody(schemas.login),
    localAuthMiddleware,
    userController.login);

// GoogleStrtegy: redirect
router.route('/google')
  .get(googleAuthMiddleware);

// google redirect
router.route(process.env.GOOGLE_AUTH_REDIRECT_URI)
  .get(googleAuthMiddleware,
    userController.googleLogin);

// GithubStrategy: login
router.route('/github')
  .get(githubAuthMiddleware);

// GithubStrategy: redirect
router.route(process.env.GITHUB_AUTH_REDIRECT_URI)
  .get(githubAuthMiddleware,
    userController.githubLogin);

// FacebookStrategy: login
router.route('/facebook')
  .get(facebookAuthMiddleware);

// FacebookStrategy: redirect
router.route(process.env.FACEBOOK_AUTH_REDIRECT_URI)
  .get(facebookAuthMiddleware,
    userController.facebookLogin);

module.exports = router;
