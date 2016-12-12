'use serict';

var net = require('net');
var server = net.createServer();

server.on('connection', handleConnection);

server.listen(1337, "localhost", function() {
  console.log('$ > server listening to %j', server.address());
});

function handleConnection(socket) {
  var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
  console.log('$ > new client connection from %s', remoteAddress);

  socket.on('data', onData);
  socket.on('error', onError);
  socket.once('close', onClose);

  function onData(data) {
    let msg = data.toString();
    console.log('    $ > received package: ', msg);
    if(msg.indexOf(',7')!=-1){
      console.log('    $ > card msg 7x: ', msg);
    }
    else{
      console.log('    $ > can not found 7x message');
    }
    socket.write('[ok]');
  }

  function onError(err) {
    console.log('$ > connection %s error: %s', remoteAddress, err.message);
  }

  function onClose() {
    console.log('$ > connection from %s closed', remoteAddress);
  }
}
