import moment from 'moment';

const repayments = [];

class Repayment {
  constructor(loanId, paidAmount) {
    this.id = repayments.length + 1;
    this.createdOn = moment().format('dddd MMM YYYY HH:mm:ss');
    this.loanId = loanId;
    this.paidAmount = paidAmount;
  }

  save() {
    repayments.push(this);
  }

  static fetchAll() {
    return repayments;
  }
}

export default Repayment;
