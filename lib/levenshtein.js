'use strict';

function sum (a, b) {
  return a + b
}

var addOne = sum.bind(null, 1)

function Levenshtein(a, b) {
  var prev
    , curr
    , matrix
    , arrA = a.split('')
    , arrB = b.split('')

  // Constructor
  matrix = this._matrix = []

  // Sanity checks
  if (a === b) {
    this.distance = 0
    return this.distance
  }
  else if (a === '') {
    this.distance = b.length
    return this.distance
  }
  else if (b === '') {
    this.distance = a.length
    return this.distance
  }

  // Danger Will Robinson
  prev = [0]
  arrA.forEach(function (v, i) {
    i++
    prev[i] = i
  })

  matrix[0] = prev
  arrB.forEach(function (n_val, i) {
    curr = [++i]
    arrA.forEach(function (m_val, j) {
      j++

      if (a.charAt(j - 1) === b.charAt(i - 1)) {
        curr[j] = prev[j - 1]
      }
      else {
        curr[j] = Math.min
          (addOne(prev[j])      // Deletion
          , addOne(curr[j - 1]) // Insertion
          , addOne(prev[j - 1]) // Subtraction
         )
      }
    })
    prev = curr
    matrix[matrix.length] = prev
  })

  this.distance = curr[curr.length - 1]
  return this.distance
}

Levenshtein.prototype.toString = Levenshtein.prototype.inspect = function inspect () {
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
