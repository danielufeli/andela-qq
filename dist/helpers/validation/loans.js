"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateLoan = function validateLoan(loan) {
  var schema = {
    amount: _joi["default"].number().min(2).required().error(function () {
      return {
        message: 'Enter Loan amount'
      };
    }),
    tenor: _joi["default"].number().integer().min(1).max(12).required().error(function () {
      return {
        message: 'Enter how many months you need to pay back'
      };
    })
  };
  return _joi["default"].validate(loan, schema);
};

var _default = validateLoan;
exports["default"] = _default;