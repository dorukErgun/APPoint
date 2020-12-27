const mongoose = require('mongoose');
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





const newFacility = new Facility(
    {
    name : "vapiano",
    image : "vapiano2.jpeg",
    about : "İtalyan Lezzetleri, Pizza, Makarna, Salata ve Tatlılar",
    number : "555 123 123",
    adress : "Suadiye Istanbul",
    category : "restaurants"
    });

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

saveDb(newFacility);