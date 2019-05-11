"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loan = _interopRequireDefault(require("../models/loan"));

var loans = _loan["default"].fetchAll();

var notPaid = function notPaid(s, r) {
  return loans.filter(function (v) {
    return v.status === s && v.repaid === r;
  });
};

var _default = notPaid;
exports["default"] = _default;