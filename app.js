var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

module.exports = app;

//configure the
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  secret: "makers-makers-makers"
}));

app.get('*', (req, res) => res.status(200).send(
  'Welcome to the beginning of nothingness.',
));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/register", function (req, res) {
  req.session.name = req.body.name;
  req.session.email = req.body.email;
  res.redirect("/properties");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  req.session.email = req.body.email;
  res.redirect("/properties");
});

app.get("/properties", function(req, res) {
  var email = req.session.email;
  var name = req.session.name;
  console.log(email);
  console.log(name);
  // don't really want email but without user objects
  // we are limited to things provided by user on
  // the log in page. Eventually use FIND on database
  res.render("properties", {
    name: name,
    email: email
  });
})

app.listen(3000, function () {
  console.log('Server started!');
});
