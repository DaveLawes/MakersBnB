const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require('path');
const app = express();
require('dotenv').config();

if (process.env.npm_lifecycle_event === 'test') {
  target_db = process.env.ENV_TEST_DATABASE
} else {
  console.log('production db route');
  target_db = process.env.ENV_DATABASE
};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(target_db,
{
  host: 'localhost',
  dialect: 'sqlite3'
})

const User = require(path.join(__dirname, 'server/models/user'))(sequelize, Sequelize)


//BELOW CODE WILL ADD TO DATABASE
User.sync({force: false}).then(() => {
  /*
  Table created if doesn't already exist.
  Maybe we just need User.create below as our tables do exist.
  force: true above will delete the table and create a new one.
  */
  return User.create({
    name: 'John',
    email: 'john@john.com',
    password: 'pwd126789101'
  });
});

// Code below works too

user1 = User.create({
  name: 'Dave',
  email: 'dave@email.com',
  password: '123456789101'
});

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
