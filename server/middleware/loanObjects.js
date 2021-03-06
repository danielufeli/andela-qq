import loanModel from '../models/loanModel';
import db from '../db';
import repaymentModel from '../models/repaymentModel';

export default class loanObjects {
  static async getSingleLoan(req) {
    const { rows } = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    const loan = rows[0];
    return loan;
  }

  static notPaid(loans, s, r) {
    const repaid = loans.filter(v => (v.status === s && v.repaid === r));
    return repaid;
  }

  static async currentLoan(req, res) {
    if (req.user.isadmin === true) return res.status(409).json({ status: 409, message: 'You cannot apply for Loan as an Admin' });
    const { rows } = await db.query(loanModel.getLoanByEmail, [req.user.email]);
    const loan = rows[0];
    if (loan && loan.status === 'pending') return res.status(409).json({ status: 409, message: `You have a ${loan.status} loan with us` });
    if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(409).json({ status: 409, message: 'Your loan is yet to be repaid' });
    return loan;
  }

  static newLoanValues(req) {
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
    return values;
  }

  static async newLoan(req) {
    const values = loanObjects.newLoanValues(req);
    const loans = await db.query(loanModel.createLoan, values);
    const { firstname, lastname, email } = req.user;
    const {
      id, tenor, amount, paymentinstallment, status, balance, interest,
    } = loans.rows[0];
    const data = {
      id,
      firstname,
      lastname,
      email,
      tenor,
      amount,
      paymentinstallment,
      status,
      balance,
      interest,
    };
    return data;
  }

  static async newRepayment(req) {
    const loans = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    const postValues = [
      loans.rows[0].id,
      parseFloat(req.body.paidamount).toFixed(2),
      loans.rows[0].paymentinstallment,
    ];
    const repayment = await db.query(repaymentModel.createRepayment, postValues);
    const { amount, paymentinstallment, balance } = loans.rows[0];
    const {
      id, loanid, paidamount, createdon,
    } = repayment.rows[0];
    const data = {
      id, loanid, createdon, amount, paymentinstallment, paidamount, balance,
    };
    return data;
  }
}
