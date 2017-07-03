DROP DATABASE IF EXISTS restaurants_db;
CREATE DATABASE restaurants_db;

\c restaurants_db;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	
    email VARCHAR(200) NOT NULL UNIQUE,
    password_digest VARCHAR(200) NOT NULL
);

CREATE TABLE restaurants (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	location TEXT NOT NULL,
	photos TEXT NOT NULL 
);
