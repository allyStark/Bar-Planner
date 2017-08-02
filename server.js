var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

//create express instance
var app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static folder *for frontend*
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

app.use(expressValidator({
    customValidators: {
        isRightSize: function(value) {
            var arr = value.split('/');
            return arr.length > 1;
        }
    }
}));

app.post('/test', function(req, res){
    res.json({ 'message': 'working' });
});

//Global Vars
app.use(function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

//connect to mongod
mongoose.connect('mongod://localhost/Planner');

app.listen(process.env.PORT || 3000, function(){
    console.log("Hello");
});