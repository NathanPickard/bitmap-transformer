const read = require('./lib/read.js');
const stream = require('stream');

function callBack() {
  console.log('callback of readWrite');
};

read.readWrite('./non-palette-bitmap.bmp', callBack);