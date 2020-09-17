const axios = require('axios').default;
const apm = require('elastic-apm-node').start();

const app = require('express')();

app.get('/api/:msg', async function (req, res) {
  res.send({
    msg: req.params.msg,
  });
});

app.listen(8080);
