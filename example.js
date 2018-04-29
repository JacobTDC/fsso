const fsso = require('fs-obj')

var dir = new fsso.Directory('./example')
console.log(dir.hierarchy())
var file = dir.find('example.txt') //or fsso.File('./example/example.txt')
console.log(file.read())