"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _loans = _interopRequireDefault(require("../controllers/loans"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin"));

var _checkUser = _interopRequireDefault(require("../middleware/checkUser"));

var router = _express["default"].Router(); // @route Get api/v1/loans
// @desc Test post route
// @access Public


router.get('', _auth["default"].verifyToken, _isAdmin["default"], _loans["default"].allLoans);
router.get('/:loanid', _auth["default"].verifyToken, _isAdmin["default"], _loans["default"].specificLoans);
router.get('/:loanid/repayments', _auth["default"].verifyToken, _checkUser["default"], _loans["default"].viewAllRepayments);
router.post('/:loanid/repayment', _auth["default"].verifyToken, _isAdmin["default"], _loans["default"].loanRepayments);
router.post('', _auth["default"].verifyToken, _loans["default"].createLoan);
router.patch('/:loanid', _auth["default"].verifyToken, _isAdmin["default"], _loans["default"].adminApproveLoans);
var _default = router;
exports["default"] = _default;