SET search_path = "HotelSystem";

DROP TABLE IF EXISTS hotel_chain CASCADE;
DROP TABLE IF EXISTS hotel CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS booking CASCADE;
DROP TABLE IF EXISTS rental CASCADE;

CREATE TABLE hotel_chain ( hotel_chain_id INT PRIMARY KEY, 
						  number_of_hotels INT,
						  address VARCHAR,
						  phone_number CHAR(15),
						  email VARCHAR(50)
						 );
						 
CREATE TABLE hotel(hotel_id INT PRIMARY KEY,
				  hotel_chain_id INT, FOREIGN KEY (hotel_chain_id) REFERENCES hotel_chain(hotel_chain_id),
				  number_of_rooms INT,
				  phone_number CHAR(15),
				  address VARCHAR,
				  email VARCHAR(50),
				  stars INT CONSTRAINT STARTS_CHECK check(stars >= 1 AND stars <= 5),
          city VARCHAR
				  );

CREATE TABLE room(room_number INT,
          hotel_id INT,
				  price INT,
				  amenities TEXT,
				  capacity INT,
				  room_view TEXT,
				  extendable BOOLEAN, 
				  issues TEXT
				  );

CREATE TABLE customer(SIN INT PRIMARY KEY,
					  full_name VARCHAR,
					  address VARCHAR
					 );

CREATE TABLE employee(employee_id INT PRIMARY KEY,
					  full_name VARCHAR,
					  role_pos VARCHAR
					 );

CREATE TABLE booking (booking_id INT PRIMARY KEY, 
					  booking_date DATE,
					  price INT
					 );

CREATE TABLE rental ( rental_id INT PRIMARY KEY,
					 price INT,
					 start_date DATE,
					 end_date DATE CONSTRAINT check_dates check (start_date < end_date)
					);
