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
    paidAmount: 2625.00,
  },
  invalidAmount: {
    paidAmount: 'ssss',
  },
  highAmount: {
    paidAmount: 100000,
  },
  repayStatus: {
    status: 'pending',
  },
};

export default loanInfo;
