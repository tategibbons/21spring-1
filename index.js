var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var nodeimu = require('nodeimu');
var IMU = new nodeimu.IMU();
function getData() {
    IMU.getValue(function(err, data) {
        if (err) throw err;
        sensors = data;
	console.log(sensors);
    });
}
getData();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
function getData() {
    IMU.getValue(function(err, data) {
        if (err) throw err;
        sensors = data;
	console.log(sensors);
	io.emit("sensors",sensors)
    });
}

setInterval(getData,1000);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});