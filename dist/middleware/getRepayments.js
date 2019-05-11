"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _repaymenthistory = _interopRequireDefault(require("../helpers/repaymenthistory"));

var getRepayments =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var repayments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _repaymenthistory["default"])(Number(req.param.id));

          case 2:
            repayments = _context.sent;

            if (repayments) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'No Repayment History Found'
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

  return function getRepayments(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRepayments;
exports["default"] = _default;