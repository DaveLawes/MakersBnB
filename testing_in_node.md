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
The test script tells npm to do three things.

`istanbul cover` : [Istanbul]( https://istanbul.js.org/) is a tool which tells us how much of our code is covered by the tests we've written. This part tells npm to run istanbul, and tell us how our coverage is looking.

 
`./node_modules/.bin/jasmine`: this is where we're specifiying the package we'd like to use to run our tests. In this case, it's the JS testing framework [Jasmine](https://jasmine.github.io/). 

`./spec/featureSpec.js`: this where we're telling our testing framework where it read our tests from.

***
How is our test file executed?
---
This what's on our first line:  
`const Browser = require('zombie');`  
This sets the variable `Browser` to the [Zombie](http://zombie.js.org/) package. Later, we create a new instance of browser (`const browser = new Browser()`) which we use throughout the tests which have been written in the Zombie syntax.

***An important note on what Zombie is:***  
_Zombie is a 'headless testing framework'. What this means is that it doesn't require a GUI (graphical user interface) - such as a browser like Chrome or Firefox - to run its tests. Whereas when you run tests using Jasmine, you access the results from a browser window._

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