import Loan from '../models/loan';

const loans = Loan.fetchAll();
const notPaid = (s, r) => loans.filter(v => (v.status === s && v.repaid === r));

export default notPaid;
