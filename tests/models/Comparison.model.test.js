const expect = require('chai').expect
  , Comparison = require('../../models/Comparison.model')

function addConsideration(comparison, isPositive, weight) {
  comparison.considerations.push({
    considerationIsPositive: isPositive,
    considerationWeight: weight
  })
}
function generateTestComparison(name, description) {
  return {
    name: name ? name : 'test',
    description: description ? description : 'test',
    considerations: []
  }
}

describe('the comparison model', () => {
  it('should correctly calculate the sum of the considerations', () => {
    var comparison = generateTestComparison()
    addConsideration(comparison, true, 3)
    addConsideration(comparison, false, 4)
    addConsideration(comparison, true, 0)
    addConsideration(comparison, false, 1)
    addConsideration(comparison, true, 5)

    var comparisonModel = new Comparison(comparison)
    var sum = comparisonModel.sumConsiderations()
    expect(sum).to.be.a('number').that.equals(3)

    var comparison2 = generateTestComparison()
    addConsideration(comparison2, true, 11)
    addConsideration(comparison2, false, 4)
    addConsideration(comparison2, false, 0)
    addConsideration(comparison2, false, 15)
    addConsideration(comparison2, true, 1)

    var comparisonModel2 = new Comparison(comparison2)
    var sum2 = comparisonModel2.sumConsiderations()
    expect(sum2).to.be.a('number').that.equals(-7)
  })
})