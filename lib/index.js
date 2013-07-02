var  _ 		= require('underscore')
	,https 	= require('https');
exports = module.exports = Circles;

	function Circles(host,token,options){
		this.host  = host;
		this.token  = token;
		this.options = options;
		return this;
	}

	Circles.prototype.create = function(collection,data,options,callback){
		if(_.isFunction(options)){
		callback = options;
		}
		else if(!_.isObject(options)){
			options = {};
		}
		if(_.isFunction(data)){
			callback = data;
			data = {};
		}

		if(!_.isString(collection) && collection.length < 1){
			callback("error no collection",{})
			return;
		}
		data = {model:data};
		data.key = collection;
		
		this.apiCall("create",data,options,callback)
			
	}

	Circles.prototype.read = function(collection,data,options,callback){
		
		

		if(_.isFunction(options)){
		callback = options;
		}
		else if(!_.isObject(options)){
			options = {};
		}
		if(_.isFunction(data)){
			callback = data;
			data = {};
		}
		if(_.isString(data)){
			data = {id:data}
		}else{
			data = {query:data}
		}

		if(!_.isString(collection) && collection.length < 1){
			callback("error no collection",{})
			return;
		}
		data.key = collection;
		this.apiCall("read",data,callback)
			
	}
	Circles.prototype.update = function(collection,data,model,options,callback){
		


		if(_.isFunction(options)){
		callback = options;
		}
		else if(!_.isObject(options)){
			options = {};
		}

		if(_.isFunction(model) || _.isString(model)){
			callback("error no data",{})
			return;
		}

		if(!_.isString(collection) && collection.length < 1){
			callback("error no collection",{})
			return;
		}
		if(_.isString(data)){
			data = {id:data}
		}else{
			data = {query:data}
		}
		data.model = model;
		data.key = collection;
		this.apiCall("update",data,callback)
			
	}
	Circles.prototype.delete = function(collection,data,options,callback){
		
		

		if(_.isFunction(options)){
		callback = options;
		}
		else if(!_.isObject(options)){
			options = {};
		}
		if(_.isFunction(data)){
			callback = data;
			data = {};
		}

		if(_.isString(data)){
			data = {id:data}
		}else{
			data = {query:data}
		}

		if(!_.isString(collection) && collection.length < 1){
			callback("error no collection",{})
			return;
		}
		data.key = collection;
		this.apiCall("delete",data,callback)
			
	}

	Circles.prototype.apiCall = function(method,data,options,callback){
	var self = this;
	var  op 		= {}
		,result 	= ""
		,error 		= null
		,body 		= {token:this.token}
		,key
		,req;	

	if(_.isFunction(options)){
		callback = options;
	}
	else if(!_.isObject(options)){
		options = {};
	}
	if(_.isFunction(data)){
		callback = data;
		data = {};
	}

	if(!_.isFunction(callback))
		callback = function(){};

		op.host 		= this.host;
		op.port 		= 443;
		op.method 		= "POST";
		op.path 		= "/api/v1/"+data.key;
		body.model 		= _.isObject(data.model) ? data.model : {};
		body.query 		= _.isObject(data.query) ? data.query : {};
		if(_.isString(data.id))
			body.id = data.id;
	switch(method){
		case "create":
			body.request= "create";
			
			if(_.isEmpty(body.model)){
				callback("model is empty",{});
				return;
			}
		break;
		case "update":
			body.request= "update";
			
		break;
		case "delete":
			body.request= "delete";
			
		break;
		default:
			body.request= "read";
			
		break;
	}
	var d = JSON.stringify({data:body});
	//console.log(d)
	op.headers ={'Content-Length': d.length,'Content-Type': 'application/json'};
	req = https.request(op, function(res) {

		res.on('data', function (chunk) {

			result +=chunk;
			//console.log(body.query,'chunks', result)
  	});
  	res.on("end",function(){
  		//console.log(body.request,body.query,body.model)
			callback(error,result);
		})
	});
	req.on('error', function(e) {
		//console.log(error , e,body.request,body.query,body.model)
  		callback(e.message,e,result);
	});
	//console.log(d.length)
	for(var i = 0; i < d.length; i+=500){
		//console.log(i)
		req.write(d.substring(i,i+500))
	}
	
		req.end();

}
