"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return function (err, req, res, next) {
    res.status(500).json('Something Failed.');
    res.status(404).json('Error 404, no data was retrieved please');
  };
};

exports["default"] = _default;