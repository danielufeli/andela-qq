import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Test signup endpoints', () => {
  it('Should singup a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'danielufeli@yahoo.com',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: 'Ufeli',
        password: 'Dom@2019',
        address: '26, Fagbeyiro Street, Alakuko',
        status: 'unverified',
        isAdmin: false,
      })
      .end((err, res) => {
        res.status.should.be.equal(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('Should fail if email is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: '',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: 'Ufeli',
        password: 'Dom@2019',
        address: '26, Fagbeyiro Street, Alakuko',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"email" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'daniel:daniel.com',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: 'Ufeli',
        password: 'Dom@2019',
        address: '26, Fagbeyiro Street, Alakuko',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"email" must be a valid email');
        done();
      });
  });
  it('Should fail if firstName is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'daniel@daniel.com',
        mobileno: '08082205956',
        firstName: '',
        lastName: 'Ufeli',
        password: 'Dom@2019',
        address: '26, Fagbeyiro Street, Alakuko',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"firstName" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if lastName is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'daniel@daniel.com',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: '',
        password: 'Dom@2019',
        address: '26, Fagbeyiro Street, Alakuko',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"lastName" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if password is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'daniel@daniel.com',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: 'Ufeli',
        password: '',
        address: '26, Fagbeyiro Street, Alakuko',
      })
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.should.have.eql('"password" is not allowed to be empty');
        done();
      });
  });
  it('Should fail if address is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup/')
      .send({
        email: 'daniel@daniel.com',
        mobileno: '08082205956',
        firstName: 'Daniel',
        lastName: 'Ufeli',
        password: 'Dom@2019',
        address: '',
      })
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
      .send({
        email: 'danielufeli@yahoo.com',
        password: 'Dom@2019',
      })
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
      .send({
        email: '',
        password: 'Dom@2019',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if password is ommited', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send({
        email: 'danielufeli@yahoo.com',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if Email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send({
        email: 'danielufeliyahoo.com',
        password: 'Domi@2019',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should fail if Password is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send({
        email: 'danielufeli@yahoo.com',
        password: 'd',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
