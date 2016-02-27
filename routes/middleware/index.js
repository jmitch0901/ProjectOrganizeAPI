var passport = require("passport");

var Middleware = {
    isLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
    
        res.status(401);
        res.json({error: "You are not authenticated. Please login first!"});
    },
    isMe: function(req,res,next){
        if(req.user._id.toString() == req.params.id_user){
            return next();
        }
        
        console.error("In the isMe Middleware, you are not requesting yourself.");
        
        res.status(403);
        res.json({
           error:"You are not authorized to do that!"
        });

    }
};


module.exports = Middleware;