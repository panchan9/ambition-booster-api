'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

mongoose.connect('mongodb://localhost/product', { useMongoClient: true })
  .then(() => console.log('connnection successful'))
  // .then(() => console.log(mongoose.connection.collection('counters')))
  .catch(err => console.error(err));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

  var port = process.env.PORT || 10010;
  app.listen(port);

 });
