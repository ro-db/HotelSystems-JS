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
  hotels = [];

function createHotelChains() {
  for (var i = 1; i < 6; i++) {
    hotelChainID = i;
    numberOfHotels = Math.floor(Math.random() * 20) + 5;
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    phoneNumber = faker.phone.phoneNumberFormat().toString();

    db.none(
      'INSERT INTO hotel_chain(hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $5);',
      [hotelChainID, numberOfHotels, address, email, phoneNumber]
    )
      .then(() => {
        console.log('SUCCESSS');
      })
      .catch(error => {
        console.log(error, 'ERROR!!');
      });

    hc = new HotelChain(
      hotelChainID,
      numberOfHotels,
      address,
      email,
      phoneNumber
    );
    hotelChains.push(hc);

    console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
    console.log(`created hotel chain ${i}`);
  }
}

function createHotels() {
  for (var i = 1; i < 9; i++) {
    for (var j = 1; j < 6; j++) hotelID = j;
    hotelChainID = j;
    numberOfRooms = Math.floor(Math.random() * 5) + 3;
    phoneNumber = faker.phone.phoneNumberFormat().toString();
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    numberOfStars = Math.floor(Math.random() * 3) + 2;
  }
  hotel = new Hotel(
    hotelID,
    hotelChainID,
    numberOfRooms,
    phoneNumber,
    address,
    email,
    numberOfStars
  );
  hotels.push(hotel);
}

function createRooms() {}

exports.createHotelChains = function() {};
