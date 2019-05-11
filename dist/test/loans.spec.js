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

describe('Test loan endpoints User', function () {
  var adminToken;
  var userToken;
  before(function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(_userInfo["default"].user).end(function (err, res) {
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
  it('Should fail if invalid token', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans').set('x-auth-token', 'iihhhjjjkk').send(_loanInfo["default"].newLoan).end(function (err, res) {
      res.status.should.be.equal(403);
      res.body.should.be.a('object');
      done();
    });
  });
  it('Should deny access without token', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans').set('x-auth-token', '').send(_loanInfo["default"].newLoan).end(function (err, res) {
      res.status.should.be.equal(403);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should create a loan', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans').set('x-auth-token', userToken).send(_loanInfo["default"].newLoan).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');

      _chai.assert.equal(res.body.data.amount, 10000);

      _chai.assert.equal(res.body.data.tenor, 2);

      done();
    });
  });
  it('Should not allow user to create another loan if status is pending', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/').set('x-auth-token', userToken).send(_loanInfo["default"].newLoan).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.message.should.have.eql('You have a pending loan with us');
      done();
    });
  });
  it('Should fail if amount is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/').set('x-auth-token', userToken).send(_loanInfo["default"].ommitAmount).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('Enter Loan amount');
      done();
    });
  });
  it('Should fail if tenor is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/loans/').set('x-auth-token', userToken).send(_loanInfo["default"].ommitTenor).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('Enter how many months you need to pay back');
      done();
    });
  });
  it('Should get all loan applications', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should get specific loan application', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans/1').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should fail if specific loan application ID is invalid', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans/12').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.status.should.be.equal(404);
      done();
    });
  });
  it('Should get current loans (not fully repaid)', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans?status=approved&repaid=false').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should get repaid loans', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/loans?status=approved&repaid=true').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should allow admin to approve/reject a loan', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/loans/1').set('x-auth-token', adminToken).send(_loanInfo["default"].statusApprove).end(function (err, res) {
      res.status.should.be.equal(200);
      done();
    });
  });
  it('Should fail if approve/reject is ommited or invalid', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/loans/1').set('x-auth-token', adminToken).send(_loanInfo["default"].wrongStatus).end(function (err, res) {
      res.status.should.be.equal(400);
      done();
    });
  });
  it('Should allow admin to mark a user as verified', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/users/user@quickcredit.com/verify/').set('x-auth-token', adminToken).send(_loanInfo["default"].statusVerify).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('Should fail if status is ommited', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/users/user@quickcredit.com/verify/').set('x-auth-token', adminToken).send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.eql('Status must be set to verified or unverified');
      done();
    });
  });
  it('Should fail if another input other than verified or unverified is sent', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/users/user@quickcredit.com/verify/').set('x-auth-token', adminToken).send(_loanInfo["default"].wrongStatus).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.eql('Status must be set to verified or unverified');
      done();
    });
  });
});