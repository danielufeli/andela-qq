"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var validateUserStatus = function validateUserStatus(user) {
  var schema = {
    status: _joi["default"].string().min(6).valid('unverified', 'verified').required().error(function () {
      return {
        message: 'Status must be set to verified or unverified'
      };
    })
  };
  return _joi["default"].validate(user, schema);
};

var _default = validateUserStatus;
exports["default"] = _default;