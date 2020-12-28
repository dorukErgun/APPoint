const mongoose = require('mongoose');


const dateSchema = new mongoose.Schema(
    {
        date : String,
        hour : String,
        email : String,
        isApproved : Boolean
    })


module.exports = mongoose.Schema(dateSchema);
