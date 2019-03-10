const expect = require('chai').expect
  , request = require('supertest')
  , app = require('../../server')
  , Handlebars = require('handlebars')
  , fs = require('fs')
  , mongoose = require('mongoose')

var connection, started
describe('The auth routes', () => {
  before((done) => {
    connection = app.listen(() => {
      console.log('test server started')
      started = true
      done()
    })
  })
  beforeEach((done) => {
    expect(started).to.be.true
    done()
  })
  after((done) => {
    connection.close()
    started = false
    mongoose.connection.close()
    console.log('test server stopped')
    done()
  })
  it('Should return 200 for GET /auth/login', (done) => {
    request(app).get('/auth/login')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(200)
        fs.readFile('views/auth/login.handlebars', 'utf8', (err, data) => {
          expect(err).to.be.null
          var template = Handlebars.compile(data)
          var result = template({ title: 'Login' })
          expect(res.text).to.contain(result)
          done()
        })
      })
  })
  it('Should return 302 for GET /auth/logout', (done) => {
    request(app).get('/auth/logout')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.statusCode).to.equal(302) //redirect
        expect(res.header.location).to.equal('/auth/login')
        done()
      })
  })
  // it('Should return 302 for POST /auth/login', (done) => {
  //   let data = 'email=rachel.orrell@gmail.com&password=test'
  //   request(app).post('/auth/login')
  //     .send(data)
  //     .expect((res) => {
  //       expect(err).to.be.null
  //       console.log(res.statusCode)
  //       done()
  //     })
  // })
})