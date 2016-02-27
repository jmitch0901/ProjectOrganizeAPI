var express = require("express"),
    meRouter = express.Router({mergeParams:true}),
    Middleware = require("../middleware");
    
    
meRouter.get('/',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id);
});

meRouter.get('/contacts',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id+'/contacts');   
});

meRouter.get('/companies',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id+'/companies');   
});

meRouter.get('/jobs',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id+'/jobs');   
});
    
    
module.exports = meRouter;