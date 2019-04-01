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

// Create hotel chains
function createHotelChains() {
  var hID = 0;
  for (var i = 1; i < 6; i++) {
    hotelChainID = i;
    numberOfHotels = Math.floor(Math.random()) + 5;
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    phoneNumber = faker.phone.phoneNumberFormat().toString();

    db.none(
      'INSERT INTO hotel_chain(hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $5);',
      [hotelChainID, numberOfHotels, address, email, phoneNumber]
    )
      .catch(error => {
        console.log(error, 'ERROR@CREATE-HOTEL-CHAIN!!');
        console.log(hotelChainID, numberOfHotels, address, email, phoneNumber);
      })
      .then(() => {
        console.log(`SUCCESSS: ADDED HOTEL CHAIN ${i}`);
      });

    // create hotels for the current hotel chain
    createHotels(hotelChainID, numberOfHotels, hID);
    hID += numberOfHotels;
  }
}

// Create hotels
function createHotels(chainID, numOfHotels, hID) {
  hotelID = hID;

  for (var i = 1; i < numOfHotels + 1; i++) {
    hotelChainID = chainID;
    numberOfRooms = Math.floor(Math.random() * 5) + 5;
    phoneNumber = faker.phone.phoneNumberFormat().toString();
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    numberOfStars = Math.floor(Math.random() * 3) + 3;
    hotelID++;

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
      .catch(error => {
        console.log(error, 'ERROR@CREATE-HOTEL!!');
      })
      .then(() => {
        console.log(`SUCCESSS: ADDED HOTEL ${hotelID}`);
        console.log(
          hotelID,
          hotelChainID,
          numberOfRooms,
          phoneNumber,
          address,
          email,
          numberOfStars
        );
      });

    // Add rooms to the current hotel
    createRooms(numberOfRooms, hotelID);
  }
}
function createRooms(numRooms, hID) {
  // n = number of Rooms
  hotelID = hID;
  for (var i = 1; i < numRooms + 1; i++) {
    roomNumber = i;
    price = Math.floor(Math.random() * 5) + 103;
    amenities = faker.commerce.product();
    capacity = Math.floor(Math.random() * 4) + 3;
    roomView = faker.lorem.words();
    extenable = faker.random.boolean();
    issues = faker.lorem.words();

    db.none(
      'INSERT INTO room(room_number,hotel_id,  price, amenities, capacity, room_view, extendable, issues) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);',
      [
        roomNumber,
        hotelID,
        price,
        amenities,
        capacity,
        roomView,
        extenable,
        issues
      ]
    )
      .catch(error => {
        console.log(error, 'ERROR@CREATE-ROOMS!!');
        console.log(
          roomNumber,
          hotelID,
          price,
          amenities,
          capacity,
          roomView,
          extenable,
          issues
        );
      })
      .then(() => {
        console.log(`SUCCESSS: ADDED ROOM ${i}`);
      });
  }
}

createHotelChains();

module.exports = createHotelChains();
