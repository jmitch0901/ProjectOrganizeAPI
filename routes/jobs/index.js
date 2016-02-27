var express = require("express"),
    jobsRouter = express.Router({mergeParams:true});
    
    
//GET all jobs
jobsRouter.get('/',function(req,res){
   res.json([
       {
           id_job:1,
           title:"gyno"
       },
       {
           id_job:2,
           title:"bacinator"
           
       },
       {
           id_job:3,
           title:"playa"
       }
       ]); 
});

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
                fk_id_job:2,
                phone:"1231231234",
                email:"bacon@weiners.com"
                
            },
            {
                fk_id_job:3,
                phone:"4564564567",
                email:"weiner@bacon.com"
                
            }
        ]
    });
});
    
    
    
module.exports = jobsRouter;