const request = require('supertest');
const main = require('./ejs_trial_server.js'); //reference to index.js 

describe('GET /', function () {
    it('list of facility types and structure type of them on database', function (done) {
        request(main)
            done();
    });
});

