"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loan = _interopRequireDefault(require("../models/loan"));

var loans = _loan["default"].fetchAll();

var currentLoan = function currentLoan(lemail) {
  return loans.find(function (l) {
    return l.email === lemail;
  });
};

var _default = currentLoan;
exports["default"] = _default;