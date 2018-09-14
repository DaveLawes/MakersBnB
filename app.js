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
const sequelize = require(path.join(__dirname, 'server/models/dbconnection'))(Sequelize)
// const sequelize = require(path.join(__dirname, 'server/models/dbconnection'))

const User = require(path.join(__dirname, 'server/models/user'))(sequelize, Sequelize)
const Property = require(path.join(__dirname, 'server/models/property'))(sequelize, Sequelize)

// Set up tables if needed - however if tables don't exist the rest of the program will carry on some tests will fail as they will have been run before the sync result is returned. You can see that the sync has actually worked, because when you run the tests again they don't fail... so the ables that were missing have been set up.
// NOTE: Probably only want to call these 2 lines in test mode though, as unnecessary for prod mode....need to move to test route only
// NOTE: Recreate this: delete tables from the test database, then run npm test, then see some tests fail and the rest pass. Before the passing tests, the console.log statements should appear. Usually tables are built after the first test has run.
Property.sync().then((responses) => {
  console.log('**** properties table set up ****');
})
User.sync().then((responses) => {
  console.log('**** users table set up ****');
})

// Promise.all([User.sync(), Property.sync()]).then(responses => {
//   console.log("Tables set up:")
//   console.log(responses)
// })


//BELOW CODE WILL ADD TO DATABASE
// Property.sync({force: false}).then(() => {
  /*
  Table created if doesn't already exist.
  Maybe we just need User.create below as our tables do exist.
  force: true above will delete the table and create a new one.
  */

//   return User.create({
//     name: 'John',
//     email: 'john@john.com',
//     password: 'pwd126789101'
//   });
// });
//   return Property.create({
//     title: 'Shack by the sea',
//     description: 'Super crappy',
//     pricePerNight: 20,
//     photo: ''
//   });
// });

// Code below creates a user too, but only returns a promise.

// user1 = User.create({
//   name: 'Dave',
//   email: 'dave@email.com',
//   password: '1234567891011'
// });

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

  Property.findAll().then(function (result) {
    res.render("pages/properties", {
      properties: result
    });
  });
});

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});


// NOTE: npm_lifecycle_event is an environment variable set by npm when it's run. When you run 'npm test' the npm_lifecycle_event is set to 'test'.
// The below bit is to make sure that when non-test mode is runnning, the app loads on localhost at port 3000 (can set to a diff port for tests, so that dev/prod and test mode can be run at the same time.)
var server;
if (process.env.npm_lifecycle_event !== 'test') {
  server = app.listen(3000, function () {
    console.log('Server started!');
  });
}
// module.exports = server
module.exports = app
