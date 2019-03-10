const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Schema
const ComparisonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  considerations: [{
    considerationDescription: {
      type: String,
      required: true
    },
    considerationWeight: {
      type: Number
    },
    considerationIsPositive: {
      type: Boolean,
      required: true
    },
    considerationDate: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

ComparisonSchema.methods.sumConsiderations = function() {
  var total = 0
  for (consideration of this.considerations) {
    if(consideration.considerationIsPositive) {
      total += consideration.considerationWeight
    } else {
      total -= consideration.considerationWeight
    }
  }
  return total
}

module.exports = mongoose.model('comparisons', ComparisonSchema)