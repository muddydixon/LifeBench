var app = module.parent.parent.exports
, config = app.config
, mongoose = app.mongoose
, Schema = mongoose.Schema
, path = require('path')
, modelName = path.basename(__filename, '.js')
, ModelSchema, Model
;

ModelSchema = new Schema({
    name: String
  , created: Number
});

mongoose.model(modelName, ModelSchema);
Model = mongoose.model(modelName);
module.exports = mongoose.model(modelName);
