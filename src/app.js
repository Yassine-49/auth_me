const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
// const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Auth me API 🔑',
  });
});

// TODO: add routes

// TODO: add error handlers

module.exports = app;
