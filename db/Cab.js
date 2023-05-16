const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
    numberplate:String,
    model:String
  

})

module.exports = mongoose.model("Cab",cabSchema);``