"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var users = _user["default"].fetchAll();

var getUserId = function getUserId(userId) {
  return users.find(function (e) {
    return e.id === userId;
  });
};

var _default = getUserId;
exports["default"] = _default;