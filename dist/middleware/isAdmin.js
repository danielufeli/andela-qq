"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var checkIsAdmin = function checkIsAdmin(req, res, next) {
  if (req.user.isAdmin === false) {
    return res.status(401).send({
      status: 401,
      error: 'Access Denied, you need to be an Admin to gain access'
    });
  }

  return next();
};

var _default = checkIsAdmin;
exports["default"] = _default;