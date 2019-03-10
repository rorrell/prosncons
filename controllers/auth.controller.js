const User = require('../models/User.model')
  , passport = require('passport')

module.exports = {
  login: (req, res) => {
    res.render('auth/login', {
      title: 'Login'
    })
  },
  loginPost: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/comparisons',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next)
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', 'You have successfully logged out')
    res.redirect('/auth/login')
  }
}