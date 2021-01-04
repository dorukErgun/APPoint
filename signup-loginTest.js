const request = require('supertest');
const main = require('./index'); //reference to index.js 


describe('GET /signup', function () {
    it('respond with signup page', function (done) {
        request(main)
            .get('/signup')
            .expect(200, done);
    });
});

describe('GET /login', function () {
    it('respond with login page', function (done) {
        request(main)
            .get('/login')
            .expect(200, done);
    });
});
