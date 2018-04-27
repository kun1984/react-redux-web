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

var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var multipartMiddleware = multipart();
var moment = require('moment');

var mysql      = require('mysql');
var dbConfig =  {
	HOST_NAME:"localhost",
	USER_NAME:"web",
	PASSWORD:"Chinamsp@123",
	DB_NAME:"china_msp"

}

var connection = mysql.createConnection({
  host     : dbConfig.HOST_NAME,
  user     : dbConfig.USER_NAME,
  password : dbConfig.PASSWORD,
  database: dbConfig.DB_NAME
});


connection.connect();

server.listen(port, function(){
	console.log("HTTP SERVER start running");
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

app.post('/questions',multipartMiddleware, function(req, res) {
	var data = req.body;
	var addVip = 'insert into msp_question(phone,compay,question,email,createDateTime) values(?,?,?,?,?)';
	var param = [data.phone,data.company,data.question,"",new Date];
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
