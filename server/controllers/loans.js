import Loan from '../models/loan';
import Repayment from '../models/repayment';
import getSpecificLoan from '../helpers/specificloan';
import notPaid from '../helpers/notpaid';
import repaymentHistory from '../helpers/repaymenthistory';
import loanObjects from '../middleware/loanObjects';


class loansController {
  static async createLoan(req, res) {
    try {
      let loan = await loanObjects.currentLoan(req, res);
      loan = await loanObjects.newLoan(req);
      const { firstname, lastname, email } = req.user;
      const {
        id, tenor, amount, paymentinstallment, status, balance, interest,
      } = loan;
      return res.status(201).json({
        status: 201,
        data: {
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
        },
      });
    } catch (error) { return error; }
  }

  static specificLoans(req, res) {
    const loan = getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  static allLoans(req, res) {
    const loans = Loan.fetchAll();
    if (loans && loans.length === 0) return res.status(400).json({ message: 'No Loan Application Available' });
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      const result = notPaid(status, JSON.parse(repaid));
      return res.status(200).json({ status: 200, data: result });
    }
    return res.status(200).json({ status: 200, data: loans });
  }

  static adminApproveLoans(req, res) {
    const loan = getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'No Loan Application Available' });
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

  static loanRepayments(req, res) {
    const loan = getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
    if (loan && loan.status === 'pending') return res.status(400).json({ message: `The User loan status is still ${loan.status}` });
    if (Number(req.body.paidAmount) > Number(loan.balance)) return res.status(400).json({ message: `The amount entered is Higher than the users balance of ${loan.balance}` });
    const newBalance = parseFloat(loan.balance - req.body.paidAmount).toFixed(2);
    Object.assign(loan, { balance: newBalance });
    if (newBalance === '0.00') { Object.assign(loan, { repaid: true }); }
    const repayment = new Repayment(
      loan.id,
      parseFloat(req.body.paidAmount).toFixed(2),
      loan.paymentInstallment,
    );
    repayment.save();
    const { amount, paymentInstallment, balance } = loan;
    const {
      id, loanId, paidAmount, createdOn,
    } = repayment;
    return res.status(201).json({
      status: 201,
      data: {
        id, loanId, createdOn, amount, paymentInstallment, paidAmount, balance,
      },
    });
  }

  static viewAllRepayments(req, res) {
    const repayments = repaymentHistory(Number(req.params.loanid));
    if (!repayments) return res.status(400).json({ message: 'No Repayment History Found' });
    return res.status(200).json({ status: 200, data: repayments });
  }
}

export default loansController;
