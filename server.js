const express = require('express');
const path = require('path');

const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  };
};

const logger = function () {
  return function (req, res, next) {
    console.log(req.url)
    next();
  };
};

app.use(forceSSL());
app.use(logger());
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port', process.env.PORT || 3000)
});
