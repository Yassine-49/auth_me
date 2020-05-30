const app = require('./app');

const port = process.env.PORT || 4040;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`[i] Listening at localhost:${port}`);
});
