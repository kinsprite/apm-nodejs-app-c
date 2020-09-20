const axios = require('axios').default;
const apm = require('elastic-apm-node').start({
  ignoreUrls: ['/healthz'],
});

const app = require('express')();

function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.get('/healthz', function (req, res) {
  res.send({
    msg: 'OK',
  });
});

app.get('/api/:msg', async function (req, res) {
  res.send({
    msg: req.params.msg,
  });
});

app.listen(8080);
