const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    riderId:String,
    driverId:String
})

module.exports = mongoose.model("Match",matchSchema);``