// app/routes.js

// load the todo model
var jwt = require('jsonwebtoken');
// expose the routes to our app with module.exports
module.exports = function(app) {
    

    // api ---------------------------------------------------------------------
    
    /*app.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      console.log("Token" +token);
      // decode token
      if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

      } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
      }
    });*/
    require('./../_modules/auth/_routes/index')(app);
    require('./../_modules/clients/_routes/index')(app);
    require('./../_modules/employees/_routes/index')(app);
    require('./../_modules/leboncoin/_routes/index')(app);
    require('./../_modules/machinery/_routes/index')(app);
    require('./../_modules/products/_routes/index')(app);
    require('./../_modules/purchases/_routes/index')(app);
    require('./../_modules/sales/_routes/index')(app);
    require('./../_modules/users/_routes/index')(app);

   
    
    // application -------------------------------------------------------------
    /*app.get('*', function(req, res) {
        res.sendFile('index.html', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
    });*/
};
