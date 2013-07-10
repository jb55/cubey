
var net = require('net');
var argv = require('optimist').argv;
var packetReader = require('./lib/reader');
var remote = process.env.HOST || argv.host;
var port = 12345;

var mitm = net.createServer(function(client) {
  console.error("client connected");
  console.error("establishing remote connection to: " + remote);

  var server = net.connect(12345, remote, function() {
    console.error("mitm connection for client established");
  });

  client.pipe(server);
  server.pipe(client);

//var reader = packetReader(client);
//reader.on('packet', function(packet) {
//  console.log(packet);
//});

  server.on('error', function(err) {
    console.error("error connecting to server: ", err);
  });

  client.on('end', function() {
    console.error('client disconnected');
  });

  client.on('data', function(data) {
    //console.log("client data: ", data);
    console.error(data);
  });

});

mitm.listen(port, function() {
  console.log("mitm server listening on port " + port);
});

