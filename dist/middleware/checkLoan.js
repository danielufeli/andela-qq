"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _specificloan = _interopRequireDefault(require("../helpers/specificloan"));

var checkLoan =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var loan;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _specificloan["default"])(Number(req.params.loanid));

          case 2:
            loan = _context.sent;

            if (loan) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'The loan application with the given ID was not found'
            }));

          case 5:
            return _context.abrupt("return", next());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkLoan(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = checkLoan;
exports["default"] = _default;