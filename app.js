var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Router = require('router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
  log.info('Express server listening on port ' + app.get('port'))
});

//Middleware

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // /favicon.ico
if (app.get('env') == 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('default'));
}
//app.use(bodyParser());  // req.body....
app.use(cookieParser()); // req.cookies

/*var router = Router()
router.get('/', function (req, res) {
  console.log('1111');
  //res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  //res.end('Hello World!')
  res.render("index", {
    body: '<b>Hello</b>'
  });
})*/
/*
app.get('/', function(req, res, next) {
  console.log('1111');
  res.render("index", {
    body: '<b>Hello</b>'
  });
});*/

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.render('index', { body: '<b>Hello</b>' }, function(err, html) {
    res.send(html);
  });
});

/*app.use(function(req, res, nest) {
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
});*/

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
