"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var users = _user["default"].fetchAll();

var currentUser = function currentUser(cemail) {
  return users.find(function (e) {
    return e.email === cemail;
  });
};

var _default = currentUser;
exports["default"] = _default;