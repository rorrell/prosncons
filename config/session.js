const session = require('express-session')
  , MongoStore = require('connect-mongo')(session)

module.exports = function (mongooseConnection) {
  return process.env.NODE_ENV === 'production' ?
    session({
      store: new MongoStore({ mongooseConnection: mongooseConnection })
    }) :
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
}