const Browser = require('zombie');
const Helper = require('./helpers/web_helpers')

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000

Browser.localhost('example.com', 3000);
const app = require('../app')

const browser = new Browser();

describe('User visits homepage', function() {
  beforeEach(function() {
    return browser.visit('/');
  });

  describe('Register', function() {
    beforeEach(function() {
      browser.fill('email',    'mathilde@email.com');
      browser.fill('name',    'mathilde');
      browser.fill('password', '1234');
      return browser.pressButton('Submit');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('h3', 'All Properties')
    });

    it('displays error message if email is already is database', function() {
      return browser.visit('/');
      browser.fill('email',    'mathilde@email.com');
      browser.fill('name',    'mathilde');
      browser.fill('password', '1234');
      return browser.pressButton('Submit');
      browser.asset.text('Email already taken');
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
      it('Should show the users name on the page', function() {
        // AWAITING USER OBJECTS AND DATABASE

        browser.assert.text('h3', 'mathilde')
        browser.assert.text('h3', 'mathilde@email.com')
      });

      describe('Go to property page', function() {
        beforeEach(function() {
          return browser.visit('/properties');
        });

        describe('User clicks list a space', function() {
          beforeEach(function() {
            return browser.pressButton('List a space');
          });
          it('User can list a new space', function() {
            browser.assert.text('h1', 'Welcome to MakersBNB');
            browser.assert.text('h2', 'title');
          })
        })
      });

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
      browser.asset.link('spacesNav a', 'Spaces', '/properties')
      browser.asset.link('requestsNav a', 'Request', '/requests')
      browser.asset.link('signOutNav a', 'Sign out', '/logout')
    });
  });

  describe('When user is not logged in', function() {
    it('will show spaces and log in', function() {
      browser.asset.link('spacesNav a', 'Spaces', '/properties')
      browser.asset.link('loginNav a', 'Sign in', '/login')
    });
  })
});

describe('View all properties', function() {
  beforeEach(function() {
    return browser.visit('/properties');
  });

  it('expect to show all properties', function() {
    browser.assert.text('h3', 'All Properties');
  });
});
