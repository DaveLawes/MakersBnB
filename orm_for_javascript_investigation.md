# ORMs for NodeJS

## Sequelize

- Install Node (npm) then initialize NodeJS in your application
  --> `npm init -y`
  --> this creates a package.json file which essentially controls the configuration of our app
      when started
- Install Express
  --> `npm install --save express body-parser morgan`
      the save flag ensures this package is added as a dependency to the package.json file!
- In the root create a file called app.js
  --> this is where we create our application
      we'll define our required packages here:
      - set up the Express app
      - parse incoming data requests
      - setup default routes
- Create a ./bin folder and a suggested `www` file:
  --> this is where we setup our server:
      - define app to use
      - define the port
      - tell the server to run
      - tell the server to listen on the specified port
- We can use a package so that we don't have to restart the server every time we change something in our code
  --> We can use nodemon
      - `npm install -D nodemon`
- In our package.json file we need to create a command to run the server
  --> this will allow us to call a command from the CLI to run the server
      In the scripts section add the command for starting the app in our environment:
      eg `"startLdev": "nodemon ./bin/www"`
  --> After this we can run the application from the command line:
      `npm run start:dev`
      Our application will run on localhost on the port specified in the file in the ./bin folder
- Sequelize setup:
  Install the command line package for Sequelize (installing globally adds the package to our package.json too)
  --> `npm install -g sequelize-cli`
  --> Configure sequelize for the project in a `./.sequelizerc` file:
      This is where we'll specify the paths to files required by Sequelize, specifically the config.json file
- The config.json file contains our application configuration settings: e.g. our URL to database

- Install the actual Sequelize package: `npm install --save sequelize pg pg-hstore`
  --> This configures Sequelize and PostgreSQL for our project, and adds the library to our package.json file
  (pg: responsible for creating the DB connection, pg-hstore is a module for reading/writing JSON format to Postgres format)
- initialize Sequelize for the project 'sequelize init'
- This autogenerates some project folders and files:
  --> index.js: specifies our modules we'll be using, and reads the configuration settings for our environment
      Sequelize looks inside our environment to extract any variables in order to connect to our DB
      --> Install dotenv for our project:
          `npm install dotenv`
          in index.js add: `const dotenvir = require('dotenv').config();` to require this module
          create a .env file in the root and add the environment variable to that
  --> update the config.json to point to our environment variable (URL) for our database connection
- From the command line we can create new tables (models):
  --> `sequelize model:create --name Todo --attributes title:string`
      This creates a model file and a migration file
  --> To effect any changes to our model we need to run `sequelize db:migrate`: persist models to DB by running migrations
  --> then if we run our app our DB will have updated (to view the DB just enter the DB URL and you'll probably be directed to TablePlus)


## Loopback

Overall framework for building REST APIs
https://apidocs.strongloop.com/loopback/

Pros:
- Appears to be good documentation
- Setup includes the framework for simple project (that we can then build from)
- Includes ESLint as a dependency
- Automatically creates REST routes for you (creates all the model routes)


Setup:
- PersistedModel: base class for the model
- Choose common model so it can potentially be used by both server and client LoopBack APIs
- Is it providing more features than we need (overlapping with Express?)


## TypeORM

https://github.com/typeorm/typeorm
Specific ORM for NodeJS
Supports ActiveRecord and Data Mapper patterns: good for writing high quality, loosely coupled applications
Supports ActiveRecord!

Pros:
- Has instructions about how to integrate with Express!!

Cons:
- Uses its own language: TypeScript
- Need to compile TypeScript code into JS before launching/testing


## Caminte

Pros:
- Access lots of different database formats (including PG)
- Has online model creator: generates code you can use to create a model
-

Cons:
- Provides an extension for TrinteJS JS MVC NodeJS framework
