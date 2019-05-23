import loanObjects from '../middleware/loanObjects';
import db from '../db';
import loanModel from '../models/loanModel';
import repaymentModel from '../models/repaymentModel';


class loansController {
  static async createLoan(req, res) {
    if (req.user.isadmin === true) return res.status(401).json({ status: 401, message: 'You cannot apply for Loan as an Admin' });
    try {
      const { rows } = await db.query(loanModel.getLoanByEmail, [req.user.email]);
      const index = rows.length - 1;
      const loan = rows[index];
      if (loan && loan.status === 'pending') return res.status(409).json({ status: 409, message: `You have a ${loan.status} loan with us` });
      if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(409).json({ status: 409, message: 'Your loan is yet to be repaid' });
      const data = await loanObjects.newLoan(req);
      return res.status(201).json({ status: 201, data });
    } catch (error) { return res.status(500).json(error); }
  }

  static async specificLoans(req, res) {
    const { rows } = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    const loan = rows[0];
    if (!loan) return res.status(404).json({ status: 404, message: 'The loan application with the given ID was not found' });
    return res.status(200).json({ status: 200, data: loan });
  }

  static async allLoans(req, res) {
    const { rows } = await db.query(loanModel.getAllLoans);
    const loans = rows;
    if (loans && loans.length === 0) return res.status(404).json({ status: 404, message: 'No Loan Application Available' });
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      const result = loanObjects.notPaid(loans, status, JSON.parse(repaid));
      return res.status(200).json({ status: 200, data: result });
    }
    return res.status(200).json({ status: 200, data: loans });
  }

  static async adminApproveLoans(req, res) {
    const { rows } = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    const loan = rows[0];
    if (!loan) return res.status(404).json({ status: 404, message: 'No Loan Application Available' });
    const values = [req.body.status || loan.status, req.params.loanid];
    const updatedLoan = await db.query(loanModel.updateStatus, values);
    const {
      id, amount, tenor, status, paymentinstallment, interest,
    } = updatedLoan.rows[0];
    return res.status(200).json({
      status: 200,
      data: {
        loanId: id, amount, tenor, status, paymentinstallment, interest,
      },
    });
  }

  static async loanRepayments(req, res) {
    const { rows } = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    const loan = rows[0];
    if (!loan) return res.status(404).json({ status: 404, message: 'The loan application with the given ID was not found' });
    if (loan && loan.status === 'pending') return res.status(400).json({ status: 400, message: `The User loan status is still ${loan.status}` });
    if (Number(req.body.paidamount) > Number(loan.balance)) return res.status(400).json({ status: 400, message: `The amount entered is Higher than the users balance of ${loan.balance}` });
    const newBalance = parseFloat(loan.balance - req.body.paidamount).toFixed(2);
    const valuesBal = [parseFloat(newBalance).toFixed(2) || loan.balance, req.params.loanid];
    await db.query(loanModel.updateBalance, valuesBal);
    if (newBalance === '0.00') {
      const valuesRepaid = [true || loan.repaid, req.params.loanid];
      await db.query(loanModel.updateRepaid, valuesRepaid);
    }
    const data = await loanObjects.newRepayment(req);
    return res.status(201).json({
      status: 201,
      data,
    });
  }

  static async viewAllRepayments(req, res) {
    const { email } = req.user;
    const loan = await db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
    if (email !== loan.rows[0].email) return res.status(401).json({ status: 401, error: 'Access Denied, Check the loan ID Entered' });
    const loans = loan.rows[0];
    if (!loans) return res.status(400).json({ status: 400, error: 'No Loan Avalable' });
    const { rows } = await db.query(repaymentModel.getAllRepayments, [Number(req.params.loanid)]);
    const repayments = rows;
    if (!repayments) return res.status(400).json({ message: 'No Repayment History Found' });
    return res.status(200).json({ status: 200, data: repayments });
  }
}

export default loansController;
