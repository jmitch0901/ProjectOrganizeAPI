var express = require("express"),
    companiesRouter = express.Router({mergeParams:true}),
    middleware = require("../middleware");
    
//MODELS
var Contact = require("../../models/contact"),
    Company = require("../../models/company"),
    Job = require("../../models/job");
    



companiesRouter.get('/search',function(req,res){
    //Grab the query parameters
    //Display the options for the user
   res.json({message:"Server should search apis here..."}); 
});
    
    
module.exports = companiesRouter;