var assert = require('assert')
  , Levenshtein = require('../')

describe('levenshtein()', function () {
  var distance1

  beforeEach(function () {
    distance1 = new Levenshtein('kitten', 'sitting')
  })

  it('should calc Leveinstein distance', function () {
    var distance2 = new Levenshtein('Saturday', 'Sunday')

    assert.equal(distance1.distance, 3, 'kitten <=> sitting')
    assert.equal(distance2.distance, 3, 'Saturday <=> Sunday')
  })

  it('should not ignore case', function () {
    var distance2 = new Levenshtein('Lorem', 'lorem')

    assert.equal(distance2.distance, 1)
  })

  it('could be coerced to a number', function () {
    assert.equal(distance1 + 0, distance1.distance)
  })

  it('should work with symbols', function () {
    var distance3 = new Levenshtein('!@#', '!@#$')
    assert.equal(distance3, 1)
  })

  describe('#inspect()', function () {
    it('should return the distance in string', function() {
      assert.equal(distance1.inspect(), new String(distance1))
    })
  })

  describe('#getMatrix()', function () {
    it('should return the distance matrix', function () {
      assert.ok(distance1.getMatrix() instanceof Array)
      assert.ok(distance1.getMatrix()[0].length)
      assert.ok(distance1.getMatrix()[0] instanceof Array)
    })
  })
})
