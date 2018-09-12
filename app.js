
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('*', (req, res) => res.status(200).send(
//   'Welcome to the beginning of nothingness.',
// ));

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

//configure the
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  secret: "makers-makers-makers"
}));

app.get("/", function (req, res) {
  var name = req.session.name;
  res.render("index");
});

app.post("/register", function (req, res) {
  req.session.name = req.body.name;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server started!');
});
