'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/apiController');

  const jwt = require('express-jwt');
  const jwksRsa = require('jwks-rsa');


  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://ruthmunoz.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://test-api',
    issuer: `https://ruthmunoz.auth0.com/`,
    algorithms: ['RS256']
  });

  // todoList Routes
  app.use(checkJwt);
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
