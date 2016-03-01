var express = require("express"),
    usersRoutesRouter = express.Router({mergeParams:true}),
    Middleware = require("../../middleware"),
    mongoose = require("mongoose");
    
    
    
var Job = require("../../../models/job"),
    Company = require("../../../models/company"),
    Contact = require("../../../models/contact");
    
usersRoutesRouter.get('/',Middleware.isLoggedIn,function(req,res){
        res.json({
        id_user:req.params.id_user,
        name:'Jonathan Mitchell',
        email:'jmitch0901@gmail.com',
        message: 'You should show all my jobs here, or at least a list of id_jobs.'
    });
});

usersRoutesRouter.get('/contacts',Middleware.isLoggedIn,function(req,res){
   res.json([
       {
       
           fk_id_job:4,
           name:"Joe Blah",
           phone:"5675675678",
           email:"blah@blah.com"
       
       },
       {
           fk_id_job:5,
           name:"Jane Blah",
           phone:"5675675678",
           email:"blah@blah.com"
       }
       ]); 
});

//GET all jobs
usersRoutesRouter.get('/jobs',Middleware.isLoggedIn,function(req,res){
    
    var result = {};
    result.jobs = [];
    Job.find({'user.id':req.user._id},function(err,jobs){
        if(err){
            console.error("There was an error getting jobs from /me/jobs route.");
            res.status(400);
            return res.json({error:err});
        } else if (jobs){
            
            jobs.forEach(function(job){
                
                job.contacts = [];
                console.log(job);
                
                
                Contact.find({'job.id':job._id},function(err,contacts){
                    
                    if(err){
                        console.error('There was errors finding contacts under the /me/jobs route.');
                    } else if (contacts){
                        contacts.forEach(function(contact){
                            job.contacts.push(contact);
                        });
                    }
                    
                });
                
                
                
                
                result.jobs.push(job);
                
            });
        }
        
        res.json(result);
    });
   /*res.json([
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
       ]); */
});

// usersRoutesRouter.get('/jobs',Middleware.isLoggedIn,function(req,res){
    
//     //SELECT ALL jobs WHERE user.id=job.fdiduser;
//   res.json([
//       {
//           fk_id_company:5,
//           title: "Java Developer",
//           description: "Is awesome job!"
       
//       },
//       {
//           fk_id_company:6,
//           title:"C++ Developer",
//           description: "Screw C++"
//       }
//       ]); 
// });

usersRoutesRouter.get('/contacts',Middleware.isLoggedIn,function(req,res){
    
    Job.find({'user.id':req.user._id},function(err,jobs){
        if(err){
            res.status(400);
            return res.json({error:err});
        }
        
        var ids = [];
        jobs.forEach(function(job){
            ids.push(job.contact.id);
        });
        
        Contact.find({'job.id':ids},function(err,contacts){
            if(err){
                res.status(400);
                return res.json({error:err});
            }
            
            res.json(contacts);
            
        });
        
    });
    
    
    
    // Contact.find({},function(err,contacts){

    //         if(err){
    //             console.error("Expected error when grabbing the contacts from /me/contacts.");
    //             res.status(400);
    //             return res.json({error:err});
    //         } 
            
            
            
    //         res.json(contacts);

    // });
});

// usersRoutesRouter.post('/contacts',Middleware.isLoggedIn,function(req,res){
    
//     Job.find({'user.id':req.user._id},function(err,jobs){
//         if(err){
//             res.status(400);
//             return res.json({error:err});
//         }
        
//         var ids = [];
//         jobs.forEach(function(job){
//             ids.push(job.contact.id);
//         });
        
//         Contact.find({'job.id':ids},function(err,contacts){
//             if(err){
//                 res.status(400);
//                 return res.json({error:err});
//             }
            
//             res.json(contacts);
            
//         });
        
//     });
    
    
// });


//SHOW ALL companies
usersRoutesRouter.get('/companies',Middleware.isLoggedIn,function(req,res){
    
    Company.find({},function(err,companies){

            if(err){
                console.error("Expected error when grabbing companies from /me/companies.");
                res.status(400);
                return res.json({error:err});
            } 
            
            res.json(companies);
    });
    // var results = {};
    // results.companies = [];
    // results.contacts = [];
    
    // var getContacts = function(companies){
    //     var ids = [];
    //     for(var i = 0; i < companies.length; i++){
    //         ids.push(companies[i].company.id);
    //     }
        
    //     Contact.find({'company.id':ids},function(err,contacts){
    //         if(err){
    //             console.error("Expected error when grabbing the contacts from /me/companies big query.");
    //             res.status(400);
    //             return res.json({error:err});  
    //         }
            
    //         results.contacts = contacts;
    //         res.json(results);
    //     });
    // };
    
    // var getCompanies = function(jobs){
        
    //     var ids = [];
    //     for(var i = 0; i < jobs.length; i++){
    //         ids.push(jobs[i].company.id);
    //     }
        
    //     console.log(ids);
        
    //     Company.findById(ids,function(err,companies){
            
            
    //         if(err){
    //             console.error("Expected error when grabbing the companies from /me/companies big query.");
    //             res.status(400);
    //             return res.json({error:err});
    //         }
    //             results.companies = companies;
    //             getContacts(companies);
    //         });
        
    // };
    
    // Job.find({'user.id':req.user._id},function(err,jobs){
    //     if(err){
    //         console.error("Expected error when grabbing the jobs from /me/companies big query.");
    //         res.status(400);
    //         return res.json({error:err});
    //     }
        
    //     getCompanies(jobs);
    // });
    

    //THERE MIGHT BE AN ERROR HERE
    // Job.find({'user.id':req.user._id},function(err,jobs){
    //     var result = {};
    //     var i;
    //     if(err){
    //         console.error("Expected error when grabbing the user.id from /me/companies big query.");
    //         res.status(400);
    //         return res.json({error:err});
    //     }
    //     result.companies = [];
        
    //     //Get the found companies
        
    //     var getContacts = function(company,callbacks){
    //         Contact.find({'company.id':company._id},function(err,contacts){
    //             if(err){
    //                 console.error("There were errors while querying multiple contacts in /me/companies.");
    //             } else if(contacts){
                    
    //                 // contacts.forEach(function(contact){
    //                 //     company.contacts.push(contact);
    //                 // });
                    
    //                 if(callbacks){
    //                     callbacks(contacts);
    //                 } else {
                    
    //                     return contacts;
    //                 }
                    
    //             } else {
    //                 if(callbacks){
                        
    //                 } else {
    //                     return [];
    //                 }
                    
    //             }
    //         });
    //     };
        
    //     var getCompany = function(companyid,callbacks){

    //         Company.findById(companyid,function(err,company){
                   
    //           if(err){
    //               console.err("There was some errors while querying the multiple companies in /me/companies");
                   
    //           } else if(company){
    //               var newCompany = {};
    //               newCompany.contacts = getContacts(company,callbacks);
    //               console.log(company);
    //               return newCompany;
    //           } else {
    //               return {};
    //           }
    //         });
    //     };

    //     for(i = 0; i < jobs.length; i++){
    //         var job = jobs[i];
            
    //         if(i != jobs.length-1){
    //             var company = getCompany(job.company.id);
    //             result.companies.push(company);
    //         } else {
    //             var company = getCompany(job.company.id,function(contacts){
    //                 console.log("SENDING RESULT!");
    //                 this.contacts = contacts;
    //                 result.companies.push(this);
    //                 res.json(result);
    //             });
    //         }
    //     }
        
        
        
        
        
        //UH OH FOR CALLBACKS?
 


        
        
    //});
    
    /*res.json([
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
        
        ]);*/
});
// usersRoutesRouter.get('/companies',Middleware.isLoggedIn,function(req,res){
    
//     //SELECT ALL jobs WHERE userid = job.fkuserid; SELECT ALL companies WHERE job.fkidcompany=company.id;
//   res.json([
//       {
//           name: "Google",
//           address: "101 Awesome Street",
//           url: "http://www.google.com"
       
//       },
//       {
//           title:"Amazon",
//           address: "101 Holy Ship Street",
//           url:"http://www.amazon.com"
//       }
//       ]); 
// });
    
    
    
    
module.exports = usersRoutesRouter;