const Comparison = require('../models/Comparison.model')
  , validation = require('../helpers/validation.helper')

const ADD_TITLE = 'Add Comparison'
const EDIT_TITLE = 'Edit Comparison'

function comparisonFromRequestBody(body) {
  return {
    name: body.name,
    description: body.description
  }
}

function considerationFromRequestBody(body) {
  return {
    considerationIsPositive: body.considerationIsPositive,
    considerationDescription: body.considerationDescription,
    considerationWeight: body.considerationWeight,
    id: body.considerationId
  }
}

module.exports = {
  listAll: (req, res, next) => {
    Comparison.find({
      user: req.user.id
    }).sort('-date')
    .then(comparisons => {
      res.render('comparisons/index', {
        title: 'Your Comparisons',
        comparisons: comparisons
      })
    }).catch(err => {
      next(err)
    })
  },
  add: (req, res) => {
    res.render('comparisons/add', {
      title: ADD_TITLE
    })
  },
  addPost: (req, res, next) => {
    let errors = validation.validateComparison(req.body)
    if(errors.length > 0) {
      res.render('comparisons/add', {
        title: ADD_TITLE,
        errors: errors,
        comparison: comparisonFromRequestBody(req.body)
      })
    } else {
      var comparison = comparisonFromRequestBody(req.body)
      comparison.user = req.user.id
      new Comparison(comparison)
      .save((err, comparison) => {
        if(err) {
          return next(err)
        }
        req.flash('success_msg', `Comparison saved`)
        res.redirect(`/comparisons/${comparison.id}`)
      })
    }
  },
  edit: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    Comparison.findById(req.params.id, (err, comparison) => {
      if(err) {
        return next(err)
      }
      res.render('comparisons/edit', {
        title: EDIT_TITLE,
        comparison: comparison
      })
    })
  },
  editPost: (req, res, next) => {
    validation.checkForIdParam(req.params, next)    
    let errors = validation.validateComparison(req.body)
    if(errors.length > 0) {
      res.render('comparisons/edit', {
        title: EDIT_TITLE,
        comparison: comparisonFromRequestBody(req.body)
      })
    } else {
      Comparison.findByIdAndUpdate(req.params.id, comparisonFromRequestBody(req.body), (err, comparison) => {
        if(err) {
          return next(err)
        }
        req.flash('success_msg', 'Comparison updated')
        res.redirect('/comparisons')
      })
    }
  },
  show: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    Comparison.findById(req.params.id, (err, comparison) => {
      if(err) {
        return next(err)
      }
      res.render('comparisons/show', {
        title: comparison.name,
        comparison: comparison
      })
    })
  },
  addConsiderationPost: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    let errors = validation.validateConsideration(req.body)
    var consideration = considerationFromRequestBody(req.body)
    if(errors.length > 0) {
      Comparison.findById(req.params.id, (err, comparison) => {
        if (err) {
          return next(err)
        }
        res.render('comparisons/show', {
          title: comparison.name,
          comparison: comparison,
          consideration: consideration,
          errors: errors
        })
      })
    } else {
      Comparison.findById(req.params.id, (err, comparison) => {
        if(err) {
          return next(err)
        }
        consideration.considerationIsPositive = consideration.considerationIsPositive === 'true'
        var action = 'added'
        if(consideration.id) {
          comparison.considerations.id(consideration.id).set(consideration)
          action = 'updated'
        } else {
          comparison.considerations.unshift(consideration)
        }
        comparison.save((err, comparison) => {
          if(err) {
            return next(err)
          }
          var type = consideration.considerationIsPositive ? 'Pro' : 'Con'
          req.flash('success_msg', `${type} ${action}`)
          res.redirect(`/comparisons/${req.params.id}`)
        })
      })
    }
  },
  delete: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    Comparison.findByIdAndDelete(req.params.id, (err, comparison) => {
      if(err) {
        return next(err)
      }
      req.flash('success_msg', 'Comparison successfully deleted')
      res.redirect('/comparisons')
    })
  },
  deleteConsideration: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    validation.checkForConsiderationIdParam(req.params, next)
    var considerationId = req.params.considerationId
    Comparison.findById(req.params.id, (err, comparison) => {
      if(err) {
        return next(err)
      }
      comparison.considerations.id(considerationId).remove()
      comparison.save((err, comparison) => {
        req.flash('success_msg', 'Consideration successfully deleted')
        res.redirect(`/comparisons/${req.params.id}`)
      })
    })
  },
  editConsideration: (req, res, next) => {
    validation.checkForIdParam(req.params, next)
    validation.checkForConsiderationIdParam(req.params, next)
    Comparison.findById(req.params.id, (err, comparison) => {
      if(err) {
        return next(err)
      }
      var consideration = comparison.considerations.id(req.params.considerationId)
      res.render('comparisons/show', {
        title: comparison.name,
        comparison: comparison,
        consideration: consideration
      })
    })
  }
}