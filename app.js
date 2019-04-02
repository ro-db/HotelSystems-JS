const express = require('express');
const path = require('path');
require('dotenv').config();

var engines = require('consolidate');

// Initiate app
const app = express();
var PORT = process.env.PORT || 3000;

// Create db
// const connectionSTR = {
//   user: process.env.user,
//   host: process.env.host,
//   database: process.env.database,
//   password: process.env.password,
//   port: process.env.port
// };

// const initOptions = {
//   schema: 'HotelSystem'
// };
// const pgp = require('pg-promise')(initOptions);
// const db = pgp(connectionSTR);

// get employees
app.get('/employees', function(req, res, next) {
  db.many(t => {
    return 'SELECT * FROM employee';
  })
    .then(function(data) {
      console.log(data);
    })
    .then(console.log('Retrieved hotels'))
    .catch(e => console.error(e.stack));
});

// get hotels
app.get('/hotels', function(req, res, next) {
  db.many(t => {
    return 'SELECT * FROM hotel';
  })
    .then(function(data) {
      console.log(data);
    })
    .then(console.log('Retrieved hotels'))
    .catch(e => console.error(e.stack));
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

// Completed Booking route
app.get('/bookingComplete', function(req, res) {
  res.render('bookingComplete');
});

// Start server
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});

// un-comment and run to generate DB:
// var createHotelChains = require('./src/faker');
// console.log(createHotelChains);
