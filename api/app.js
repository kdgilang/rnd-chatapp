var express = require('express');
var path = require('path');
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
require('./helper').createDir(config.DIR.to);
mongoose.connect(config.database.getDatabaseUrl());
mongoose.Promise = global.Promise;
require('./models/user');
require('./models/message');

var index = require('./routes/index');
var user = require('./routes/user');
var message = require('./routes/message');

var app = express();
var port = process.env.PORT || '5555';
const { Server } = require('socket.io');
const io = new Server(app.listen(port));

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(expressValidator());
app.use(expressSanitizer());
app.use(mdlr.cors);
app.use(multipartMiddleware);
app.use('/', index);
app.use('/user/', user);
app.use('/message', message);

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
