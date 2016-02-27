var express = require('express'),
    app = express(),
    routes = require('./routes'),
    bodyParser = require('body-parser');
    
    
    
//USE BODY PARSER
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
    
//USE OUR API ROUTES
app.use('/',routes);
    
    
//CATCH ALL
app.get('*',function(req,res){
    res.json({error:'Invalid Route.'});
});
    
    
    

//HOW we listen
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Server has started!");
});
