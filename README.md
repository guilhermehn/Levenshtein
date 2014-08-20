# levenshtein-dist

[Levenshtein][wikipedia] distance calculator

## Installation

`npm install levenshtein-dist`

## Usage
`levenshtein(a, b, [inspect])`

```javascript
levenshtein('kitten', 'sitting')
// -> 3

var distanceFromKitten = levenshtein('kitten')
distanceFromKitten('sitting')
// -> 3

levenshtein('kitten', 'sitting', true)
/* ->
  [
    [0, 1, 2, 3, 4, 5, 6],
    [1, 1, 2, 3, 4, 5, 6],
    [2, 2, 1, 2, 3, 4, 5],
    [3, 3, 2, 1, 2, 3, 4],
    [4, 4, 3, 2, 1, 2, 3],
    [5, 5, 4, 3, 2, 2, 3],
    [6, 6, 5, 4, 3, 3, 2],
    [7, 7, 6, 5, 4, 4, 3]
  ]
*/

// also works with curried version
distanceFromKitten('sitting', true)
```

## License
MIT
