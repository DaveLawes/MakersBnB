/*
 GENERAL NOTE: IN THE TEST SCRIPT (/MakersBnB/package.json LINE 8) JASMINE IS BEING USED TO RUN THIS FILE. THEN IT REQUIRES ZOMBIE, WHICH ACTUALLY EXECUTES THE TESTS. HOWEVER IF TESTS FAIL, IT REFERNECES JASMINE, THIS IS A RED HERRING AS THEY ARE STILL THE ZOMBIE TESTS THAT ARE FAILING - ZOMBIE IS JUST RUNNING ON JASMINE, AS WE'VE ORIGINALLY ASKED JASMINE TO DO THE TESTING.
*/
const Browser = require('zombie');

Browser.localhost('example.com', 4000);

var app = require('../app');

var server;
var startServer = () => { server = app.listen(4000) };
var stopServer = () => { server.close() };

// THESE ARE NEEDED TO CALL TRUNCATE ON THE PROPERTY AND USER TABLES (RESETS THE TEST DATABASE'S TABLES TO EMPTY)
const path = require('path');
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require(path.join(__dirname, '../server/models/dbconnection'))(Sequelize)
const User = require(path.join(__dirname, '../server/models/user'))(sequelize, Sequelize);
const Property = require(path.join(__dirname, '../server/models/property'))(sequelize, Sequelize);

const browser = new Browser();

describe('Global server set up', function(){
  beforeEach(function() {
    User.truncate()
    Property.truncate()
    console.log(".....test tables emptied")
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

      describe('Logged in tests', function() {
        it('should be successful', function() {
          browser.assert.success();
        });

        it('should see properties page', function() {
          browser.assert.text('.sub-title-prop', 'All Properties');
        });
        describe('Nav bar when logged in', function() {
          it('will show spaces, request and sign out', function() {
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

        describe('Go back to register', function() {
          beforeEach(function() {
            return browser.visit('/');
          })
          describe('Enter duplicate email info', function() {
            beforeEach(function () {
              browser.fill('email',    'mathilde@email.com');
              browser.fill('name',     'dave');
              browser.fill('password', '12345');
              return browser.pressButton('Submit');
            })
            it('Produces an error', function () {
              browser.assert.text('#emailerror','Email already taken')
            });
          })
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
      })
    });
  });
});
