"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _users = _interopRequireDefault(require("./users"));

var _adminusers = _interopRequireDefault(require("./adminusers"));

var _loans = _interopRequireDefault(require("./loans"));

var _swagger = _interopRequireDefault(require("../../config/swagger"));

var _default = function _default(app) {
  app.use(_bodyParser["default"].urlencoded({
    extended: false
  }));
  app.use(_bodyParser["default"].json());
  app.use('/api/v1/auth', _users["default"]);
  app.use('/api/v1/users', _adminusers["default"]);
  app.use('/api/v1/loans', _loans["default"]);
  app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
};

exports["default"] = _default;