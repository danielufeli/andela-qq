"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loan2 = _interopRequireDefault(require("../models/loan"));

var _repayment = _interopRequireDefault(require("../models/repayment"));

var _loans = _interopRequireDefault(require("../helpers/validation/loans"));

var _getuserid = _interopRequireDefault(require("../helpers/getuserid"));

var _currentLoan = _interopRequireDefault(require("../helpers/currentLoan"));

var _specificloan = _interopRequireDefault(require("../helpers/specificloan"));

var _notpaid = _interopRequireDefault(require("../helpers/notpaid"));

var _loanstatus = _interopRequireDefault(require("../helpers/validation/loanstatus"));

var _amount = _interopRequireDefault(require("../helpers/validation/amount"));

var _repaymenthistory = _interopRequireDefault(require("../helpers/repaymenthistory"));

var loansController =
/*#__PURE__*/
function () {
  function loansController() {
    (0, _classCallCheck2["default"])(this, loansController);
  }

  (0, _createClass2["default"])(loansController, null, [{
    key: "createLoan",
    value: function () {
      var _createLoan = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _validateLoan, error, userId, user, loan, loanamount, loantenor, loaninterest, loanpaymentInstallment, loanbalance, firstName, lastName, email, _loan, id, status, tenor, amount, paymentInstallment, balance, interest;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validateLoan = (0, _loans["default"])(req.body), error = _validateLoan.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(error.details[0].message));

              case 3:
                userId = req.user.id;
                user = (0, _getuserid["default"])(userId);
                loan = (0, _currentLoan["default"])(user.email);

                if (!(loan && loan.status === 'pending')) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: "You have a ".concat(loan.status, " loan with us")
                }));

              case 8:
                if (!(loan && loan.status === 'approved' && loan.repaid === false)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Your loan is yet to be repaid'
                }));

              case 10:
                loanamount = parseFloat(req.body.amount);
                loantenor = Number(req.body.tenor);
                loaninterest = parseFloat(5 / 100) * loanamount;
                loanpaymentInstallment = (loanamount + loaninterest) / loantenor;
                loanbalance = loanpaymentInstallment * loantenor;
                loan = new _loan2["default"](user.email, loantenor, parseFloat(loanamount).toFixed(2), parseFloat(loanpaymentInstallment).toFixed(2), parseFloat(loanbalance).toFixed(2), parseFloat(loaninterest).toFixed(2));
                _context.next = 18;
                return loan.save();

              case 18:
                firstName = user.firstName, lastName = user.lastName, email = user.email;
                _loan = loan, id = _loan.id, status = _loan.status, tenor = _loan.tenor, amount = _loan.amount, paymentInstallment = _loan.paymentInstallment, balance = _loan.balance, interest = _loan.interest;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    tenor: tenor,
                    amount: amount,
                    paymentInstallment: paymentInstallment,
                    status: status,
                    balance: balance,
                    interest: interest
                  }
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createLoan(_x, _x2) {
        return _createLoan.apply(this, arguments);
      }

      return createLoan;
    }()
  }, {
    key: "specificLoans",
    value: function () {
      var _specificLoans = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var loan;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _specificloan["default"])(Number(req.params.loanid));

              case 2:
                loan = _context2.sent;

                if (loan) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  message: 'The loan application with the given ID was not found'
                }));

              case 5:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: loan
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function specificLoans(_x3, _x4) {
        return _specificLoans.apply(this, arguments);
      }

      return specificLoans;
    }()
  }, {
    key: "allLoans",
    value: function () {
      var _allLoans = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var loans, status, repaid, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _loan2["default"].fetchAll();

              case 2:
                loans = _context3.sent;

                if (!(loans && loans.length === 0)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  message: 'No Loan Application Available'
                }));

              case 5:
                status = req.query.status;
                repaid = req.query.repaid;

                if (!(status !== undefined && repaid !== undefined)) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 10;
                return (0, _notpaid["default"])(status, JSON.parse(repaid));

              case 10:
                result = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  data: result
                }));

              case 12:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  data: loans
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function allLoans(_x5, _x6) {
        return _allLoans.apply(this, arguments);
      }

      return allLoans;
    }()
  }, {
    key: "adminApproveLoans",
    value: function () {
      var _adminApproveLoans = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var loan, _validateLoanStatus, error, id, amount, tenor, status, paymentInstallment, interest;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _specificloan["default"])(Number(req.params.loanid));

              case 2:
                loan = _context4.sent;

                if (loan) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  message: 'No Loan Application Available'
                }));

              case 5:
                _validateLoanStatus = (0, _loanstatus["default"])(req.body), error = _validateLoanStatus.error;

                if (!error) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json(error.details[0].message));

              case 8:
                Object.assign(loan, {
                  status: req.body.status
                });
                id = loan.id, amount = loan.amount, tenor = loan.tenor, status = loan.status, paymentInstallment = loan.paymentInstallment, interest = loan.interest;
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    loanId: id,
                    loanAmount: amount,
                    tenor: tenor,
                    status: status,
                    monthlyInstallment: paymentInstallment,
                    interest: interest
                  }
                }));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function adminApproveLoans(_x7, _x8) {
        return _adminApproveLoans.apply(this, arguments);
      }

      return adminApproveLoans;
    }()
  }, {
    key: "loanRepayments",
    value: function () {
      var _loanRepayments = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var _validateAmount, error, loan, newBalance, repayment, amount, paymentInstallment, balance, id, loanId, paidAmount, createdOn;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _validateAmount = (0, _amount["default"])(req.body), error = _validateAmount.error;

                if (!error) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json(error.details[0].message));

              case 3:
                _context5.next = 5;
                return (0, _specificloan["default"])(Number(req.params.loanid));

              case 5:
                loan = _context5.sent;

                if (loan) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  message: 'The loan application with the given ID was not found'
                }));

              case 8:
                if (!(loan && loan.status === 'pending')) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  message: "The User loan status is still ".concat(loan.status)
                }));

              case 10:
                if (!(Number(req.body.paidAmount) > Number(loan.balance))) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  message: "The amount entered is Higher than the users balance of ".concat(loan.balance)
                }));

              case 12:
                newBalance = parseFloat(loan.balance - req.body.paidAmount).toFixed(2);
                _context5.next = 15;
                return Object.assign(loan, {
                  balance: newBalance
                });

              case 15:
                if (!(newBalance === '0.00')) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 18;
                return Object.assign(loan, {
                  repaid: true
                });

              case 18:
                repayment = new _repayment["default"](loan.id, parseFloat(req.body.paidAmount).toFixed(2), loan.paymentInstallment);
                _context5.next = 21;
                return repayment.save();

              case 21:
                amount = loan.amount, paymentInstallment = loan.paymentInstallment, balance = loan.balance;
                id = repayment.id, loanId = repayment.loanId, paidAmount = repayment.paidAmount, createdOn = repayment.createdOn;
                return _context5.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    id: id,
                    loanId: loanId,
                    createdOn: createdOn,
                    amount: amount,
                    monthlyInstallment: paymentInstallment,
                    paidAmount: paidAmount,
                    balance: balance
                  }
                }));

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function loanRepayments(_x9, _x10) {
        return _loanRepayments.apply(this, arguments);
      }

      return loanRepayments;
    }()
  }, {
    key: "viewAllRepayments",
    value: function () {
      var _viewAllRepayments = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res, next) {
        var repayments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return (0, _repaymenthistory["default"])(Number(req.params.loanid));

              case 3:
                repayments = _context6.sent;

                if (repayments) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  message: 'No Repayment History Found'
                }));

              case 6:
                return _context6.abrupt("return", res.status(200).json({
                  status: 200,
                  data: repayments
                }));

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", next(_context6.t0));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }));

      function viewAllRepayments(_x11, _x12, _x13) {
        return _viewAllRepayments.apply(this, arguments);
      }

      return viewAllRepayments;
    }()
  }]);
  return loansController;
}();

var _default = loansController;
exports["default"] = _default;