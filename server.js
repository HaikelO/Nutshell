// server.js (final)

    // set up ======================================================================
    var express  = require('express');
    // var session = require('express-session');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var port     = process.env.PORT || 9090;                // set the port
    var database = require('./config/database');            // load the database config
    var morgan   = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var cookieParser = require('cookie-parser');
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var jwt = require('jsonwebtoken');
    var configJwt = require('./config/jwt');                // load the JSON Web Token config
    var favicon = require ('serve-favicon');
    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io
    app.set('superSecret', configJwt.secret); // secret variable
    app.use(express.static(__dirname + '/public/angular-front'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(favicon(__dirname + '/public/favicon.ico'));
    // app.use(session({
    //   secret: 'keyboard cat',
    //   resave: true,
    //   saveUninitialized: true
    // }));
    // Session-persisted message middleware
    // app.use(function(req, res, next){
    //   var err = req.session.error,
    //       msg = req.session.notice,
    //       success = req.session.success,
    //       cookies = JSON.stringify(req.cookies);
    //   delete req.session.error;
    //   delete req.session.success;
    //   delete req.session.notice;
    //
    //   if (err) console.log("err : " + err);
    //   if (msg) console.log("msg : " + msg);
    //   if (success) console.log("sucess : " + success);
    //   if (cookies) console.log("cookie1 : " + cookies);
    //   next();
    // });
    // app.options('*', cors());



    app.all('*', function(req, res, next) {
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
         res.header('Access-Control-Allow-Headers', 'Content-Type');
         next();
    });


    // routes ======================================================================
    require('./server/routes/index.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);
