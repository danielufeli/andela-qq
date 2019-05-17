const dbSchema = `
DROP TABLE IF EXISTS users CASCADE,
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  mobileno VARCHAR(100),
  address VARCHAR(100),
  registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  isadmin BOOLEAN DEFAULT FALSE,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(100) DEFAULT 'unverified'
);
    DROP TABLE IF EXISTS loans CASCADE
      CREATE TABLE loans (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        repaid BOOLEAN DEFAULT FALSE,
        tenor INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        paymentInstallment INTEGER NOT NULL,
        balance INTEGER NOT NULL,
        interest INTEGER NOT NULL,
        status VARCHAR(100) DEFAULT 'pending'
      );
      DROP TABLE IF EXISTS repayments CASCADE'
      CREATE TABLE repayments (
        id SERIAL PRIMARY KEY,
        createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        loanid INTEGER NOT NULL,
        paidamount INTEGER NOT NULL,
        paymentInstallment INTEGER NOT NULL
      );
      INSERT INTO
      users(email, mobileno, firstname, lastname, password, address)
      VALUES('admin@quickcredit.com', '08082205956', 'Daniel', 'Ufeli', '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe', '26 fagbeyiro street alakuko'),
    ('user1@quickcredit.com', '08105334020', 'James', 'Oniola', '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe', '26 fagbeyiro street alakuko'),
    ('user2@quickcredit.com', '08037265917', 'Olanrewaju', 'Julius', '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe', '26 fagbeyiro street alakuko')
      `;
export default dbSchema;
