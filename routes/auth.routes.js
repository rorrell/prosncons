const express = require('express')
  , controller = require('../controllers/auth.controller')
  , router = express.Router()

router.get('/login', controller.login)

router.post('/login', controller.loginPost)

router.get('/logout', controller.logout)

module.exports = router