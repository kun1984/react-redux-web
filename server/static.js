var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function(app){
	var staticroot = path.resolve(path.dirname(__filename), '../');
	// html
	var indexPath = path.resolve(staticroot, 'pages/index.html');
	var testPath = path.resolve(staticroot, 'pages/test.html');
	app.get('/', function(req, res, next){
		res.setHeader("Content-Type","text/html");
		res.setHeader("Content-Encoding","utf8");
		fs.createReadStream(indexPath).pipe(res);
	});
	app.get('/test', function(req, res, next){
		res.setHeader("Content-Type","text/html");
		res.setHeader("Content-Encoding","utf8");
		fs.createReadStream(testPath).pipe(res);
	});
	// res static
	app.use(express.static(staticroot));

	return app;
};



