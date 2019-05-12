import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

describe('Test signup endpoints', () => {
  it('Should signup a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.signup)
      .end((err, res) => {
        res.status.should.be.equal(201);
        assert.equal((res.body.data.id), 4);
        assert.equal((res.body.data.firstName), 'Daniel');
        assert.equal((res.body.data.lastName), 'Ufeli');
        assert.equal((res.body.data.mobileno), '08082205956');
        assert.equal((res.body.data.email), 'danielufeli@yahoo.com');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('Should fail if email is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.signupEmailOmitted)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"email" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidEmail)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"email" must be a valid email');
        done();
      });
  });
  it('Should fail if firstName is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedFirstname)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"firstName" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if lastName is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedLastname)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"lastName" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if password is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedPassword)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"password" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if address is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedAddress)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"address" is not allowed to be empty');
        done();
      });
  });
});
describe('Test signin endpoints', () => {
  it('Should signin a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.user)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('should fail if email is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.pass)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if password is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.email)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if Email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if Password is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidpassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
