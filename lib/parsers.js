
var parser = module.exports;

parser.string = function (reader, len) {
  return reader.buffer(len * 2).toString('utf16le');
};

parser.number = function (reader) {
  return reader.uint32LE();
};

parser.chat = function (reader, len) {
  return {
      type: 'chat'
    , message: parser.string(reader, len)
  };
};
parser.chat.size = Infinity;

parser.version = function (reader) {
  return {
      type: 'version'
    , version: parser.number(reader)
  };
};
parser.version.size = 4;

parser.interact = function (reader) {
  return {
      type: 'interact'
    , unknown: reader.buffer(300)
  };
};
parser.interact.size = 300;

parser.hit = function (reader) {
  var unk1 = reader.buffer(4);
  var unk2 = reader.buffer(4);
  var unk3 = reader.buffer(4);
  var unk4 = reader.buffer(4);
  var unk5 = reader.uint8(1);

  reader.skip(3);

  var unk6 = reader.buffer(4);
  var unk7 = reader.buffer(4);
  var unk8 = reader.buffer(4);
  var unk9 = reader.buffer(4);
  var unk10 = reader.buffer(4);
  var unk11 = reader.buffer(4);
  var unk12 = reader.buffer(4);
  var unk13 = reader.buffer(4);
  var unk14 = reader.buffer(4);
  var unk15 = reader.buffer(4);
  var unk16 = reader.buffer(4);

  var unk17 = reader.uint8();
  var unk18 = reader.uint8();
  var unk19 = reader.uint8();

  reader.skip(1);

  return {
      type: 'hit'
    , unk1: unk1
    , unk2: unk2
    , unk3: unk3
    , unk4: unk4
    , unk5: unk5
    , unk6: unk6
    , unk7: unk7
    , unk8: unk8
    , unk9: unk9
    , unk10: unk10
    , unk11: unk11
    , unk12: unk12
    , unk13: unk13
    , unk14: unk14
    , unk15: unk15
    , unk16: unk16
    , unk17: unk17
    , unk18: unk18
    , unk19: unk19
  };
};
parser.hit.size = 68;

parser.stealth = function (reader) {
  return {
      type: 'stealth'
    , unk: reader.buffer(40)
  };
};
parser.stealth.size = 40;

parser.shoot = function (reader) {
  return {
      type: 'shoot'
    , unk: reader.buffer(112)
  };
};
parser.shoot.size = 112;

parser.readChunk = function (reader) {
  return {
      type: 'readChunk'
    , x: parser.number(reader)
    , y: parser.number(reader)
  };
};
parser.readChunk.size = 8;

parser.unkChunk = function (reader) {
  return {
      type: 'unkChunk'
    , x: parser.number(reader)
    , y: parser.number(reader)
  };
};
parser.unkChunk.size = 8;

parser.compressed = function (reader, len) {
  return {
      type: 'compressed'
    , data: reader.buffer(len)
  };
};
parser.compressed.size = Infinity;
