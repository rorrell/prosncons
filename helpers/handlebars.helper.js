const Comparison = require('../models/Comparison.model')

function stringToBoolIfAppropriate(strOrBool) {
  return typeof(strOrBool) === 'string' ? strOrBool === 'true' : strOrBool
}
module.exports = {
  checkRadio: (bool, expectedValue, isDefault) => {
    //should be checked if condition is defined and true or if condition is undefined and default
    bool = stringToBoolIfAppropriate(bool)
    expectedValue = stringToBoolIfAppropriate(expectedValue)
    if((bool !== undefined && bool === expectedValue) ||
        (bool === undefined && isDefault)) {
          return 'checked'
    } else {
      return ''
    }
  },
  considerationTotalBadge: (comparison) => {
    var cls = 'badge badge-secondary'
    var total = comparison.sumConsiderations()
    if(total > 0) {
      cls = 'badge badge-success'
    } else if(total < 0) {
      cls = 'badge badge-danger'
    }
    return `<span class="${cls}">Total: ${total}</span>`
  }
}