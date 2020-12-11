 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

 // user schema
const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        confirmPassword: String,
        birthDate: String,
        gender: String,
        isCustomer: Boolean
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

module.exports = mongoose.model('User', userSchema);



