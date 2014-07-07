function maxOfArray (arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b)
  }, 0)
}

module.exports = maxOfArray