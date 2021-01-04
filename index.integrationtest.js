const log = console.log;
const _ = require('lodash');
const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use('chaiAsPromised');

const restify = require('restify');

const startServer = require('./index');
const { deleteOne } = require('./models/user');

describe('#index integration',()=>{
    let server;
    let client;
    let getURL;

    before(()=>{
        startServer()
        .then((result)=>{
            server = result;
            done();
        })
        .catch(done);
    })

    after(()=>{
        server.close();
    })
})