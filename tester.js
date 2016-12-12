'use strict';

var net = require('net');

var client = new net.Socket();

var payload = 'AAAAAA,BBBBBBBB;1G,CCCCCCCC;7G,X,1111111,X1234;9G,AAAAA,CCCCCC;10G;QQQQQQQ;';

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