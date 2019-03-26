const express = require('express');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();
const pg = require('pg');

var engines = require('consolidate');

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

client.connect(err => {
  if (err) {
    console.error('client connection error', err.stack);
  } else {
    console.log('Database connection SUCCESSFUL');
  }
});

// Connects to client
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
    .then(() => client.end())
    .then(() => console.log('Closed client connection'));
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
