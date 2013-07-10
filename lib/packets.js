
var packet = module.exports;
var parser = require('./parsers');

module.exports = {
  0: { parser: parser.compressed };
  6: { parser: parser.interact };
  7: { parser: parser.hit };
  8: { parser: parser.stealth };
  9: { parser: parser.shoot };
  10: { parser: parser.chat };
  11: { parser: parser.readChunk };
  12: { parser: parser.unkChunk };
  17: { parser: parser.version };
}

