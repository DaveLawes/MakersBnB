/*
 GENERAL NOTE: IN THE TEST SCRIPT (/MakersBnB/package.json LINE 8) JASMINE IS BEING USED TO RUN THIS FILE. THEN IT REQUIRES ZOMBIE, WHICH ACTUALLY EXECUTES THE TESTS. HOWEVER IF TESTS FAIL, IT REFERNECES JASMINE, THIS IS A RED HERRING AS THEY ARE STILL THE ZOMBIE TESTS THAT ARE FAILING - ZOMBIE IS JUST RUNNING ON JASMINE, AS WE'VE ORIGINALLY ASKED JASMINE TO DO THE TESTING.
*/

const Browser = require('zombie');

/*
BEFORE RUNNING TESTS, WE WANT TO MAKE SURE THE APP IS UP AND RUNNING ON LOCALHOST - OTHERWISE ZOMBIE CAN'T 'SEE' WHAT'S GOING ON.
THE PORT USED IS SET TO ONE THAT IS NOT THE SAME AS THE ONE THE MAIN APP RUNS ON, SO THAT THE TESTS AND APP CAN BE RUN SIMULTANEOUSLY.
*/

Browser.localhost('example.com', 4000);

var app = require('../app');

var server;
var startServer = () => { server = app.listen(4000) };
var stopServer = () => { server.close() };

// var User;
// var userTruncate = () => { User.truncate }

const browser = new Browser();
describe('Global server set up', function(){
  beforeEach(function() {
    startServer();
    // userTruncate()
      // if err then throw err else done()
    // })
    return browser.visit('/');
  });

  afterEach(function(){
    stopServer();
  });


  describe('User visits homepage', function() {
    beforeEach(function() {
      return browser.visit('/');
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
        browser.assert.text('.sub-title-prop', 'All Properties');
      });

      it('displays error message if email is already is database', function() {
        return browser.visit('/');
        browser.fill('email',    'mathilde@email.com');
        browser.fill('name',     'mathilde');
        browser.fill('password', '1234');
        return browser.pressButton('Submit');
        browser.asset.text('Email already taken');
      });
    });

    describe('Clicks sign out button', function() {
      beforeEach(function() {
        return browser.clickLink('Sign out');
      });

      it('is back on the register page', function() {
        browser.assert.element('form input[name=name]');
      });
    });

    describe('User clicks log in', function() {
      beforeEach(function() {
        return browser.clickLink('Login')
      });

      it('Has clicked Log in', function() {
        browser.assert.success();
      })

      describe('User enters details and clicks submit', function() {
        beforeEach(function() {
          browser.fill('email', 'mathilde@email.com')
          browser.fill('password', '1234')
          return browser.pressButton('Submit')
        })
      });
    });
  });

  describe('Nav bar', function() {
    beforeEach(function() {
      return browser.visit('/');
    });

    describe('When user is logged in', function() {
      beforeEach(function() {
        browser.fill('email', 'mathilde1@email.com');
        browser.fill('name', 'mathilde1');
        browser.fill('password','12345');
        return browser.pressButton('Submit');
      });
      it('will show spaces, request and sign out', function() {
        browser.assert.link('#spacesNav', 'Spaces', '/properties');
        browser.assert.link('#requestsNav', 'Request', '/requests');
        browser.assert.link('#signOutNav', 'Sign out', '/logout');
      });

      it("will show a button to list a new space", function() {
        browser.assert.attribute('#newSpace', 'href', '/add_property');
      });
    });

  });

  describe('Nav bar', function() {
    beforeEach(function() {
      return browser.visit('/');
    });

    it("display user's name", function() {
      browser.assert.text('#welcomeMessage', 'Welcome, mathilde1');
    });

  });

  describe('Nav bar', function() {
    beforeEach(function() {
      return browser.visit('/');
    });

      describe('When user is not logged in', function() {
        beforeEach(function() {
          return browser.clickLink('Sign out');
        });

        it('will show spaces and log in', function() {
          browser.assert.link('#spacesNav', 'Spaces', '/properties');
          browser.assert.link('#loginNav', 'Login', '/login');
        });
      });

    describe('View all properties', function() {
      beforeEach(function() {
        return browser.visit('/properties');
      });

    it('expect to have title of properties page', function() {
      browser.assert.text('.sub-title-prop', 'All Properties');
    });
  });

  describe('Add a property', function() {
    beforeEach(function() {
      return browser.visit('/add_property')
    });

    describe('user enters details about property', function() {
      beforeEach(function() {
        browser.fill('title', 'Domaine de la Pinelais');
        browser.fill('description', 'Lovely castle on French seaside');
        browser.fill('pricepernight', '3000');
        browser.fill('picurl', 'https://cdn5.1001salles.com/images/12427/g/1448573683_3119_679818177.jpg');
        return browser.pressButton('Submit');
      });

      it('allows a user to list a new property', function() {
        browser.assert.text('.cardTitle', 'Domaine de la Pinelais');
        browser.assert.text('.cardDesc', 'Lovely castle on French seaside');
        browser.assert.text('.price', '£3000 per night');
      });
    });

  });
});
});
