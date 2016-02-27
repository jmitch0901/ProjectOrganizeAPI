var express = require("express"),
    apiRouter = express.Router({mergeParams:true}),
    usersRoute = require("./users"),
    jobsRoute = require("./jobs"),
    contactsRoute = require("./contacts"),
    companiesRoute = require("./companies"),
    passport = require("passport"),
    User = require("../models/user"),
    Middleware = require("./middleware");
    
    
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
    
    // res.json({
    //     id_user:req.user._id,
    //     name:'Jonathan Mitchell',
    //     email:'jmitch0901@gmail.com',
    //     message: 'You should show all my jobs here, or at least a list of id_jobs.'
    // });
    
    res.redirect('/api/users/'+req.user._id);
    
});

apiRouter.post('/login',passport.authenticate('local',{failureRedirect:'/api/failure'}),function(req,res){
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