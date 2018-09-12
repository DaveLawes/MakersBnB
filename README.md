# MakersBnB

A web application that allows users to list spaces they have available, and to hire spaces for the night.  
Code with :  
- [Andrew Wood](https://github.com/andrewwood2)  
- [Becky Sedgwick](https://github.com/rebeccasedgwick)  
- [Dave Lawes](https://github.com/DaveLawes/)  
- [Esam Al-Dabagh](https://github.com/EsamAl-Dabagh)  
- [Mathilde Ferrand](https://github.com/ChocolatineMathou)  
- [Rashika Patel](https://github.com/cbp10)

## MVP

Users can list spaces on the web application that are visible to all.

## Technologies
This project was built with Javascript and the testing framework [Jasmine](https://jasmine.github.io/) paired with [Zombie](http://zombie.js.org/) to test the user experience of this web-based application.  
We also decided to use the MVC [Express](https://expressjs.com/) as it seemed easy to set up for a first experience.

## How to install

Make sure you already have Node.js on your machine or download it from [here](https://nodejs.org/en/).
You can now move to the following steps:
```
$ git clone git@github.com:DaveLawes/MakersBnB.git  
cd MakersBNB  
npm install
node app.js
```
Then in your favorite browser type `localhost:3000/` to access the homepage.

## User Stories

```
-- BASIC --

As a property owner
So I can list a property
I'd like to create an account

As a property owner
So I can list a property
I'd like to add my property and some basic property details

As a user
So I can see listed properties
I'd like the web app to show all listings

As a user
So I can add another property
I want to be able to log in

As a system admin
So that I do not have unassociated properties
Only logged in users can add a property listing

```


### Headline specifications

- Any signed-up user can list a new space.
- Users can list multiple spaces.
- Users should be able to name their space, provide a short description of the space, and a price per night.
- Users should be able to offer a range of dates where their space is available.
- Any signed-up user can request to hire any space for one night, and this should be approved by the user that owns that space.
- Nights for which a space has already been booked should not be available for users to book that space.
- Until a user has confirmed a booking request, that space can still be booked for that night.

### Nice-to-haves

- Users should receive an email whenever one of the following happens:
 - They sign up
 - They create a space
 - They update a space
 - A user requests to book their space
 - They confirm a request
 - They request to book a space
 - Their request to book a space is confirmed
 - Their request to book a space is denied
- Users should receive a text message to a provided number whenever one of the following happens:
 - A user requests to book their space
 - Their request to book a space is confirmed
 - Their request to book a space is denied
- A ‘chat’ functionality once a space has been booked, allowing users whose space-booking request has been confirmed to chat with the user that owns that space
- Basic payment implementation though Stripe.
