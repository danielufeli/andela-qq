import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class Query {
  static async query(queryStrings, values) {
    let result = '';
    const client = await pool.connect();
    try {
      result = await client.query(queryStrings, values);
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
    return result;
  }
}