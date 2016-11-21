'use strict';

var net = require('net');

var client = new net.Socket();

var payload = 'hello';



client.connect(1337, '127.0.0.1', function() {
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