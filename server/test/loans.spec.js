import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import userInfo from './userInfo';
import loanInfo from './loanInfo';

chai.use(chaiHttp);
chai.should();

describe('Test loan endpoints User', () => {
  let userToken;
  beforeEach(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.user);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    userToken = res.body.data.token;
  });
  it('should create a loan', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', userToken)
      .send({ amount: 10000, tenor: 2 });
    res.status.should.be.equal(201);
    res.body.data.should.have.property('token');
  });
  it('Should not allow user to create another loan if status is pending', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.newLoan);
    res.status.should.be.equal(409);
    res.body.message.should.have.eql('You have a pending loan with us');
  });
  it('Should fail if amount is ommited', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.ommitAmount);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('Enter Loan amount');
  });
  it('Should fail if tenor is ommited', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.ommitTenor);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('Enter how many months you need to pay back');
  });
});

describe('Test loan endpoints Admin', () => {
  let adminToken;
  beforeEach(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.adminUser);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    adminToken = res.body.data.token;
  });
  it('Should fail if invalid token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', 'iihhhjjjkk')
      .send(loanInfo.newLoan);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should deny access without token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', '')
      .send(loanInfo.newLoan);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should get all loan applications', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans')
      .set('x-auth-token', adminToken)
      .send();
    res.status.should.be.equal(200);
  });
  it('Should not get specific loan application', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send();
    res.status.should.be.equal(200);
  });
  it('Should fail if specific loan application ID is invalid', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans/12')
      .set('x-auth-token', adminToken)
      .send();
    res.status.should.be.equal(404);
  });
  it('Should get current loans (not fully repaid)', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('x-auth-token', adminToken)
      .send();
    res.status.should.be.equal(200);
  });
  it('Should get repaid loans', async () => {
    const res = await chai.request(server)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('x-auth-token', adminToken)
      .send();
    res.status.should.be.equal(200);
  });
  it('Should allow admin to approve/reject a loan', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send(loanInfo.statusApprove);
    res.status.should.be.equal(200);
  });
  it('Should fail if approve/reject is ommited or invalid', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send(loanInfo.wrongStatus);
    res.status.should.be.equal(400);
  });
  it('Should allow admin to mark a user as verified', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/users/user2@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send(loanInfo.statusVerify);
    res.should.have.status(200);
    res.body.should.be.a('object');
  });
  it('Should fail if status is ommited', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/users/user@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send();
    res.should.have.status(400);
    res.body.error.should.have.eql('Status must be set to verified or unverified');
  });
  it('Should fail if another input other than verified or unverified is sent', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/users/user@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send(loanInfo.wrongStatus);
    res.should.have.status(400);
    res.body.error.should.have.eql('Status must be set to verified or unverified');
  });
});
