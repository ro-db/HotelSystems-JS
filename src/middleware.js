// Connect to db
const connectionSTR = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
};

const initOptions = {
  schema: 'HotelSystem'
};
const pgp = require('pg-promise')(initOptions);
const db = pgp(connectionSTR);

function getCities() {
  var cities = [];
  db.many(t => {
    return 'SELECT city FROM hotel;';
  })
    .then(function(data) {
      console.log('Reached');
      for (var i = 0; i < data.length; i++) {
        getCities.push(data[i]);
      }
    })
    .then(console.log('Retrieved cities of hotels'))
    .catch(e => console.error(e.stack));

  return cities;
}

getCities();
module.exports = getCities();
