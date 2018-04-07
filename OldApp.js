



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var ejs = require('ejs')

var appRoutes = require('./routes/app');

var app = express();

//for your own IP
// var ip = require('ip');
// console.log('Ip is:', ip.address())

//for remote ip getIP(req)
// var getIP = require('ipware')().get_ip;




mongoose.connect('mongodb://localhost:27017/ecommerce'); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'pics')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// app.use('/', appRoutes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     return res.render('index');
// });


//from www file
var http = require('http');

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen('8123');
// end of www file












module.exports = app;
