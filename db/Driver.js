const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name:String,
    email:String,
    phonenumber:String,
    rating:Number

})

module.exports = mongoose.model("Driver",driverSchema);``