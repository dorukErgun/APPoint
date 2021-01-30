 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const Appointment = require('./appointment');

 // user schema
const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        birthDate: String,
        gender: String,
        userId: String,
        appointments : [Appointment]
    })

userSchema.statics.findAndValidate = async function (email, password)
{
    const foundUser = await this.findOne({email});
    if(foundUser)
    {
        const isValid = await bcrypt.compare(password, foundUser.password);
        return foundUser;
    }
    return false;
}

// hash the password before save()
userSchema.pre('save', async function (next)
{
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

///for testing
getUserSchema = ()=> userSchema;
module.exports= {getUserSchema};
///

module.exports = mongoose.model('User', userSchema);



