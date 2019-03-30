const { Client } = require('pg');
var faker = require('faker');

// Create client
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

//Database Client
client.connect(err => {
  if (err) {
    console.error('client connection error', err.stack);
  } else {
    console.log('Database connection SUCCESSFUL');
  }
});

var hotelChains = [],
  Hotels = [];

function createHotelChains() {
  var hotelChainID, numberOfHotels, address, email, phoneNumber;

  for (var i = 0; i < 5; i++) {
    hotelChainID = i;
    numberOfHotels = Math.floor(Math.random() * 20) + 5;
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    phoneNumber = faker.phone.phoneNumberFormat().toString();

    hc = new HotelChain(
      hotelChainID,
      numberOfHotels,
      address,
      email,
      phoneNumber
    );
    hotelChains.push(hc);

    var queryText = `SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES (${hotelChainID}, ${numberOfHotels}, ${address}, ${email}, ${phoneNumber});`;

    client.query(
      "SET search_path = 'HotelSystem'; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES (`${list}`) RETURNING NULL;",
      (list = [hotelChainID, numberOfHotels, address, email, phoneNumber]),
      function(err, result) {
        if (err) {
          console.log('Error inserting query');
          console.error(err.stack);
        }
      }
    );
    console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
    console.log(list);
    console.log(`created hotel chain ${i}`);
  }
}
exports.createHotelChains = function() {};

var hotelChainID, numberOfHotels, address, email, phoneNumber;
for (var i = 1; i < 6; i++) {
  hotelChainID = i;
  numberOfHotels = Math.floor(Math.random() * 20) + 5;
  address = faker.address.streetAddress();
  email = faker.internet.exampleEmail();
  phoneNumber = faker.phone.phoneNumberFormat().toString();

  list = [hotelChainID, numberOfHotels, address, email, phoneNumber];
  var queryText = `SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES (${hotelChainID}, ${numberOfHotels}, ${address}, ${email}, ${phoneNumber});`;

  db.none('SET search_path = "HotelSystem"')
    .then(t => {
      'SET search_path = "HotelSystem"; INSERT INTO hotel_chain (hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $4, $5);',
        [hotelChainID, numberOfHotels, address, email, phoneNumber];
    })
    .then(t => {
      console.log('SUCCESSS ');
    })
    .catch(error => {
      console.log('ERROR!!!!!!!!!', error);
    });

  console.log(queryText);
  console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
  console.log(`created hotel chain ${i}`);
}
