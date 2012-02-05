var app = module.parent.parent.exports
, config = app.config
, mongoose = app.mongoose
, Schema = mongoose.Schema
, path = require('path')
, modelName = path.basename(__filename, '.js')
, ModelSchema, Model
, models = module.parent.exports
;

ModelSchema = new Schema({
    from: [models.User]
  , to: [models.User]
  , created: Number
  , body: String
});

mongoose.model(modelName, ModelSchema);
Model = mongoose.model(modelName);
module.exports = mongoose.model(modelName);
