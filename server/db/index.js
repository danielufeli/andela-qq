import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let databaseUrl = '';
databaseUrl = (process.env.NODE_ENV === 'PRODUCTION' ? process.env.DATABASE_URL_PRODUCTION : process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: databaseUrl,
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
