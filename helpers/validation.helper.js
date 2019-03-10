module.exports = {
  validateRegistration: (user) => {
    let errors = []
    if (!user.name) {
      errors.push({ text: 'Please enter the user\'s name' })
    }
    if (!user.email) {
      errors.push({ text: 'Please enter the user\'s email' })
    }
    if (!user.password) {
      errors.push({ text: 'Please enter the user\'s password' })
    }
    else if (user.password.length < 4) {
      errors.push({ text: 'Password must be at least 4 characters long' })
    }
    if (!user.password2) {
      errors.push({ text: 'Please re-enter the user\'s password' })
    }
    if (user.password && user.password2 && user.password !== user.password2) {
      errors.push({ text: 'Passwords don\'t match' })
    }
    return errors
  },
  validateComparison: (comparison) => {
    let errors = []
    if(!comparison.name) {
      errors.push({ text: 'Please enter the name for this comparison' })
    }
    return errors
  },
  checkForIdParam: (params, next) => {
    if (!params.id) {
      return next(new Error('No id specified in the URL'))
    }
  },
  validateConsideration: (consideration) => {
    let errors = []
    if(!consideration.considerationDescription) {
      errors.push({ text: 'Please enter a description' })
    }
    if(isNaN(consideration.considerationWeight)) {
      errors.push({ text: 'Weight must be a number' })
    } else if(consideration.considerationWeight < 0) {
      errors.push({ text: 'Weight must be at least 0' })
    }
    if (consideration.considerationIsPositive === undefined) {
      errors.push({ text: 'Please select Pro or Con' })
    }
    return errors
  },
  checkForConsiderationIdParam: (params, next) => {
    if (!params.considerationId) {
      return next(new Error('No consideration id specified in the URL'))
    }
  }
} 