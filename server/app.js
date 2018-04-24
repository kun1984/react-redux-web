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
var port =  8080;


var server = http.createServer(app);
var mysql      = require('mysql');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var multipartMiddleware = multipart();
var moment = require('moment')


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database: 'china_msp'
});

connection.connect();

server.listen(port, function(){
	console.log("HTTP SERVER running @:".rainbow, ("http://localhost:" + port).cyan);
});


staticProxy(app);
webProxy(app);


app.use(bodyParser.json());


app.get('/validateUser', function(req, res) {
    var username = req.query.username;
	var addVip = 'select *  from msp_question  where username = ?';
	var param = [username];
	connection.query(addVip, param, function(error, result){
	    if(error)
	    {
	        console.log(error.message);
	        res.send("mysql connect error");
	    }else{
	        if(result.length>0){
	        	res.json({"valid":false});
	        }else{
	        	res.json({"valid":true});
	        }
	       
	    }
	});

});


app.get('/hello/:name/:tel', function(req, res) {
    console.log(req.params.name);
    console.log(req.params.tel);
    console.log(req.query.id);
    console.log(req.body);
    res.send(req.params.name);
});

app.post('/questions',multipartMiddleware, function(req, res) {
	var data = req.body;
	var addVip = 'insert into msp_question(username,email,phone,question,createDateTime) values(?,?,?,?,?)';
	var param = [data.username,data.email,data.phone,data.question,new Date];
	connection.query(addVip, param, function(error, result){
	    if(error)
	    {
	        console.log(error.message);
	    }else{
	        console.log('insert id: '+result.insertId);
	    }
	});

    res.json({status:1});
})
