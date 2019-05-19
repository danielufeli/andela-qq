import loanModel from '../models/loanModel';
import db from '../db';

export default class loanObjects {
  static async getSingleLoan(req) {
    const { rows } = await db.query(loanModel.getLoanById, [req.params.loanid]);
    const loan = rows[0];
    return loan;
  }

  static async currentLoan(req, res) {
    if (req.user.isadmin === true) return res.status(409).json({ status: 409, message: 'You cannot apply for Loan as an Admin' });
    const { rows } = await db.query(loanModel.getLoanByEmail, [req.user.email]);
    const loan = rows[0];
    if (loan && loan.status === 'pending') return res.status(409).json({ status: 409, message: `You have a ${loan.status} loan with us` });
    if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(409).json({ status: 409, message: 'Your loan is yet to be repaid' });
    return loan;
  }

  static async newLoan(req) {
    const loanamount = parseFloat(req.body.amount);
    const loantenor = Number(req.body.tenor);
    const loaninterest = parseFloat(5 / 100) * loanamount;
    const loanpaymentInstallment = (loanamount + loaninterest) / loantenor;
    const loanbalance = loanpaymentInstallment * loantenor;
    const values = [
      req.user.email,
      loantenor,
      parseFloat(loanamount).toFixed(2),
      parseFloat(loanpaymentInstallment).toFixed(2),
      parseFloat(loanbalance).toFixed(2),
      parseFloat(loaninterest).toFixed(2),
    ];
    const { rows } = await db.query(loanModel.createLoan, values);
    const loan = rows[0];
    return loan;
  }
}
