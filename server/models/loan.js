import moment from 'moment';

const loans = [];

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
