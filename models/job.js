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
        }
    },
    description:String
});

module.exports = mongoose.model("job",jobSchema);