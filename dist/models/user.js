"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var users = [{
  id: 1,
  email: 'admin@quickcredit.com',
  mobileno: '08082205956',
  firstName: 'Daniel',
  lastName: 'Ufeli',
  password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
  address: '26, Fagbeyiro Street, Alakuko',
  status: 'verified',
  isAdmin: true
}, {
  id: 2,
  email: 'user@quickcredit.com',
  mobileno: '08082205956',
  firstName: 'Daniel',
  lastName: 'Ufeli',
  password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
  address: '26, Fagbeyiro Street, Alakuko',
  status: 'verified',
  isAdmin: false
}, {
  id: 3,
  email: 'user1@quickcredit.com',
  mobileno: '08082205956',
  firstName: 'Daniel',
  lastName: 'Ufeli',
  password: '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe',
  address: '26, Fagbeyiro Street, Alakuko',
  status: 'verified',
  isAdmin: false
}];

var User =
/*#__PURE__*/
function () {
  function User(email, mobileno, firstName, lastName, password, address) {
    (0, _classCallCheck2["default"])(this, User);
    this.id = users.length + 1;
    this.email = email;
    this.mobileno = mobileno;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.address = address;
    this.status = 'unverified';
    this.isAdmin = false;
  }

  (0, _createClass2["default"])(User, [{
    key: "save",
    value: function save() {
      users.push(this);
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return users;
    }
  }]);
  return User;
}();

var _default = User;
exports["default"] = _default;