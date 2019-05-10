import getUserById from '../helpers/getuserid';
import getSpecificLoan from '../helpers/specificloan';

const checkUser = async (req, res, next) => {
  const userId = req.user.id;
  const { email } = getUserById(userId);
  const loan = await getSpecificLoan(Number(req.params.loanid));
  if (!loan) return res.status(400).json({ status: 400, error: 'No Loan Avalable' });
  if (email !== loan.email) return res.status(401).json({ status: 401, error: 'Access Denied, Check the loan ID Entered' });
  return next();
};

export default checkUser;
