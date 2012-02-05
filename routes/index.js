
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' })
// };
var app = module.parent.exports
, config = app.config
, models = app.models;

module.exports = {
    '/' : {
        'GET': function(req, res){
          res.render('index', {
              title: 'LifeBench'
            , topics: [
                {title: 'hoge', body: ['message']}
              , {title: 'fuga', body: ['message']}
            ]});
        }
    }
  , '/user' : {
      'GET': function(req, res){}
    , 'POST': function(req, res){}
  }
  , '/todo' : {
      'GET': function(req, res){}
    , 'POST': function(req, res){}
  }
  , '/wiki' : {
      'GET': function(req, res){}
    , 'POST': function(req, res){}
  }
  , '/event' : {
      'GET': function(req, res){}
    , 'POST': function(req, res){}
  }
  , '/message' : {
      'GET': function(req, res){
        var opt = {
            limit: 10
          , skip: 0
          , sort: {created: -1}
        };
        if(req.query.limit !== undefined && Number(req.query.limit) !== NaN) opt.limit = req.query.limit;
        if(req.query.skip !== undefined && Number(req.query.skip) !== NaN) opt.skip = req.query.skip;
        
        models.Message.find({}, {}, opt, function(err, messages){
          res.send(messages);
        });
      }
    , 'POST': function(req, res){
      if(req.body &&
         req.body.body){
        
      }
    }
  }
//   , '/message' : {
//       'GET': function(req, res){}
//     , 'POST': function(req, res){}
//   }
};