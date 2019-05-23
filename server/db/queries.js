const createQueries = {
  userTable: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mobileno VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isadmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'unverified'
  )`,
  loansTable: `CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    repaid BOOLEAN DEFAULT FALSE,
    tenor VARCHAR(100) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    paymentInstallment VARCHAR(100) NOT NULL,
    balance VARCHAR(100) NOT NULL,
    interest VARCHAR(100) NOT NULL,
    status VARCHAR(100) DEFAULT 'pending'
  )`,
  repaymentsTable: `CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    loanid VARCHAR(100) NOT NULL,
    paidamount VARCHAR(100) NOT NULL,
    paymentInstallment VARCHAR(100) NOT NULL
  )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  loansTable: 'DROP TABLE IF EXISTS loans CASCADE',
  repaymentsTable: 'DROP TABLE IF EXISTS repayments CASCADE',
};
const hashPassword = '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe';
const seedQueries = {
  userTable: `INSERT INTO
  users(firstname, lastname, email, mobileno, address, isadmin, password)
  VALUES('Daniel', 'Ufeli', 'admin@quickcredit.com', '08082205956', '26 fagbeyiro street alakuko', true, '${hashPassword}'),
  ('James', 'Oniola', 'user1@quickcredit.com', '08105334020', '26 fagbeyiro street alakuko', false, '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe'),
  ('Olanrewaju', 'Julius', 'user2@quickcredit.com', '08037265917', '26 fagbeyiro street alakuko', false, '${hashPassword}')
  `,
};

module.exports = {
  createQueries,
  dropQueries,
  seedQueries,
};
