import Loan from '../models/loan';
import validateLoan from '../helpers/validation/loans';
import getUserById from '../helpers/getuserid';
import currentLoan from '../helpers/currentLoan';
import getSpecificLoan from '../helpers/specificloan';
import notPaid from '../helpers/notpaid';
import validateLoanStatus from '../helpers/validation/loanstatus';

class loansController {
  static async createLoan(req, res) {
    const { error } = validateLoan(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const userId = req.user.id;
    const user = getUserById(userId);
    let loan = currentLoan(user.email);
    if (loan && loan.status === 'pending') {
      return res.status(400).json({ message: `You have a ${loan.status} loan with us` });
    }
    if (loan && loan.status === 'approved' && loan.repaid === false) {
      return res.status(400).json({ message: 'Your loan is yet to be repaid' });
    }
    const loanamount = parseFloat(req.body.amount);
    const loantenor = Number(req.body.tenor);
    const loaninterest = parseFloat(5 / 100) * loanamount;
    const loanpaymentInstallment = (loanamount + loaninterest) / loantenor;
    const loanbalance = loanpaymentInstallment * loantenor;
    loan = new Loan(
      user.email,
      loantenor,
      parseFloat(loanamount).toFixed(2),
      parseFloat(loanpaymentInstallment).toFixed(2),
      parseFloat(loanbalance).toFixed(2),
      parseFloat(loaninterest).toFixed(2),
    );
    await loan.save();
    const {
      firstName, lastName, email,
    } = user;
    const {
      id, status, tenor, amount, paymentInstallment, balance, interest,
    } = loan;
    return res.status(201).json({
      status: 201,
      data: {
        id,
        firstName,
        lastName,
        email,
        tenor,
        amount,
        paymentInstallment,
        status,
        balance,
        interest,
      },
    });
  }

  static async specificLoans(req, res) {
    const loan = await getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  static async allLoans(req, res) {
    const loans = await Loan.fetchAll();
    if (loans && loans.length === 0) return res.status(400).json({ message: 'No Loan Application Available' });
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      const result = await notPaid(status, JSON.parse(repaid));
      return res.status(200).json({ status: 200, data: result });
    }
    return res.status(200).json({ status: 200, data: loans });
  }

  static async adminApproveLoans(req, res) {
    const loan = await getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'No Loan Application Available' });
    const { error } = validateLoanStatus(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    Object.assign(loan, { status: req.body.status });
    const {
      id, amount, tenor, status, paymentInstallment, interest,
    } = loan;
    return res.status(200).json({
      status: 200,
      data: {
        loanId: id,
        loanAmount: amount,
        tenor,
        status,
        monthlyInstallment: paymentInstallment,
        interest,
      },
    });
  }
}

export default loansController;
