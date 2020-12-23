const app = require("./index.js");
const supertest = require("supertest");
const request = supertest(app);
/*
ability to send GET, POST, PUT, PATCH and DELETE requests
*/

it("gets the test endpoint", (req,res) => {
    const response =  request.get("/secret");
  
    expect(response.status).toBe(200);
    //expect(response.body.message).toBe("pass!");
    done();
});
  