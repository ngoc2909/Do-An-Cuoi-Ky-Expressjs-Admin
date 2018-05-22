var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil123';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    next(null, jwt_payload)
    // usually this would be a database call:
    // var user = users[_.findIndex(users, {id: jwt_payload.id})];
    // if (user) {
    //     next(null, user);
    // } else {
    //     next(null, false);
    // }
});

passport.use(strategy);

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var loaisanpham = require('./routes/loaisanpham');
var nhasanxuat = require('./routes/nhasanxuat');
var taikhoan = require('./routes/taikhoan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', function (req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
    //var user = users[_.findIndex(users, {name: name})];
    if (name != 'admin' || password != '123456') {
        res.status(401).json({message: "username and password not matched"});
        return;
    }

    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: 1, name:'admin', role:'admin'};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});

app.get('/api' , (req, res) => {
    res.json ({
        message: 'Welcome to API'
    });
});
app.post('api/posts',verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey' , (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created.....',
                authData
            });
        }
    });
});
app.post('api/login', (req,res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'admin',
        email: 'admin@gmail.com'
    }
    jwt.sign({user: user}, 'secretkey',(err,token) => {
        res.json({
            token
        });
    });
});
//Verify Token
function verifyToken(req,res,next) {
    //Get auth header value
    const beareHeader = req.headers['authorization'];
    if (typeof beareHeader !== 'underfined'){
        //split at the space
        const bearer = bearerHeader.split('');
        //Get
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next mmiddleware
        next();
    }
    else{
        //Forbidden
        res.sendStatus(403);
    }
}

app.use('/', index);
app.use('/users', users);
app.use('/api', admin);
app.use('/api', loaisanpham);
app.use('/api',nhasanxuat);
app.use('/api',taikhoan);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//app.listen(3000, function(){
//  console.log("Server is listening on port 3000");
//  });
module.exports = app;
