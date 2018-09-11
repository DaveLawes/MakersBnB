Setup of initial MVP
=====

__Tech Stack:__ 

* Ruby
* Sinatra
* ActiveRecord
* Rspec, Capybara

To start, fork or clone this repo.  
Then, run:

```
$ bundle install
```
Execute the following commands to create the local database and add the tables:

```
$ sqlite3 db/makersbnb.sqlite3 < db/setup/users.sql
$ sqlite3 db/makersbnb.sqlite3 < db/setup/properties.sql
```
