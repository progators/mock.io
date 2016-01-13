var path = require('path')
var fs = require('fs')
var express = require('express')
var exphbs  = require('express-handlebars');
var codeutil = require('./routes/util')
var service = require('./routes/service') 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.static(__dirname));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('layouts/main',{layout:false});
});

app.post('/compile/java', function(req, res) {
	console.log('Start Compiler Service!')
	var code = codeutil.getCodeFromRequest(req)
	var lang = "java"
	service.start(lang, code, res)
});

io.on('connection', function(socket){
	socket.on('chat message', function(data){
		console.log(data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
