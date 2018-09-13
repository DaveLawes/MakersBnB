const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();

const path = require('path');


module.exports = app;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cookieSession({
  secret: "makers-makers-makers"
}));

app.get("/", function (req, res) {
  var name = req.session.name;

  res.render("pages/index");
});

app.post("/register", function (req, res) {
  req.session.name = req.body.name;
  req.session.email = req.body.email;
  res.redirect("/properties");
});

app.get("/login", function (req, res) {
  res.render("pages/login");
});

app.post("/login", function (req, res) {
  req.session.email = req.body.email;
  res.redirect("/properties");
});

app.get("/properties", function (req, res) {
  var email = req.session.email;
  var name = req.session.name;

/*
 * Don't really want email but without user objects
 * We are limited to things provided by user on
 * The log in page. Eventually use FIND on database
 */
  res.render("pages/properties", {
    email: email,
    name: name
  });
});

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server started!');
});
