const loanModel = {
  createLoan: `INSERT INTO 
    loans(email, tenor, amount, paymentinstallment, balance, interest)
    values($1, $2, $3, $4, $5, $6)
    returning *`,
  getLoanById: 'SELECT * FROM loans WHERE id = $1',
  getAllLoans: 'SELECT * FROM loans',
  getLoanByEmail: 'SELECT * FROM loans WHERE email = $1',
  getLoanByRepaid: 'SELECT * FROM loans WHERE repaid = $1 & status returning *',
  updateStatus: 'UPDATE loans SET status = $1 WHERE id = $2 returning *',
};

export default loanModel;
