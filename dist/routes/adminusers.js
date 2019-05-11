"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adminusers = _interopRequireDefault(require("../controllers/adminusers"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin"));

var router = _express["default"].Router(); // @route Get api/v1/users/test
// @desc Test post route
// @access Public


router.patch('/:useremail/verify', _auth["default"].verifyToken, _isAdmin["default"], _adminusers["default"].adminVerifyUser);
var _default = router;
exports["default"] = _default;