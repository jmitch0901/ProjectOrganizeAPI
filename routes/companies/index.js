var express = require("express"),
    companiesRouter = express.Router({mergeParams:true});
    
//SHOW ALL companies
companiesRouter.get('/',function(req,res){
    res.json([
        {
            id_company:4,
            name:"Star Books",
            address: "1234 Main St."
        },
        {
            
        },
        {
            
        }
        
        ]);
});
    
    
module.exports = companiesRouter;