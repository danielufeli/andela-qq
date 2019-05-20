import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import userInfo from './userInfo';
import loanInfo from './loanInfo';

chai.use(chaiHttp);
chai.should();

describe('Test Loan Repayment endpoints for admin', () => {
  let userToken;
  let adminToken;
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.repaidUser)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        userToken = res.body.data.token;
      });
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.adminUser)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        adminToken = res.body.data.token;
        done();
      });
  });
  it('Should fail if token is not an admin token', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', userToken)
      .send(loanInfo.repaymentAmount)
      .end((err, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });
  it('Should post loan repayment transaction in favour of a client', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.repaymentAmount)
      .end((err, res) => {
        res.status.should.be.equal(201);
        assert.equal((res.body.data.paidAmount), 2625.00);
        done();
      });
  });
  it('Should fail if paid amount is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.invalidAmount)
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('Should fail if paid amount is higher than the balance', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.highAmount)
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('Should fail if loan is not approved', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.repayStatus)
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('Should get all repayment loan history', (done) => {
    chai.request(server)
      .get('/api/v1/loans/82/repayments')
      .set('x-auth-token', userToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should fail to get all repayment loan history if its not the user that created the loan', (done) => {
    chai.request(server)
      .get('/api/v1/loans/3/repayments')
      .set('x-auth-token', userToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(500);
        done();
      });
  });
  it('Should fail to get all repayment loan history if loan id not provided', (done) => {
    chai.request(server)
      .get('/api/v1/loans/a/repayments')
      .set('x-auth-token', userToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(500);
        done();
      });
  });
});
