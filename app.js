
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

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
