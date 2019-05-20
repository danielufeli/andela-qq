const repaymentModel = {
  createRepayment: `INSERT INTO 
    repayments(loanid, paidamount, paymentinstallment)
    values($1, $2, $3)
    returning *`,
  getAllRepayments: 'SELECT * FROM repayments WHERE loanid = $1',
};

export default repaymentModel;
