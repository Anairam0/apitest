var express = require('express'),
  app = express(),
  port = process.env.PORT || 3010;

  mongoose = require('mongoose'),
  Task = require('./api/models/apiModels'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('test API RESTful API server started on: ' + port);
