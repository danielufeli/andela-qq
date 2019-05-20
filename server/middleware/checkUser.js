import db from '../db';
import loanModel from '../models/loanModel';


const checkUser = async (req, res, next) => {
  const { email } = req.user;
  const loan = db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
  if (!loan) return res.status(400).json({ status: 400, error: 'No Loan Avalable' });
  if (email !== loan.email) return res.status(401).json({ status: 401, error: 'Access Denied, Check the loan ID Entered' });
  return next();
};

export default checkUser;
