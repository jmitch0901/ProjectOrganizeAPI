var express = require("express"),
    jobsRouter = express.Router({mergeParams:true}),
    middleware = require("../middleware");
    


jobsRouter.get('/search',function(req,res){
    //Grab the query parameters
    //Display the options for the user
   res.json({message:"Server should search apis here..."}); 
});

//Get a SPECIFIC job. Add a query parameter SHOWALL?
jobsRouter.get("/:id_job",function(req,res){
    
    res.json({
        id_job:30,
        fk_id_user:1,
        company:{
            name:"Fat Jacks",
            address:"1800 IDGAF Street",
            url:"http://www.washingtonredskins.com"
        },
        contacts:[
            {
                phone:"1231231234",
                email:"bacon@weiners.com"
                
            },
            {
                phone:"4564564567",
                email:"weiner@bacon.com"
                
            }
        ]
    });
});
    
    
    
module.exports = jobsRouter;