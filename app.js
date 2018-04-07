//Express setup
var express = require('express'),
app= express(),
path = require('path')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce'); 


// var appRoutes = require('./routes/app');


//create mongoose models
var Schema = mongoose.Schema;
var schema = new Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	number: {type:Number, required: true},
	color: {type:String, required:true},
	url: {type: String, required:true}	
})
var Product =mongoose.model('Product', schema)



//set view engine to ejs
app.set('view engine', 'ejs');



//for image upload
var multer  = require('multer')
var upload = multer({ dest: 'public/pics/' })
var fs = require('fs');




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './views')));

// app.use('/images', express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './node_modules')));
app.use(express.static(path.join(__dirname, './static')));
// app.use(express.static(path.join(__dirname, './EmergencyMap/dist')));



	
// app.get('', function(req, res){
// 	res.sendFile(path + 'index.html');
// })
//route to allow uploading by admins of product info
app.post('/productUpload', upload.single('file'), function(req, res){

	console.log('req',req.body)
//save file into directory
	var finalUrl = '/pics/' +req.file.filename 
  	var file = __dirname + '/public/pics/' + req.file.filename;
 
 	fs.rename(req.file.path, 'public/pics/' +req.file.filename, function(err) {
 		if(err){
 			console.log('error saving picture', err)
 		}else{
 			//db callbacks will go here
 			console.log('success')
 				var product = new Product({
					name: req.body.name,
					description: req.body.description,
					number: req.body.number,
					color: req.body.color,
					url: finalUrl


				});
				console.log(product);
				product.save(function(err, response){
					if(err){
						console.log('err occured saving')
					}else{
						console.log('Product saved')
					}

				})
 		}
 	});






	res.redirect('index.html');
})

//route to grab all products info
var products;
app.get('/products', function(req, res){
	console.log('grabbing products from DB')
	Product.find({}, function(err, product){
		if(err){
			console.log(err)
		}else{
			// console.log(product)
			products = product
			console.log('Products are', products)
		res.render('products', {products:products})
		}
		
	})
})


//serve 911 data 
// app.get('/test', function(req, res){

// 	res.json({value: returnedHTML});

// })






app.listen(9050, function(){
	console.log('Listening on port 9050');
})