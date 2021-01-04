/**
 * Testing get all / endpoint
 */

const request = require('supertest');
const main = require('./index'); //reference to index.js 

describe('GET /', function () {
    it('respond with main page', function (done) {
        request(main)
            .get('/')
            .expect(200, done);
    });
});

