var app = module.parent.exports
, config = app.config
, mongoose = app.mongoose = require('mongoose')
, models = {}
;
mongoose.connect('mongodb://'+config.database.host+(config.database.port ? ':' + config.database.port : '') + '/' + config.database.db );

module.exports = models;
models['User'] = require('./User');
models['Message'] = require('./Message');

