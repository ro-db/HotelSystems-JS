const express = require('express');
const path = require('path');
const { Client, Pool } = require('pg');
require('dotenv').config();
const pg = require('pg');
var faker = require('faker');

var engines = require('consolidate');

// Import classes

// Initiate app
const app = express();
var PORT = process.env.PORT || 3000;

// Create client
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

// Connects to client
// function connectClient() {
//   client.connect(err => {
//     if (err) {
//       console.error('client connection error', err.stack);
//     } else {
//       console.log('Database connection SUCCESSFUL');
//     }
//   });
// }

client.connect(err => {
  if (err) {
    console.error('client connection error', err.stack);
  } else {
    console.log('Client database connection SUCCESSFUL');
  }
});

pool.connect(err => {
  if (err) {
    console.error('pool connection error', err.stack);
  } else {
    console.log('Pool database connection SUCCESSFUL');
  }
});

// Fill DB
// const createHotelChains = require('./src/faker');
// const hc = new createHotelChains({
// });
// console.log('reached.');
// console.log(hc);

// get employees
app.get('/employees', function(req, res, next) {
  connectClient();
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
  connectClient();
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

  // BEGIN filling DB
  //connectClient();
  var hotelChainID, numberOfHotels, address, email, phoneNumber;

  // for (var i = 1; i < 6; i++) {
  //   hotelChainID = i;
  //   numberOfHotels = Math.floor(Math.random() * 20) + 5;
  //   address = faker.address.streetAddress();
  //   email = faker.internet.exampleEmail();
  //   phoneNumber = faker.phone.phoneNumberFormat().toString();

  //   pool.query(
  //     `SET search_path = "HotelSystem";
  //     INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number)
  //     VALUES ( ${hotelChainID}, ${numberOfHotels}, ${address}, ${email}, ${phoneNumber});`,
  //     function(err, result) {
  //       if (err) {
  //         console.log('Error inserting query');
  //         console.error(err.stack);
  //       }
  //     }
  //   );

  pool.query(
    'SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES (1,3, "asdfj", "asdf", "5678");'
  );

  // console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
  // console.log(`created hotel chain ${i}`);
  // }
  // END filling DB
});

// Rent route
app.get('/rent', function(req, res) {
  res.render('rent');
});

// Start server
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
