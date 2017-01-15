const read = require('../lib/read.js');
const assert = require('assert');
const fs = require('fs');

const rimraf = require('rimraf');

describe('Test bitmap transformation', function() {

  beforeEach(function(done) {
    rimraf('./transformed.bmp', done);
  });

  after(function(done) {
    rimraf('./transformed.bmp', done);
  });
  
  it('Add a transformed image', function(done) {

    function addTest() {   
      assert.ok(fs.existsSync('./transformed.bmp'));
      done();
    }

    read.readWrite('./non-palette-bitmap.bmp', addTest);

  });

  it('Inverts colors', function(done) {

    function invert() {
      fs.readFile('./non-palette-bitmap.bmp', function(err, data) {
        if (err) throw err;
        var byte15k = data[15000];
      
        var invertedByte = 255 - byte15k;
        assert.deepEqual(invertedByte, read.byte15kInverted);
        done();
      });
    }

    read.readWrite('./non-palette-bitmap.bmp', invert);

  });

  it('Check image', function(done) {

    function checkImage() {
      fs.readFile('./transformedPalmTree.bmp', function(err, data) {
        if (err) throw err;
        var orangePalmTree = Buffer.from(data);
        //check if new buffer is the same as our standard (golden-chicken)
        assert.deepEqual(orangePalmTree, read.newBuf);
        done();
      });
    }

    read.readWrite('./orangePalmTree.bmp', checkImage);

  });

});