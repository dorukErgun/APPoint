const mongoose = require('mongoose');
const Facility = require('./models/facility');
const bcrypt = require('bcrypt');

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

async function create() 
{
    const newFacility = new Facility(
        {
        name : "annie's",
        password : "admin",
        image : "annieskitchen.jpeg",
        about : "Annie's Kitchen is THE vegan restaurant of the Lille metropolis!",
        number : "555 123 123",
        adress : "Lille",
        category : "restaurants"
        });


        newFacility.password = await bcrypt.hash(newFacility.password, 12);

        await newFacility.save()
        .then(() => 
        {
        console.log("it is saved!");
        })
        .catch((e) =>
        {
        console.log("ERROR OCCURED!");
        console.log(e);
        })

}


async function saveDb(newFacility) 
{

    await newFacility.save()
    .then(() => 
    {
    console.log("it is saved!");
    })
    .catch((e) =>
    {
    console.log("ERROR OCCURED!");
    console.log(e);
    })

}

//create()
const update = 
{
    date : '14.05.2030',
    hour : '15.00',
    email : 'Dorukb@gmail.com',
    isApproved : false
}

async function test()
{
    let facility =  await Facility.findOne({name : 'vapiano'});
    const id = facility._id;

    Facility.updateOne(
        { "_id": id},
        {
            "$push":
                {
                    "appointments": update
                }
        }
    ).then(data => {
        console.log(data);
    }) 
}

create()

