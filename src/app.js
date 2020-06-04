const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
// const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const user = require('./routers/user/user');
const api = require('./routers/api/api');
const errorHandlers = require('./middlewares/errorHandlers.js');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(session({
  secret: 'alsdkfjadslkfjaladflaj',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: 'Auth me API 🔑',
  });
});

app.use('/user', user);
app.use('/api/v1', api);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

module.exports = app;
