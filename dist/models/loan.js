"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var loans = [{
  id: 1,
  firstName: 'Henry',
  lastName: 'Omola',
  email: 'danino1@yahoo.com',
  tenor: 4,
  amount: 10000.00,
  paymentInstallment: 2625.00,
  status: 'pending',
  balance: 10500.00,
  interest: 500.00,
  repaid: false
}, {
  id: 2,
  firstName: 'Kelly',
  lastName: 'Wisdom',
  email: 'user1@quickcredit.com',
  tenor: 2,
  amount: 10000.00,
  paymentInstallment: 2625.00,
  status: 'approved',
  balance: 10000.00,
  interest: 500.00,
  repaid: false
}, {
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
  repaid: true
}];

var Loan =
/*#__PURE__*/
function () {
  function Loan(email, tenor, amount, paymentInstallment, balance, interest) {
    (0, _classCallCheck2["default"])(this, Loan);
    this.id = loans.length + 1;
    this.email = email;
    this.createdOn = (0, _moment["default"])().format('dddd MMM YYYY HH:mm:ss');
    this.repaid = false;
    this.tenor = tenor;
    this.amount = amount;
    this.paymentInstallment = paymentInstallment;
    this.balance = balance;
    this.interest = interest;
    this.status = 'pending';
  }

  (0, _createClass2["default"])(Loan, [{
    key: "save",
    value: function save() {
      loans.push(this);
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return loans;
    }
  }]);
  return Loan;
}();

var _default = Loan;
exports["default"] = _default;