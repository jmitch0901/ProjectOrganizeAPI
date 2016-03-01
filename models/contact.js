var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
    job:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"job"
        }
    },
    company:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"company"
        },
        name:String
    },
    position:String,
    phone:String,
    email:String,
    name:String,
    relevantJobName:String
});

module.exports = mongoose.model("contact",contactSchema);