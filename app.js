const express = require('express')
const bodyParser = require('body-parser');

const app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send(
  'Welcome to the beginning of nothingness.',
));

app.get("/", function (req, res) {
  res.send("Hello, World!");
});

app.listen(3000, function () {
  console.log('Server started!');
});
