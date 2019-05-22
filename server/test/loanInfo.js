const loanInfo = {
  newLoan: {
    amount: 10000,
    tenor: 2,
  },
  ommitTenor: {
    amount: 10000,
  },
  ommitAmount: {
    tenor: 2,
  },
  statusApprove: {
    status: 'approved',
  },
  wrongStatus: {
    status: 'sasasas',
  },
  statusVerify: {
    status: 'verified',
  },
  repaymentAmount: {
    paidamount: 2625.00,
  },
  invalidAmount: {
    paidamount: 'ssss',
  },
  highAmount: {
    paidamount: 100000,
  },
  repayStatus: {
    status: 'pending',
  },
};

export default loanInfo;
