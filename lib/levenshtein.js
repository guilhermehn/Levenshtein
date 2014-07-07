'use strict';

function Levenshtein(a, b) {
  var arrA = a.split('')
    , arrB = b.split('')
    , lengthA = arrA.length
    , lengthB = arrB.length
    , i = 0
    , prev = [0]
    , curr
    , matrix
    , j

  // Constructor
  matrix = this._matrix = []

  // Sanity checks
  switch (true) {
    case a === b:
      this.distance = 0
      return this.distance

    case a === '':
      this.distance = b.length
      return this.distance

    case b === '':
      this.distance = a.length
      return this.distance
  }

  // Danger Will Robinson
  while (i < lengthA) {
    prev[++i] = i
  }

  matrix[0] = prev
  i = 0
  while (i < lengthB) {
    curr = [++i]

    j = 0
    while (j < lengthA) {
      var k = ++j - 1

      if (a.charAt(k) === b.charAt(i - 1)) {
        curr[j] = prev[k]
      }
      else {
        curr[j] = Math.min
          (prev[j]  + 1 // Deletion
          , curr[k] + 1 // Insertion
          , prev[k] + 1 // Subtraction
          )
      }
    }

    prev = curr
    matrix[matrix.length] = prev

  }

  this.distance = curr[curr.length - 1]
  return this.distance
}

Levenshtein.prototype.toString =
Levenshtein.prototype.inspect = function inspect () {
  var matrix = this.getMatrix()
    , max
    , buff
    , sep
    , rows

  max = matrix.reduce(function (m, o) {
    return Math.max(m, o.reduce(Math.max, 0))
  }, 0)

  buff = new Array((max + '').length).join(' ')

  sep = []
  while (sep.length < (matrix[0] && matrix[0].length || 0)) {
    sep[sep.length] = new Array(buff.length + 1).join('-')
  }

  sep = sep.join('-+') + '-'

  rows = matrix.map(function (row) {
    var cells = row.map(function (cell) {
      return (buff + cell).slice(- buff.length)
    })

    return cells.join(' |') + ' '
  })

  return rows.join('\n' + sep + '\n')
}

Levenshtein.prototype.getMatrix = function () {
  return this._matrix.slice()
}

Levenshtein.prototype.valueOf = function () {
  return this.distance
}

module.exports = Levenshtein
