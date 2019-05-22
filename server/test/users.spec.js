import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

let request;
beforeEach(async () => {
  request = await chai.request(server);
});

describe('Test signup endpoints', () => {
  it('Should signup a user', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signup, (err, res) => {
        res.status.should.be.equal(201);
        assert.equal((res.body.data.firstname), 'Daniel');
        assert.equal((res.body.data.lastname), 'Ufeli');
        assert.equal((res.body.data.mobileno), '0808220595611');
        assert.equal((res.body.data.email), 'danielufeli11@yahoo.com');
        res.body.data.should.have.property('token');
        console.log(res.body.data.token);
      });
  });
  it('Should fail if email is ommited', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signupEmailOmitted, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"email" is not allowed to be empty');
      });
  });
  it('Should fail if email is invalid', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidEmail, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"email" must be a valid email');
      });
  });
  it('Should fail if firstName is ommited', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedFirstname, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"firstName" is not allowed to be empty');
      });
  });
  it('Should fail if lastName is ommited', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedLastname, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"lastName" is not allowed to be empty');
      });
  });
  it('Should fail if password is ommited', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedPassword, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"password" is not allowed to be empty');
      });
  });
  it('Should fail if address is ommited', async () => {
    await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.ommitedAddress, (err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.have.eql('"address" is not allowed to be empty');
      });
  });
});
describe('Test signin endpoints', () => {
  it('Should signin a user', async () => {
    await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.user, (err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
      });
  });
  it('should fail if email is ommited', async () => {
    await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.pass, (err, res) => {
        res.should.have.status(400);
      });
  });
  it('should fail if password is ommited', async () => {
    await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.email, (err, res) => {
        res.should.have.status(400);
      });
  });
  it('should fail if Email is invalid', async () => {
    await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidUser, (err, res) => {
        res.should.have.status(400);
      });
  });
  it('should fail if Password is invalid', async () => {
    await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidpassword, (err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });
  });
});
