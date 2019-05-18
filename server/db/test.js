import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      meetup(
        id UUID PRIMARY KEY,
        id serial PRIMARY KEY,
        createdOn TIMESTAMP,
        location VARCHAR (100),
        images TEXT [],
        topic VARCHAR (100),
        happeningOn DATE,
        tags TEXT []
      )
      user(
        id UUID PRIMARY KEY,
        fisrtname VARCHAR(100),
        lastname VARCHAR(100),
        othername VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        phoneNumber VARCHAR(100),
        username VARCHAR(100),
        registered TIMESTAMP,
        isAdmin is boolean defaults false,
      )
      question(
        id UUID PRIMARY KEY,
        createdon TIMESTAMP,
        createdby VARCHAR(100),
        meetup VARCHAR(100),
        title VARCHAR(100),
        body VARCHAR(100),
        votes VARCHAR(10)
         )
      rsvp(
        id UUID PRIMARY KEY,
        meetup VARCHAR(100) PRIMARY KEY,
        user VARCHAR(100) PRIMARY KEY,
        response VARCHAR(100)
      )
      votes(
        id UUID PRIMARY KEY,
        user VARCHAR(100),
        meetup VARCHAR(100),
        votes VARCHAR(100)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS meetup';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export default {
  createTables,
  dropTables,
};
