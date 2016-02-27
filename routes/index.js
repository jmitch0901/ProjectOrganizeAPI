var express = require("express"),
    apiRouter = express.Router({mergeParams:true}),
    usersRoute = require("./users"),
    jobsRoute = require("./jobs"),
    contactsRoute = require("./contacts"),
    companiesRoute = require("./companies");
    
apiRouter.use('/users',usersRoute);
apiRouter.use('/jobs',jobsRoute);
apiRouter.use('/contacts',contactsRoute);
apiRouter.use('/companies',companiesRoute);
    
module.exports = apiRouter;