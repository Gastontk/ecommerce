console.log('starting routes');
var express = require('express');
var router = express.Router();


require('../models/products.js')



router.post('/productUpload', function(req, res){
	console.log('In productUpload post')

	res.render('index')
})

router.get('/', function(req, res){

	console.log('root route')
})
