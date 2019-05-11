"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

var _userInfo = _interopRequireDefault(require("./userInfo"));

var _loanInfo = _interopRequireDefault(require("./loanInfo"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Test Loan Repayment endpoints for admin', function () {
  var userToken;
  var adminToken;
  before(function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_userInfo["default"].repaidUser).end(function (err, res) {
      res.status.should.be.equal(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      userToken = res.body.data.token;
    });

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_userInfo["default"].adminUser).end(function (err, res) {
      res.status.should.be.equal(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      adminToken = res.body.data.token;
      done();
    });
  });
  it('Should fail if token is not an admin token', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/2/repayment').set('x-auth-token', userToken).send(_loanInfo["default"].repaymentAmount).end(function (err, res) {
      res.status.should.be.equal(401);
      done();
    });
  });
  it('Should post loan repayment transaction in favour of a client', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/2/repayment').set('x-auth-token', adminToken).send(_loanInfo["default"].repaymentAmount).end(function (err, res) {
      res.status.should.be.equal(201);

      _chai.assert.equal(res.body.data.paidAmount, 2625.00);

      done();
    });
  });
  it('Should fail if paid amount is invalid', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/2/repayment').set('x-auth-token', adminToken).send(_loanInfo["default"].invalidAmount).end(function (err, res) {
      res.status.should.be.equal(400);
      done();
    });
  });
  it('Should fail if paid amount is higher than the balance', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/2/repayment').set('x-auth-token', adminToken).send(_loanInfo["default"].highAmount).end(function (err, res) {
      res.status.should.be.equal(400);
      done();
    });
  });
  it('Should fail if loan is not approved', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/2/repayment').set('x-auth-token', adminToken).send(_loanInfo["default"].repayStatus).end(function (err, res) {
      res.status.should.be.equal(400);
      done();
    });
  });
  it('Should get all repayment loan history', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans/2/repayments').set('x-auth-token', userToken).send().end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should fail to get all repayment loan history if its not the user that created the loan', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans/3/repayments').set('x-auth-token', userToken).send().end(function (err, res) {
      res.status.should.be.equal(401);
      done();
    });
  });
  it('Should fail to get all repayment loan history if loan id not provided', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans/a/repayments').set('x-auth-token', userToken).send().end(function (err, res) {
      res.status.should.be.equal(400);
      done();
    });
  });
});