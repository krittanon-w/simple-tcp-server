'use serict';

var net = require('net');
var server = net.createServer();

server.on('connection', handleConnection);
var colors = require('colors');

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
    let cut_index = msg.indexOf(';7');
    if(cut_index!=-1){
      console.log(colors.green('    $ > msg contain 7x: '+msg));
      let card_msg = msg.slice(cut_index+1, msg.length)
      card_msg = card_msg.slice(0, card_msg.indexOf(';'))
      console.log(colors.yellow('    $ > card msg: '+card_msg));
    }
    else{
      console.log('    $ > can not found 7x message'.red);
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
