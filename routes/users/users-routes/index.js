var express = require("express"),
    usersRoutesRouter = express.Router({mergeParams:true}),
    Middleware = require("../../middleware");
    
usersRoutesRouter.get('/',Middleware.isLoggedIn,function(req,res){
        res.json({
        id_user:req.params.id_user,
        name:'Jonathan Mitchell',
        email:'jmitch0901@gmail.com',
        message: 'You should show all my jobs here, or at least a list of id_jobs.'
    });
});

usersRoutesRouter.get('/contacts',Middleware.isLoggedIn,function(req,res){
   res.json([
       {
       
           fk_id_job:4,
           name:"Joe Blah",
           phone:"5675675678",
           email:"blah@blah.com"
       
       },
       {
           fk_id_job:5,
           name:"Jane Blah",
           phone:"5675675678",
           email:"blah@blah.com"
       }
       ]); 
});

usersRoutesRouter.get('/jobs',Middleware.isLoggedIn,function(req,res){
    
    //SELECT ALL jobs WHERE user.id=job.fdiduser;
   res.json([
       {
           fk_id_company:5,
           title: "Java Developer",
           description: "Is awesome job!"
       
       },
       {
           fk_id_company:6,
           title:"C++ Developer",
           description: "Screw C++"
       }
       ]); 
});

usersRoutesRouter.get('/companies',Middleware.isLoggedIn,function(req,res){
    
    //SELECT ALL jobs WHERE userid = job.fkuserid; SELECT ALL companies WHERE job.fkidcompany=company.id;
   res.json([
       {
           name: "Google",
           address: "101 Awesome Street",
           url: "http://www.google.com"
       
       },
       {
           title:"Amazon",
           address: "101 Holy Ship Street",
           url:"http://www.amazon.com"
       }
       ]); 
});
    
    
    
    
module.exports = usersRoutesRouter;