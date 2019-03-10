const expect = require('chai').expect
  , sinon = require('sinon')
  , helper = require('../../helpers/validation.helper')

var user, consideration
const NAME_ERR = 'Please enter the user\'s name'
  , EMAIL_ERR = 'Please enter the user\'s email'
  , PASSWORD_ERR = 'Please enter the user\'s password'
  , PASSWORD2_ERR = 'Please re-enter the user\'s password'
  , PASSWORD_MATCH_ERR = 'Passwords don\'t match'
  , PASSWORD_TOO_SHORT_ERR = 'Password must be at least 4 characters long'
  , COMPARISON_NAME_ERR = 'Please enter the name for this comparison'
  , CONSIDERATION_DESC_ERR = 'Please enter a description'
  , CONSIDERATION_IS_POS_ERR = 'Please select Pro or Con'
  , CONSIDERATION_WEIGHT_NUM_ERR = 'Weight must be a number'
  , CONSIDERATION_WEIGHT_POS_ERR = 'Weight must be at least 0'

describe('Registration validation', () => {
  beforeEach(() => {
    user = {
      name: 'User1',
      email: 'test@test.com',
      password: 'test',
      password2: 'test'
    }
  })
  it('Validates a user registration must have a name', () => {
    user.name = undefined
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: NAME_ERR })

    user.name = 'Userblah'
    errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Validates a user registration must have an email', () => {
    user.email = undefined
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: EMAIL_ERR })

    user.email = 'test2@test.com'
    errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Validates a user registration must have a password', () => {
    user.password = undefined
    user.password2 = undefined
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: PASSWORD_ERR })

    user.password = 'blah'
    user.password2 = 'blah'
    errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Validate a user registration must have a password at least 4 characters long', () => {
    user.password = 'hi'
    user.password2 = 'hi'
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.deep.includes({ text: PASSWORD_TOO_SHORT_ERR })

    user.password = 'hiya'
    user.password2 = 'hiya'
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Validates a user registration must have a password2', () => {
    user.password2 = undefined
    user.password = undefined
    var errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: PASSWORD2_ERR })

    user.password2 = 'blah2'
    user.password = 'blah2'
    errors = helper.validateRegistration(user)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Validates a user registration must have passwords that match', () => {
    assertPasswordsDontMatch = (user, expectedErrors) => {
      var errors = helper.validateRegistration(user)
      if (expectedErrors && expectedErrors.length > 0) {
        expect(errors).to.be.an('array')
          .that.deep.includes.members(expectedErrors)
      } else {
        expect(errors).to.be.an('array').that.is.empty
      }
    }

    user.password = ''
    user.password2 = 'test'
    assertPasswordsDontMatch(user, [{ text: PASSWORD_ERR }])

    user.password = ''
    user.password2 = ''
    assertPasswordsDontMatch(user, [{ text: PASSWORD_ERR }, { text: PASSWORD2_ERR }])

    user.password = 'test'
    user.password2 = ''
    assertPasswordsDontMatch(user, [{ text: PASSWORD2_ERR }])

    user.password = 'test'
    user.password2 = 'TEST'
    assertPasswordsDontMatch(user, [{ text: PASSWORD_MATCH_ERR }])

    user.password = 'test'
    user.password2 = '.test.'
    assertPasswordsDontMatch(user, [{ text: PASSWORD_MATCH_ERR }])

    user.password = 'test'
    user.password2 = 'test'
    assertPasswordsDontMatch(user)
  })
})

describe('Parameter checks', () => {
  it('Ensures a request object has an id param', () => {
    var next = sinon.spy()
    var req = {
      params: {
        ID: 5
      }
    }
    var expectedError = new Error('No id specified in the URL')
    helper.checkForIdParam(req.params, next)
    expect(next.calledOnce).to.be.true
    expect(next.firstCall.args[0].message).to.equal(expectedError.message)

    var next2 = sinon.spy()
    var req2 = {
      params: {
        id: 5
      }
    }
    helper.checkForIdParam(req2.params, next2)
    expect(next2.called).to.be.false
  })
  it('Ensures a request object has a consideration id param', () => {
    var expectedError = new Error('No consideration id specified in the URL')

    var next = sinon.spy()
    var req = {
      params: {
        ID: 5
      }
    }
    helper.checkForConsiderationIdParam(req.params, next)
    expect(next.calledOnce).to.be.true
    expect(next.firstCall.args[0].message).to.equal(expectedError.message)

    var next = sinon.spy()
    var req = {
      params: {
        ConsiderationID: 5
      }
    }
    helper.checkForConsiderationIdParam(req.params, next)
    expect(next.calledOnce).to.be.true
    expect(next.firstCall.args[0].message).to.equal(expectedError.message)

    var next2 = sinon.spy()
    var req2 = {
      params: {
        considerationId: 5
      }
    }
    helper.checkForConsiderationIdParam(req2.params, next2)
    expect(next2.called).to.be.false
  })
})

describe('Comparison validation', () => {
  it('Ensures the name is present', () => {
    var comparison = {
      name: 'test',
      description: 'desc'
    }
    comparison.name = undefined
    var errors = helper.validateComparison(comparison)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: COMPARISON_NAME_ERR })

    comparison.name = 'Userblah'
    errors = helper.validateComparison(comparison)
    expect(errors).to.be.an('array').that.is.empty
  })
})

describe('Consideration validation', () => {
  beforeEach(() => {
    consideration = {
      considerationDescription: 'testDescription',
      considerationIsPositive: true,
      considerationWeight: 0
    }
  })
  it('Ensures a description is present', () => {
    consideration.considerationDescription = undefined
    var errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: CONSIDERATION_DESC_ERR })

    consideration.considerationDescription = 'test'
    errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Ensures an indication of whether the consideration is positive is present', () => {
    consideration.considerationIsPositive = undefined
    var errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: CONSIDERATION_IS_POS_ERR })

    consideration.considerationIsPositive = false
    errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Ensures a weight is present and a number', () => {
    consideration.considerationWeight = undefined
    var errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: CONSIDERATION_WEIGHT_NUM_ERR })

    consideration.considerationWeight = 'k'
    var errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: CONSIDERATION_WEIGHT_NUM_ERR })

    consideration.considerationWeight = 0
    errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array').that.is.empty
  })
  it('Ensures a weight is at least 0', () => {
    consideration.considerationWeight = -1
    var errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array')
      .that.deep.includes({ text: CONSIDERATION_WEIGHT_POS_ERR })

    consideration.considerationWeight = 0
    var errors = helper.validateConsideration(consideration)
    errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array').that.is.empty

    consideration.considerationWeight = 1
    errors = helper.validateConsideration(consideration)
    expect(errors).to.be.an('array').that.is.empty
  })
})