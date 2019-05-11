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

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _users = _interopRequireDefault(require("../helpers/validation/users"));

var _signin = _interopRequireDefault(require("../helpers/validation/signin"));

var _authtok = _interopRequireDefault(require("../helpers/authtok"));

var _currentUser = _interopRequireDefault(require("../helpers/currentUser"));

_dotenv["default"].config();
/**
 *
 *
 * @class userController
 */


var userController =
/*#__PURE__*/
function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }

  (0, _createClass2["default"])(userController, null, [{
    key: "userSignup",

    /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof userController
     */
    value: function () {
      var _userSignup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _validateUser, error, user, hash, _user, id, firstName, lastName, email, mobileno, isAdmin, userToken;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validateUser = (0, _users["default"])(req.body), error = _validateUser.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(error.details[0].message));

              case 3:
                _context.next = 5;
                return (0, _currentUser["default"])(req.body.email);

              case 5:
                user = _context.sent;

                if (!user) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(401).json('User Already Registered.'));

              case 8:
                hash = _authtok["default"].hashPassword(req.body.password);
                user = new _user2["default"](req.body.email, req.body.mobileno, req.body.firstName, req.body.lastName, hash, req.body.address);
                _context.next = 12;
                return user.save();

              case 12:
                _user = user, id = _user.id, firstName = _user.firstName, lastName = _user.lastName, email = _user.email, mobileno = _user.mobileno, isAdmin = _user.isAdmin;
                userToken = _authtok["default"].generateToken(id, isAdmin);
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    token: userToken,
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    mobileno: mobileno,
                    email: email
                  }
                }));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function userSignup(_x, _x2) {
        return _userSignup.apply(this, arguments);
      }

      return userSignup;
    }()
    /**
    *
    *
    * @static
    * @param {*} req
    * @param {*} res
    * @returns
    * @memberof userController
    */

  }, {
    key: "userSignin",
    value: function () {
      var _userSignin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _validateSignin, error, user, validPassword, id, firstName, lastName, email, mobileno, isAdmin, userToken;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validateSignin = (0, _signin["default"])(req.body), error = _validateSignin.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send(error.details[0].message));

              case 3:
                _context2.next = 5;
                return (0, _currentUser["default"])(req.body.email);

              case 5:
                user = _context2.sent;

                if (user) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: 'Your email or password is incorrect'
                }));

              case 8:
                validPassword = _authtok["default"].comparePassword(user.password, req.body.password);

                if (validPassword) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: 'Your email or password is incorrect'
                }));

              case 11:
                id = user.id, firstName = user.firstName, lastName = user.lastName, email = user.email, mobileno = user.mobileno, isAdmin = user.isAdmin;
                userToken = _authtok["default"].generateToken(id, isAdmin);
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    token: userToken,
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    mobileno: mobileno,
                    email: email
                  }
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function userSignin(_x3, _x4) {
        return _userSignin.apply(this, arguments);
      }

      return userSignin;
    }()
  }]);
  return userController;
}();

var _default = userController;
exports["default"] = _default;