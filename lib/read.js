const fs = require('fs');
const stream = require('stream');
var read = {};

read.readWrite = function(filePath, cb) {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    read.buf = Buffer.from(data);
    read.bufSize = (read.buf).length;
  })
}