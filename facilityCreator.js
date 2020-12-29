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
        name : "vapianoRand",
        password : "admin",
        image : "vapiano.jpeg",
        about : "İtalyan Lezzetleri, Pizza, Makarna, Salata ve Tatlılar",
        number : "555 123 123",
        adress : "Suadiye Istanbul",
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
    date : '14/05/2021',
    hour : '14.40',
    email : 'Dorukb@gmail.com',
    isApproved : false
}

async function test()
{
    let facility =  await Facility.findOne({name : 'vapianoRand'});
    const id = facility._id;
    console.log(id);

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

test()
