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
var moment = require('moment');
var dbConfig = require("./dbconfig");

var db;
var connection;

function handleError (err) {

  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

// 连接数据库
function connect () {
  connection = mysql.createConnection(dbConfig);
  connection.connect(handleError);
  connection.on('error', handleError);
}


connect();


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
	          res.json({error:1});

	    }else{
	          res.json({error:0});
	    }
	});

})
