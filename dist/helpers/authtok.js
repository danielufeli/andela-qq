"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var authtok = {
  hashPassword: function hashPassword(password) {
    return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptjs["default"].compareSync(password, hashPassword);
  },
  generateToken: function generateToken(id, isAdmin) {
    var token = _jsonwebtoken["default"].sign({
      userid: id,
      admin: isAdmin
    }, process.env.jwtPrivateKey);

    return token;
  }
};
var _default = authtok;
exports["default"] = _default;