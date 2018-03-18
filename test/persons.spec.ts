import chai = require('chai');
import chaiHttp = require('chai-http');
import * as m from 'mocha';
process.env.NODE_ENV = 'test';
import { app } from '../src/index';
import Person from '../src/models/person';

const should = chai.use(chaiHttp).should();

describe('Persons', () => {

  beforeEach(done => {
    Person.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for persons', () => {

    it('should get all the persons', done => {
      chai.request(app)
        .get('/api/persons')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get persons count', done => {
      chai.request(app)
        .get('/api/persons/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new person', done => {
      const person = new Person({ name: 'user1', weight: 50, age: 21 });
      chai.request(app)
        .post('/api/person')
        .send(person)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a person by its id', done => {
      const person = new Person({ name: 'user1', weight: 50, age: 21 });
      person.save((error, newPerson) => {
        chai.request(app)
          .get(`/api/person/${newPerson.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newPerson.id);
            done();
          });
      });
    });

    it('should update a person by its id', done => {
      const person = new Person({ name: 'user1', weight: 50, age: 21 });
      person.save((error, newPerson) => {
        chai.request(app)
          .put(`/api/person/${newPerson.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a person by its id', done => {
      const person = new Person({ name: 'user1', weight: 50, age: 21 });
      person.save((error, newPerson) => {
        chai.request(app)
          .del(`/api/person/${newPerson.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


