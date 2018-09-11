const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000

Browser.localhost('example.com', 3000);
const app = require('../app')

const browser = new Browser();

describe('User visits homage page', function() {
  beforeEach(function() {
    return browser.visit('/');
  });

  describe('submits form', function() {
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
      browser.assert.text('h1', 'Welcome to MakersBNB');
    });
  });

  it('Clicks log-in and logs in', function() {
    return browser.pressButton('Log in')
    browser.assert.success();
    browser.fill('email', 'mathilde@email.com')
    browser.fill('password', '1234')
    browser.pressButton('Submit')
    browser.assert.text('h1', 'Welcome to MakersBNB')
    browser.assert.text('h3', 'mathilde')
  })


});
