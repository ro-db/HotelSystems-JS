const express = require('express');
const path = require('path');

var engines = require('consolidate');

// Initiate app
const app = express();

// Set app engine
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Home route
app.get('/', function(req, res) {
  res.render('index');
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
