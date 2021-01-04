const request = require('supertest');
const main = require('./index'); //reference to index.js 

describe('GET /profile', function () {
    it('respond with profil page', function (done) {
        request(main)
            .get('/profile')
            //.render('profile')
            .expect(302, done);
    });
});

