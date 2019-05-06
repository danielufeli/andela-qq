import moment from 'moment';

const loans = [
  {
    id: 1,
    firstName: 'Henry',
    lastName: 'Omola',
    email: 'danino@yahoo.com',
    tenor: 4,
    amount: 10000.00,
    paymentInstallment: 2625.00,
    status: 'approved',
    balance: 10500.00,
    interest: 500.00,
    repaid: false,
  },
  {
    id: 2,
    firstName: 'Kelly',
    lastName: 'Wisdom',
    email: 'kelly@yahoo.com',
    tenor: 1,
    amount: 20000.00,
    paymentInstallment: 21000.00,
    status: 'approved',
    balance: 0.00,
    interest: 1000.00,
    repaid: false,
  },
  {
    id: 3,
    firstName: 'Nelson',
    lastName: 'Oluwaseun',
    email: 'onelson@yahoo.com',
    tenor: 1,
    amount: 30000.00,
    paymentInstallment: 31500.00,
    status: 'approved',
    balance: 0.00,
    interest: 1500.00,
    repaid: true,
  },
];

class Loan {
  constructor(user, tenor, amount, paymentInstallment, balance, interest) {
    this.id = loans.length + 1;
    this.user = user;
    this.createdOn = moment().format('dddd MMM YYYY HH:mm:ss');
    this.repaid = false;
    this.tenor = tenor;
    this.amount = amount;
    this.paymentInstallment = paymentInstallment;
    this.balance = balance;
    this.interest = interest;
    this.status = 'pending';
  }

  save() {
    loans.push(this);
  }

  static fetchAll() {
    return loans;
  }
}

export default Loan;
