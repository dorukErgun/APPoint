// express server setup
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/user');
const Facility = require('./models/facility');

mongoose.connect('mongodb+srv://admin:admin@cluster0.mwbbr.mongodb.net/user?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => 
{
    console.log("Database Connected!");
})
.catch((e) => 
{
    console.log('Error!');
    console.log(e);
})
mongoose.set('useCreateIndex', true); // for deprecation warning

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// for static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/scripts')));
app.use(express.json()); // json parser
app.use(express.urlencoded({extended: true})); // bu kısım formdan gelen datanın json formatına gelmesi için

app.use(session({secret: "not a good secret",
                resave: true,
                saveUninitialized: true}));

const requireLogin = (req, res, next) => 
{
    // if you are not logged in
    if(!req.session.user_id)
    {
        res.redirect('/login');
    }
    else
    {
        next();
    }
}




app.get('/', (req, res) =>
{  
    if(req.session.user_id)
    {
        const isloggedIn = true;
        res.render('home', {isloggedIn});
    }
    else
    {
        const isloggedIn = false;
        res.render('home', {isloggedIn});
    }
})

//TRYING FACILITY
app.get('/trial', (req, res) =>
{ 
    res.render('facility');
})

// when logout button arrives, it will run
app.post('/logout', (req, res) =>
{
    req.session.user_id = null;
    
    res.redirect('/');
})


app.get('/profile', requireLogin, (req, res) =>
{
    res.send('giriş yaptın');
})



app.get('/signup', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/signup.html');
})

app.post('/signup', async (req, res) =>
{
    const {firstname,lastname,email,password,confirm_password,month,day,year,gender} = req.body;
    console.log(req.body);
    var birthDate = `${day}/${month}/${year}`; // gün/ay/yıl format
    if(password == confirm_password)
    {
        const newUser = new User(
            {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            birthDate: birthDate,
            gender: gender,
            isCustomer: true
            });
    
        await newUser.save()
        .then(() => 
        {
        console.log("it is saved!");
        })
        .catch((e) =>
        {
        console.log("ERROR OCCURED!");
        console.log(e);
        })

        req.session.user_id = newUser._id;
        res.redirect('/');
    }
    else
    {
        console.log("register failed");
    }
})

app.get('/login', (req, res) => 
{
    res.sendFile(__dirname + '/public/html/login.html');
})


app.post('/login', async (req, res) =>
{
    const {email, password} = req.body;

    const foundUser = await User.findAndValidate(email, password);

    if(foundUser)
    {
        req.session.user_id = foundUser._id;
        res.redirect('/');
    }
    else
    {
        res.redirect('/login');
    }
})

app.get('/:facilitytype', async (req, res) =>
{
    const facilityType = req.params.facilitytype;
    const facilities = await Facility.find({ category: facilityType});
    res.render('facilitypicker', {facilities, facilityType});
    //res.render('temp', {facilities});




    //res.render('facilitypicker');






    
})

app.get('/:facilitytype/:facilityname', (req, res) => {
    const facilityType = req.params.facilitytype;
    const facilityName = req.params.facilityname;
    res.send(`${facilityName} ${facilityType}`);
    if(data){
        res.render('facility', { ...facdata });
    } else {
        res.render('notfound', { facility });
    }
})


app.listen(3000, () => 
{
    console.log("Server is running..");
})