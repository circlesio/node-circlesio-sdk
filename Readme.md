# Circles.io SDK


### Allows you to use your api
===

start with setup with a require and your domain with the token

```javascript

var  Circles = require('./lib')
	,circles= new Circles("your-url.circles.io","yourToken");

```

#### then you can do 
* read
* create
* update
* delete

Just specify the collection your calling then the data your passing

### Create

```javascript
circles.create(collection,model,options,function(err,result){
			console.log(err,result)
})
```

### Read

```javascript
circles.read(collection,query,options,function(err,result){
			console.log(err,result)
})
```
### Update

```javascript
circles.update(collection,query,options,model,function(err,result){
			console.log(err,result)
})
```

### Delete

```javascript
circles.delete(collection,query,options,function(err,result){
			console.log(err,result)
})
```

---

#### The collection is the data collection name (string) :
* item
* instance
* client
* profile
* grid
* blob
* loader
* level
* role
* event
* report


#### Model is the data that will become the data object (object):
Data that will be saved or updated
The data being updated can be saved with deep model meaning if you have an object 
```javascript
{ name : {
	 first :"john"
	,last  :"smith"
	}
}
```
you can update just the first name with :
```javascript
{ 'name.first':'jane'}
```


or with arrays you can :
```javascript
{ toys : ['car','truck','drums'] }
```
you can update just truck with :
```javascript
{ 'toys.1':'bus'}
```
where 1 is the index

#### Query is the search lookup using normal mongodb queries (object):
[Mongo Basic Queries](http://docs.mongodb.org/manual/core/read)
[Mongo Adv Queries](http://docs.mongodb.org/manual/reference/operator/)
just {} will return all and with the addtion of just 
```javascript
{ _id : ''}
```

#### Options (object) [optional]:

* skip (int)
* limit (int)
* sort  (object)






