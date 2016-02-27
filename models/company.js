var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
    name:String,
    address:String,
    url:String
});

module.exports = mongoose.model("company",companySchema);