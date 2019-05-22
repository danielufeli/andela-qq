import db from './index';
import { seedQueries } from './queries';

const seedTables = async () => {
  try {
    const seeded = await db.query(seedQueries.userTable);
    console.log(seeded);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedTables,
};
require('make-runnable');
