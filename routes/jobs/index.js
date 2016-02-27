var express = require("express"),
    jobsRouter = express.Router({mergeParams:true});
    
    
//GET all jobs
jobsRouter.get('/',function(req,res){
   res.json([
       {
           id_job:1,
           fk_id_company:3,
           title:"gyno"
       },
       {
           id_job:2,
           fk_id_company:3,
           title:"bacinator"
           
       },
       {
           id_job:3,
           fk_id_company:3,
           title:"playa"
       }
       ]); 
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