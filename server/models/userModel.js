const userModel = {
  createUser: `INSERT INTO 
    users(email, mobileno, firstname, lastname, password, address)
    values($1, $2, $3, $4, $5, $6)
    returning *`,
  currentUser: 'SELECT * FROM users WHERE email = $1',
  getUserById: 'SELECT * FROM users WHERE id = $1',
  getUserByNo: 'SELECT * FROM users WHERE mobileno = $1',
  updateStatus: 'UPDATE users SET status = $1 WHERE id = $2 returning *',
};

export default userModel;
