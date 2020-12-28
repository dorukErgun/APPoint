const mongoose = require('mongoose');
const Appointment = require('./appointment');

// facility schema
const facilitySchema = new mongoose.Schema(
   {
       name : String,
       password : String,
       image : String,
       about : String,
       number : String,
       adress : String,
       category : String,
       appointments : [Appointment]
   })

module.exports = mongoose.model('Facility', facilitySchema);



