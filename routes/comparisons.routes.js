const express = require('express')
  , controller = require('../controllers/comparisons.controller')
  , router = express.Router()
  , expressHelper = require('../helpers/express.helper')

router.get('/', expressHelper.ensureAuthenticated, controller.listAll)

router.post('/', expressHelper.ensureAuthenticated, controller.addPost)

router.get('/add', expressHelper.ensureAuthenticated, controller.add)

router.get('/edit/:id', expressHelper.ensureAuthenticated, controller.edit)

router.get('/:id', expressHelper.ensureAuthenticated, controller.show)

router.put('/:id', expressHelper.ensureAuthenticated, controller.editPost)

router.delete('/:id', expressHelper.ensureAuthenticated, controller.delete)

router.post('/:id/considerations', expressHelper.ensureAuthenticated, controller.addConsiderationPost)

router.delete('/:id/considerations/:considerationId', expressHelper.ensureAuthenticated, controller.deleteConsideration)

router.get('/:id/considerations/:considerationId', expressHelper.ensureAuthenticated, controller.editConsideration)

module.exports = router