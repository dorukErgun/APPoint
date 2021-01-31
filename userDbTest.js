const request = require('supertest');
const main = require('./index'); //reference to index.js 
var chai      = require('chai');
var expect    = chai.expect;
var mongoose  = require('mongoose');
var User      = require('./../models/user.js');
describe('Testing the routes', function(){

    before('connect', function(){
        return mongoose.createConnection('mongodb://localhost/signup')
    })

    beforeEach(function(){
        return User.remove({})
    })

    beforeEach(function(){
        var newUser = new User();
        newUser.firstName  = "Username1";
        newUser.lastName = "UserLastname1";
        newUser.email  = "asd@gmail.com";
        newUser.gender   = "male";
        isCustomer = true;
        return newUser.save();
    });

    it('should list all information of user GET', function(done){
        var url = 'http://localhost:3000/signup';
        request.get(url, (error, response, body) => {
            if (error) done(error)
            expect(body).to.be.an('array');
            expect(body.length).to.equal(1);
            done();
        });
    });
});