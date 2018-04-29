const fs = require('fs');
const path = require('path');



function hierarchy(obj) {
  if (obj.isFile()) return {name: obj.name, type: 'file'}
  else return {
    name: obj.name,
    type: 'dir',
    files: obj.files.map((newObj) => {
      return newObj.hierarchy()
    })
  }
}



class fsObject {
  constructor() {
    this.hierarchy = function() {
      return hierarchy(this)
    }
  }
  isDirectory(){
    return this instanceof Directory
  }
  isFile(){
    return this instanceof File
  }
  get relativePath() {
    var main = require.main
    if (main != undefined) main = main.filename
    else main = process.cwd()
    return path.relative(path.dirname(main), this.path)
  }
}



class Directory extends fsObject {
  constructor(dir) {
    super()
    var main = require.main
    if (main != undefined) main = main.filename
    else main = process.cwd()
    this.path = path.resolve(path.dirname(main), dir)
    this.name = path.parse(this.path).base
    if (!fs.lstatSync(dir).isDirectory()) throw new Error(`ENOTDIR: '${path.normalize(file)}' is not a directory.`)
  }

  get files() {
    return fs.readdirSync(this.path).map((p) => {
      if (fs.lstatSync(path.join(this.path, p)).isDirectory()) return new Directory(path.join(this.path, p))
      else return new File(path.join(this.path, p))
    })
  }
  mkDir(name, mode) {
    fs.mkdirSync(path.join(this.path, name), mode)
    return new Directory(path.join(this.path, name))
  }
  remove(name) {
    if (this.files.find((p) => p.name = name).isDirectory()) fs.rmdirSync(path.join(this.path, name))
    else fs.unlinkSync(path.join(this.path, name))
  }
  delete() {
    return fs.rmdirSync(this.path)
  }
  find(name) {
    return this.files.find((p) => p.name == name)
  }
  create(name) {
    fs.closeSync(fs.openSync(path.join(this.path, name), 'wx'))
    return new File(path.join(this.path, name))
  }
}



class File extends fsObject {
  constructor(file) {
    super()
    var main = require.main
    if (main != undefined) main = main.filename
    else main = process.cwd()
    this.path = path.resolve(path.dirname(main), file)
    this.name = path.parse(this.path).base
    if (fs.lstatSync(file).isDirectory()) throw new Error(`EISDIR: '${path.normalize(file)}' is a directory.`)
    this.read = function(options){ return fs.readFileSync(this.path, options) }
    this.write = function(data, options){ return fs.readFileSync(this.path, data, options) }
  }
  delete() {
    return fs.unlinkSync(this.path)
  }
}



module.exports = {
  Directory,
  File,
  fsObject
}