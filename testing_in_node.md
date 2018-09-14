Testing in Node.js
===

How does it all work?
--

To make our test suite's tests execute, we enter `npm test` into the command line.

This tells `npm` (node package manager) to execute the script called 'test' found in our `package.json` file (this is in the root of our app). 

```
{...
  "scripts": {
    "test": "istanbul cover ./node_modules/.bin/jasmine ./spec/featureSpec.js"
  }
...
```
This test script tells npm to do three things.

`istanbul cover`: [Istanbul]( https://istanbul.js.org/) is a tool which tells us how much of our code is covered by the tests we've written. This part tells npm to run istanbul, and tell us how our coverage is looking.

 
`./node_modules/.bin/jasmine`: this is where we're specifiying the package we'd like to use to run our tests. In this case, it's the JS testing framework [Jasmine](https://jasmine.github.io/). 

`./spec/featureSpec.js`: this where we're telling our testing framework where it read our tests from.

How is our test file executed?
---
This what's on our first line:  
`const Browser = require('zombie');`  
This sets the variable `Browser` to the [Zombie](http://zombie.js.org/) package. Later, we create a new instance of browser (`const browser = new Browser()`) which we use throughout the tests which have been written in the Zombie syntax.


**An important note on what Zombie is:**  

* Zombie is a 'headless testing framework'. 
* What this means is that it doesn't require a GUI (graphical user interface) - such as a browser like Chrome or Firefox - to run its tests. 
* This differs from when you run tests using Jasmine, where you would access the results from a browser window.

  
Following on, we have this line:
`Browser.localhost('example.com', 4000);`
This is a bit of Zombie syntax, which says that whatever we'd like Zombie to test will be hosted on localhost, at port 4000. 


`var app = require('../app');`
This first line is setting a variable, `app`, to 'bring in' our `app.js` file. **It will run through the `app.js` file and execute whatever's in there (insomuch as JS does!)** More on this below, as what happens here is important.

Next, we come to this:   

``` 
var server;
var startServer = () => { server = app.listen(4000) };
var stopServer = () => { server.close() };
```  
This is where we actually get our app running _somewhere_ for Zombie to be able to see it. We set this to port 4000 on localhost, because this is where we've previously asked Zombie to look. 

If you take a quick detour and look in the app.js file itself, you will see this:

```
var server;
if (process.env.npm_lifecycle_event !== 'test') {
  server = app.listen(3000, function () {
    console.log('Server started!');
  });
}
```
This is really similar to what's in our test, other than we've asked it to ask our app to be loaded to **port 3000** on localhost.

**Note:**  

* `process.env.npm_lifecycle_event` is used here to check if the current running process is **not** 'test'.  
* Running process can be thought of as the context in which the app.js is being run.  
* The `env.npm_lifecycle_event` part is accessing the value of an environment variable called `npm_lifecycle_event`.  
* This environment variable is specific to npm, and when we run `npm test` this variable's value is set to `test`.  
* Therefore, when we reach the earlier line `var app = require('../app');` (in our featureSpec.js) we know that the block of code relating to port 3000 will be ignored, as `npm test` has a 'test' value in it's `npm_lifecycle_event` environment variable.

Next up: 
`const browser = new Browser();`  
This is pretty straightforward, we're just creating a new Browser instance that we can use throughout our tests to access Zombie's methods. 

Finally, just when we think we've got to our tests, we reach this:

```
describe('Global server set up', function(){
  beforeEach(function() {
    startServer()
  });

  afterEach(function(){
    stopServer();
  });
```
Here, we're asking for our app to be up and running (on localhost at port 4000) before each and every test is run. Ideally you'd be able to put the `beforeEach` / `afterEach` in each of the `describe` blocks (rather than wrapping _all_ tests in one big `describe` block), however Zombie doesn't seem to allow this. 