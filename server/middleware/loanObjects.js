import Loan from '../models/loan';
import userObjects from './userObjects';

export default class loanObjects {
  static getSingleLoan(req) {
    const loan = Loan.singleLoan(req.body.email);
    return loan;
  }

  static newLoan(req) {
    const user = userObjects.getUsersId(req);
    const loanamount = parseFloat(req.body.amount);
    const loantenor = Number(req.body.tenor);
    const loaninterest = parseFloat(5 / 100) * loanamount;
    const loanpaymentInstallment = (loanamount + loaninterest) / loantenor;
    const loanbalance = loanpaymentInstallment * loantenor;
    const loan = new Loan(
      user.email,
      loantenor,
      parseFloat(loanamount).toFixed(2),
      parseFloat(loanpaymentInstallment).toFixed(2),
      parseFloat(loanbalance).toFixed(2),
      parseFloat(loaninterest).toFixed(2),
    );
    loan.save();
    return loan;
  }
}
