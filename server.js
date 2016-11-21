'use serict';

var net = require('net');
var server = net.createServer();

server.on('connection', handleConnection);

server.listen(1337, "127.0.0.1", function() {
  console.log('$ > server listening to %j', server.address());
});

function handleConnection(socket) {
  var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
  console.log('$ > new client connection from %s', remoteAddress);

  socket.on('data', onData);
  socket.on('error', onError);
  socket.once('close', onClose);

  function onData(data) {
    console.log('    $ > received package: ', data.toString());
    socket.write(data.toString()+' [ok]');
  }

  function onError(err) {
    console.log('$ > connection %s error: %s', remoteAddress, err.message);
  }

  function onClose() {
    console.log('$ > connection from %s closed', remoteAddress);
  }
}
