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
      browser.assert.text('h3', 'All Properties');
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

describe('View all properties', function() {
  beforeEach(function() {
    return browser.visit('/properties');
  });

  it('expect to show all properties', function() {
    browser.assert.text('h3', 'All Properties');
  });
});
