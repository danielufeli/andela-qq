"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var repayments = [];

var Repayment =
/*#__PURE__*/
function () {
  function Repayment(loanId, paidAmount, paymentInstallment) {
    (0, _classCallCheck2["default"])(this, Repayment);
    this.id = repayments.length + 1;
    this.createdOn = (0, _moment["default"])().format('dddd MMM YYYY HH:mm:ss');
    this.loanId = loanId;
    this.paidAmount = paidAmount;
    this.paymentInstallment = paymentInstallment;
  }

  (0, _createClass2["default"])(Repayment, [{
    key: "save",
    value: function save() {
      repayments.push(this);
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return repayments;
    }
  }]);
  return Repayment;
}();

var _default = Repayment;
exports["default"] = _default;