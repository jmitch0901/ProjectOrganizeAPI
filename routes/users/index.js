var express = require("express"),
    usersRouter = express.Router({mergeParams:true}),
    Middleware = require("../middleware");
    
    
  
//GET for all users?
usersRouter.get('/',function(req,res){
    res.status(401);
    res.json({error:"You are not authorized to do that."});
});

//POST a new user
// usersRouter.post('/',function(req,res){
    
// });


//GET a specific user
usersRouter.get('/:id_user',Middleware.isLoggedIn,Middleware.isMe,function(req, res) {
    
    res.json({
        id_user:req.params.id_user,
        name:'Jonathan Mitchell',
        email:'jmitch0901@gmail.com',
        message: 'You should show all my jobs here, or at least a list of id_jobs.'
    });
    
});

//PUT (edit) a specific user
// usersRouter.put('/:id_user',function(req,res){
    
// });

//DELETE a specific user
usersRouter.delete('/:id_user',function(req,res){
    res.status(403);
    res.json({error: 'Account deletion not supported.'});
});
    
    
    
module.exports = usersRouter;