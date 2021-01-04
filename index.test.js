log = console.log;
expect = require('chai').expect;
should = require('chai').should();
_ = require('lodash');

describe('#mocha basics',()=>{
    //unit tests are here

    it('true should be true',()=>{
        true.should.be.true;
        //or
        // expect(true).to.be.true; 
    });
})

//user.js

const getUserSchema = require('./models/user');
describe('#userSchema',()=>{
    it('should be an object.',()=>{
        const userSchema = getUserSchema();
        _.isObject(userSchema).should.be.true;
    })

    it('should be string',()=>{
        const userSchema = getUserSchema();
    })
})

//facility.js 

const getFacilitySchema = require('./models/facility');
describe('#facilitySchema',()=>{
    it('should be an object.',()=>{
        const facilitySchema = getFacilitySchema();
        _.isObject(facilitySchema).should.be.true;
    })
})

/*
const getDateSchema = require('./models/appointment');
describe('#appointmentSchema - date',()=>{
    it('should be object.',()=>{
        const dateSchema = getDateSchema();
        expect(_.isObject(dateSchema)).to.be.true;
    })
})
*/



