const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name:String,
    email:String,
    phonenumber:String,
    rating:Number

})

module.exports = mongoose.model("Rider",riderSchema);``