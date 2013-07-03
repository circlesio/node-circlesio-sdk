var  Circles= require('./lib')
	,fs 	= require('fs')
	,circles= new Circles("your-url.circles.io","yourToken");

fs.readFile(__dirname+'/data.json',function(err,data){
	var points = JSON.parse(data);
	for(var i = 0;i < points.length; i++)
		circles.create('item',points[i],function(err,result){
			console.log(err,result)
		})
})

// circles.delete('item',{id:""},function(err,result){
// 	console.log(err,JSON.parse(result))
// })


// circles.read('item',{},function(err,result){
// 	console.log(err,JSON.parse(result))
// })


// circles.udpate('item',{id:""},{group:"hello"},function(err,result){
//  console.log(err,JSON.parse(result))
// })