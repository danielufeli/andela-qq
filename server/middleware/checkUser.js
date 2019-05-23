import db from '../db';
import loanModel from '../models/loanModel';


const checkUser = async (req, res, next) => {
  const { email } = req.user;
  const loan = db.query(loanModel.getLoanById, [Number(req.params.loanid)]);
  if (!loan) return res.status(404).json({ status: 404, message: 'No Loan Avalable' });
  if (email !== loan.email) return res.status(401).json({ status: 401, message: 'Access Denied, Check the loan ID Entered' });
  return next();
};

export default checkUser;
