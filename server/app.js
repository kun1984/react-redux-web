var colors = require("colors");
var express = require('express');
var httpProxy = require('http-proxy');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require("path");

var webProxy = require('./proxy');
var staticProxy = require("./static");

// start server
var app = express();
var port =  8081;


var server = http.createServer(app);
var mysql      = require('mysql');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var multipartMiddleware = multipart();


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database: 'xmibear'
});

server.listen(port, function(){
	console.log("HTTP SERVER running @:".rainbow, ("http://localhost:" + port).cyan);
});


staticProxy(app);
webProxy(app);


app.use(bodyParser.json());

app.get('/add', function(req, res) {
    
    res.send("hello get");
})


app.post('/register', multipartMiddleware, function(req, res) {
    console.log('get FormData Params: ', req.body);
});



app.post('/test', function(req, res) {
    console.log(req.body);

});


app.get('/hello/:name/:tel', function(req, res) {
    console.log(req.params.name);
    console.log(req.params.tel);
    res.send(req.params.name);
});

app.get('/query', function(req, res) {
    
	connection.connect();

	var addVip = 'insert into seckill(name,number) values(?,?)';
	var param = ['100元秒杀家教机',100];
	connection.query(addVip, param, function(error, result){
	    if(error)
	    {
	        console.log(error.message);
	    }else{
	        console.log('insert id: '+result.insertId);
	    }
	});

	connection.end();


    res.send("hello get");
})


app.post('/post', function(req, res) {
    console.log("主頁post請求");
    res.send("hello post");
})