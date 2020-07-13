var chai  = require('chai');
var request = require('request');
var domain = 'http://localhost:3000/'
describe('Authentication', function() {
  it('can login', function(done){

    let user_input = {
      "name": "John Wick",
      "email": "john@wick.com",
      "password": "secret"
    }
    //send /POST request to /register
    chai.request(app).post('/register').send(user_input).then(res => {
      //validate
      expect(res).to.have.status(201);
      expect(res.body.message).to.be.equal('User registered')

      //done after all assertions pass
      done();
    }).catch(err => {
      console.log(err);
    });


    request(domain, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('can logout', function(done) {
    request(domain , function(error, response, body) {
      expect(body).to.equal('Hello World');
      done();
    });
  });

  /*describe ('About page', function() {
    it('status', function(done){
      request(domain+'/about', function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

  });*/
});