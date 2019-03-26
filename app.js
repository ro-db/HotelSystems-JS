const express = require('express');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

var engines = require('consolidate');

// Initiate app
const app = express();
var PORT = process.env.PORT || 3000;

// Create client
const client = new Client({
  // user: process.env.USER,
  // host: process.env.HOST,
  // database: process.env.DATABASE,
  // password: process.env.PASSWORD,
  // port: process.env.DBPORT
  user: '',
  host: '',
  database: '',
  schema: '',
  password: '',
  port: 
});

// Connecting to client (db)
function connectClient() {
  client.connect(err => {
    if (err) {
      console.error('client connection error', err.stack);
    } else {
      console.log('Database connection SUCCESSFUL');
    }
  });
}

// get employees
app.get('/employees', function(req, res, next) {
  connectClient();
  client
    .query('SET search_path = "HotelSystem"; SELECT * FROM employee;')
    .then(
      // result => console.log(result[1].rows),
      result => res.status(200).send(result[1].rows)
    )
    .catch(e => console.error(e.stack))
    .then(() => client.end());
  console.log('Closed client connection');
});

// Set app engine
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Home route
app.get('/', function(req, res) {
  res.render('index');
});

// Start server
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
