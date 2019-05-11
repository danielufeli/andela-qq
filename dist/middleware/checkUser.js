"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _getuserid = _interopRequireDefault(require("../helpers/getuserid"));

var _specificloan = _interopRequireDefault(require("../helpers/specificloan"));

var checkUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var userId, _getUserById, email, loan;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.user.id;
            _getUserById = (0, _getuserid["default"])(userId), email = _getUserById.email;
            _context.next = 4;
            return (0, _specificloan["default"])(Number(req.params.loanid));

          case 4:
            loan = _context.sent;

            if (loan) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: 'No Loan Avalable'
            }));

          case 7:
            if (!(email !== loan.email)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              status: 401,
              error: 'Access Denied, Check the loan ID Entered'
            }));

          case 9:
            return _context.abrupt("return", next());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = checkUser;
exports["default"] = _default;