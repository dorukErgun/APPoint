// express server setup
const express = require('express');
const router = express.Router()
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/user');
const Facility = require('./models/facility');
const { hasUncaughtExceptionCaptureCallback } = require('process');
_ = require('lodash');

mongoose.set('useFindAndModify', false); // for deprecation warning


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
app.use(express.urlencoded({extended: true})); // for json format

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


// testi yazıldı, apiTest.js 

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

app.get('/test', (req, res) =>
{  
    res.render('test');
})



//TRYING FACILITY

//test edilmedi, sayfa bulunamadi??
app.get('/trial', (req, res) =>
{ 
    res.render('facilitydashboard');
})

//test edildi, profileApiTest.js
app.get('/profile', requireLogin, async (req, res) =>
{ 
    const user = await User.findOne({userId : req.session.user_id});

    //const facility = await Facility.findOne({ category: facilityType, name : facilityName});
    res.render('profile', {user});
})

// when logout button arrives, it will run
app.post('/logout', (req, res) =>
{
    req.session.user_id = null;
    
    res.redirect('/');
})

app.get('/corporatelogin', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/corporatelogin.html');
})

app.post('/corporatelogin', async (req, res) =>
{
    const {name, password} = req.body;
    const foundUser = await Facility.findOne({name : name});
    console.log(foundUser);
    if(foundUser)
    {
        const isValid = await bcrypt.compare(password, foundUser.password);

        if(isValid)
        {
            req.session.user_id = foundUser._id;
            res.redirect('/facilitydashboard/'+ foundUser.name);
        }
        else
        {
            res.redirect('/corporatelogin');
        }
    }
})

app.get('/facilitydashboard/:facilityname', requireLogin, async (req, res) =>
{
    const facilityName = req.params.facilityname;
    let facility =  await Facility.findOne({name : facilityName});
    res.render('facilitydashboard', {facility});
})

app.post('/facilitydashboard/:facilityname', requireLogin, async (req, res) => 
{
    const {datevalue, ar} = req.body;
    var parsedDate = datevalue.split(' ');
    /*console.log("DATEVALUE : " + datevalue);
    console.log(parsedDate[0]); // date
    console.log(parsedDate[1]); // hour
    console.log(ar); // t or f*/

    const facilityName = req.params.facilityname;


    const facility = await Facility.findOne({name : facilityName});
    


    if(ar == 't')
    {
        
        Facility.updateOne(
            { 'appointments.date' : parsedDate[0],
              'appointments.hour' : parsedDate[1]},
            {
                "$set":
                    {
                        "appointments.$.isApproved": true
                    }
            }
        ,(err) =>
        {
            console.log(err);
        });

        User.updateOne(
            { 'appointments.date' : parsedDate[0],
              'appointments.hour' : parsedDate[1]},
            {
                "$set":
                    {
                        "appointments.$.isApproved": true
                    }
            }
        ,(err) =>
        {
            console.log(err);
        });


    }
    else if(ar == 'f')
    {
        console.log("F");
        Facility.updateOne(
            { 'appointments.date' : parsedDate[0],
              'appointments.hour' : parsedDate[1]},
            {
                "$set":
                    {
                        "appointments.$.isDeleted": true
                    }
            }
        ,(err) =>
        {
            console.log(err);
        });

        console.log("F");
        User.updateOne(
            { 'appointments.date' : parsedDate[0],
              'appointments.hour' : parsedDate[1]},
            {
                "$set":
                    {
                        "appointments.$.isDeleted": true
                    }
            }
        ,(err) =>
        {
            console.log(err);
        });
    }

    const redirect = '/facilitydashboard/' + req.params.facilityname;
    console.log(redirect);
    res.redirect(redirect);


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
            gender: gender            
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
        

        const update = { userId : req.session.user_id};

        // `doc` is the document _before_ `update` was applied
        await User.findOneAndUpdate({email : email}, update);
        



        
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

    if(req.session.user_id)
    {
        const isloggedIn = true;
        res.render('facilitypicker', {facilities, facilityType, isloggedIn});
    }
    else
    {
        const isloggedIn = false;
        res.render('facilitypicker', {facilities, facilityType, isloggedIn});
    }


})

app.get('/:facilitytype/:facilityname', async (req, res) => {
    console.log(" facilitytype name request");
    const facilityType = req.params.facilitytype;
    const facilityName = req.params.facilityname;
    const facility = await Facility.findOne({ category: facilityType, name : facilityName});

    var appointment_string = "";

    for(var i=0; i<facility.appointments.length; i++){
        if(i != 0){
            appointment_string += "\"";
        }
        appointment_string += facility.appointments[i].date;
        appointment_string += " ";
        appointment_string += facility.appointments[i].hour;
        if(i!=facility.appointments.length-1){
            appointment_string += "\",";
        }
    }

    if(req.session.user_id)
    {
        const isloggedIn = true;
        res.render('facility', {facility, facilityType, isloggedIn});
    }
    else
    {
        const isloggedIn = false;
        res.render('facility', {facility, facilityType, isloggedIn});
    }
    
})


app.post('/:facilitytype/:facilityname', async (req, res) => 
{
    const {datevalue, hour} = req.body;



    let user = await User.findOne({userId : req.session.user_id});

    const userId = user._id;

    //create()
    const update = 
    {
        date : datevalue,
        hour : hour,
        email : user.email,
        isApproved : false,
        isDeleted : false
    }

    let facility =  await Facility.findOne({name : req.params.facilityname});
    const id = facility._id;

    await Facility.updateOne(
        { "_id": id},
        {
            "$push":
                {
                    "appointments": update
                }
        }
    ).then(data => {
        
    })

    
    await User.updateOne(
        { "_id": userId},
        {
            "$push":
                {
                    "appointments": update
                }
        }
    ).then(data => {
        
    })

    res.redirect('/profile');

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});