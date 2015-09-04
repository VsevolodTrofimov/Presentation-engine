var app = require('express')();
var url = require('url');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});
app.get(/.*/,function(req,res) {
	// console.log(url.parse(req.url, true).pathname);
	res.sendfile("."+url.parse(req.url, true).pathname);
})
io.on('connection', function(socket) {
  socket.on('action', function(command) {
  	io.emit('act', command);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
