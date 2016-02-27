var express = require('express'),
    app = express(),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    expressSession = require('express-session');
    
    

 
//MODELS
var User = require("./models/user");

mongoose.connect('mongodb://localhost/project_organize');
    
    
//USE BODY PARSER
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));

//DB USAGE
app.use(expressSession({
    secret: "HYYa<qv\\v?faJ8Lr8vc\\",//Change this to enviroment variable later
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',function(req,res){
  res.json({message: 'Please make a request to /api to start using Project Organize API.'})
});
    
//USE OUR API ROUTES
app.use("/api",routes);


    
    
//CATCH ALL
app.get('*',function(req,res){
    res.status(404);
    res.json({error:'Route not found!'});
});
    
    
    

//HOW we listen
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Server has started!");
});
