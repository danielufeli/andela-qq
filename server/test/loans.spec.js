import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userInfo from './userInfo';
import loanInfo from './loanInfo';

chai.use(chaiHttp);
chai.should();

describe('Test loan endpoints User', () => {
  let adminToken;
  let userToken;
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.user)
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
  it('Should fail if invalid token', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', 'iihhhjjjkk')
      .send(loanInfo.newLoan)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should deny access without token', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', '')
      .send(loanInfo.newLoan)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should create a loan', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('x-auth-token', userToken)
      .send(loanInfo.newLoan)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        assert.equal((res.body.data.amount), 10000);
        assert.equal((res.body.data.tenor), 2);
        done();
      });
  });
  it('Should not allow user to create another loan if status is pending', (done) => {
    chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.newLoan)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.message.should.have.eql('You have a pending loan with us');
        done();
      });
  });
  it('Should fail if amount is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.ommitAmount)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('Enter Loan amount');
        done();
      });
  });
  it('Should fail if tenor is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/loans/')
      .set('x-auth-token', userToken)
      .send(loanInfo.ommitTenor)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('Enter how many months you need to pay back');
        done();
      });
  });
  it('Should get all loan applications', (done) => {
    chai.request(server)
      .get('/api/v1/loans')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should get specific loan application', (done) => {
    chai.request(server)
      .get('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should fail if specific loan application ID is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/loans/12')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(404);
        done();
      });
  });
  it('Should get current loans (not fully repaid)', (done) => {
    chai.request(server)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should get repaid loans', (done) => {
    chai.request(server)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should allow admin to approve/reject a loan', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send(loanInfo.statusApprove)
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should fail if approve/reject is ommited or invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/1')
      .set('x-auth-token', adminToken)
      .send(loanInfo.wrongStatus)
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('Should allow admin to mark a user as verified', (done) => {
    chai.request(server)
      .patch('/api/v1/users/user@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send(loanInfo.statusVerify)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should fail if status is ommited', (done) => {
    chai.request(server)
      .patch('/api/v1/users/user@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.eql('Status must be set to verified or unverified');
        done();
      });
  });
  it('Should fail if another input other than verified or unverified is sent', (done) => {
    chai.request(server)
      .patch('/api/v1/users/user@quickcredit.com/verify/')
      .set('x-auth-token', adminToken)
      .send(loanInfo.wrongStatus)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.eql('Status must be set to verified or unverified');
        done();
      });
  });
});
