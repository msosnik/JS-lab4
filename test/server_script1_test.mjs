/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */
// Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
// const supertest = require('supertest');
import supertest from 'supertest';
// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:8000');
// UNIT test begin
describe('GET /', () => {
    it('responds with "HTML form"', (done) => {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, /form/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
describe('GET /submit', () => {
    it('responds with welcome', (done) => {
        server
            .get('/submit')
            .query({ name: 'róża' })
            .expect(200, 'Hello róża')
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});
describe('POST /', () => {
    it('responds with welcome', (done) => {
        server
            .post('/')
            .type('form')
            .send({ name: 'róża' })
            .expect(200, 'Hello róża')
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});
// UNIT test end