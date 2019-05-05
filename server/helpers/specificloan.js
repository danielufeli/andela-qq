import Loan from '../models/loan';

const loans = Loan.fetchAll();
const getSpecificLoan = loanId => loans.find(e => e.id === loanId);

export default getSpecificLoan;
