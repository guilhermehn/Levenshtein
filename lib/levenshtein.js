// Levenshtein distance
function Levenshtein(a, b) {
  var prev
    , curr
    , matrix
    , arrA = a.split('')
    , arrB = b.split('')

  // Constructor
  matrix = this._matrix = []

  // Sanity checks
  if (a == b) {
    return this.distance = 0
  }
  else if (a == '') {
    return this.distance = b.length
  }
  else if (b == '') {
    return this.distance = a.length
  }
  else {
    // Danger Will Robinson
    prev = [0]
    arrA.forEach(function (v, i) {
      i++
      prev[i] = i
    })

    matrix[0] = prev
    arrB.forEach(function (n_val, n_idx) {
      curr = [++n_idx]
      arrA.forEach(function (m_val, m_idx) {
        m_idx++

        if (a.charAt(m_idx - 1) == b.charAt(n_idx - 1)) {
          curr[m_idx] = prev[m_idx - 1]
        }
        else {
          curr[m_idx] = Math.min
            (prev[m_idx]      + 1   // Deletion
            , curr[m_idx - 1] + 1   // Insertion
            , prev[m_idx - 1] + 1   // Subtraction
           )
        }
      })
      prev = curr
      matrix[matrix.length] = prev
    })

    return this.distance = curr[curr.length - 1]
  }
}

Levenshtein.prototype.toString = Levenshtein.prototype.inspect = function inspect (no_print) { var matrix, max, buff, sep, rows
  matrix = this.getMatrix()
  max = matrix.reduce(function (m, o) {
    return Math.max(m, o.reduce(Math.max, 0))
  }, 0)
  buff = Array((max + '').length).join(' ')

  sep = []
  while (sep.length < (matrix[0] && matrix[0].length || 0)) {
    sep[sep.length] = Array(buff.length + 1).join('-')
  }

  sep = sep.join('-+') + '-'

  rows = matrix.map(function (row) {
    var cells = row.map(function (cell) {
      return (buff + cell).slice(- buff.length)
    })

    return cells.join(' |') + ' '
  })

  return rows.join("\n" + sep + "\n")
}

Levenshtein.prototype.getMatrix = function () {
  return this._matrix.slice()
}

Levenshtein.prototype.valueOf = function () {
  return this.distance
}

module.exports = Levenshtein
