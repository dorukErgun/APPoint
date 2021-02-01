const mongoose = require('mongoose');


const dateSchema = new mongoose.Schema(
    {
        date : String,
        hour : String,
        email : String,
        isApproved : Boolean,
        isDeleted : Boolean
    })


///for testing
/*
getDateSchema = ()=> dateSchema;
module.exports = { getDateSchema };
*/
///
getDateSchema = ()=> dateSchema;
module.exports= {getDateSchema};

module.exports = mongoose.Schema(dateSchema);
