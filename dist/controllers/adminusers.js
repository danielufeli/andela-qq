"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _currentUser = _interopRequireDefault(require("../helpers/currentUser"));

var _status = _interopRequireDefault(require("../helpers/validation/status"));

var adminUserController =
/*#__PURE__*/
function () {
  function adminUserController() {
    (0, _classCallCheck2["default"])(this, adminUserController);
  }

  (0, _createClass2["default"])(adminUserController, null, [{
    key: "adminVerifyUser",
    value: function () {
      var _adminVerifyUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var user, _validateUserStatus, error, email, firstName, lastName, password, address, status;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = (0, _currentUser["default"])(req.params.useremail);

                if (user) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  message: 'The user with the given email was not found'
                }));

              case 3:
                _validateUserStatus = (0, _status["default"])(req.body), error = _validateUserStatus.error;

                if (!error) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(error.details[0].message));

              case 6:
                Object.assign(user, {
                  status: req.body.status
                });
                email = user.email, firstName = user.firstName, lastName = user.lastName, password = user.password, address = user.address, status = user.status;
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    address: address,
                    status: status
                  }
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function adminVerifyUser(_x, _x2) {
        return _adminVerifyUser.apply(this, arguments);
      }

      return adminVerifyUser;
    }()
  }]);
  return adminUserController;
}();

var _default = adminUserController;
exports["default"] = _default;