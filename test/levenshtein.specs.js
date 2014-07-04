var assert = require('assert')
  , Levenshtein = require('../')

describe('levenshtein()', function () {
  var l1

  beforeEach(function () {
    l1 = new Levenshtein('kitten', 'sitting')
  })

  it('should calc Leveinstein distance', function () {
    var l2 = new Levenshtein( 'Saturday', 'Sunday' )

    assert.equal(l1.distance, 3, 'kitten <=> sitting')
    assert.equal(l1.distance, 3, 'Saturday <=> Sunday')
  })

  it('could be coerced to a number', function () {
    assert.equal(l1 + 0, l1.distance)
  })

  describe('#inspect()', function () {
    it('should return the distance in string', function() {
      assert.equal(l1.inspect(), new String(l1))
    })
  })

  describe('#getMatrix()', function () {
    it('should return the distance matrix', function () {
      assert.ok(l1.getMatrix() instanceof Array)
      assert.ok(l1.getMatrix()[0].length)
      assert.ok(l1.getMatrix()[0] instanceof Array)
    })
  })
})
