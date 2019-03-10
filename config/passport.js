const LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcryptjs')
  , User = require('../models/User.model')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'No user found with that email' })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}