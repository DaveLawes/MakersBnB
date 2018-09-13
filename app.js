const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require('path');
const app = express();
require('dotenv').config();

if (process.env.npm_lifecycle_event === 'test') {
  target_db = process.env.ENV_TEST_DATABASE
  console.log("using test db")
} else {
  target_db = process.env.ENV_DATABASE
  console.log("using dev db")
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

  res.render("pages/index", {msg:false});
});

app.post("/register", function (req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    .then(function (result) {
      req.session.name = result.dataValues.name;
      req.session.email = result.dataValues.email;
      res.redirect("/properties");
    })
    .catch(Sequelize.ValidationError, function (err) {
      res.render("pages/index", { msg:true});
    });
});

app.get("/login", function (req, res) {
  res.render("pages/login", {msg:false});
});

app.post("/login", function (req, res) {
  User.findAll({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then(function (result) {
    console.log(result[0].dataValues);
    req.session.name = result[0].dataValues.name;
    req.session.email = result[0].dataValues.email;
    res.redirect("/properties");
  })
  .catch(function (err) {
    res.render("pages/login", {msg:true});
  });
});

app.get("/properties", function (req, res) {
  res.render("pages/properties", {
    email: req.session.name, // userObject.email
    name: req.session.email//userObject.name
  });
});

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server started!');
});
