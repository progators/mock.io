var path = require('path')
var fs = require('fs')
var express = require('express')
var codeutil = require('./util')
var service = require('./service') 
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('/'))
app.set('view options', {layout : false});
//app.set('view engine', 'jade')
//app.get('/', function(req, res) {res.render('index.html')})

/*app.get('/', function(req, res){
	console.log("inside get('/') !!")
	res.send("Welcome GatorCoders!!")
});*/

app.post('/compile/java', function(req, res) {
	console.log('Start Compiler Service!')
	var code = codeutil.getCodeFromRequest(req)
	var lang = "java"
	service.start(lang, code, res)
});

app.listen(5420);
console.log('Listening on port 5420...');
