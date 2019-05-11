"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _getuserid = _interopRequireDefault(require("./getuserid"));

var auth = {
  verifyToken: function () {
    var _verifyToken = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var token, decoded, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-auth-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                message: 'Access denied. No token provided.'
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.jwtPrivateKey);

            case 6:
              decoded = _context.sent;
              user = (0, _getuserid["default"])(decoded.userid);

              if (user) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                message: 'Your token is invalid'
              }));

            case 10:
              req.user = {
                id: decoded.userid,
                isAdmin: decoded.admin
              };
              return _context.abrupt("return", next());

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(403).json({
                message: 'Your token is invalid'
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 14]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = auth;
exports["default"] = _default;