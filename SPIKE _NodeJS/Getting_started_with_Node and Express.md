## Download Node installation package
https://nodejs.org/en/ 

## NPM - Node Package Manager
Node come with a package manager. It puts modules in place so that node can find them. 

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



### Resources
Our test repo: https://github.com/EsamAl-Dabagh/node_test 

Node: https://nodejs.org/en/
NPM: https://www.npmjs.com/
Express: https://expressjs.com/en/starter/installing.html 