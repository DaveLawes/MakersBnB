const Browser = require('zombie');
// const Helper = require('./helpers/web_helpers')

Browser.localhost('example.com', 4000);
// BEFORE RUNNING TESTS, WE WANT TO MAKE SURE THE APP IS UP AND RUNNING ON LOCALHOST. PORT IS SPECIFIED SO THAT THE TESTS CAN RUN IN ONE PLACE AND NOT AFFECT THE 'REAL' PROGRAM RUNNING SIMULTANEOUSLY. 

var app = require('../app');
var server;

var startServer = () => { server = app.listen(4000) }
var stopServer = () => { server.close() }
// console.log(app)

// process.env.NODE_ENV = 'test'

const browser = new Browser();

describe('User visits homepage', function() {
  beforeEach(function() {
    startServer()
    return browser.visit('/');
  })

  afterEach(function(){
    stopServer()
  });

  describe('Register', function() {
    beforeEach(function() {
      browser.fill('email',   'mathilde@email.com');
      browser.fill('name',    'mathilde');
      browser.fill('password','1234');
      return browser.pressButton('Submit');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('.sub-title', 'All Properties');
    });

    describe('Clicks sign out button', function() {
      beforeEach(function() {
        return browser.clickLink('Sign out');
      });

      it('is back on the register page', function() {
        browser.assert.element('form input[name=name]');
      });
    });
  });

  describe('User clicks log in', function() {
    beforeEach(function() {
      return browser.clickLink('Login')
    })
    it('Has clicked Log in', function() {
      browser.assert.success();
    })

    describe('User enters details and clicks submit', function() {
      beforeEach(function() {
        browser.fill('email', 'mathilde@email.com')
        browser.fill('password', '1234')
        return browser.pressButton('Submit')
      })

/*
THE TEST BELOW IS NOW NOT THE FUNCTIONALITY OF THE SITE. AFTER 'SUBMIT' BUTTON PRESSED, REDIRECT IS TO THE PROPERTIES PAGE AND THIS DOES NOT SHOW THE LOGGED-IN USER. THEREFORE THIS TEST NEEDS TO BE UPDATED:
      it('Should show the users name on the page', function() {
        // AWAITING USER OBJECTS AND DATABASE
        browser.assert.text('h3', 'mathilde')
        browser.assert.text('h3', 'mathilde@email.com')
      });
*/

      // describe('Go to property page', function() {
      //   beforeEach(function() {
      //     return browser.visit('/properties');
      //   });

        // describe('User clicks list a space', function() {
        //   beforeEach(function() {
        //     return browser.pressButton('List a space');
        //   });
        //   it('User can list a new space', function() {
        //     browser.assert.text('h1', 'Welcome to MakersBNB');
        //     browser.assert.text('h2', 'title');
        //   })
        // })
      // });

    });
  });
});

describe('View all properties', function() {
  beforeEach(function() {
    startServer()
    return browser.visit('/properties');
  });

  afterEach(function(){
    stopServer()
  });

  it('expect to have title of properties page', function() {
    browser.assert.text('.sub-title', 'All Properties');
  });
});
