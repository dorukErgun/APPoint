const express = require('express');
const app = express();
const path = require('path');
const facilityData = require('./data.json');
console.log(facilityData);

app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    console.log("HI");
})

app.get('/:facilitytype', (req, res) => {
    const { facilitytype } = req.params;
    const data = facilityData[facilitytype];
    console.log(data);
    if(data){
        res.render('facilitypicker', { ...data });
    } else {
        res.render('notfound', {facilitytype});
    }
})


app.get('/:facilitytype/:facility', (req, res) => {
    const { facilitytype } = req.params;
    if(data){
        res.render('facility', { ...facdata });
    } else {
        res.render('notfound', { facility });
    }
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})