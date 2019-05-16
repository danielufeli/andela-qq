import Loan from '../models/loan';

const loans = Loan.fetchAll();
const currentLoan = lemail => loans.find(l => l.email === lemail);

export default currentLoan;
