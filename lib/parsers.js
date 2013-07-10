
module.exports = {
  string: function(reader, len) {
    return reader.buffer(len * 2).toString('utf16le');
  },
  number: function(reader) {
    return reader.uint32LE();
  }
};
