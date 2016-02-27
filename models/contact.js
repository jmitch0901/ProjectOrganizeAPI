var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
    job:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"job"
        }
    },
    phone:String,
    email:String,
    name:String
});

module.exports = mongoose.model("contact",contactSchema);