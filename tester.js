'use strict';

var net = require('net');

var client = new net.Socket();

var payload = 'hello';

var host = process.argv[2] != null ? process.argv[2] : "localhost";

console.log('connect to: '+host);

client.connect(1337, host, function() {
  console.log('$ > connected..');
  console.log('$ > req package: ',payload);
  client.write(payload);
});

client.on('data', function(resPackage) {
  console.log('    $ > res package: ' + resPackage);
  client.destroy();
});

client.on('close', function() {
  console.log('$ > Connection closed..');
});