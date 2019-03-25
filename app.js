const express = require('express');
const path = require('path');
const { Client, Pool } = require('pg');
require('dotenv').config();

var engines = require('consolidate');

// Initiate app
const app = express();
var PORT = process.env.PORT || 3000;

// Create connection
const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  connectionString: connectionString
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
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
