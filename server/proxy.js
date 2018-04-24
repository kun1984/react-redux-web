var logProxy = require("debug")("kefu:proxy");
var logBypass = require("debug")("kefu:bypass");
var logErr = require("debug")("kefu:error");
var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer();
var proxies = {};



proxies["/v1/tenants"] = {
	get: function(req, res, next){
		
		var data = {"status":"OK","entities":[{"id":Math.random()*100,"tenantId":27800,"statisticDate":"20171129","tenantRobotId":27800,"robotAnswerNum":14,"session":3,"transferKfSuccess":2,"converageRate":0.0,"transferKFRate":0.6667,"averageRate":4.6667,"bestAnswerRate":0.0,"recommendRate":0.0,"freeChatRate":0.0,"unmatchRate":1.0,"bestAnswer":0,"recommend":0,"freeChat":0,"unmatch":14,"createDateTime":"2017-11-30 06:00:08","updateDateTime":"2017-11-30 06:00:08"},{"id":6644,"tenantId":27800,"statisticDate":"20171201","tenantRobotId":27800,"robotAnswerNum":1,"session":1,"transferKfSuccess":1,"converageRate":0.0,"transferKFRate":1.0,"averageRate":1.0,"bestAnswerRate":0.0,"recommendRate":0.0,"freeChatRate":0.0,"unmatchRate":1.0,"bestAnswer":0,"recommend":0,"freeChat":0,"unmatch":1,"createDateTime":"2017-12-02 06:00:08","updateDateTime":"2017-12-02 06:00:08"}]};
		res.setHeader("Content-Type", "text/json;charset=utf-8");
		res.end(JSON.stringify(data));
	}
};





proxy.on("error", function(e){
	logErr(e);
});

function hasOwnProperty(obj, key){
	return Object.prototype.hasOwnProperty.call(obj, key);
}

module.exports = function(app){
	var pattern;
	var ps;
	var method;
	var processor;

	// mock
	for(pattern in proxies){
		if(hasOwnProperty(proxies, pattern)){
			ps = proxies[pattern];
			for(method in ps){
				if(hasOwnProperty(ps, method)){
					processor = ps[method];
					logProxy(method, pattern);
					app[method](pattern, processor);
				}
			}
		}
	}

};
