"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

var _userInfo = _interopRequireDefault(require("./userInfo"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Test signup endpoints', function () {
  it('Should signup a user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].signup).end(function (err, res) {
      res.status.should.be.equal(201);

      _chai.assert.equal(res.body.data.id, 4);

      _chai.assert.equal(res.body.data.firstName, 'Daniel');

      _chai.assert.equal(res.body.data.lastName, 'Ufeli');

      _chai.assert.equal(res.body.data.mobileno, '08082205956');

      _chai.assert.equal(res.body.data.email, 'danielufeli@yahoo.com');

      res.body.data.should.have.property('token');
      done();
    });
  });
  it('Should fail if email is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].signupEmailOmitted).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"email" is not allowed to be empty');
      done();
    });
  });
  it('Should fail if email is invalid', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].invalidEmail).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"email" must be a valid email');
      done();
    });
  });
  it('Should fail if firstName is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].ommitedFirstname).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"firstName" is not allowed to be empty');
      done();
    });
  });
  it('Should fail if lastName is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].ommitedLastname).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"lastName" is not allowed to be empty');
      done();
    });
  });
  it('Should fail if password is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].ommitedPassword).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"password" is not allowed to be empty');
      done();
    });
  });
  it('Should fail if address is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup/').send(_userInfo["default"].ommitedAddress).end(function (err, res) {
      res.status.should.be.equal(400);
      res.body.should.have.eql('"address" is not allowed to be empty');
      done();
    });
  });
});
describe('Test signin endpoints', function () {
  it('Should signin a user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(_userInfo["default"].user).end(function (err, res) {
      res.status.should.be.equal(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      done();
    });
  });
  it('should fail if email is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(_userInfo["default"].pass).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should fail if password is ommited', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(_userInfo["default"].email).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should fail if Email is invalid', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(_userInfo["default"].invalidUser).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should fail if Password is invalid', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin/').send(_userInfo["default"].invalidpassword).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
});