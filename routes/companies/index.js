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
            id_company:5,
            name:"ffasd f da",
            address: "1234 Main St." 
        },
        {
            id_company:6,
            name:"hrg hr ",
            address: "1234 Main St." 
        }
        
        ]);
});
    
    
module.exports = companiesRouter;