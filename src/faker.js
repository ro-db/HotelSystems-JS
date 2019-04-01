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
    numberOfHotels = Math.floor(Math.random()) + 5;
    address = faker.address.streetAddress();
    email = faker.internet.exampleEmail();
    phoneNumber = faker.phone.phoneNumberFormat().toString();

    db.none(
      'INSERT INTO hotel_chain(hotel_chain_id, number_of_hotels, address,  email, phone_number) VALUES ($1, $2, $3, $4, $5);',
      [hotelChainID, numberOfHotels, address, email, phoneNumber]
    )
      .then(() => {
        console.log('SUCCESSS: ADDED HOTEL CHAIN');
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
    console.log(`created hotel chain ${i}`);
  }
}

function createHotels() {
  var pk = 0;
  for (var i = 1; i < 9; i++) {
    hotelID = i;
    for (var j = 1; j < 6; j++) {
      hotelChainID = j;
      numberOfRooms = Math.floor(Math.random() * 7) + 3;
      phoneNumber = faker.phone.phoneNumberFormat().toString();
      address = faker.address.streetAddress();
      email = faker.internet.exampleEmail();
      numberOfStars = Math.floor(Math.random() * 3) + 3;
      pk++;

      db.none(
        'INSERT INTO hotel(pk, hotel_id, hotel_chain_id, number_of_rooms, phone_number, address, email, stars) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);',
        [
          pk,
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
          console.log('SUCCESSS: ADDED HOTEL');
        })
        .catch(error => {
          console.log(error, 'ERROR!!');
        });

      // Add rooms to the current hotel
      createRooms(numberOfRooms, pk);
    }
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
}

function createRooms(n, hotelID) {
  // n = number of Rooms
  var roomNumber,
    price,
    amenities,
    capacity,
    roomView,
    extenable,
    issies,
    hotelID;

  for (var i = 1; i < n; i++) {
    roomNumber = i;
    price = Math.floor(Math.random() * 5) + 100;
    amenities = faker.lorem.words();
    capacity = Math.floor(Math.random() * 5) + 3;
    roomView = faker.lorem.words();
    extenable = faker.random.boolean();
    issies = faker.lorem.words();
    hotelID = hotelID;
  }

  db.none(
    'INSERT INTO room(room_number, price, amenities, capacity, room_view, extendable, issues, hotel_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);',
    [
      roomNumber,
      price,
      amenities,
      capacity,
      roomView,
      extenable,
      issies,
      hotelID
    ]
  )
    .then(() => {
      console.log('SUCCESSS: ADDED HOTEL');
    })
    .catch(error => {
      console.log(error, 'ERROR!!');
    });
}

createHotels();
createHotelChains();

module.exports = createHotels();
module.exports = createHotelChains();
