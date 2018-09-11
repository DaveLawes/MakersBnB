const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits homage page', function() {

  const browser = new Browser();

  beforeEach(function() {
    return browser.visit('/');
  });

  describe('submits form', function() {

    beforeEach(function() {
      browser
        .fill('email',    'mathilde@email.com')
        .fill('name',    'mathilde')
        .fill('password', '1234');
      return browser.pressButton('Signup');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Welcome on MakersBNB');
    });
  });

});
