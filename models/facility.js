const mongoose = require('mongoose');


// facility schema
const facilitySchema = new mongoose.Schema(
   {
       name : String,
       image : String,
       about : String,
       number : String,
       adress : String,
       category : String
   })

module.exports = mongoose.model('Facility', facilitySchema);



