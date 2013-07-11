
var packet = module.exports;
var parser = require('./parsers');

parser.string = function (reader, len) {
  return reader.buffer(len * 2).toString('utf16le');
};

parser.number = function (reader) {
  return reader.uint32LE();
};


/**
 * Client: Chat
 */
packet.chat = {
    size: Infinity
  , read: function (reader, len) {
      return {
          type: 'chat'
        , message: parser.string(reader, len)
      };
    }
  , write: function (writer, data) {
      writer.string(data.message);
    }
};


/**
 * Client: Version
 */
packet.version = {
    size: 4
  , read: function readVersion (reader) {
      return {
          type: 'version'
        , version: parser.number(reader)
      };
    }
  , write: function writeVersion (writer, data) {
      writer.number(data.version);
    }
};


/**
 * Client: Interact
 */
packet.interact = {
    size: 300
  , read: function readInteract (reader) {
      return {
          type: 'interact'
        , unknown: reader.buffer(300)
      };
    }
  , write: function writeInteract (writer, data) {
      writer.buffer(data.unknown);
    }
};


/**
 * Client: Hit
 */
packet.hit = {
    size: 68
  , read: function readHit (reader) {
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
    }

  , write: function writeHit (writer, data) {
      writer.buffer(data.unk1);
      writer.buffer(data.unk2);
      writer.buffer(data.unk3);
      writer.buffer(data.unk4);
      writer.uint8(data.unk5);

      writer.zeros(3);

      writer.buffer(data.unk6);
      writer.buffer(data.unk7);
      writer.buffer(data.unk8);
      writer.buffer(data.unk9);
      writer.buffer(data.unk10);
      writer.buffer(data.unk11);
      writer.buffer(data.unk12);
      writer.buffer(data.unk13);
      writer.buffer(data.unk14);
      writer.buffer(data.unk15);
      writer.buffer(data.unk16);

      writer.uint8(data.unk17);
      writer.uint8(data.unk18);
      writer.uint8(data.unk19);

      writer.zeros(1);
  }
};



/**
 * Client: Stealth
 */
packet.stealth = {
    size: 40
  , read: function readStealth (reader) {
      return {
          type: 'stealth'
        , unk: reader.buffer(40)
      };
    }
  , write: function writeStealth (writer, data) {
      writer.buffer(data.unk);
    }
};


/**
 * Client: Shoot
 */
packet.shoot = {
    size: 112
  , read: function readShoot (reader) {
      return {
          type: 'shoot'
        , unk: reader.buffer(112)
      };
    }
  , write: function writeShoot (writer, data) {
      writer.buffer(data.unk);
    }
};


/**
 * Client: readChunk
 */
packet.readChunk = {
    size: 8
  , read: function readChunk (reader) {
      return {
          type: 'readChunk'
        , x: parser.number(reader)
        , y: parser.number(reader)
      };
    }
  , write: function writeChunk (writer, data) {
      writer.number(data.x);
      writer.number(data.y);
    }
};


/**
 * Client: unkChunk
 */
packet.unkChunk = {
    size: 8
  , read: function readUnkChunk (reader) {
      return {
          type: 'unkChunk'
        , x: parser.number(reader)
        , y: parser.number(reader)
      };
    }
  , write: function writeUnkChunk (writer, data) {
      writer.number(data.x);
      writer.number(data.y);
    }
};


/**
 * Client: User
 *
 * Compressed user data
 */
packet.user = {
    size: Infinity
  , read: function readUserData (reader, len) {
      return {
          type: 'user'
        , user: reader.buffer(len)
      };
    }
  , write: function writeUserData (writer, data) {
      writer.buffer(data.user);
    }
};


module.exports = {
  0: packet.user,
  6: packet.interact,
  7: packet.hit,
  8: packet.stealth,
  9: packet.shoot,
  10: packet.chat,
  11: packet.readChunk,
  12: packet.unkChunk,
  17: packet.version 
};

