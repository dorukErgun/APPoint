// express server setup
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.mwbbr.mongodb.net/user?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => 
{
    console.log("CONNECTED!");
})
.catch((e) => 
{
    console.log('Error!');
    console.log(e);
})


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

const User = mongoose.model('User', userSchema);


// publicten static page çekilecek
app.use(express.static('public'));


app.use(express.urlencoded({extended: true})); // bu kısım formdan gelen datanın json formatına gelmesi için


app.get('/signup', (req, res) =>
{
    res.send("DJJDSHF");
})

app.post('/signup', (req, res) =>
{
    const {firstname,lastname,email,password,confirm_password,month,day,year,gender} = req.body;
    console.log(`${firstname} ${lastname} ${email} ${password} ${confirm_password} `);
    console.log(`${month} ${day} ${year} ${gender}`);
    var birthDate = day + "/" + month + "/" + year;
    const newUser = new User(
        {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        confirmPassword: confirm_password,
        birthDate: birthDate,
        gender: gender,
        isCustomer: true
        });

    newUser.save()
    .then(() => 
    {
    console.log("it is saved!");
    })
    .catch((e) =>
    {
    console.log("ERROR OCCURED!");
    console.log(e);
    })



    res.send("POST SIGNUP");
})


app.listen(3000, () => 
{
    console.log("Server is running..");
})