"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userInfo = {
  signup: {
    email: 'danielufeli@yahoo.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  user: {
    email: 'user@quickcredit.com',
    password: 'Domi@2019'
  },
  repaidUser: {
    email: 'user1@quickcredit.com',
    password: 'Domi@2019'
  },
  adminUser: {
    email: 'admin@quickcredit.com',
    password: 'Domi@2019'
  },
  signup2: {
    email: 'kelly@gmail.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: '26, Fagbeyiro Street, Alakuko',
    status: 'verified',
    isAdmin: true
  },
  user2: {
    email: 'kelly@gmail.com',
    password: 'Domi@2019'
  },
  signupEmailOmitted: {
    email: '',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  invalidEmail: {
    email: 'daniel:daniel.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  ommitedFirstname: {
    email: 'daniel@daniel.com',
    mobileno: '08082205956',
    firstName: '',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  ommitedLastname: {
    email: 'daniel@daniel.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: '',
    password: 'Dom@2019',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  ommitedPassword: {
    email: 'daniel@daniel.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: '',
    address: '26, Fagbeyiro Street, Alakuko'
  },
  ommitedAddress: {
    email: 'daniel@daniel.com',
    mobileno: '08082205956',
    firstName: 'Daniel',
    lastName: 'Ufeli',
    password: 'Domi@2019',
    address: ''
  },
  pass: {
    password: 'Domi@2019'
  },
  email: {
    email: 'danielufeli@yahoo.com'
  },
  invalidUser: {
    email: 'danielufeliyahoo.com',
    password: 'Domi@2019'
  },
  invalidpassword: {
    email: 'danielufeliyahoo.com',
    password: 'd'
  }
};
var _default = userInfo;
exports["default"] = _default;