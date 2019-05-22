import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import userInfo from './userInfo';
import loanInfo from './loanInfo';

chai.use(chaiHttp);
chai.should();

describe('Test Loan Repayment endpoints for admin', () => {
  let adminToken;
  before(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.adminUser);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    adminToken = res.body.data.token;
  });
  it('Should post loan repayment transaction in favour of a client', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/1/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.repaymentAmount);
    res.status.should.be.equal(201);
  });
  it('Should fail if paid amount is invalid', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.invalidAmount);
    res.status.should.be.equal(400);
  });
  it('Should fail if paid amount is higher than the balance', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/1/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.highAmount);
    res.status.should.be.equal(400);
  });
  it('Should fail if loan is not approved', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('x-auth-token', adminToken)
      .send(loanInfo.repayStatus);
    res.status.should.be.equal(400);
  });
});
describe('Test Loan Repayment endpoints for user', () => {
  let userToken;
  before(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.repaidUser);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    userToken = res.body.data.token;
  });
  it('Should fail if token is not an admin token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/1/repayment')
      .set('x-auth-token', userToken)
      .send(loanInfo.repaymentAmount);
    res.status.should.be.equal(401);
  });
  it('Should get all repayment loan history', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans/1/repayments')
      .set('x-auth-token', userToken)
      .send();
    res.status.should.be.equal(200);
  });
  it('Should fail to get all repayment loan history if its not the user that created the loan', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans/10/repayments')
      .set('x-auth-token', userToken)
      .send();
    res.status.should.be.equal(500);
  });
});
