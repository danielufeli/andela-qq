"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateUser = function validateUser(user) {
  var schema = {
    firstName: _joi["default"].string().min(2).max(50).required(),
    lastName: _joi["default"].string().min(2).max(50).required(),
    password: _joi["default"].string().min(6).max(255).required(),
    email: _joi["default"].string().min(4).max(255).required().email(),
    address: _joi["default"].string().min(6).required(),
    status: _joi["default"].string().min(6),
    mobileno: _joi["default"].number().min(10).required(),
    isAdmin: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(user, schema);
};

var _default = validateUser;
exports["default"] = _default;