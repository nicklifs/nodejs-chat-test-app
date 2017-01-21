var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.set('port', 3000);
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
});

//Middleware
app.use(function(req, res, nest) {
  if (req.url == '/') {
    res.end('Hello');
  } else {
    nest()
  }
});

app.use(function(req, res, nest) {
  if (req.url == '/test') {
    res.end('test');
  } else {
    nest()
  }
});

app.use(function(req, res, nest) {
  if (req.url == '/forbidden') {
    next(new Error("wops, denied"))
  } else {
    nest()
  }
});

app.use(function(req, res, nest) {
  blabla(); //error
});

app.use(function(req, res, nest) {
  res.send(404, 'Page Not Found');
});

// обработчик ошибок (4 аргумента)
app.use(function(err, req, res, nest) {
  if (app.get('end') == 'development'){
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, nest);
  } else {
    res.send(500);
  }
});





/*
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
*/
