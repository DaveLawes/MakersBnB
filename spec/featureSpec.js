/*
 GENERAL NOTE: IN THE TEST SCRIPT (/MakersBnB/package.json LINE 8) JASMINE IS BEING USED TO RUN THIS FILE. THEN IT REQUIRES ZOMBIE, WHICH ACTUALLY EXECUTES THE TESTS. HOWEVER IF TESTS FAIL, IT REFERNECES JASMINE, THIS IS A RED HERRING AS THEY ARE STILL THE ZOMBIE TESTS THAT ARE FAILING - ZOMBIE IS JUST RUNNING ON JASMINE, AS WE'VE ORIGINALLY ASKED JASMINE TO DO THE TESTING.
*/
const Browser = require('zombie');

Browser.localhost('example.com', 4000);

var app = require('../app');

var server;
var startServer = () => { server = app.listen(4000) };
var stopServer = () => { server.close() };

const browser = new Browser();

describe('Global server set up', function(){
  beforeEach(function() {
    startServer()
  });

  afterEach(function(){
    stopServer();
  });

  describe('User visits homepage', function() {
    beforeEach(function() {
      return browser.visit('/');
    });

    //USER LOGGED IN TESTS
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

      it('should see properties page', function() {
        browser.assert.text('.sub-title-prop', 'All Properties');
      });
      describe('Nav bar when logged in', function() {
        it('will show spaces and sign out', function() {
          browser.assert.link('#spacesNav', 'Spaces', '/properties');
          browser.assert.link('#signOutNav', 'Sign out', '/logout');
        });
        it("display user's name", function() {
          browser.assert.text('#welcomeMessage', 'Welcome, mathilde');
        });
      })

      it("will show a button to list a new space", function() {
        browser.assert.attribute('#newSpace', 'href', '/add_property');
      });

      it('displays error message if email is already is database', function() {
        return browser.visit('/');
        browser.fill('email',    'mathilde@email.com');
        browser.fill('name',     'mathilde');
        browser.fill('password', '1234');
        return browser.pressButton('Submit');
        browser.asset.text('Email already taken');
      });

      describe('Add property when logged in', function() {
        beforeEach(function() {
          return browser.visit('/add_property')
        })
        describe('Fill in property details', function () {
          beforeEach(function() {
            browser.fill('title', 'Domaine de la Pinelais');
            browser.fill('description', 'Lovely castle on French seaside');
            browser.fill('pricepernight', '3000');
            browser.fill('picurl', 'https://cdn5.1001salles.com/images/12427/g/1448573683_3119_679818177.jpg');
            return browser.pressButton('Submit');
          });
          it('new property has been added to all properties list', function() {
            browser.assert.text('.cardTitle', 'Domaine de la Pinelais');
            browser.assert.text('.cardDesc', 'Lovely castle on French seaside');
            browser.assert.text('.price', '£3000 per night');
          });
        })
      })

      // USER LOGGED OUT TESTS
      describe('Clicks sign out button', function() {
        beforeEach(function() {
          return browser.clickLink('Sign out');
        });

        it('is back on the register page', function() {
          browser.assert.element('form input[name=name]');
        });

        describe('Add property redirects to login if not logged in', function() {
          beforeEach(function() {
            return browser.visit('/add_property')
          });

          it('Shows login page', function() {
            browser.assert.text('.sub-title', 'Login')
          })
        })

        describe('Nav bar when no logged in', function() {
          it('will show spaces and log in', function() {
            browser.assert.link('#spacesNav', 'Spaces', '/properties');
            browser.assert.link('#loginNav', 'Login', '/login');
          });
        });

        describe('View all properties when logged out', function() {
          beforeEach(function() {
            return browser.visit('/properties');
          });

          it('expect to have title of properties page', function() {
            browser.assert.text('.sub-title-prop', 'All Properties');
          });
        });

      });
    });

    // LOG IN PAGE TESTS
    describe('User can log in', function() {
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

        it('Shows option to sign out in NAV on properties page', function () {
            browser.assert.link('#signOutNav', 'Sign out', '/logout');
            browser.assert.text('.sub-title-prop', 'All Properties');
        });
      });
    });
  });

  /*
  THIS SUITE OF TESTS NEEDS FIXING!
  PLEASE NOTE ADDITION OF startServer AND stopServer
  */
  // describe('Nav bar', function() {
  //   beforeEach(function() {
  //     return browser.visit('/');
  //   });
  //
  //   describe('When user is logged in', function() {
  //     beforeEach(function() {
  //       browser.fill('email', 'mathilde1@email.com');
  //       browser.fill('name', 'mathilde1');
  //       browser.fill('password','12345');
  //       return browser.pressButton('Submit');
  //     });
  //     it('will show spaces, request and sign out', function() {
  //       browser.assert.link('#spacesNav', 'Spaces', '/properties');
  //       browser.assert.link('#requestsNav', 'Request', '/requests');
  //       browser.assert.link('#signOutNav', 'Sign out', '/logout');
  //     });
  //
  //     it("will show a button to list a new space", function() {
  //       browser.assert.attribute('#newSpace', 'href', '/add_property');
  //     });
  //   });
  //
  // });


  // describe('Nav bar', function() {
  //   beforeEach(function() {
  //     return browser.visit('/');
  //   });
  //
  //   describe('When user is not logged in', function() {
  //     beforeEach(function() {
  //       return browser.clickLink('Sign out');
  //     });
  //
  //     it('will show spaces and log in', function() {
  //       browser.assert.link('#spacesNav', 'Spaces', '/properties');
  //       browser.assert.link('#loginNav', 'Login', '/login');
  //     });
  //   });
  // });



  // describe('Add a property', function() {
  //   describe('Go to Login', function() {
  //     beforeEach(function() {
  //       return browser.visit('/login')
  //     })
  //     describe('Fill in details and submit', function() {
  //       beforeEach(function() {
  //         browser.fill('email', 'mathilde@email.com');
  //         browser.fill('password', '1234');
  //         console.log('filled in login, about to submit');
  //         return browser.pressButton('Submit');
  //       });
  //       describe('Go to add property', function() {
  //         beforeEach(function() {
  //           return browser.visit('/add_property')
  //         })
  //         describe('Fill in property details', function () {
  //           beforeEach(function() {
  //             browser.fill('title', 'Domaine de la Pinelais');
  //             browser.fill('description', 'Lovely castle on French seaside');
  //             browser.fill('pricepernight', '3000');
  //             browser.fill('picurl', 'https://cdn5.1001salles.com/images/12427/g/1448573683_3119_679818177.jpg');
  //             return browser.pressButton('Submit');
  //           });
  //           it('new property has been added to all properties list', function() {
  //             browser.assert.text('.cardTitle', 'Domaine de la Pinelais');
  //             browser.assert.text('.cardDesc', 'Lovely castle on French seaside');
  //             browser.assert.text('.price', '£3000 per night');
  //           });
  //         })
  //       })
  //     })
  //   })
  // });
});
