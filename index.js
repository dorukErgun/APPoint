// express server setup
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// publicten static page çekilecek
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.json()); // json parser
app.use(express.urlencoded({extended: true})); // bu kısım formdan gelen datanın json formatına gelmesi için
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





app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/home.html');
})


app.get('/signup', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/signup.html');
})

app.post('/signup', (req, res) =>
{
    const {firstname,lastname,email,password,confirm_password,month,day,year,gender} = req.body;
    console.log(req.body);
    console.log(email);
    var birthDate = day + "/" + month + "/" + year; // gün/ay/yıl format
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


    res.sendFile(__dirname + '/public/html/index.html');
})


app.listen(3000, () => 
{
    console.log("Server is running..");
})