/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var connect = require('connect');
var routes = require('./server/routes');
var i18n = require('i18n');

/** 
 * Configuration
 */


app.set('views', __dirname + '/client/src/swig');
app.set('view engine', 'hbs');
app.use(express.bodyParser());
app.use(connect.compress());
app.use(express.methodOverride());
app.use(app.router);
app.use(i18n.init);
app.use(express.static(__dirname + '/client/packaged', { maxAge: 10000 }));

// --- i18n (TODO déplacer dans un autre fichier) --- //

app.locals({
  __i: i18n.__,
  __n: i18n.__n
});

i18n.configure({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  cookie: 'locale',
  directory: '' + __dirname + '/locales'
});

// --- /i18n --- //

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

routes(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on http://localhost:'+ port);
});
 
