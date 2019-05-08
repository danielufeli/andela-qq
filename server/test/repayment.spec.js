import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

let token;

describe('Test Loan Repayment endpoints', () => {
  it('Should signup a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'olas@gmail.com',
        mobileno: '08105334020',
        firstName: 'Ola',
        lastName: 'Steve',
        password: 'Domi@2019',
        address: '26, Fagbeyiro Street, Alakuko',
        status: 'verified',
        isAdmin: false,
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('Should signin a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send({
        email: 'olas@gmail.com',
        password: 'Domi@2019',
      })
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        token = res.body.data.token;
        done();
      });
  });
  it('Should post loan repayment transaction in favour of a client', (done) => {
    chai.request(server)
      .post('/api/v1/loans/4/repayment')
      .set('x-auth-token', token)
      .send({
        paidAmount: 2625.00,
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        done();
      });
  });
  it('Should fail if paid amount is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/loans/4/repayment')
      .set('x-auth-token', token)
      .send({
        paidAmount: 'abcdef',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('Should get all repayment loan history', (done) => {
    chai.request(server)
      .get('/api/v1/loans/4/repayments')
      .set('x-auth-token', token)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
  it('Should fail to get all repayment loan history if its not the user that created the loan', (done) => {
    chai.request(server)
      .get('/api/v1/loans/3/repayments')
      .set('x-auth-token', token)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });
});
