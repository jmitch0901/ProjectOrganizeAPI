var express = require("express"),
    contactsRouter = express.Router({mergeParams:true});
    
    
//GET ALL contacts
contactsRouter.get('/',function(req,res){
    res.json([
        {
            id_contact:4,
            fk_id_job:2,
            name: "Mr. Smelly Sausage",
            phone: "4564564567",
            email: "weiner@nuts.com"
        },
        {
            id_contact:5,
            fk_id_job:3,
            name: "Mrs. Smelly Sausage",
            phone: "4564564567",
            email: "nuts@weiner.com"
        },
        {
            id_contact:4,
            fk_id_job:2,
            name: "Senior Smelly Sausage",
            phone: "4564564567",
            email: "oldnuts@weiner.com"
        }
        ]);
});

contactsRouter.get('/:id_contact',function(req,res){
    res.json({
            id_contact:req.params.id_contact,
            fk_id_job:2,
            name: "Mr. Smelly Sausage",
            phone: "4564564567",
            email: "weiner@nuts.com"
    });
});
    
    
module.exports = contactsRouter;