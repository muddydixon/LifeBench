
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , os = require('os')
  , app = module.exports = express.createServer()
  , routes
  , config
  , models
  , auth = require('connect-auth')
  , log4js = require('log4js'), log
;
app.config = config = require('config');
app.models = require('./models');
routes = require('./routes');

log4js.addAppender(log4js.fileAppender(path.join(config.log.dir, [config.log.name, os.hostname(), 'access.log'].join('.'))), 'access', 1024*1024, 10);
log = log4js.getLogger('access');


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.favicon());
//   app.use(auth([auth.Twitter({consumerKey: config.oauth.consumerKey, consumerSecret: config.oauth.consumerSecret, callback: config.oauth.callbackUrl})]));
  app.use(log4js.connectLogger(log, {level: log4js.levels.INFO, nolog: config.log.nolog, format:
                                     JSON.stringify({'ip': ':req[X-Forwarded-For]', 'date': ':date', 'method': ':method',
                                                     'status': ':status', 'ua': ':user-agent', 'url': ':url', 'ref': ':referrer'})}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
for(var _p in routes){
  for(var _m in routes[_p]){
    var method = _m.toLowerCase();
    app[method](_p, routes[_p][_m]);
  }
}

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
