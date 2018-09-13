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
  target_db = process.env.ENV_DATABASE
};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(target_db,
{
  host: 'localhost',
  dialect: 'sqlite3'
})

const User = require(path.join(__dirname, 'server/models/user'))(sequelize, Sequelize)

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
  //var userObject;
  //  User.sync({force: false}).then(() => {
    /*
    Table created if doesn't already exist.
    Maybe we just need User.create below as our tables do exist.
    force: true above will delete the table and create a new one.
    */
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(function (result) {
      req.session.name = result.dataValues.name;
      req.session.email = result.dataValues.email;
      res.redirect("/properties");
    });


//  });
  // read form data and parse it to database
  // put user id into cookiesession
  // provide the user object to the view
  // make sure view renders with correct user information

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
    email: email, // userObject.email
    name: name //userObject.name
  });
});

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server started!');
});
