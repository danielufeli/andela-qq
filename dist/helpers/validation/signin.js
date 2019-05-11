"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateSignin = function validateSignin(user) {
  var schema = {
    email: _joi["default"].string().min(4).max(255).required().email().error(function () {
      return {
        message: 'Enter your email to signin'
      };
    }),
    password: _joi["default"].string().min(6).max(255).required().error(function () {
      return {
        message: 'Enter your password to signin'
      };
    }),
    isAdmin: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(user, schema);
};

var _default = validateSignin;
exports["default"] = _default;