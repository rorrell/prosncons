const bcrypt = require('bcryptjs')

module.exports = {
  encryptPassword: function (password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10))
  },
  encryptPasswordSync: function (password) {
    return bcrypt.hashSync(password, 10)
  },
  validatePassword: function (plainTextPassword, hash) {
    return bcrypt.compare(plainTextPassword, hash)
  }
}