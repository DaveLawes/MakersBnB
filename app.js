const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require('path');
const app = express();

require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = require(path.join(__dirname, 'server/models/dbconnection'))(Sequelize)

const User = require(path.join(__dirname, 'server/models/user'))(sequelize, Sequelize);
const Property = require(path.join(__dirname, 'server/models/property'))(sequelize, Sequelize);

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

  res.render("pages/index", {
    msg: false,
    name: name
  });
});

app.post("/register", function (req, res) {
    User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }).then(function (result) {
      req.session.name = result.dataValues.name;
      req.session.email = result.dataValues.email;
      req.session.user_id = result.dataValues.id;
      res.redirect("/properties");
    })
    .catch(Sequelize.ValidationError, function (err) {
      res.render("pages/index", {
        msg: true,
        name: false
      });
    });
});

app.get("/login", function (req, res) {
  var name = req.session.name;

  res.render("pages/login", {
    msg: false,
    name: name
  });
});

app.post("/login", function (req, res) {
  var name = req.session.name;

  User.findAll({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function (result) {
    req.session.name = result[0].dataValues.name;
    req.session.email = result[0].dataValues.email;
    req.session.user_id = result[0].dataValues.id;
    res.redirect("/properties");
  })
  .catch(function (err) {
    res.render("pages/login", {
      msg: true,
      name: name
    });
  });
});

app.get("/properties", function (req, res) {
  var name = req.session.name;

  Property.findAll().then(function (result) {
    res.render("pages/properties", {
      properties: result,
      name: name
    });
  });
});

app.get("/add_property", function (req, res) {
  if (req.session.name === undefined) {
    res.redirect("/login")
  }
  res.render("pages/add_property", {
    name: req.session.name
  });
})

app.post("/add_property", function (req, res) {
  Property.create({
    title: req.body.title,
    description: req.body.description,
    pricePerNight: req.body.pricepernight,
    userId: req.session.user_id,
    photo: req.body.picurl
  }).then( function (result) {
    res.redirect("properties");
  })
  .catch(Sequelize.ValidationError, function (err) {
    res.render("pages/add_property", {
      msg: true,
      name: name
    });
  });
})

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

var server;
if (process.env.npm_lifecycle_event !== 'test') {
  server = app.listen(3000, function () {
    console.log('Server started!');
  });
}

module.exports = app
