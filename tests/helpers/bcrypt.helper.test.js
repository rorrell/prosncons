const expect = require('chai').expect
  , bcryptHelper = require('../../helpers/bcrypt.helper')

describe('Bcrypt Helper methods', () => {
  it('Encrypts a password', () => {
    var plainTextPassword = 'test'
    bcryptHelper.encryptPassword(plainTextPassword)
    .then(hash => {
      expect(hash).to.be.a('string')
      expect(hash).to.not.equal(plainTextPassword)
    })
  })
  it('Decrypts a password', () => {
    var plainTextPassword = 'test'
    bcryptHelper.encryptPassword(plainTextPassword)
    .then(hash => {
      expect(hash).to.not.equal(plainTextPassword)
      bcryptHelper.validatePassword(plainTextPassword, hash)
      .then(isMatch => {
        expect(isMatch).to.be.true
      })      
    })
  })
})