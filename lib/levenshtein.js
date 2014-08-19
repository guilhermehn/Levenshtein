'use strict';

var maxOfArray = require('./maxOfArray')

function levenshtein (a, b, inspect) {
  // Throw err if no string is provided
  if (typeof a === 'undefined') {
    throw 'At least one string must be provided'
  }

  // Return a function curried with the first string provided
  if (typeof b === 'undefined') {
    return function (b, inspect) {
      return levenshtein(a, b, inspect)
    }
  }

  var arrA = a.split('')
    , arrB = b.split('')
    , lengthA = arrA.length
    , lengthB = arrB.length
    , i = 0
    , prev = [0]
    , matrix = []
    , distance
    , curr
    , j, k

  // Sanity checks
  if (a === b) {
    // No distance, same strings
    return 0
  }
  else if (a === '') {
    // First string is empty
    return b.length
  }
  else if (b === '') {
    // Second string is empty
    return a.length
  }

  // Preload previous line with [0, 1, ..n]
  while (i < lengthA) {
    prev[++i] = i
  }

  matrix[0] = prev

  i = 0
  while (i < lengthB) {
    curr = [++i]

    j = 0
    while (j < lengthA) {
      k = ++j - 1

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

  if (inspect) {
    return matrix
  }

  return curr[curr.length - 1]
}

module.exports = levenshtein
