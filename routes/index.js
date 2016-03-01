var express = require("express"),
    apiRouter = express.Router({mergeParams:true}),
    usersRoute = require("./users"),
    jobsRoute = require("./jobs"),
    contactsRoute = require("./contacts"),
    companiesRoute = require("./companies"),
    passport = require("passport"),
    User = require("../models/user"),
    Middleware = require("./middleware");
    
//SCHEMAS
var Job = require("../models/job"),
    Company = require("../models/company"),
    Contact = require("../models/contact");
    
    
// var isLoggedIn = function(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
    
//     res.status(401);
//     res.json({error: "You are not authenticated. Please login first!"});
// };
    
apiRouter.get('/',function(req,res){
   res.json({message:"Welcome to the Project Organize API."}); 
});

apiRouter.get('/me',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id);
});


apiRouter.get('/me/:me_extras',Middleware.isLoggedIn,function(req,res){
    res.redirect('/api/users/'+req.user._id+'/'+req.params.me_extras);
});

apiRouter.post('/me/contacts',Middleware.isLoggedIn,function(req,res){
    var contact = req.body;
    console.log(contact);
    Contact.create(contact,function(err,contact){
        if(err){
            res.status(400);
            return res.json({error:err});
        }
        res.status(201);
        res.json({message:"Successful Contacts Post!"});
    });
});
//Needs testing,
//Need a different GET request for /me/jobs
apiRouter.post('/me/jobs',Middleware.isLoggedIn,function(req,res){
    var job = req.body;
    console.log(job);
    job.user={};
    job.user.id = req.user._id;
    
    if(!job || !job.company || !job.company.name || !job.location){
        res.status(400);
        return res.json({error:"You must provide a title, company (with name), and location!"});
    }
    
    Company.find({name:job.company.name},function(err,result){
        
        if(err){
            res.status(409);
            return res.json({error:err});
        }
        
        if(!result || !result._id){
            
            Company.create(job.company,function(err,company){
                if(err){
                    res.result(409);
                    return res.json({error:err});
                } else {
                    var companyId = company._id;
                    job.company.id = companyId;
                    Job.create(job,function(err,job){
                        if(err){
                            res.result(409);
                            return res.json({error:err});
                        } else {
                            res.status(201);
                            return res.json({message:"Successful job post!"});
                        }
                    });     
                }
            });
            
        } else {
            var companyId = result._id;
            var companyName = result.name;
            job.company.id = companyId;
            job.company.name = companyName;
            Job.create(job,function(err,job){
                if(err){
                    res.result(409);
                    return res.json({error:err});
                } else {
                    res.status(201);
                    return res.json({message:"Successful job post!"});
                }
            });     
        }
    });
});

//MODELS

    
    


apiRouter.post('/login',Middleware.notAlreadyLoggedIn,passport.authenticate('local',{failureRedirect:'/api/failure'}),function(req,res){
    res.send({message:"You are successfully logged in. You can see your profile by making a /me request."});
});


apiRouter.get('/logout',function(req,res){
    req.logout();
    res.json({message: "You are logged out."});
});

apiRouter.get('/failure',function(req,res){
    res.status(400);
    res.json({error: "Invalid username/password combo."});   
});


apiRouter.post("/register",function(req, res) {
   User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,function(err,user){
       if(err){
           console.log("ERR -> "+err);
           res.status(400);
           return res.json({error:err});
       }
       
       
       passport.authenticate("local")(req,res,function(){

           res.json({message:"Sucessfully Registered and Authenticated."})
       });
   }); 
});
    
apiRouter.use('/users',usersRoute);
apiRouter.use('/jobs',jobsRoute);
apiRouter.use('/contacts',contactsRoute);
apiRouter.use('/companies',companiesRoute);
    
module.exports = apiRouter;