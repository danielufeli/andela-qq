const databaseQueries = {
  userTable: `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(35) NOT NULL,
        lastname VARCHAR(35) NOT NULL,
        email VARCHAR(45) NOT NULL,
        mobileno VARCHAR(45) NOT NULL,
        address VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isadmin BOOLEAN NOT NULL DEFAULT false,
        status VARCHAR(10) NOT NULL DEFAULT 'unverified',
    )`,
  loansTable: `CREATE TABLE IF NOT EXISTS
    loans(
      id SERIAL,
      email VARCHAR(45) NOT NULL,
      createdon TIMESTAMP,
      repaid BOOLEAN NOT NULL DEFAULT false,
      tenor INTEGER NOT NULL,
      amount Float(3, 2) NOT NULL,
      paymentInstallment Float(3, 2) NOT NULL,
      balance Float(3, 2) NOT NULL,
      interest Float(3, 2) NOT NULL,
      status VARCHAR(10) NOT NULL DEFAULT 'pending'
      )`,
  repaymentsTable: `CREATE TABLE IF NOT EXISTS
    repayments(
      id SERIAL PRIMARY KEY,
      createdon TIMESTAMP,
      loanid INTEGER NOT NULL,
      paidamount Float(3, 2) NOT NULL,
      paymentInstallment Float(3, 2) NOT NULL,
      )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  loansTable: 'DROP TABLE IF EXISTS loans CASCADE',
  repaymentsTable: 'DROP TABLE IF EXISTS repayments CASCADE',
};

const password = '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe';
const dummyQueries = {
  userTable: `INSERT INTO
  users(email, mobileno, firstname, lastname, password, address)
    VALUES('admin@quickcredit.com', '08082205956', 'Daniel', 'Ufeli', '${password}', '26 fagbeyiro street alakuko'),
    ('user1@quickcredit.com', '08105334020', 'James', 'Oniola', '${password}', '26 fagbeyiro street alakuko'),
    ('user2@quickcredit.com', '08037265917', 'Olanrewaju', 'Julius', '${password}', '26 fagbeyiro street alakuko')
          `,
};

export default {
  databaseQueries,
  dropQueries,
  dummyQueries,
};
