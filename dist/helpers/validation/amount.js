"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateAmount = function validateAmount(repayment) {
  var schema = {
    paidAmount: _joi["default"].number().min(2).required().error(function () {
      return {
        message: 'Enter Valid Amount Paid e.g. 10000'
      };
    })
  };
  return _joi["default"].validate(repayment, schema);
};

var _default = validateAmount;
exports["default"] = _default;