---
layout: home
title: All the Things
---

## Welcome to the FSSO GitHub Page!

```bash
$ npm install fsso
```

### What is FSSO?
FSSO stands for File System Simple Objects, and is a simplied, object oriented NPM module.
The goal of the FSSO project is to make it easier to manage files using Node.JS.

<hr>

### Comparison to standalone File System:

#### Standalone File System (and Path):

```javascript
const fs = require('fs');
const path = require('path');

function hierarchy(p) {
  p = path.resolve(p);
  if (fs.lstatSync(p).isFile()) return {name: path.parse(p).base, type: 'file'}
  else return {
    name: path.parse(p).base,
    type: 'dir',
    files: fs.readdirSync(p).map((newPath) => hierarchy(path.resolve(p, newPath)))
  }
}

console.log(hierarchy('.'));
```

#### With FSSO:

```javascript
const fsso = require('fsso');

var dir = fsso.Directory('.');
console.log(dir.hierarchy());
```
