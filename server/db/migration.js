import db from './index';
import { createQueries, dropQueries } from './queries';

const { userTable, loansTable, repaymentsTable } = createQueries;

const createTables = async () => {
  try {
    const user = await db.query(userTable);
    console.log(user);
    const loan = await db.query(loansTable);
    console.log(loan);
    const repayment = await db.query(repaymentsTable);
    console.log(repayment);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    const user = await db.query(dropQueries.userTable);
    console.log(user);
    const loan = await db.query(dropQueries.loansTable);
    console.log(loan);
    const repayment = await db.query(dropQueries.repaymentsTable);
    console.log(repayment);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTables,
  dropTables,
};
require('make-runnable');
