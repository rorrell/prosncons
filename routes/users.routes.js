const express = require('express')
  , controller = require('../controllers/users.controller')
  , router = express.Router()

router.get('/register', controller.register)

router.post('/register', controller.registrationPost)

module.exports = router