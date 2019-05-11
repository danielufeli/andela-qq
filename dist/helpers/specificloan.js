"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loan = _interopRequireDefault(require("../models/loan"));

var loans = _loan["default"].fetchAll();

var getSpecificLoan = function getSpecificLoan(loanId) {
  return loans.find(function (e) {
    return e.id === loanId;
  });
};

var _default = getSpecificLoan;
exports["default"] = _default;