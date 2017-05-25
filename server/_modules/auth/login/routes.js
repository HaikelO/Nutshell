var User = require('./../../users/_models/user');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.post('/api/Login', function(req, res){
    User.findOne({name : req.body.name}, function (err, user) {

      if (err) throw err;

      if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        console.log('Token : ', token);
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

      // if (obj.length > 0) {
      //   console.log('Cookies: ',req.cookies,Date.now());
      //   console.log(req.body);
      //   console.log(obj);
      //   var pa1 = String;
      //   var pa2 = String;
      //   pass1 = req.body.password;
      //   pass2 = obj[0].password;
      //   console.log("pass1 : " + pass1);
      //
      //   console.log("pass2 : " + pass2);
      //
      //   if(pass1 == pass2) {
      //
      //     console.log("auth ok.js");
      //     res.sendStatus(200);
      //
      //   }
      //   else {
      //     console.log("mauvais mdp");
      //     res.sendStatus(400);
      //   }
      // }

    });
  });
  app.get('/api/Login', function(req, res){

    console.log("Login test");

  });
}
