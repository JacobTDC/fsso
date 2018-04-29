

# File System Simple Objects

  A simplified, object oriented File System module.

  ![FS Objects][badge] ![npm version][version] ![Downloads per Month][downloads-month] ![Total Downloads][downloads] ![License (MIT)][license]

- [Example](#example)
- [Installation](#installation)
- [Features](#features)
- [Properties](#properties)
	+ [Directory Properties](#directory-properties)
- [Methods](#methods)
	+ [Directory Methods](#directory-methods)
	+ [File Methods](#file-methods)

# Example

```js
const fsso = require('fsso')

var dir = new fsso.Directory('./example')
console.log(dir.hierarchy())
var file = dir.find('example.txt') //or fsso.File('./example/example.txt')
console.log(file.read())
```

# Installation

Installation is very easy with npm:
```bash
$ npm install fsso
```

# Features

  * An easier way to manage files in Node.JS
  * Files are automatically changed in the object when they are changed on the computer
  * Supports Read/Write streams (*coming in a future update*)

# Properties

### .path
returns the path of the directory or file
```javascript
var dirPath = Directory.path
var filePath = File.path
typeof fileOrDirPath == "string"
```

### .name
returns the name of the directory or file
```javascript
var dirName = Directory.name
var fileName = File.name
typeof fileOrDirName == "string"
```
which is equivalent to
```javascript
path.parse(fileOrDirPath).base
```
* see [Node.JS path.parse](https://nodejs.org/dist/latest/docs/api/path.html#path_path_parse_path)

### .relativePath
returns the directory or file path relative to the current running directory, `require.main.filename`, or, when that doesn't work (such as in Command Prompt REPL instances), `process.cwd()`
```javascript
var dirRelativePath = Directory.relativePath
var fileRelativePath = File.relativePath
typeof fileOrDirRelativePath == "string"
```

## Directory Properties

### .files
returns a list of all the files and folders in a directory
```javascript
var dirFiles = Directory.files
typeof dirFiles == "string"
```

# Methods

### .hierarchy()
returns the structure of a file or directory
```javascript
var dirHierarchy = Directory.hierarchy()
var fileHierarchy = File.hierarchy()
typeof dirOrFileHierarchy == "object"
```
example:
```javascript
console.log(Directory.hierarchy())
//returns { name: "[dirName]", type: "dir", files: [array of hierarchies] }
console.log(File.hierarchy())
//returns { name: "[dirName]", type: "file" }
```

### .isDirectory()
returns if an `fsObject` is a directory
```javascript
Directory.isDirectory() == true
File.isDirectory() == false
```

### .isFile()
returns if an `fsObject` is a file
```javascript
Directory.isFile() == false
File.isFile() == true
```

### .delete()
deletes an `fsObject` and it's corresponding on-drive file or directory; returns undefined
<br>**WARNING**: Deletes files and directories! Use with care.
```javascript
Directory.delete()
File.delete()
```

## Directory Methods

### .mkDir( name, [mode] )
creates a sub-directory inside the directory and returns a `Directory` object
* **`name`: [\<string\>][string]**
* **[`mode`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_mkdirsync_path_mode): [\<integer\>][integer]**

```javascript
var newDir = Directory.mkDir( name, mode )
newDir instanceof Directory
```

### .create( name )
creates a file with the given name and returns it as a `File` object
* **`name`: [\<string\>][string]**

```javascript
var newFile = Directory.create( name )
newFile instanceof File
```


### .remove( name )
removes a file or sub-directory from the directory and it's corresponding on-drive file or directory; returns undefined
* **`name`: [\<string\>][string]**

**WARNING**: Deletes files and directories! Use with care.
```javascript
Directory.remove( name )
```

### .find( name )
finds a given file or directory name in a directory and returns an `fsObject`
* **`name`: [\<string\>][string]**

```javascript
var fileOrDir = Directory.find( name )
fileOrDir instanceof fsObject
```

## File Methods

### .read( [options] )
reads a file and returns a Buffer unless otherwise specified by `options`
* **[`options`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_readfilesync_path_options): [\<Object\>][object] | [\<string\>][string]**

```javascript
var data = File.read( options )
data instanceof Buffer || typeof data =="string"
```

### .write( data, [options] )
writes in a file
* **`data`: [\<string\>][string] | [\<Buffer\>][Buffer] | [\<Uint8Array\>][Uint8Array]**
* **[`options`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_writefilesync_file_data_options): [\<Object\>][object] | [\<string\>][string]**

**WARNING**: Modifies files! Use with care.
```javascript
var data = File.write( data, options )
data instanceof Buffer || typeof data =="string"
```

[version]: https://img.shields.io/npm/v/fsso.svg
[downloads-month]: https://img.shields.io/npm/dm/fsso.svg
[license]: https://img.shields.io/npm/l/fsso.svg
[downloads]: https://img.shields.io/npm/dt/fsso.svg
[badge]: https://img.shields.io/badge/FS-Objects-brightgreen.svg

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[integer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[Buffer]: https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
