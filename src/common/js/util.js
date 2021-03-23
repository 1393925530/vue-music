function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (array) {
  let _arr = array.slice()
  for (let index = 0; index < _arr.length; index++) {
    let j = getRandomInt(0, index)
    let t = _arr[index]
    _arr[index] = _arr[j]
    _arr[j] = t
  }
  return _arr
}