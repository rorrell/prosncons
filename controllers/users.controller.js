const validation = require('../helpers/validation.helper')
  , User = require('../models/User.model')

module.exports = {
  register: (req, res) => {
    res.render('users/register', {
      title: 'Register'
    })
  },
  registrationPost: (req, res, next) => {
    let errors = validation.validateRegistration(req.body)
    if(errors > 0) {
      res.render('users/register', {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        errors: errors
      })
    } else {
      new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).save((err, user) => {
        if(err) {
          next(err)
        }
        req.flash('success_msg', `You are now registered and can log in with the user name ${user.email}`)
        res.redirect('/comparisons')
      })
    }
  }
}