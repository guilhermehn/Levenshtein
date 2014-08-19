var assert = require('assert')
  , levenshtein = require('../')

describe('levenshtein()', function () {
  var distance1
    , kittenSittingMatrix = [
      [0, 1, 2, 3, 4, 5, 6],
      [1, 1, 2, 3, 4, 5, 6],
      [2, 2, 1, 2, 3, 4, 5],
      [3, 3, 2, 1, 2, 3, 4],
      [4, 4, 3, 2, 1, 2, 3],
      [5, 5, 4, 3, 2, 2, 3],
      [6, 6, 5, 4, 3, 3, 2],
      [7, 7, 6, 5, 4, 4, 3]
    ]

  beforeEach(function () {
    distance1 = levenshtein('kitten', 'sitting')
  })

  it('should calc Leveinstein distance', function () {
    var distance2 = levenshtein('Saturday', 'Sunday')

    assert.equal(distance1, 3, 'kitten <=> sitting')
    assert.equal(distance2, 3, 'Saturday <=> Sunday')
  })

  it('should not ignore case', function () {
    var distance2 = levenshtein('Lorem', 'lorem')

    assert.equal(distance2, 1)
  })

  it('should work with symbols', function () {
    var distance3 = levenshtein('!@#', '!@#$')
    assert.equal(distance3, 1)
  })

  it('should return a function if only one string is provided', function () {
    var distanceFromKitten = levenshtein('kitten')
    assert.equal(distanceFromKitten('sitting'), 3)
  })

  it('should return the distance matrix if the third argument is true', function () {
    var dist = levenshtein('kitten', 'sitting', true)
    assert.deepEqual(dist, kittenSittingMatrix)
  })
})
