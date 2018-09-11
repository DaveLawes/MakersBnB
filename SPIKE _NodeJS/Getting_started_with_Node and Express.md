## Download Node installation package
https://nodejs.org/en/ 

## NPM - Node Package Manager
Node comes with a package manager. It puts modules in place so that node can find them. 

* For each new project set up your folder using `npm init` in the command line. 
  This creates a `package.json` file <-- This will be used to track the dependencies of the app (similar to Gemfile)
  It will guide you through the steps. 

  The most critical part in this set-up is the entry point - make sure you give it the name of your js file (app.js for example).

#### Installing packages

In the command line, use `npm install <package_name> --save` to install. The `--save` adds it to your package.json. 


# ExpressJS

### Install
`npm install express --save`

### Setting up
In your index.js or app.js file: 

```
var express = require('express');
var app = express();

app.get("/", function (req, res) {
  res.send("Hello, World!");
});

app.listen(3000, function () {
  console.log('Server started!');
});
```

To run your app use `node filename.js`

Go to `http://localhost:3000/` to view the page. 

When you're done use `ctrl+C`

### Routes

Routes take the following structure: 
`app.method(path, handler)`

* app is an instance of express.
* method is a HTTP request method.
* path is a path on the server.
* handler is the function that is executed when the route is found. 

```
app.post("/", function (req, res) {
  res.send("This is a POST request");
});
```

#### Chaining Routes
`route()` allows you to chain route handlers for a single path:

```
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### Route Parameters 

You can access the params passed into the URL by using `req.params`

`req.params` will return an object with key:value pairs. 

```
app.get("/users/:name/:property", function (req, res) {
  res.send(req.params);
});
```

In this example the whole params object is sent to the page. To access just the name params use `req.params.name`

### Express and POST requests

In order to read data from post requests you need to install Body Parser. 

```
npm install body-parser --save
```

Then in your controller file:

```
//require the module
var bodyParser = require('body-parser');

//configure the module
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

Then in your route, you can access data from a form using:

```
var name = req.body.name;
var property = req.body.property;
```


# EJS (Embedded JavaScript)
* EJS is to Express what ERB is to Sinatra. 

### Install
`npm install ejs --save"

Place your `.ejs` files in a 'views' folder. 

Then in your controller file (`index.js` or `app.js`) you need to set your 'view engine' to look for ejs files: 

```
app.set('view engine', 'ejs');
```

Now in your routes you can use `res.render(filename);` to direct your route to your ejs file. You don't need to include the file extension. 

```
app.get("/", function (req, res) {
  res.render("homepage");
});
```
This will look in your views folder for a file called `homepage.ejs`

### Sending data to EJS file

To get data from your route into your ejs file, you can pass an object into the `render` function, like so:

```
app.get("/users", function(req, res) {
  var name_input = "Dumbledore";
  var property_input = "Hogwarts";

  res.render("users", {
    name: name_input,
    property: property_input
  });
});
```

Then in the users view:

* Use `<%=` `%>` tags to wrap your JS data.  

```
<h1> <%= name %> </h1>
<h3> <%= property %> </h3>
```

# Sessions
(under construction)

`npm install cookie-parser --save"
`npm install cookie-session --save"

Require in your controller file:

```
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
```

Configuration:

```
app.use(cookieParser());
app.use(cookieSession({
  secret: "makers-makers-makers"
}));
```

### Saving data to a session:

```
req.session.name = req.body.name;
req.session.property = req.body.property;
```

You can then access this data in other routes by using `req.session.name` or `req.session.property` and passing it into your ejs file in the way explained above.


# Resources
Our test repo: https://github.com/EsamAl-Dabagh/node_test 

Node: https://nodejs.org/en/

NPM: https://www.npmjs.com/

Express: https://expressjs.com/en/starter/installing.html 

EJS: https://scotch.io/tutorials/use-ejs-to-template-your-node-application


# Testing

Zombie: http://zombie.js.org/ 