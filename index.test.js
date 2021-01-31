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


const getDateSchema = require('./models/appointment');
describe('#appointmentSchema',()=>{
    it('should be an object.',()=>{
        const dateSchema = getDateSchema();
        _.isObject(dateSchema).should.be.true;
    })
})

