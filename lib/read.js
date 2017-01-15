const fs = require('fs');
const stream = require('stream');
var read = {};

read.readWrite = function(filePath, cb){

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    read.buf = Buffer.from(data);
    read.bufSize = (read.buf).length;

    read.newBuf = Buffer.alloc(read.bufSize);
    (read.buf).copy(read.newBuf);

    read.imgOffset = (read.newBuf).readInt32LE(10);
    read.header = (read.buf).readIntLE(0,2).toString(16);

    read.bitsPerPixel = data.readInt16LE(28);

    read.imageSize = (read.newBuf).readInt32LE(2);

    for(let i = read.imgOffset; i <read.bufSize; i++) {
      read.newBuf[i] = 255 - read.newBuf[i];
    }

    read.byte15kInverted = read.newBuf[15000];
    fs.writeFile('./transformed.bmp', read.newBuf, cb);  
  });

};

module.exports = read;