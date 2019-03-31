const { Client } = require('pg');
var faker = require('faker');

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

    // hc = new HotelChain(
    //   hotelChainID,
    //   numberOfHotels,
    //   address,
    //   email,
    //   phoneNumber
    // );
    // hotelChains.push(hc);

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
    numberOfStars = Math.floor(Math.random() * 3) + 3;
  }

  db.none(
    'INSERT INTO hotel(hotel_id, hotel_chain_id, number_of_rooms, phone_number, address, email, stars) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    [
      hotelID,
      hotelChainID,
      numberOfRooms,
      phoneNumber,
      address,
      email,
      numberOfStars
    ]
  )
    .then(() => {
      console.log('SUCCESSS');
    })
    .catch(error => {
      console.log(error, 'ERROR!!');
    });

  // var hotel = new Hotel(
  //   hotelID,
  //   hotelChainID,
  //   numberOfRooms,
  //   phoneNumber,
  //   address,
  //   email,
  //   numberOfStars
  // );
  // hotels.push(hotel);
}
createHotels();
(module.exports = createHotels()), createHotelChains();
