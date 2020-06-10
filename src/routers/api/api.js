const router = require('express-promise-router')();
// const passport = require('passport');

const apiController = require('../../controllers/api');

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  const error = new Error('user not logged in!');
  res.status(403);
  return next(error);
};

// data: validate login > controller
router.route('/data')
  .get(isLoggedIn,
    apiController.data);

module.exports = router;
