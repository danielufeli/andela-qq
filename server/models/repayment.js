import moment from 'moment';

const repayments = [];

class Repayment {
  constructor(loanId, paidAmount, paymentInstallment) {
    this.id = repayments.length + 1;
    this.createdOn = moment().format('dddd MMM YYYY HH:mm:ss');
    this.loanId = loanId;
    this.paidAmount = paidAmount;
    this.paymentInstallment = paymentInstallment;
  }

  save() {
    repayments.push(this);
  }

  static fetchAll() {
    return repayments;
  }
}

export default Repayment;
