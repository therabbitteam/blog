module.exports = function(weight) {
  weight = parseInt(weight)

  if (weight <= 2) {
    return 1
  }

  if (weight > 2 && weight <= 5) {
    return  1.3
  }

  if (weight > 5 && weight <=10 ) {
    return 1.8
  }

  return 2
}
