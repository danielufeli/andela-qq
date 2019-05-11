"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _repayment = _interopRequireDefault(require("../models/repayment"));

var repayments = _repayment["default"].fetchAll();

var repaymentHistory = function repaymentHistory(lid) {
  return repayments.filter(function (l) {
    return l.loanId === lid;
  });
};

var _default = repaymentHistory;
exports["default"] = _default;