var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var expressSanitizer = require('express-sanitizer');
const mongoose = require('mongoose');
const config = require('./config');
const mdlr = require('./middlewares');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
mongoose.connect(config.database.getDatabaseUrl(), {useMongoClient: true}, function(err) {
	if(err) {
		console.log(err);
  } else {
    console.log('connected to database');
  }
});
mongoose.Promise = global.Promise;
require('./models/user');

var index = require('./routes/index');
var user = require('./routes/user');

var app = express();
var port = process.env.PORT || '5000';
const io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
  console.log('client connect');
  socket.on('echo', function (data) {
    console.log(data);
    io.sockets.emit('message', data);
  });
});

// Make io accessible to our router
app.use(function(req,res,next){
  req.io = io;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(multipartMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(expressSanitizer());
app.use(mdlr.cors);
app.use('/', index);
app.use('/user/', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
