import Repayment from '../models/repayment';

const repayments = Repayment.fetchAll();
const repaymentHistory = lid => repayments.filter(l => l.loanId === lid);

export default repaymentHistory;
