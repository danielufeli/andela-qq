"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateLoanStatus = function validateLoanStatus(loan) {
  var schema = {
    status: _joi["default"].string().min(6).valid('approved', 'rejected').required().error(function () {
      return {
        message: 'Status must be set to approved or rejected'
      };
    })
  };
  return _joi["default"].validate(loan, schema);
};

var _default = validateLoanStatus;
exports["default"] = _default;