const express = require('express');
const path = require('path');
require('dotenv').config();
const pg = require('pg');
var faker = require('faker');

const pgp = require('pg-promise')();

var engines = require('consolidate');

// Initiate app
const app = express();
var PORT = process.env.PORT || 3000;

// Create db
const connectionSTR = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
};
const db = pgp(connectionSTR);

// Fill DB
app.get('/fillDB', function(req, res, next) {
  var hotelChainID, numberOfHotels, address, email, phoneNumber;
  for (var i = 1; i < 6; i++) {
    hotelChainID = i;
    numberOfHotels = Math.floor(Math.random() * 20) + 5;
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    phoneNumber = faker.phone.phoneNumberFormat().toString();

    list = [hotelChainID, numberOfHotels, address, email, phoneNumber];
    var queryText = `SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES (${hotelChainID}, ${numberOfHotels}, ${address}, ${email}, ${phoneNumber});`;

    // db.none('SET search_path = "HotelSystem"')
    //   .then(
    //     'SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $4, $5);',
    //     [hotelChainID, numberOfHotels, address, email, phoneNumber]
    //   )
    //   .then(t => {
    //     console.log('SUCCESSS ');
    //   })
    //   .catch(error => {
    //     console.log(error, 'ERROR!!!!!!!!!');
    //     done();
    //   });

    db.task(t => {
      return t.one('SET search_path = "HotelSystem"').then(f => {
        t.any(
          'SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $4, $5);',
          [hotelChainID, numberOfHotels, address, email, phoneNumber]
        );
      });
    })
      .then(console.log('SUCCESSS '))
      .catch(error => {
        console.log(error, 'ERROR!!!!!!!!!');
      });

    console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
    console.log(`created hotel chain ${i}`);
  }
});

// get employees
app.get('/employees', function(req, res, next) {
  client
    .query('  SELECT * FROM employee;')
    .then(
      // result => console.log(result[1].rows),
      result => res.status(200).send(result[1].rows)
    )
    .catch(e => console.error(e.stack))
    .then(() => client.end())
    .then(() => console.log('Closed client connection'));
});

// get hotels
app.get('/hotels', function(req, res, next) {
  client
    .query('SET search_path = "HotelSystem"; SELECT * FROM employee;')
    .then(
      // result => console.log(result[1].rows),
      result => res.status(200).send(result[1].rows)
    )
    .catch(e => console.error(e.stack))
    .then(() => client.end())
    .then(() => console.log('Closed client connection'));
});

// Set app engine
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', function(req, res) {
  res.render('index');
});

// Rent route
app.get('/rent', function(req, res) {
  res.render('rent');
});

// Start server
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
