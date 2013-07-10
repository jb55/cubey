
var buffy = require('buffy');
var packets = require('./packets');
var parse = require('./parsers');
var assert = require('assert');

module.exports = function(stream) {
  var reader = buffy.createReader();
  var state = 'id';
  var id, packet, size;

  stream.pipe(reader);

  function read() {
    switch (state) {
      case 'id':
        if (reader.bytesAhead() >= 4) {
          id = parse.number(reader);
          packet = packets[id];
          assert.ok(packet, 'Invalid packet id' + id);
          if (packet.len === Infinity) state = 'size';
          else {
            size = packet.len;
            state = 'body';
          }
          read();
        }
        break;
      case 'size':
        if (reader.bytesAhead() >= 4) {
          size = parse.number(reader);
          state = 'body';
          read();
        }
        break;
      case 'body':
        if (reader.bytesAhead() >= size) {
          var data = packet.parser(reader, size);
          reader.emit('packet', data);
          state = 'id';
          read();
        }
        break;
    }
  }

  reader.on('data', read);

  return reader;
};
