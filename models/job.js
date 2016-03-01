var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    company:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"company" 
        },
        name:String
    },
    title:String,
    location:String,
    status:String
});

module.exports = mongoose.model("job",jobSchema);